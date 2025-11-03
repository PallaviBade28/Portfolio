import Section from './Section';
import { PROJECTS } from '../data';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ProjectPanel({ p }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-2xl md:text-3xl font-semibold">{p.name}</h3>
        <p className="mt-3 text-sm text-zinc-300">{p.desc}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s, i) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded-full border border-white/15 bg-black/20">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <a href={p.link || '#'} target={p.link ? '_blank' : '_self'} rel="noreferrer" className="text-sm text-zinc-300">
          {p.link ? 'View project' : 'No external link'}
        </a>
        <div className="flex items-center gap-3">
          <button aria-label="prev" className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center opacity-90">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button aria-label="next" className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center opacity-90">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [index, setIndex] = useState(0);
  const count = PROJECTS.length;

  useEffect(() => {
    // keyboard navigation
    function onKey(e) {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % count);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count]);

  function prev() {
    setIndex((i) => (i - 1 + count) % count);
  }
  function next() {
    setIndex((i) => (i + 1) % count);
  }

  return (
    <Section id="projects" title="Projects">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Left: project text panel */}
        <div className="h-[520px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={PROJECTS[index].name}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="h-full"
            >
              <div className="relative h-full">
                <ProjectPanel p={PROJECTS[index]} />

                {/* custom arrows overlay (desktop) */}
                <div className="absolute right-4 bottom-6 flex items-center gap-3 md:hidden">
                  {/* hidden on md because ProjectPanel contains buttons; keep for small screens */}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: visual preview */}
        <div className="h-[520px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 flex items-center justify-center overflow-hidden relative">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={PROJECTS[index].name + '-preview'}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="w-full h-full flex items-center justify-center"
            >
              {PROJECTS[index].image ? (
                <img src={PROJECTS[index].image} alt={PROJECTS[index].name} className="object-contain w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400"> 
                  {/* fallback stylized placeholder */}
                  <div className="w-3/4 h-3/4 bg-gradient-to-br from-black/30 to-black/40 rounded-xl shadow-inner flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-semibold">{PROJECTS[index].name}</div>
                      <div className="mt-3 text-sm text-zinc-400">Preview not provided</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* navigation arrows (desktop) */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <button onClick={prev} aria-label="previous project" className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button onClick={next} aria-label="next project" className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* small pager dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/20'}`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </Section>
  );
}
