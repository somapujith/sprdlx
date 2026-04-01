import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Volumetric particle-scatter hero background — inspired by the Eragon-style
 * starburst / nebula look: a bright focal point with light rays, surrounded by
 * a grainy particle field that reacts to the mouse.
 *
 * Technique:
 *  - Multi-octave FBM noise for the particle/grain field
 *  - Starburst: radial rays via angle modulation
 *  - Volumetric "god rays": marched along radial direction
 *  - Bayer 4×4 ordered dither to keep the pixel-grid aesthetic
 *  - Mouse: moves the starburst focal point (with lerp lag)
 *  - Brand lime (#ccff00) bleeds in at the starburst core
 */
function VolumetricDitherField() {
  const matRef  = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const mouseTarget    = useRef(new THREE.Vector2(0.62, 0.55));
  const mouseCurrent   = useRef(new THREE.Vector2(0.62, 0.55));
  const strengthTarget  = useRef(0);
  const strengthCurrent = useRef(0);

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const uniforms = useMemo(
    () => ({
      uTime:          { value: 0 },
      uResolution:    { value: new THREE.Vector2(size.width, size.height) },
      uFocus:         { value: new THREE.Vector2(0.62, 0.55) }, // starburst centre
      uMouseStrength: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      );
      strengthTarget.current = 1;
    };
    const onLeave = () => { strengthTarget.current = 0; };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [reducedMotion]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const speed = reducedMotion ? 0.15 : 1.0;
    matRef.current.uniforms.uTime.value = clock.elapsedTime * speed;

    if (!reducedMotion) {
      // Starburst follows mouse with heavy lag — feels like a heavy light source
      mouseCurrent.current.lerp(mouseTarget.current, 0.028);
      strengthCurrent.current += (strengthTarget.current - strengthCurrent.current) * 0.035;
      matRef.current.uniforms.uFocus.value.copy(mouseCurrent.current);
      matRef.current.uniforms.uMouseStrength.value = strengthCurrent.current;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2  uResolution;
    uniform vec2  uFocus;
    uniform float uMouseStrength;

    // ── Bayer 4×4 ────────────────────────────────────────────────────────────
    float bayer4(vec2 p) {
      int x = int(mod(p.x, 4.0));
      int y = int(mod(p.y, 4.0));
      int idx = y * 4 + x;
      float m[16];
      m[0]= 0.0/16.0; m[1]= 8.0/16.0; m[2]= 2.0/16.0; m[3]=10.0/16.0;
      m[4]=12.0/16.0; m[5]= 4.0/16.0; m[6]=14.0/16.0; m[7]= 6.0/16.0;
      m[8]= 3.0/16.0; m[9]=11.0/16.0; m[10]=1.0/16.0; m[11]=9.0/16.0;
      m[12]=15.0/16.0;m[13]=7.0/16.0; m[14]=13.0/16.0;m[15]=5.0/16.0;
      return m[idx];
    }

    // ── Hash / noise ─────────────────────────────────────────────────────────
    float hash(vec2 p) {
      p = fract(p * vec2(127.1, 311.7));
      p += dot(p, p + 19.19);
      return fract(p.x * p.y);
    }
    float noise(vec2 p) {
      vec2 i = floor(p); vec2 f = fract(p);
      vec2 u = f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
                 mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
    }
    float fbm(vec2 p) {
      float v=0.0, a=0.5;
      mat2 rot=mat2(cos(0.5),-sin(0.5),sin(0.5),cos(0.5));
      for(int i=0;i<5;i++){v+=a*noise(p);p=rot*p*2.1;a*=0.48;}
      return v;
    }

    // ── Starburst rays ───────────────────────────────────────────────────────
    // Returns ray intensity at angle theta with numRays spikes
    float starRays(float theta, float numRays, float sharpness) {
      float r = abs(cos(theta * numRays * 0.5));
      return pow(r, sharpness);
    }

    // ── Volumetric "god ray" march ───────────────────────────────────────────
    // March from pixel toward focus, accumulate scattered light
    float godRay(vec2 uv, vec2 focus, float t) {
      vec2 dir = focus - uv;
      float acc = 0.0;
      const int STEPS = 12;
      for (int i = 0; i < STEPS; i++) {
        float fi = float(i) / float(STEPS);
        vec2 samplePos = uv + dir * fi * 0.85;
        // Turbulent noise along the ray
        float n = fbm(samplePos * 4.2 + vec2(t * 0.08, t * 0.06));
        float dist = length(samplePos - focus);
        acc += n * exp(-dist * 3.8) / float(STEPS);
      }
      return acc;
    }

    void main() {
      vec2 px  = floor(vUv * uResolution);
      vec2 uv  = vUv;

      // Aspect-correct UV centred on focus
      float ar = uResolution.x / uResolution.y;
      vec2 focusAR = vec2(uFocus.x, uFocus.y);
      vec2 uvAR    = vec2((uv.x - focusAR.x) * ar, uv.y - focusAR.y);
      float dist   = length(uvAR);
      float theta  = atan(uvAR.y, uvAR.x);

      // ── Particle / nebula field ──────────────────────────────────────────
      // Domain-warped FBM for the grainy cloud
      vec2 q = uv * 2.8 + vec2(uTime * 0.04, uTime * 0.03);
      vec2 warp = vec2(fbm(q), fbm(q + vec2(5.2, 1.3)));
      float cloud = fbm(q + 1.8 * warp);

      // Falloff from focus — brighter near the starburst
      float focusFalloff = exp(-dist * 2.2);
      cloud = cloud * 0.55 + cloud * focusFalloff * 0.65;

      // ── Starburst core ───────────────────────────────────────────────────
      // Inner bright core
      float core = exp(-dist * 14.0);

      // Primary rays (6 spikes, sharp)
      float rays6 = starRays(theta + uTime * 0.04, 6.0, 18.0)
                  * exp(-dist * 5.5)
                  * smoothstep(0.55, 0.0, dist);

      // Secondary rays (12 spikes, softer, counter-rotate)
      float rays12 = starRays(theta - uTime * 0.025, 12.0, 8.0)
                   * exp(-dist * 8.0)
                   * smoothstep(0.38, 0.0, dist);

      // ── God rays ─────────────────────────────────────────────────────────
      float gr = godRay(uv, uFocus, uTime) * 1.2;

      // ── Combine ──────────────────────────────────────────────────────────
      float brightness =
          cloud     * 0.38
        + core      * 1.10
        + rays6     * 0.85
        + rays12    * 0.42
        + gr        * 0.55;

      // Subtle slow pulse on the whole field
      brightness *= 0.88 + sin(uTime * 0.22) * 0.12;

      brightness = clamp(brightness, 0.0, 1.0);

      // ── Bayer ordered dither ─────────────────────────────────────────────
      float threshold = bayer4(px);
      float dithered  = step(threshold, brightness);

      // ── Scanlines ────────────────────────────────────────────────────────
      float scanline = mod(px.y, 2.0) < 1.0 ? 1.0 : 0.84;

      // ── Colour ───────────────────────────────────────────────────────────
      // Dark base, near-white at peaks — matches the reference monochrome
      vec3 dark  = vec3(0.008, 0.008, 0.012);
      vec3 light = vec3(0.92,  0.92,  0.95);   // near-white for the starburst
      vec3 col   = mix(dark, light, dithered * brightness) * scanline;

      // Mid-tones: softer grey for the cloud region
      vec3 mid = vec3(0.28, 0.28, 0.32);
      col = mix(col, mid * scanline, clamp(cloud * 0.6 * (1.0 - focusFalloff * 0.8), 0.0, 1.0) * dithered);

      // Brand lime — only at the very core of the starburst
      vec3 lime = vec3(0.800, 1.000, 0.000);
      float limeCore = core * 0.55 * dithered;
      col = mix(col, lime, clamp(limeCore, 0.0, 0.45));

      // ── Edge vignette ─────────────────────────────────────────────────────
      float vd = length(uv - 0.5) * 1.8;
      col *= mix(0.38, 1.0, 1.0 - smoothstep(0.18, 1.0, vd));

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  return (
    <mesh position={[0, 0, -3]}>
      <planeGeometry args={[16, 16]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroVisual() {
  return (
    <div className="absolute inset-0 [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full">
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
      >
        <color attach="background" args={['#000000']} />
        <VolumetricDitherField />
      </Canvas>
    </div>
  );
}
