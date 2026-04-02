/**
 * VideoReview — TrustReel™ by Verified Vallarta™
 *
 * 30-second video review system.
 * Triggered by SYNTHIA via WhatsApp 48h after booking.
 * No app download. Works on any phone.
 *
 * Flow:
 *   1. Customer gets WhatsApp link
 *   2. Opens this page on mobile
 *   3. Records 30s video or uploads from camera roll
 *   4. Submits → Supabase Storage → appears on business listing
 *   5. La Vigilante reviews before publishing
 *
 * UDEC target: 9.0/10 (mobile-first, dead simple)
 */

import { useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Camera, Upload, Star, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { VVLogo } from '@/components/VVLogo'
import { supabase } from '@/integrations/supabase/client'
import { useLang } from '@/context/LanguageContext'

type Step = 'landing' | 'review' | 'submitted'

export default function VideoReview() {
  const [params] = useSearchParams()
  const { lang } = useLang()
  const businessId   = params.get('b')
  const businessName = params.get('name') || (lang === 'es' ? 'este negocio' : 'this business')

  const [step, setStep]             = useState<Step>('landing')
  const [rating, setRating]         = useState(0)
  const [name, setName]             = useState('')
  const [videoFile, setVideoFile]   = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [uploading, setUploading]   = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isEs = lang === 'es'

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 50 * 1024 * 1024) {
      setError(isEs ? 'El video no puede exceder 50MB' : 'Video cannot exceed 50MB')
      return
    }

    setVideoFile(file)
    setVideoPreview(URL.createObjectURL(file))
    setStep('review')
    setError(null)
  }

  const handleSubmit = async () => {
    if (!videoFile || rating === 0 || !name.trim()) {
      setError(isEs ? 'Por favor completa todos los campos' : 'Please complete all fields')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const fileName = `review-${Date.now()}-${videoFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: uploadError } = await (supabase as any).storage
        .from('video-reviews')
        .upload(fileName, videoFile, { contentType: videoFile.type })

      if (uploadError) throw uploadError

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: { publicUrl } } = (supabase as any).storage
        .from('video-reviews')
        .getPublicUrl(fileName)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: insertError } = await (supabase as any)
        .from('video_reviews')
        .insert({
          business_id:   businessId,
          reviewer_name: name,
          video_url:     publicUrl,
          star_rating:   rating,
          language:      lang,
          approved:      false,
        })

      if (insertError) throw insertError

      setStep('submitted')
    } catch (err) {
      console.error('[VideoReview] Submit error:', err)
      setError(isEs
        ? 'Error al subir tu reseña. Intenta de nuevo.'
        : 'Error uploading your review. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  if (step === 'submitted') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: '#060d1a' }}
      >
        <CheckCircle className="w-16 h-16 mb-6 text-green-400" />
        <VVLogo size={40} variant="mark" className="mb-6" />
        <h1
          className="text-2xl font-semibold mb-3"
          style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}
        >
          {isEs ? '¡Gracias por tu reseña! 🌅' : 'Thank you for your review! 🌅'}
        </h1>
        <p className="text-sm max-w-xs" style={{ color: 'rgba(245,240,232,0.5)' }}>
          {isEs
            ? 'Tu reseña será revisada y publicada pronto. Ayudas a otros viajeros a descubrir este lugar.'
            : "Your review will be reviewed and published soon. You're helping other travelers discover this place."}
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#060d1a' }}>
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ borderBottom: '1px solid rgba(201,168,76,0.15)' }}
      >
        <VVLogo size={32} variant="mark" />
        <div>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a84c' }}>
            TrustReel™
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(245,240,232,0.5)' }}>Verified Vallarta™</p>
        </div>
      </div>

      <div className="flex-1 px-6 py-8 max-w-md mx-auto w-full">

        {step === 'landing' && (
          <>
            <div className="text-center mb-10">
              <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '12px' }}>
                {isEs ? 'Reseña en video' : 'Video review'}
              </p>
              <h1
                className="text-2xl font-semibold mb-3"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}
              >
                {isEs ? `¿Cómo estuvo ${businessName}?` : `How was ${businessName}?`}
              </h1>
              <p className="text-sm" style={{ color: 'rgba(245,240,232,0.45)' }}>
                {isEs
                  ? '30 segundos de tu experiencia ayudan a otros viajeros'
                  : '30 seconds of your experience helps other travelers'}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                className="w-full py-6 rounded-2xl font-semibold flex items-center justify-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c, #d4b85a)',
                  color: '#0a1628',
                  border: 'none',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-5 h-5" />
                {isEs ? 'Grabar Video' : 'Record Video'}
              </Button>

              <Button
                variant="outline"
                className="w-full py-6 rounded-2xl font-medium flex items-center justify-center gap-3"
                style={{
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: '#c9a84c',
                  background: 'transparent',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-5 h-5" />
                {isEs ? 'Subir desde Galería' : 'Upload from Gallery'}
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                capture="user"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            <p className="text-center text-xs mt-6" style={{ color: 'rgba(245,240,232,0.2)', fontSize: '11px' }}>
              {isEs ? 'Máx 30 segundos · Sin app necesaria' : 'Max 30 seconds · No app needed'}
            </p>
          </>
        )}

        {step === 'review' && (
          <>
            {videoPreview && (
              <div className="rounded-2xl overflow-hidden mb-6 aspect-video">
                <video
                  src={videoPreview}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                />
              </div>
            )}

            {/* Star rating */}
            <div className="mb-6">
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: '12px' }}>
                {isEs ? 'Calificación' : 'Rating'}
              </p>
              <div className="flex gap-3 justify-center">
                {[1,2,3,4,5].map(i => (
                  <button key={i} onClick={() => setRating(i)}>
                    <Star
                      className={`w-8 h-8 transition-colors ${i <= rating ? 'text-vv-gold' : 'text-vv-cream/20'}`}
                      fill={i <= rating ? '#c9a84c' : 'transparent'}
                      stroke={i <= rating ? '#c9a84c' : 'rgba(245,240,232,0.2)'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="mb-6">
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: '8px' }}>
                {isEs ? 'Tu nombre' : 'Your name'}
              </p>
              <Input
                placeholder={isEs ? 'María García' : 'John Smith'}
                value={name}
                onChange={e => setName(e.target.value)}
                className="rounded-xl h-12"
                style={{
                  background: 'rgba(15,26,46,0.8)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: '#f5f0e8',
                }}
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs mb-4 text-center">{error}</p>
            )}

            <Button
              className="w-full py-5 rounded-2xl font-semibold"
              style={{
                background: (rating > 0 && name.trim())
                  ? 'linear-gradient(135deg, #c9a84c, #d4b85a)'
                  : 'rgba(15,26,46,0.5)',
                color: (rating > 0 && name.trim()) ? '#0a1628' : 'rgba(245,240,232,0.25)',
                border: 'none',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
              disabled={uploading || rating === 0 || !name.trim()}
              onClick={handleSubmit}
            >
              {uploading
                ? (isEs ? 'Subiendo...' : 'Uploading...')
                : (isEs ? 'Publicar Reseña' : 'Publish Review')}
            </Button>

            <p className="text-center text-xs mt-4" style={{ color: 'rgba(245,240,232,0.2)', fontSize: '11px' }}>
              {isEs
                ? 'Tu reseña será revisada antes de publicarse'
                : 'Your review will be reviewed before publishing'}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
