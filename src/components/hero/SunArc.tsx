import type { SunTimes } from '@/lib/sun'

/** Sun path from sunrise to sunset with the golden hour marked and a dot for now. */
export default function SunArc({ times, now, label }: { times: SunTimes; now: Date; label: string }) {
  const W = 320
  const H = 120
  const r = 140
  const cx = W / 2
  const cy = 112
  const a = times.sunrise.getTime()
  const b = times.sunset.getTime()
  const g = times.goldenStart.getTime()
  const pt = (f: number) => {
    const ang = Math.PI * (1 - f)
    return [cx + r * Math.cos(ang), cy - r * 0.78 * Math.sin(ang)] as const
  }
  const frac = (t: number) => Math.min(1, Math.max(0, (t - a) / (b - a)))
  const arc = (f0: number, f1: number) => {
    const pts = Array.from({ length: 24 }, (_, i) => pt(f0 + ((f1 - f0) * i) / 23))
    return 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')
  }
  const nowF = (now.getTime() - a) / (b - a)
  const up = nowF >= 0 && nowF <= 1
  const [sx, sy] = pt(frac(now.getTime()))
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="w-full max-w-xs">
      <line x1="8" y1={cy} x2={W - 8} y2={cy} stroke="rgba(245,240,232,0.35)" strokeWidth="1" />
      <path d={arc(0, 1)} fill="none" stroke="rgba(245,240,232,0.45)" strokeWidth="1.5" />
      <path d={arc(frac(g), 1)} fill="none" stroke="#e8b04a" strokeWidth="3" strokeLinecap="round" />
      {up && <circle cx={sx} cy={sy} r="6" fill="#ffd27a" stroke="#fff" strokeWidth="1.5" />}
    </svg>
  )
}
