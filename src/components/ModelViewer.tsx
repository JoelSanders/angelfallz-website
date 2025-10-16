import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import Model3D from './Model3D';

interface ModelViewerProps {
  isDark: boolean;
}

export default function ModelViewer({ isDark }: ModelViewerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-10 pointer-events-none touch-none">
      <Canvas 
        className="pointer-events-none touch-none"
        style={{ pointerEvents: 'none' }}
      >
        <PerspectiveCamera 
          makeDefault 
          position={isMobile ? [0, 0, 7] : [0, 0, 5]} 
        />
        <ambientLight intensity={isDark ? 1.2 : 1.5} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 1.5 : 2.0} />
        <directionalLight position={[-10, -10, -5]} intensity={isDark ? 0.8 : 1.0} />
        <directionalLight position={[0, 10, 10]} intensity={isDark ? 1.0 : 1.3} />
        <spotLight position={[0, 10, 0]} intensity={isDark ? 1.2 : 1.5} angle={0.5} penumbra={1} />
        <pointLight position={[0, 0, 5]} intensity={isDark ? 0.8 : 1.0} />
        <Suspense fallback={null}>
          <Model3D url="/AF Talisman.glb" isMobile={isMobile} />
        </Suspense>
        <OrbitControls 
          enabled={false}
          enableZoom={false} 
          enablePan={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

