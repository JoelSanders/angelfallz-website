import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Model3DProps {
  url: string;
}

export default function Model3D({ url }: Model3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  // Slow rotation animation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} position={[0, -1.3, 0]} />
    </group>
  );
}

