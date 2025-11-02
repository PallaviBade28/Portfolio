import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Mail, Code2, ExternalLink } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="relative h-[90vh] md:h-screen flex items-center justify-center text-center">
      {/* 3D Canvas */}
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

      {/* Text + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        className="relative z-10 max-w-4xl px-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-[#7b2ff7] via-[#f472b6] to-[#22d3ee] bg-clip-text text-transparent">
            Pallavi Raosaheb Bade
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-zinc-300">AI/ML Engineer · Full-Stack · Cloud</p>
        <p className="mt-2 text-zinc-400">I build intelligent systems and cinematic web experiences.</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:112215037@cse.iiitp.ac.in" className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#7b2ff7] to-[#22d3ee] hover:scale-105 transition inline-flex items-center gap-2">
            <Mail className="w-4 h-4" /> Contact
          </a>
          <a href="https://leetcode.com/u/pallavibade28/" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/10 inline-flex items-center gap-2">
            <Code2 className="w-4 h-4" /> LeetCode
          </a>
          <a href="https://www.codechef.com/users/pallavibade28" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/10 inline-flex items-center gap-2">
            <ExternalLink className="w-4 h-4" /> CodeChef
          </a>
        </div>
      </motion.div>
    </section>
  )
}
