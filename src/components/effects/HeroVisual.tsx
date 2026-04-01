import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/** Full-bleed dither-wave shader behind the orb */
function DitherWavePlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

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
    void main() {
      vec2 uv = vUv;
      float w = sin(uv.x * 22.0 + uTime * 0.55) * sin(uv.y * 19.0 - uTime * 0.42) * 0.5 + 0.5;
      float n = length(uv - 0.5) * 1.15;
      float g = w * 0.22 + n * 0.18 + 0.04;
      float d = step(0.5, fract(g * 8.0 + sin(uTime * 0.2)));
      vec3 col = mix(vec3(0.015, 0.015, 0.02), vec3(0.11, 0.11, 0.14), d);
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

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

function AgentOrbMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.22;
  });
  return (
    <mesh ref={ref} position={[0, 0.1, 0]} scale={1.65}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#b8bcc8"
        metalness={0.55}
        roughness={0.28}
        distort={0.45}
        speed={2.2}
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
        <ambientLight intensity={0.35} />
        <pointLight position={[6, 8, 8]} intensity={1.1} />
        <pointLight position={[-5, -4, 4]} intensity={0.35} color="#4466aa" />
        <DitherWavePlane />
        <AgentOrbMesh />
      </Canvas>
    </div>
  );
}
