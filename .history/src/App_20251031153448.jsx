import { useEffect } from 'react'
import { Github, Linkedin, Mail, Code2, FileDown, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Leadership from './components/Leadership'
import Contact from './components/Contact'
import BackgroundFX from './components/BackgroundFX'
import { PROFILE } from './data'

export default function App() {
  useEffect(() => { document.documentElement.classList.add('dark') }, [])

  return (
    <div className="font-sans relative min-h-screen overflow-x-hidden">
      {/* Site-wide video + particles (Choice B) */}
      <BackgroundFX />

      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur border-b border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-semibold tracking-tight">Pallavi Bade</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {[
              ['About','about'],['Experience','experience'],['Projects','projects'],['Skills','skills'],['Achievements','achievements'],['Leadership','leadership'],['Contact','contact']
            ].map(([label,id]) => <a key={id} href={`#${id}`} className="hover:text-glow2">{label}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <a href={PROFILE.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github className="w-5 h-5"/></a>
            <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="w-5 h-5"/></a>
            <a href={PROFILE.links.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode"><Code2 className="w-5 h-5"/></a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Hero />

      {/* Content sections */}
      <main className="relative z-10">
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Leadership />
        <Contact />

        <footer className="py-10 text-center text-sm text-zinc-400">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4"/> {PROFILE.location}
          </div>
          <div className="mt-2">© {new Date().getFullYear()} {PROFILE.name} • Built with React, Tailwind & R3F</div>
        </footer>
      </main>
    </div>
  )
}
