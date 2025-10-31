import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function Torus() {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.2
  })
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.2, 0.28, 128, 32]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#22d3ee"
        emissiveIntensity={0.4}
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  )
}

export default function Orb(){
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.6} />
      <pointLight color="#8b5cf6" intensity={0.6} position={[-5, 5, 5]} />
      <pointLight color="#22d3ee" intensity={0.4} position={[5, -5, 5]} />
      <Torus />
    </Canvas>
  )
}
