/**
 * HeroSection — Living Sunset Engine
 *
 * Three phases based on real Puerto Vallarta time:
 *   DAY:    Ocean blues. "Explore today's best."
 *   GOLDEN: Warm amber. Countdown live. "The magic hour is NOW."
 *   NIGHT:  Deep navy. Gold accents. "Discover Vallarta tonight."
 *
 * PV coordinates: 20.6534°N, 105.2253°W (UTC-6)
 * Phase transitions: CSS transitions
 *
 * UDEC target: 9.0/10
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
  // Convert to PV local time (CST = UTC-6)
  const pvHour = ((now.getUTCHours() - 6) + 24) % 24
  const pvMinutes = now.getUTCMinutes()
  const pvTimeDecimal = pvHour + pvMinutes / 60

  // PV sunset ≈ 19:00 (7 PM) CST
  const sunsetHour = 19.0
  const goldenStart = sunsetHour - 1.5   // 5:30 PM
  const nightStart = sunsetHour + 0.5    // 7:30 PM

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

function formatCountdown(minutes: number): string {
  if (minutes <= 0) return '00:00'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}m`
  return `${m.toString().padStart(2, '0')} min`
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
    es: {
      eyebrow: 'Puerto Vallarta · Verificado',
      title: ['Verified', 'Vallarta™'],
      subtitle: 'El directorio de lujo verificado.\nSolo lugares reales.',
      cta1: 'Ver Directorio',
      cta2: 'Tracker de Atardecer',
    },
    en: {
      eyebrow: 'Puerto Vallarta · Verified',
      title: ['Verified', 'Vallarta™'],
      subtitle: 'The verified luxury directory.\nReal places only.',
      cta1: 'Browse Directory',
      cta2: 'Sunset Tracker',
    },
  },
  golden: {
    es: {
      eyebrow: '🌅 La Hora Mágica · Ahora',
      title: ['Atardecer', 'en'],
      subtitle: 'Los mejores spots para la puesta de sol.\nSube tu foto. Gana premios.',
      cta1: 'Ver Spots',
      cta2: 'Subir Mi Foto',
    },
    en: {
      eyebrow: '🌅 Golden Hour · Now',
      title: ['Sunset', 'in'],
      subtitle: 'The best sunset spots in Vallarta.\nUpload your photo. Win prizes.',
      cta1: 'See Spots',
      cta2: 'Upload Photo',
    },
  },
  night: {
    es: {
      eyebrow: 'Esta Noche · Vallarta',
      title: ['La Noche', 'Te Espera'],
      subtitle: 'Rooftops, restaurantes y experiencias.\nTodo verificado por nuestro equipo.',
      cta1: 'Ver Negocios Nocturnos',
      cta2: 'Mapa Interactivo',
    },
    en: {
      eyebrow: 'Tonight · Vallarta',
      title: ['Nightlife', 'Awaits'],
      subtitle: 'Rooftops, restaurants, and experiences.\nAll personally verified.',
      cta1: 'See Nightlife',
      cta2: 'Interactive Map',
    },
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
  const isGolden = phase === 'golden'

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10" style={{ background: config.overlay }} />
        <img
          src={config.bg}
          alt="Puerto Vallarta"
          className="object-cover w-full h-full"
          loading="eager"
        />
      </div>

      {/* Phase pill */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
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
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: config.accentColor }}
          />
          {copy.eyebrow}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center pt-20 pb-10">
        {/* Title */}
        <h1
          className="mb-6 leading-none tracking-tight"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: '#f5f0e8',
          }}
        >
          {isGolden && sunData.minutesToSunset !== null ? (
            <span className="flex flex-col items-center gap-2">
              <span
                style={{
                  fontSize: '0.45em',
                  letterSpacing: '0.3em',
                  fontWeight: 400,
                  opacity: 0.7,
                  display: 'block',
                }}
              >
                {copy.title[0]}
              </span>
              <span style={{ color: config.accentColor }}>
                {formatCountdown(sunData.minutesToSunset)}
              </span>
            </span>
          ) : (
            copy.title.map((line, i) => (
              <span key={i} className="block">
                {i === 0
                  ? <><span style={{ color: config.accentColor }}>{line}</span></>
                  : line}
              </span>
            ))
          )}
        </h1>

        {/* Subtitle */}
        <p
          className="max-w-xl mb-10 font-light"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            lineHeight: 1.65,
            letterSpacing: '0.02em',
            color: 'rgba(245,240,232,0.8)',
          }}
        >
          {copy.subtitle.split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button
            size="lg"
            className="rounded-full px-8 py-6 font-semibold shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentColor}cc)`,
              color: '#0a1628',
              border: 'none',
              letterSpacing: '0.15em',
              fontSize: '11px',
              textTransform: 'uppercase',
              boxShadow: `0 8px 32px ${config.accentColor}40`,
            }}
            onClick={() => navigate('/directory')}
          >
            {copy.cta1}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 font-medium backdrop-blur-sm"
            style={{
              background: 'rgba(10,22,40,0.5)',
              border: '1px solid rgba(245,240,232,0.3)',
              color: '#f5f0e8',
              letterSpacing: '0.15em',
              fontSize: '11px',
              textTransform: 'uppercase',
            }}
            onClick={() => navigate('/sunsets')}
          >
            {copy.cta2}
          </Button>
        </div>

        {/* Divider with verified copy */}
        <div className="mt-10 flex items-center gap-3">
          <div className="h-px w-12 opacity-30" style={{ background: '#c9a84c' }} />
          <span
            style={{
              color: 'rgba(201,168,76,0.7)',
              fontSize: '9px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
            }}
          >
            Solo lugares verificados
          </span>
          <div className="h-px w-12 opacity-30" style={{ background: '#c9a84c' }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        onClick={() => document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown className="w-8 h-8 text-vv-cream" />
      </div>
    </section>
  )
}
