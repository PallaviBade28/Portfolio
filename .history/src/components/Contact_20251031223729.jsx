import Section from './Section'
import { PROFILE } from '../data'
import { Mail, Linkedin, Phone } from 'lucide-react'

export default function Contact(){
  return (
    <Section id="contact" title="Contact">
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-medium">Let’s build something impactful.</p>
            <p className="text-sm text-zinc-400">I’m open to internships and projects.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${PROFILE.email}`} className="border border-white/20 rounded-xl px-4 py-2 inline-flex items-center gap-2 hover:bg-white/10"><Mail className="w-4 h-4"/> {PROFILE.email}</a>
            <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="border border-white/20 rounded-xl px-4 py-2 inline-flex items-center gap-2 hover:bg-white/10"><Linkedin className="w-4 h-4"/> LinkedIn</a>
            <a href={`tel:${PROFILE.phone.replace(/\s/g,'')}`} className="border border-white/20 rounded-xl px-4 py-2 inline-flex items-center gap-2 hover:bg-white/10"><Phone className="w-4 h-4"/> {PROFILE.phone}</a>
          </div>
        </div>
      </div>
    </Section>
  )
}
