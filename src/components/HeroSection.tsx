/**
 * HeroSection — Living Sunset Engine
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/context/LanguageContext'

type SunPhase = 'day' | 'golden' | 'night'

interface SunData {
  phase: SunPhase
  minutesToSunset: number | null
}

function getSunData(): SunData {
  const now = new Date()
  const pvHour = ((now.getUTCHours() - 6) + 24) % 24
  const pvMinutes = now.getUTCMinutes()
  const pvTimeDecimal = pvHour + pvMinutes / 60
  const sunsetHour = 19.0
  const goldenStart = sunsetHour - 1.5
  const nightStart = sunsetHour + 0.5

  let phase: SunPhase
  let minutesToSunset: number | null = null

  if (pvTimeDecimal >= goldenStart && pvTimeDecimal < nightStart) {
    phase = 'golden'
    minutesToSunset = Math.max(0, Math.round((sunsetHour - pvTimeDecimal) * 60))
  } else if (pvTimeDecimal >= nightStart || pvTimeDecimal < 5) {
    phase = 'night'
  } else {
    phase = 'day'
    if (pvTimeDecimal < sunsetHour) {
      minutesToSunset = Math.round((sunsetHour - pvTimeDecimal) * 60)
    }
  }

  return { phase, minutesToSunset }
}

const PHASE_CONFIG = {
  day: {
    bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    overlay: 'linear-gradient(180deg, rgba(10,22,40,0.5) 0%, rgba(10,22,40,0.2) 40%, rgba(10,22,40,0.7) 100%)',
    accentColor: '#38bdf8',
  },
  golden: {
    bg: 'https://images.unsplash.com/photo-1555246718-89f3da74553c?q=80&w=2070&auto=format&fit=crop',
    overlay: 'linear-gradient(180deg, rgba(10,22,40,0.4) 0%, rgba(120,53,15,0.15) 40%, rgba(10,22,40,0.8) 100%)',
    accentColor: '#c9a84c',
  },
  night: {
    bg: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    overlay: 'linear-gradient(180deg, rgba(10,22,40,0.6) 0%, rgba(10,22,40,0.35) 40%, rgba(10,22,40,0.9) 100%)',
    accentColor: '#8b5cf6',
  },
}

const PHASE_COPY = {
  day: {
    es: { eyebrow: 'Puerto Vallarta · Verificado', title: ['Verified', 'Vallarta™'], subtitle: 'El directorio de lujo verificado.\nSolo lugares reales.', cta1: 'Ver Directorio', cta2: 'Tracker de Atardecer' },
    en: { eyebrow: 'Puerto Vallarta · Verified', title: ['Verified', 'Vallarta™'], subtitle: 'The verified luxury directory.\nReal places only.', cta1: 'Browse Directory', cta2: 'Sunset Tracker' },
  },
  golden: {
    es: { eyebrow: '🌅 La Hora Mágica · Ahora', title: ['Atardecer', 'en'], subtitle: 'Los mejores spots para la puesta de sol.\nSube tu foto. Gana premios.', cta1: 'Ver Spots', cta2: 'Subir Mi Foto' },
    en: { eyebrow: '🌅 Golden Hour · Now', title: ['Sunset', 'in'], subtitle: 'The best sunset spots in Vallarta.\nUpload your photo. Win prizes.', cta1: 'See Spots', cta2: 'Upload Photo' },
  },
  night: {
    es: { eyebrow: 'Esta Noche · Vallarta', title: ['La Noche', 'Te Espera'], subtitle: 'Rooftops, restaurantes y experiencias.\nTodo verificado por nuestro equipo.', cta1: 'Ver Negocios Nocturnos', cta2: 'Mapa Interactivo' },
    en: { eyebrow: 'Tonight · Vallarta', title: ['Nightlife', 'Awaits'], subtitle: 'Rooftops, restaurants, and experiences.\nAll personally verified.', cta1: 'See Nightlife', cta2: 'Interactive Map' },
  },
}

export default function HeroSection() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const [sunData, setSunData] = useState<SunData>(getSunData())

  useEffect(() => {
    const id = setInterval(() => setSunData(getSunData()), 60000)
    return () => clearInterval(id)
  }, [])

  const { phase } = sunData
  const config = PHASE_CONFIG[phase]
  const copy = PHASE_COPY[phase][lang]

  const scrollToTours = () => {
    document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10" style={{ background: config.overlay }} />
        <img
          src={config.bg}
          alt="Puerto Vallarta sunset"
          className="object-cover w-full h-full"
          loading="eager"
        />
      </div>

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: 'rgba(10,22,40,0.7)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${config.accentColor}40`,
            color: config.accentColor,
            letterSpacing: '0.2em',
            fontSize: '9px',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: config.accentColor }} />
          {copy.eyebrow}
        </div>

        <h1
          className="text-5xl md:text-7xl font-semibold mb-6"
          style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}
        >
          {copy.title[0]}<br />{copy.title[1]}
        </h1>

        <p className="text-base md:text-lg mb-10 whitespace-pre-line" style={{ color: 'rgba(245,240,232,0.7)' }}>
          {copy.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-ocean-600 hover:bg-ocean-700 text-white rounded-xl px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            onClick={scrollToTours}
          >
            {copy.cta1}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg backdrop-blur-sm"
            onClick={() => navigate("/sunsets")}
          >
            {copy.cta2}
          </Button>
        </div>

        <div className="mt-10 flex items-center gap-3 justify-center">
          <div className="h-px w-12 opacity-30" style={{ background: '#c9a84c' }} />
          <span style={{ color: 'rgba(201,168,76,0.7)', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
            Solo lugares verificados
          </span>
          <div className="h-px w-12 opacity-30" style={{ background: '#c9a84c' }} />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-6 pb-4 flex-wrap mt-8">
        <div className="flex items-center gap-1.5 text-white/80 text-sm">
          <svg className="w-4 h-4 fill-sand-400 text-sand-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <span>4.9 avg rating</span>
        </div>
        <span className="text-white/40 hidden sm:inline">·</span>
        <span className="text-white/80 text-sm">2,400+ experiences booked</span>
        <span className="text-white/40 hidden sm:inline">·</span>
        <span className="text-white/80 text-sm">Local guides since 2019</span>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        onClick={() => document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown className="w-8 h-8 text-vv-cream" />
      </div>
    </section>
  )
}
