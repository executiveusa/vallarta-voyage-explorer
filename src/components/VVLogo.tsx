/**
 * VVLogo — Verified Vallarta™ Double-V Luxury Monogram
 *
 * Two interlocking V shapes forming a diamond-like crest.
 * Navy background, gold strokes. Scales from 24px to 120px.
 *
 * Used in: Navbar, Footer, VerifiedBadge, Loading screens
 */

interface VVLogoProps {
  size?: number
  variant?: 'full' | 'mark' | 'wordmark'
  className?: string
}

export function VVLogo({ size = 40, variant = 'mark', className = '' }: VVLogoProps) {
  if (variant === 'mark') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Verified Vallarta™"
      >
        {/* Outer circle */}
        <circle cx="20" cy="20" r="19" fill="#0a1628" stroke="#c9a84c" strokeWidth="1.5" />
        {/* Double V */}
        <path
          d="M8 12 L14 28 L20 16 L26 28 L32 12"
          stroke="#c9a84c"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner accent dot */}
        <circle cx="20" cy="16" r="1.5" fill="#c9a84c" opacity="0.8" />
      </svg>
    )
  }

  if (variant === 'wordmark') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <VVLogo size={size} variant="mark" />
        <div className="flex flex-col leading-none">
          <span
            style={{
              fontSize: size * 0.35,
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              letterSpacing: '0.2em',
              color: '#c9a84c',
              fontWeight: 700,
              textTransform: 'uppercase' as const,
            }}
          >
            Verified
          </span>
          <span
            style={{
              fontSize: size * 0.35,
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              letterSpacing: '0.25em',
              color: '#f5f0e8',
              fontWeight: 300,
              textTransform: 'uppercase' as const,
            }}
          >
            Vallarta
          </span>
        </div>
      </div>
    )
  }

  // Full variant
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <VVLogo size={size} variant="mark" />
      <span
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: size * 0.45,
          fontWeight: 600,
          color: '#c9a84c',
          letterSpacing: '0.15em',
        }}
      >
        VV
      </span>
    </div>
  )
}

export function VerifiedBadge({ size = 'sm', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const configs = {
    sm: { iconSize: 12, text: 'Verificado', px: 'px-2 py-0.5', fontSize: '9px' },
    md: { iconSize: 16, text: 'Verificado', px: 'px-3 py-1', fontSize: '11px' },
    lg: { iconSize: 20, text: 'Verificado por VV™', px: 'px-4 py-1.5', fontSize: '12px' },
  }
  const c = configs[size]

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${c.px} rounded-full vv-verified-badge ${className}`}
    >
      <svg width={c.iconSize} height={c.iconSize} viewBox="0 0 16 16" fill="none">
        <path d="M8 1L10 6H15L11 9.5L12.5 15L8 12L3.5 15L5 9.5L1 6H6L8 1Z"
              fill="#0a1628" stroke="#0a1628" strokeWidth="0.5" />
        <path d="M5.5 8L7 9.5L10.5 6" stroke="#c9a84c" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: c.fontSize, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>
        {c.text}
      </span>
    </div>
  )
}
