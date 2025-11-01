import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Html, useGLTF, useProgress, OrbitControls } from '@react-three/drei';

function ModelContent({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.2} position={[0, -0.5, 0]} />;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="w-36 p-3 rounded-xl bg-black/60 backdrop-blur text-center text-sm">
        <div className="h-2 bg-white/10 rounded overflow-hidden mb-2">
          <div
            className="h-2 bg-gradient-to-r from-glow1 to-glow2"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-zinc-300">Loading 3D — {Math.round(progress)}%</div>
      </div>
    </Html>
  );
}

export default function HeroModel({ path = '/models/hero-model.glb' }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.6} />
      <pointLight color="#8b5cf6" intensity={0.6} position={[-5, 5, 5]} />
      <pointLight color="#22d3ee" intensity={0.4} position={[5, -5, 5]} />
      <Suspense fallback={<Loader />}>
        <ModelContent url={path} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Suspense>
    </Canvas>
  );
}
