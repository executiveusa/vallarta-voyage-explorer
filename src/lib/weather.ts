/**
 * Weather from MET Norway Locationforecast 2.0 (CC BY 4.0, attribution shown in the hero).
 * Browsers cannot set a User-Agent header, so requests identify the app via the page origin.
 * Coordinates are limited to 4 decimals per MET terms. Cached until the Expires header.
 */
import { PV } from './sun'

export interface Weather {
  cloudPct: number
  tempC: number
}

const KEY = 'vv-weather'

export async function getWeather(): Promise<Weather | null> {
  try {
    const c = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (c && c.expires > Date.now()) return c.data as Weather
  } catch {
    /* ignore */
  }
  try {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${PV.lat.toFixed(4)}&lon=${PV.lng.toFixed(4)}`
    const res = await fetch(url)
    if (!res.ok) return null
    const body = await res.json()
    const d = body.properties.timeseries[0].data.instant.details
    const data: Weather = { cloudPct: d.cloud_area_fraction, tempC: d.air_temperature }
    const exp = Date.parse(res.headers.get('Expires') || '') || Date.now() + 30 * 60_000
    try {
      localStorage.setItem(KEY, JSON.stringify({ data, expires: exp }))
    } catch {
      /* ignore */
    }
    return data
  } catch {
    return null
  }
}
