import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import Model3D from './Model3D';

interface ModelViewerProps {
  isDark: boolean;
}

export default function ModelViewer({ isDark }: ModelViewerProps) {
  return (
    <div className="w-full h-full absolute inset-0 z-10 pointer-events-none">
      <Canvas className="pointer-events-auto">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={isDark ? 1.2 : 1.5} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 1.5 : 2.0} />
        <directionalLight position={[-10, -10, -5]} intensity={isDark ? 0.8 : 1.0} />
        <directionalLight position={[0, 10, 10]} intensity={isDark ? 1.0 : 1.3} />
        <spotLight position={[0, 10, 0]} intensity={isDark ? 1.2 : 1.5} angle={0.5} penumbra={1} />
        <pointLight position={[0, 0, 5]} intensity={isDark ? 0.8 : 1.0} />
        <Suspense fallback={null}>
  resource://starter_assets/terrazzo_composite/terrazzo_composite?version=a67cfabd97f612a8e9328302f875f3a904d7d765.sbsar        <Model3D url="/AF Talisman.glb" />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

