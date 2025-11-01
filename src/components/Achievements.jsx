import Section from './Section';
import { ACHIEVEMENTS } from '../data';

export default function Achievements() {
  return (
    <Section id="achievements" title="Achievements">
      <div className="grid md:grid-cols-2 gap-6">
        {ACHIEVEMENTS.map((a, i) => (
          <div
            key={i}
            className={`rounded-3xl border p-6 backdrop-blur bg-white/5 ${
              a.includes('NTSE')
                ? 'border-yellow-400/60 shadow-[0_0_30px_rgba(250,204,21,0.25)]'
                : 'border-white/10'
            }`}
          >
            <p className="text-zinc-200">{a}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
