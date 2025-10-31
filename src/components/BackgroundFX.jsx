import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

export default function BackgroundFX(){
  const init = async (main) => { await loadFull(main) }
  return (
    <div className="fixed inset-0 -z-10">
      {/* Site-wide looping background video */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
        <source src="/cinematic-bg.mp4" type="video/mp4" />
      </video>

      {/* Subtle grid + vignette overlay */}
      <div className="absolute inset-0 bg-grid bg-[size:24px_24px] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      {/* Particles */}
      <Particles
        id="tsparticles"
        init={init}
        options={{
          background: { color: 'transparent' },
          fpsLimit: 60,
          particles: {
            number: { value: 45, density: { enable: true, area: 800 } },
            color: { value: ['#8b5cf6','#22d3ee','#f472b6'] },
            links: { enable: true, color: '#8b5cf6', opacity: 0.25, width: 1 },
            move: { enable: true, speed: 0.6 },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />
    </div>
  )
}
