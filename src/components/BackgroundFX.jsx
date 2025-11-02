import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

export default function BackgroundFX() {
  const init = async (main) => {
    try {
      await loadFull(main)
    } catch (err) {
      // don't let particle loader break the whole app
      // eslint-disable-next-line no-console
      console.warn('tsparticles loadFull failed:', err)
    }
  }

  return (
    <div className="fixed inset-0 -z-10">
      {/* Fallback gradient (always visible) */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-20%,#2dd4bf22,transparent_60%),radial-gradient(1000px_500px_at_90%_0%,#7b2ff722,transparent_60%),linear-gradient(180deg,#050507,#0a0b12)]" />

      {/* Video (optional). Hidden if it errors. */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      >
        <source src="/cinematic-bg.mp4" type="video/mp4" />
      </video>

      {/* Particles */}
      <Particles
        id="tsparticles"
        init={init}
        options={{
          background: { color: 'transparent' },
          fpsLimit: 60,
          particles: {
            number: { value: 45, density: { enable: true, area: 800 } },
            color: { value: ['#7b2ff7', '#22d3ee', '#f472b6'] },
            links: { enable: true, color: '#7b2ff7', opacity: 0.25, width: 1 },
            move: { enable: true, speed: 0.6 },
            opacity: { value: 0.45 },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />
    </div>
  )
}
