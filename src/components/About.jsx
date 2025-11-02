import Section from './Section';
import { PROFILE, SKILLS } from '../data';

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: richer descriptive copy + bullets */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
          <h3 className="text-lg font-semibold text-zinc-100">About {PROFILE.name.split(' ')[0]}</h3>
          <p className="mt-3 text-zinc-300">
            {PROFILE.role} based in {PROFILE.location}. I focus on building production-grade
            systems that combine machine learning, robust backends, and delightful front-ends.
            My work sits at the intersection of applied ML, scalable cloud services, and
            polished UX.
          </p>

          <ul className="mt-4 space-y-2 text-zinc-300 list-disc list-inside">
            <li>
              Ship end-to-end ML products: data pipelines, model training, evaluation, and
              production deployment (Vertex AI / Cloud Run / Docker).
            </li>
            <li>
              Build REST APIs and realtime services with a strong focus on reliability and
              observability (FastAPI, GCP, Docker).
            </li>
            <li>
              Craft responsive, accessible UIs with React and lightweight animations for a
              cinematic experience without sacrificing performance.
            </li>
            <li>
              Mentor and lead small teams; translate product requirements into measurable
              technical milestones.
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-4">
            <a
              href={PROFILE.links.resume}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7b2ff7] to-[#22d3ee] inline-flex items-center gap-3"
            >
              Resume
            </a>
            <a href={`mailto:${PROFILE.email}`} className="text-sm text-zinc-400">
              {PROFILE.email}
            </a>
          </div>
        </div>

        {/* Right: quick facts + skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PROFILE.facts.map((f) => (
            <div key={f.k} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-xs text-zinc-400">{f.k}</p>
              <p className="font-semibold text-zinc-100">{f.v}</p>
            </div>
          ))}

          {/* Skills preview (spanning full width) */}
          <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-zinc-400">Core Skills</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {SKILLS.languages.slice(0, 4).map((s) => (
                <span key={s} className="text-zinc-100">{s}</span>
              ))}
              {SKILLS.frameworks.slice(0, 4).map((s) => (
                <span key={s} className="text-zinc-100">{s}</span>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-400">Tools & Cloud</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SKILLS.cloud.concat(SKILLS.tools).slice(0, 5).map((t) => (
                <span key={t} className="px-3 py-1 rounded bg-white/3 text-xs text-zinc-100">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
