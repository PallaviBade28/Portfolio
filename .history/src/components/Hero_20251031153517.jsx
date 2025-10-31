import { motion } from 'framer-motion'
import { PROFILE } from '../data'
import { Mail, FileDown, Code2 } from 'lucide-react'

export default function Hero(){
  return (
    <section id="hero" className="relative h-[90vh] md:h-screen flex items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-10 max-w-4xl mx-auto px-6"
      >
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-glow1 via-glow3 to-glow2 bg-clip-text text-transparent">{PROFILE.name}</span>
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-zinc-300">{PROFILE.role}</p>
        <p className="mt-3 text-zinc-400">{PROFILE.tagline}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={`mailto:${PROFILE.email}`} className="px-5 py-3 rounded-2xl bg-gradient-to-r from-glow1 to-glow2 hover:scale-105 transition inline-flex items-center gap-2 shadow-glow">
            <Mail className="w-4 h-4"/> Contact
          </a>
          <a href={PROFILE.links.resume} className="px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition inline-flex items-center gap-2">
            <FileDown className="w-4 h-4"/> Resume
          </a>
          <a href={PROFILE.links.leetcode} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition inline-flex items-center gap-2">
            <Code2 className="w-4 h-4"/> LeetCode
          </a>
        </div>
      </motion.div>
    </section>
  )
}
