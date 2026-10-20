import { useEffect, useState } from 'react'
import { getSunTimes, noaaSunTimes, pvDateKey, phaseAt, type SunTimes, type Phase } from '@/lib/sun'
import { getWeather, type Weather } from '@/lib/weather'

/** QA only: ?at=HH:MM shows the hero as of that Puerto Vallarta time today. */
function qaNow(): Date | null {
  const m = /[?&]at=(\d{1,2}):(\d{2})/.exec(window.location.search)
  if (!m) return null
  const key = pvDateKey(new Date())
  return new Date(`${key}T${m[1].padStart(2, '0')}:${m[2]}:00-06:00`)
}

export function useSunState() {
  const [now, setNow] = useState(() => qaNow() ?? new Date())
  const [times, setTimes] = useState<SunTimes>(() => noaaSunTimes(pvDateKey(new Date())))
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    const id = setInterval(() => setNow(qaNow() ?? new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const key = pvDateKey(now)
  useEffect(() => {
    let live = true
    getSunTimes(key).then((t) => live && setTimes(t))
    return () => {
      live = false
    }
  }, [key])

  useEffect(() => {
    let live = true
    const load = () => getWeather().then((w) => live && setWeather(w))
    load()
    const id = setInterval(load, 30 * 60_000)
    return () => {
      live = false
      clearInterval(id)
    }
  }, [])

  const phase: Phase = phaseAt(times, now)
  return { now, times, weather, phase }
}
