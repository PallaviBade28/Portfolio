import Section from './Section'
import { PROFILE } from '../data'
import { Mail, Linkedin } from 'lucide-react'

export default function Testimonials({ items = [] }) {
  const has = items && items.length > 0

  return (
    <Section id="testimonials" title="Testimonials">
      <div className="grid gap-6">
        {has ? (
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((t, i) => (
              <blockquote key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-zinc-300">{t.text}</p>
                <footer className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-zinc-100">{t.name}</div>
                    <div className="text-xs text-zinc-400">{t.role}</div>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-400">{t.stars || '★★★★★'}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <h4 className="text-xl font-semibold text-zinc-100">No testimonials yet</h4>
            <p className="mt-3 text-zinc-300">You don't have any testimonials yet — people notice your work. Here are a couple of quick ways to collect them:</p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#7b2ff7] to-[#22d3ee]"
                href={`mailto:${PROFILE.email}?subject=Testimonial%20for%20${encodeURIComponent(PROFILE.name)}`}
              >
                <Mail className="w-4 h-4" /> Request by email
              </a>

              {PROFILE.links && PROFILE.links.linkedin ? (
                <a
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10"
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className="w-4 h-4" /> Ask for a LinkedIn recommendation
                </a>
              ) : null}
            </div>

            <p className="mt-4 text-sm text-zinc-400">You can also paste quotes here later — this area will display them in a clean card layout.</p>
          </div>
        )}
      </div>
    </Section>
  )
}
