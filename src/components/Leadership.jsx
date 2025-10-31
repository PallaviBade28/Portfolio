import Section from './Section'
import { LEADERSHIP } from '../data'

export default function Leadership(){
  return (
    <Section id="leadership" title="Leadership & PORs">
      <div className="grid md:grid-cols-3 gap-6">
        {LEADERSHIP.map((l,i)=>(
          <div key={i} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
            <h3 className="font-semibold">{l.role}</h3>
            <p className="text-sm text-zinc-300">{l.org}</p>
            <p className="mt-2 text-sm text-zinc-400">{l.note}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
