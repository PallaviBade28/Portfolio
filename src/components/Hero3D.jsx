import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'

export default function Hero3D() {
  return (
    <Canvas className="absolute inset-0" camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.7} />
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1}>
        <mesh>
          <torusKnotGeometry args={[1, 0.33, 256, 32]} />
          <meshStandardMaterial
            metalness={0.9}
            roughness={0.15}
            color="#7b2ff7"
            emissive="#22d3ee"
            emissiveIntensity={0.35}
          />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.7} />
    </Canvas>
  )
}
