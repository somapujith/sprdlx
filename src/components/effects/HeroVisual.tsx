import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Full-bleed dither-wave shader.
 * Mouse interaction: cursor position warps the wave origin and boosts the lime accent.
 * Respects prefers-reduced-motion — mouse influence is disabled when set.
 */
function DitherWavePlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  // Lerp targets — updated from the parent mouse listener
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseCurrent = useRef(new THREE.Vector2(0.5, 0.5));
  const strengthTarget = useRef(0);
  const strengthCurrent = useRef(0);

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseStrength: { value: 0 },
    }),
    []
  );

  // Listen to mouse moves on the canvas container (pointer events bubble up)
  useEffect(() => {
    if (reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      mouseTarget.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      );
      strengthTarget.current = 1;
    };
    const onLeave = () => {
      strengthTarget.current = 0;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [reducedMotion, size]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;

    matRef.current.uniforms.uTime.value = clock.elapsedTime;

    if (!reducedMotion) {
      // Smooth lerp toward target — 0.055 = gentle lag
      mouseCurrent.current.lerp(mouseTarget.current, 0.055);
      strengthCurrent.current +=
        (strengthTarget.current - strengthCurrent.current) * 0.04;

      matRef.current.uniforms.uMouse.value.copy(mouseCurrent.current);
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

  // #ccff00 → vec3(0.800, 1.000, 0.000)
  const fragmentShader = `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2  uMouse;
    uniform float uMouseStrength;

    void main() {
      vec2 uv = vUv;

      // Mouse-offset wave origin — cursor pulls the pattern toward it
      vec2 warpedUv = uv + (uMouse - 0.5) * uMouseStrength * 0.12;

      // Animated dither wave
      float w = sin(warpedUv.x * 22.0 + uTime * 0.55)
              * sin(warpedUv.y * 19.0 - uTime * 0.42)
              * 0.5 + 0.5;

      // Distance from mouse cursor — used for local ripple + lime boost
      float mouseDist  = length(uv - uMouse);
      float mouseRipple = exp(-mouseDist * 5.5) * uMouseStrength;

      // Add a secondary ripple ring around the cursor
      float ring = sin(mouseDist * 38.0 - uTime * 3.2) * 0.5 + 0.5;
      float ringMask = smoothstep(0.28, 0.0, mouseDist) * uMouseStrength;
      w = mix(w, ring, ringMask * 0.35);

      float n = length(uv - 0.5) * 1.15;
      float g = w * 0.22 + n * 0.18 + 0.04;
      float d = step(0.5, fract(g * 8.0 + sin(uTime * 0.2)));

      // Base dark dither palette
      vec3 dark  = vec3(0.012, 0.012, 0.016);
      vec3 light = vec3(0.10,  0.10,  0.12);
      vec3 col   = mix(dark, light, d);

      // Brand-lime tint — stronger near cursor
      vec3 lime = vec3(0.800, 1.000, 0.000);
      float limeBase   = d * 0.09;
      float limeCursor = mouseRipple * 0.38 * d;
      col = mix(col, lime, limeBase + limeCursor);

      // Radial vignette — darker toward edges, calm center for headline
      float dist     = length(uv - 0.5) * 1.6;
      float vignette = 1.0 - smoothstep(0.35, 1.0, dist);
      col *= mix(0.62, 1.0, vignette);

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
        <DitherWavePlane />
      </Canvas>
    </div>
  );
}
