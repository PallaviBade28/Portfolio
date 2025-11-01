import Section from './Section';
import { SKILLS } from '../data';

function Chips({ label, items }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
      <h4 className="font-semibold mb-3">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <span
            key={s}
            className="text-xs px-2.5 py-1 rounded-full border border-white/15 bg-black/20"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid md:grid-cols-2 gap-6">
        <Chips label="Languages" items={SKILLS.languages} />
        <Chips label="Frameworks & Libraries" items={SKILLS.frameworks} />
        <Chips label="Cloud & DevOps" items={SKILLS.cloud} />
        <Chips label="Databases" items={SKILLS.db} />
        <Chips label="Concepts & Tools" items={[...SKILLS.concepts, ...SKILLS.tools]} />
      </div>
    </Section>
  );
}
