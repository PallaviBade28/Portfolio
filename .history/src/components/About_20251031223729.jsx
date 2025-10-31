import Section from './Section'
import { PROFILE } from '../data'

export default function About(){
  return (
    <Section id="about" title="About">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
          <p className="text-zinc-300">
            Final‑year CSE at IIIT Pune. I design agentic AI systems, efficient backends, and cinematic UIs. I love taking ideas from sketch to deploy with measurable impact.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PROFILE.facts.map((f) => (
            <div key={f.k} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-xs text-zinc-400">{f.k}</p>
              <p className="font-semibold text-zinc-100">{f.v}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
