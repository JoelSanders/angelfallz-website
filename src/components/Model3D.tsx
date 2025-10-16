import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Model3DProps {
  url: string;
  isMobile?: boolean;
}

export default function Model3D({ url, isMobile = false }: Model3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  // Adjust scale and position based on mobile
  const scale = isMobile ? 1.2 : 1.5;
  const yPosition = isMobile ? -1.2 : -1.4;

  // Slow rotation animation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={scale} position={[0, yPosition, 0]} />
    </group>
  );
}

