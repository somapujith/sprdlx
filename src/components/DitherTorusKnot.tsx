import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 lightDir;
  uniform float pixelSize;

  varying vec3 vNormal;
  varying vec3 vPosition;

  float bayer4x4(vec2 coord) {
    int x = int(mod(coord.x, 4.0));
    int y = int(mod(coord.y, 4.0));

    int index = x + y * 4;

    // 4x4 Bayer matrix values (normalized 0..1)
    float m[16];
    m[0]  =  0.0 / 16.0;  m[1]  =  8.0 / 16.0;  m[2]  =  2.0 / 16.0;  m[3]  = 10.0 / 16.0;
    m[4]  = 12.0 / 16.0;  m[5]  =  4.0 / 16.0;  m[6]  = 14.0 / 16.0;  m[7]  =  6.0 / 16.0;
    m[8]  =  3.0 / 16.0;  m[9]  = 11.0 / 16.0;  m[10] =  1.0 / 16.0;  m[11] =  9.0 / 16.0;
    m[12] = 15.0 / 16.0;  m[13] =  7.0 / 16.0;  m[14] = 13.0 / 16.0;  m[15] =  5.0 / 16.0;

    for (int i = 0; i < 16; i++) {
      if (i == index) return m[i];
    }
    return 0.0;
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 light = normalize(lightDir);

    float diffuse = dot(normal, light);
    float intensity = diffuse * 0.5 + 0.5; // remap to 0..1

    vec2 ditherCoord = floor(gl_FragCoord.xy / pixelSize);
    float threshold = bayer4x4(ditherCoord);

    vec3 col = intensity > threshold ? color1 : color2;
    gl_FragColor = vec4(col, 1.0);
  }
`;

type DitherVariant = 'torusKnot' | 'sphere' | 'icosahedron' | 'octahedron' | 'torus';

function ShapeGeometry({ variant }: { variant: DitherVariant }) {
  switch (variant) {
    case 'sphere':
      return <sphereGeometry args={[1.12, 48, 48]} />;
    case 'icosahedron':
      return <icosahedronGeometry args={[1.25, 2]} />;
    case 'octahedron':
      return <octahedronGeometry args={[1.3, 1]} />;
    case 'torus':
      return <torusGeometry args={[1.05, 0.3, 32, 96]} />;
    case 'torusKnot':
    default:
      return <torusKnotGeometry args={[1, 0.35, 128, 32]} />;
  }
}

function DitherKnotMesh({
  color1,
  color2,
  pixelSize,
  lightDir,
  knotScale,
  variant,
}: {
  color1: string;
  color2: string;
  pixelSize: number;
  lightDir: [number, number, number];
  knotScale: number;
  variant: DitherVariant;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
      lightDir: { value: new THREE.Vector3(...lightDir).normalize() },
      pixelSize: { value: pixelSize },
    }),
    [color1, color2, lightDir, pixelSize]
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.18;
      meshRef.current.rotation.y += delta * 0.24;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = meshRef.current?.rotation.x ?? 0;
      wireRef.current.rotation.y = meshRef.current?.rotation.y ?? 0;
    }
  });

  return (
    <group scale={knotScale}>
      <mesh ref={meshRef}>
        <ShapeGeometry variant={variant} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <mesh ref={wireRef} scale={1.05}>
        <ShapeGeometry variant={variant} />
        <meshBasicMaterial
          color={color1}
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

interface DitherTorusKnotProps {
  className?: string;
  color1?: string;
  color2?: string;
  pixelSize?: number;
  lightDir?: [number, number, number];
  cameraZ?: number;
  knotScale?: number;
  variant?: DitherVariant;
}

export default function DitherTorusKnot({
  className = '',
  color1 = '#ffffff',
  color2 = '#000000',
  pixelSize = 3,
  lightDir = [1, 1, 1],
  cameraZ = 5,
  knotScale = 0.84,
  variant = 'torusKnot',
}: DitherTorusKnotProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={`bg-transparent ${className}`}>
      {visible && (
        <Canvas
          camera={{ position: [0, 0, cameraZ], fov: 44 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
          frameloop="always"
        >
          <ambientLight intensity={0.15} />
          <DitherKnotMesh
            color1={color1}
            color2={color2}
            pixelSize={pixelSize}
            lightDir={lightDir}
            knotScale={knotScale}
            variant={variant}
          />
        </Canvas>
      )}
    </div>
  );
}
