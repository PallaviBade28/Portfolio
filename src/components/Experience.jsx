import Section from './Section';
import { EXPERIENCE, LEADERSHIP, ACHIEVEMENTS } from '../data';
import { Calendar, Award, Users, BookOpen } from 'lucide-react';

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-white/3 border border-white/6 p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#7b2ff7] to-[#22d3ee] flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="text-sm text-zinc-300">{label}</div>
        <div className="font-semibold text-zinc-100">{value}</div>
      </div>
    </div>
  );
}

function TimelineItem({ e, idx }) {
  const left = idx % 2 === 0;
  return (
    <div className={`mb-10 flex gap-6 ${left ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      <div className="md:w-1/2">
        <div className="rounded-2xl border border-white/8 bg-white/3 p-6 h-full">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold">{e.title}</h4>
              <div className="text-sm text-zinc-300">{e.org}</div>
            </div>
            <div className="text-sm text-zinc-400">{e.time}</div>
          </div>
          <ul className="mt-4 list-disc list-inside text-zinc-300 space-y-2">
            {e.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="md:w-1/2 flex items-center justify-center">
        {/* visual placeholder / image area */}
        <div className="w-full h-56 rounded-2xl border border-white/8 bg-gradient-to-br from-black/20 to-black/40 flex items-center justify-center">
          <div className="text-zinc-400">{e.visual || 'Work snapshot'}</div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const internships = EXPERIENCE.length;
  const research = EXPERIENCE.filter((x) => /research/i.test(x.title + ' ' + x.org)).length;
  const mentorships = LEADERSHIP.length;
  const achievements = ACHIEVEMENTS.length;

  return (
    <Section id="experience" title="Experience & Highlights">
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <StatCard icon={Calendar} label="Internships" value={internships} />
        <StatCard icon={BookOpen} label="Research & Projects" value={research || '—'} />
        <StatCard icon={Users} label="Leadership / Mentorships" value={mentorships} />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-100">Highlights</h3>
        <p className="text-sm text-zinc-300 mt-2">Selected achievements, internships, research and club leadership across my journey.</p>
        <div className="mt-4 grid md:grid-cols-3 gap-3">
          {ACHIEVEMENTS.slice(0, 6).map((a, i) => (
            <div key={i} className="rounded-xl border border-white/8 bg-white/3 p-3 text-sm text-zinc-200">{a}</div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {EXPERIENCE.map((e, idx) => (
          <TimelineItem key={idx} e={e} idx={idx} />
        ))}
      </div>
    </Section>
  );
}
