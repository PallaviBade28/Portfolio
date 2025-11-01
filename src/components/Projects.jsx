import Section from './Section';
import { PROJECTS } from '../data';

function Card({ p }) {
  return (
    <a
      href={p.link || '#'}
      target={p.link ? '_blank' : '_self'}
      rel="noreferrer"
      className="group block rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 transition hover:shadow-glow"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg md:text-xl font-semibold">{p.name}</h3>
      </div>
      <p className="mt-2 text-sm text-zinc-300">{p.desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {p.stack.map((s, i) => (
          <span
            key={i}
            className="text-xs px-2.5 py-1 rounded-full border border-white/15 bg-black/20"
          >
            {s}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <Card key={i} p={p} />
        ))}
      </div>
    </Section>
  );
}
