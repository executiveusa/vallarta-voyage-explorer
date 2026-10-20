/**
 * HeroSection - the real sunset.
 * Sky is driven by actual Puerto Vallarta sun times (sunrise-sunset.org, NOAA fallback)
 * and MET Norway cloud cover. No stock photos, no stats, no claims we cannot prove.
 */
import { Link } from 'react-router-dom'
import { useLang } from '@/context/LanguageContext'
import { useSunState } from '@/hooks/useSunState'
import SunArc from '@/components/hero/SunArc'
import { formatPvTime, type Phase } from '@/lib/sun'

const SKY: Record<Phase, string> = {
  day: 'linear-gradient(180deg,#1d5f9c 0%,#2f78b3 55%,#4f8fbd 100%)',
  dawn: 'linear-gradient(180deg,#2a3a63 0%,#b5688a 55%,#f3b07a 100%)',
  golden: 'linear-gradient(180deg,#2f4d80 0%,#b8683f 58%,#d99a52 100%)',
  dusk: 'linear-gradient(180deg,#141d3b 0%,#5a3b66 60%,#c4627a 100%)',
  night: 'linear-gradient(180deg,#050a18 0%,#0b1630 70%,#13213f 100%)',
}

const T = {
  en: {
    h1: 'Puerto Vallarta, honestly.',
    sub: 'A local guide for visitors. We list a place only after we have checked it, and we say how we check. Nothing is listed yet while we verify the first businesses.',
    cta: 'Browse the directory',
    sunsetToday: 'Sunset today',
    sunriseToday: 'Sunrise',
    toSunset: 'until sunset',
    toSunrise: 'until sunrise',
    clouds: 'cloud cover',
    sources: 'Sun times',
    weatherSrc: 'Weather',
    arcLabel: 'Sun path today, golden hour highlighted',
    phase: { day: 'Daytime', dawn: 'Dawn', golden: 'Golden hour', dusk: 'Dusk', night: 'Night' },
  },
  es: {
    h1: 'Puerto Vallarta, con honestidad.',
    sub: 'Una guía local para visitantes. Solo listamos un lugar después de revisarlo, y explicamos cómo lo revisamos. Por ahora no hay negocios listados mientras verificamos los primeros.',
    cta: 'Ver el directorio',
    sunsetToday: 'Atardecer hoy',
    sunriseToday: 'Amanecer',
    toSunset: 'para el atardecer',
    toSunrise: 'para el amanecer',
    clouds: 'nubosidad',
    sources: 'Horas del sol',
    weatherSrc: 'Clima',
    arcLabel: 'Trayectoria del sol hoy, con la hora dorada resaltada',
    phase: { day: 'Día', dawn: 'Amanecer', golden: 'Hora dorada', dusk: 'Anochecer', night: 'Noche' },
  },
} as const

function hms(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`
}

export default function HeroSection() {
  const { lang } = useLang()
  const t = T[lang]
  const { now, times, weather, phase } = useSunState()

  const beforeSunset = now < times.sunset
  const countdown = beforeSunset
    ? hms(times.sunset.getTime() - now.getTime())
    : null
  const nightOverlay = phase === 'night' || phase === 'dusk'
  const cloudy = weather ? Math.min(0.45, (weather.cloudPct / 100) * 0.45) : 0

  return (
    <section
      className="relative min-h-[100dvh] w-full overflow-hidden"
      style={{ background: SKY[phase] }}
      aria-label={t.phase[phase]}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `rgba(120,130,145,${cloudy})`, mixBlendMode: 'multiply' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-72 pointer-events-none"
        style={{ background: 'linear-gradient(180deg,transparent,rgba(5,10,24,0.6))' }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-end gap-10 px-6 pb-14 pt-32 md:flex-row md:items-end md:justify-between md:px-10 md:pb-20">
        <div className="max-w-xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#f5f0e8]/80">
            Verified Vallarta · {t.phase[phase]}
          </p>
          <h1
            className="mb-5 text-5xl font-semibold leading-[1.05] text-[#f5f0e8] md:text-7xl"
            style={{ fontFamily: 'Cormorant Garamond, serif', textShadow: '0 2px 24px rgba(0,0,0,0.35)' }}
          >
            {t.h1}
          </h1>
          <p className="mb-8 text-base leading-relaxed text-[#f5f0e8]/90 md:text-lg" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}>
            {t.sub}
          </p>
          <Link
            to="/directory"
            className="inline-flex items-center rounded-full bg-[#f5f0e8] px-8 py-4 text-base font-semibold text-[#0b1630] transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1630]"
          >
            {t.cta}
          </Link>
        </div>

        <aside
          className="w-full max-w-xs rounded-2xl p-5 text-[#f5f0e8] md:w-80"
          style={{ background: 'rgba(5,10,24,0.62)' }}
        >
          <SunArc times={times} now={now} label={t.arcLabel} />
          <dl className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="opacity-80">{t.sunriseToday}</dt>
              <dd className="font-medium tabular-nums">{formatPvTime(times.sunrise, lang)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="opacity-80">{t.sunsetToday}</dt>
              <dd className="font-medium tabular-nums">{formatPvTime(times.sunset, lang)}</dd>
            </div>
          </dl>
          {countdown && (
            <p className="mt-3 text-2xl font-semibold tabular-nums">
              {countdown} <span className="text-sm font-normal opacity-80">{t.toSunset}</span>
            </p>
          )}
          {weather && (
            <p className="mt-1 text-sm opacity-90">
              {Math.round(weather.tempC)}°C · {Math.round(weather.cloudPct)}% {t.clouds}
            </p>
          )}
          <p className="mt-4 text-[11px] leading-snug opacity-75">
            {t.sources}:{' '}
            {times.source === 'NOAA' ? (
              'NOAA'
            ) : (
              <a className="underline" href="https://sunrise-sunset.org/" target="_blank" rel="noreferrer">
                sunrise-sunset.org
              </a>
            )}
            {' · '}
            {t.weatherSrc}:{' '}
            <a className="underline" href="https://www.met.no/en" target="_blank" rel="noreferrer">
              MET Norway
            </a>{' '}
            (CC BY 4.0)
          </p>
        </aside>
      </div>
      {nightOverlay && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(1.2px 1.2px at 12% 18%,#fff,transparent),radial-gradient(1px 1px at 33% 9%,#fff,transparent),radial-gradient(1.4px 1.4px at 58% 22%,#fff,transparent),radial-gradient(1px 1px at 77% 12%,#fff,transparent),radial-gradient(1.2px 1.2px at 90% 28%,#fff,transparent),radial-gradient(1px 1px at 45% 30%,#fff,transparent)',
          }}
        />
      )}
    </section>
  )
}
