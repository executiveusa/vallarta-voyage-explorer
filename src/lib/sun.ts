/**
 * Sun times for Puerto Vallarta.
 *
 * Primary source: sunrise-sunset.org (formatted=0 returns UTC ISO strings).
 * Fallback: NOAA solar calculator algorithm, computed locally. Both give UTC
 * instants; we only convert to Puerto Vallarta local time (UTC-6, no DST) for display.
 */

export const PV = { lat: 20.6534, lng: -105.2253 }
export const PV_UTC_OFFSET_HOURS = -6

export interface SunTimes {
  dateKey: string // YYYY-MM-DD in PV local date
  dawn: Date // civil twilight begin
  sunrise: Date
  goldenStart: Date // approx 1h before sunset
  sunset: Date
  dusk: Date // civil twilight end
  source: 'sunrise-sunset.org' | 'NOAA'
}

const rad = (d: number) => (d * Math.PI) / 180
const deg = (r: number) => (r * 180) / Math.PI

export function pvDateKey(d: Date): string {
  const local = new Date(d.getTime() + PV_UTC_OFFSET_HOURS * 3600_000)
  return local.toISOString().slice(0, 10)
}

/** NOAA general solar position: returns UTC minutes from midnight for the given zenith. */
function noaaEvent(dateKey: string, zenith: number, rising: boolean): Date {
  const [y, m, d] = dateKey.split('-').map(Number)
  const dayUtcMs = Date.UTC(y, m - 1, d)
  // Julian century at local noon-ish (good to within a minute)
  const jd = dayUtcMs / 86400000 + 2440587.5 + 0.5
  const t = (jd - 2451545) / 36525
  const l0 = (280.46646 + t * (36000.76983 + t * 0.0003032)) % 360
  const mAnom = 357.52911 + t * (35999.05029 - 0.0001537 * t)
  const e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t)
  const c =
    Math.sin(rad(mAnom)) * (1.914602 - t * (0.004817 + 0.000014 * t)) +
    Math.sin(rad(2 * mAnom)) * (0.019993 - 0.000101 * t) +
    Math.sin(rad(3 * mAnom)) * 0.000289
  const trueLong = l0 + c
  const omega = 125.04 - 1934.136 * t
  const appLong = trueLong - 0.00569 - 0.00478 * Math.sin(rad(omega))
  const meanObliq = 23 + (26 + (21.448 - t * (46.815 + t * (0.00059 - t * 0.001813))) / 60) / 60
  const obliq = meanObliq + 0.00256 * Math.cos(rad(omega))
  const decl = deg(Math.asin(Math.sin(rad(obliq)) * Math.sin(rad(appLong))))
  const yv = Math.tan(rad(obliq / 2)) ** 2
  const eqTime =
    4 *
    deg(
      yv * Math.sin(2 * rad(l0)) -
        2 * e * Math.sin(rad(mAnom)) +
        4 * e * yv * Math.sin(rad(mAnom)) * Math.cos(2 * rad(l0)) -
        0.5 * yv * yv * Math.sin(4 * rad(l0)) -
        1.25 * e * e * Math.sin(2 * rad(mAnom)),
    )
  const ha = deg(
    Math.acos(
      Math.cos(rad(zenith)) / (Math.cos(rad(PV.lat)) * Math.cos(rad(decl))) -
        Math.tan(rad(PV.lat)) * Math.tan(rad(decl)),
    ),
  )
  const solarNoonMin = 720 - 4 * PV.lng - eqTime
  const minutes = solarNoonMin + (rising ? -4 * ha : 4 * ha)
  return new Date(dayUtcMs + minutes * 60_000)
}

export function noaaSunTimes(dateKey: string): SunTimes {
  const sunrise = noaaEvent(dateKey, 90.833, true)
  const sunset = noaaEvent(dateKey, 90.833, false)
  return {
    dateKey,
    sunrise,
    sunset,
    dawn: noaaEvent(dateKey, 96, true),
    dusk: noaaEvent(dateKey, 96, false),
    goldenStart: new Date(sunset.getTime() - 3600_000),
    source: 'NOAA',
  }
}

const CACHE_PREFIX = 'vv-sun-'

async function fetchSunriseSunset(dateKey: string): Promise<SunTimes> {
  const url = `https://api.sunrise-sunset.org/json?lat=${PV.lat}&lng=${PV.lng}&date=${dateKey}&formatted=0`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`sunrise-sunset ${res.status}`)
  const body = await res.json()
  if (body.status !== 'OK') throw new Error(`sunrise-sunset ${body.status}`)
  const r = body.results
  const sunset = new Date(r.sunset)
  return {
    dateKey,
    sunrise: new Date(r.sunrise),
    sunset,
    dawn: new Date(r.civil_twilight_begin),
    dusk: new Date(r.civil_twilight_end),
    goldenStart: new Date(sunset.getTime() - 3600_000),
    source: 'sunrise-sunset.org',
  }
}

function revive(o: Record<string, unknown>): SunTimes {
  return {
    dateKey: o.dateKey as string,
    sunrise: new Date(o.sunrise as string),
    sunset: new Date(o.sunset as string),
    dawn: new Date(o.dawn as string),
    dusk: new Date(o.dusk as string),
    goldenStart: new Date(o.goldenStart as string),
    source: o.source as SunTimes['source'],
  }
}

export async function getSunTimes(dateKey: string): Promise<SunTimes> {
  try {
    const cached = localStorage.getItem(CACHE_PREFIX + dateKey)
    if (cached) return revive(JSON.parse(cached))
  } catch {
    /* storage unavailable */
  }
  let times: SunTimes
  try {
    times = await fetchSunriseSunset(dateKey)
  } catch {
    times = noaaSunTimes(dateKey)
  }
  try {
    localStorage.setItem(CACHE_PREFIX + dateKey, JSON.stringify(times))
  } catch {
    /* ignore */
  }
  return times
}

export function formatPvTime(d: Date, lang: 'es' | 'en'): string {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: lang !== 'es',
    timeZone: 'America/Mexico_City', // UTC-6, no DST since 2022
  }).format(d)
}

export type Phase = 'night' | 'dawn' | 'day' | 'golden' | 'dusk'

export function phaseAt(t: SunTimes, now: Date): Phase {
  const n = now.getTime()
  if (n < t.dawn.getTime() || n >= t.dusk.getTime()) return 'night'
  if (n < t.sunrise.getTime()) return 'dawn'
  if (n < t.goldenStart.getTime()) return 'day'
  if (n < t.sunset.getTime()) return 'golden'
  return 'dusk'
}
