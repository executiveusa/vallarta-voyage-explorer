/**
 * VideoReview — TrustReel™ by Verified Vallarta™
 * Frontend-only version - shows coming soon message.
 */

import { useSearchParams } from 'react-router-dom'
import { Camera } from 'lucide-react'
import { VVLogo } from '@/components/VVLogo'
import { useLang } from '@/context/LanguageContext'

export default function VideoReview() {
  const [params] = useSearchParams()
  const { lang } = useLang()
  const businessName = params.get('name') || (lang === 'es' ? 'este negocio' : 'this business')
  const isEs = lang === 'es'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: '#060d1a' }}>
      <Camera className="w-16 h-16 mb-6 text-vv-gold" />
      <VVLogo size={40} variant="mark" className="mb-6" />
      <h1
        className="text-2xl font-semibold mb-3"
        style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}
      >
        {isEs ? `Reseña de ${businessName}` : `Review ${businessName}`}
      </h1>
      <p className="text-sm max-w-xs" style={{ color: 'rgba(245,240,232,0.5)' }}>
        {isEs
          ? 'Las reseñas en video estarán disponibles pronto. ¡Gracias por tu interés!'
          : 'Video reviews are coming soon. Thank you for your interest!'}
      </p>
    </div>
  )
}
