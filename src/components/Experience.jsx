import Section from './Section';
import { EXPERIENCE } from '../data';

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="relative border-l border-white/10 ml-3 pl-6">
        {EXPERIENCE.map((e, idx) => (
          <div key={idx} className="mb-10">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-glow1 to-glow2 relative -left-[1.72rem] top-3" />
            <h3 className="text-xl font-semibold">
              {e.title} — <span className="text-zinc-300">{e.org}</span>
            </h3>
            <p className="text-sm text-zinc-400">{e.time}</p>
            <ul className="mt-3 space-y-1 text-zinc-300 list-disc pl-4">
              {e.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
