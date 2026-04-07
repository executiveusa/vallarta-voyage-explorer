/**
 * ClaimListing — Verified Vallarta™
 * Frontend-only version - form submits show confirmation.
 */

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { VVLogo, VerifiedBadge } from '@/components/VVLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useLang } from '@/context/LanguageContext'

type PricingTier = 'demo' | 'base' | 'pro' | 'hotel'

const PRICING: Record<PricingTier, {
  mxn: number; usd: number
  label: string; labelEs: string
  features: string[]; featuresEs: string[]
}> = {
  demo: {
    mxn: 0, usd: 0,
    label: 'Free Demo', labelEs: 'Demo Gratuito',
    features: ['Verified listing', 'WhatsApp button', '30-day trial'],
    featuresEs: ['Listado verificado', 'Botón WhatsApp', '30 días gratis'],
  },
  base: {
    mxn: 1800, usd: 99,
    label: 'Base', labelEs: 'Base',
    features: ['Everything in Demo', 'SYNTHIA WhatsApp AI', 'Lead capture', 'Video reviews'],
    featuresEs: ['Todo en Demo', 'WhatsApp IA SYNTHIA', 'Captura de leads', 'Reseñas en video'],
  },
  pro: {
    mxn: 3600, usd: 199,
    label: 'Pro', labelEs: 'Pro',
    features: ['Everything in Base', 'Featured placement', 'Sunset spotlight', 'Analytics'],
    featuresEs: ['Todo en Base', 'Posición destacada', 'Spotlight al atardecer', 'Analytics'],
  },
  hotel: {
    mxn: 7200, usd: 399,
    label: 'Hotel', labelEs: 'Hotel',
    features: ['Everything in Pro', 'Custom integration', 'WhatsApp automation', 'Dedicated support'],
    featuresEs: ['Todo en Pro', 'Integración personalizada', 'Automatización WhatsApp', 'Soporte dedicado'],
  },
}

const FORM_DEFAULTS = {
  businessName: '', ownerName: '', phone: '',
  whatsapp: '', email: '', website: '',
  category: 'Experience', area: '', description: '',
}

export default function ClaimListing() {
  const { lang } = useLang()
  const isEs = lang === 'es'

  const [tier, setTier]           = useState<PricingTier>('demo')
  const [nonprofit, setNonprofit] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [form, setForm]           = useState(FORM_DEFAULTS)

  const discountedMxn = nonprofit && tier !== 'demo'
    ? Math.round(PRICING[tier].mxn * 0.75) : PRICING[tier].mxn
  const discountedUsd = nonprofit && tier !== 'demo'
    ? Math.round(PRICING[tier].usd * 0.75) : PRICING[tier].usd

  const handleSubmit = async () => {
    if (!form.businessName || !form.ownerName || !form.phone) {
      setError(isEs ? 'Por favor completa los campos requeridos' : 'Please complete required fields')
      return
    }

    setSubmitting(true)
    setError(null)

    // Frontend-only: simulate submission
    setTimeout(() => {
      setSubmitted(true)
      setSubmitting(false)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: '#060d1a' }}>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <CheckCircle className="w-16 h-16 mb-6 text-vv-gold" />
          <VVLogo size={48} variant="mark" className="mb-6" />
          <h1
            className="text-3xl font-semibold mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: '#f5f0e8' }}
          >
            {isEs ? '¡Solicitud Recibida! 🌅' : 'Application Received! 🌅'}
          </h1>
          <p className="max-w-md text-sm" style={{ color: 'rgba(245,240,232,0.45)' }}>
            {isEs
              ? 'Nuestro equipo revisará tu solicitud pronto. Te contactaremos por WhatsApp en 24h para confirmar la verificación.'
              : "Our team will review your application soon. We'll contact you via WhatsApp within 24h to confirm verification."}
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#060d1a' }}>
      <Navbar />

      <main className="flex-grow pt-24 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-14">
            <div className="flex justify-center mb-6">
              <VerifiedBadge size="lg" />
            </div>
            <h1
              className="mb-3"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#f5f0e8',
              }}
            >
              {isEs ? 'Registra tu Negocio' : 'List Your Business'}
            </h1>
            <p className="max-w-lg mx-auto text-sm" style={{ color: 'rgba(245,240,232,0.45)' }}>
              {isEs
                ? 'Únete al directorio verificado de Puerto Vallarta. Solo negocios reales, vetados por nuestro equipo.'
                : "Join Puerto Vallarta's verified directory. Real businesses only, vetted by our team."}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            <div className="space-y-5">
              <h2
                className="font-bold tracking-widest uppercase"
                style={{ color: '#c9a84c', fontSize: '10px', letterSpacing: '0.25em' }}
              >
                {isEs ? 'Información del Negocio' : 'Business Information'}
              </h2>

              {([
                { key: 'businessName', label: isEs ? 'Nombre del Negocio *' : 'Business Name *', placeholder: 'La Palapa PV' },
                { key: 'ownerName',    label: isEs ? 'Tu Nombre *'          : 'Your Name *',      placeholder: isEs ? 'María González' : 'Maria González' },
                { key: 'phone',        label: isEs ? 'Teléfono *'           : 'Phone *',          placeholder: '+52 322 222 0000' },
                { key: 'whatsapp',     label: 'WhatsApp',                                          placeholder: '+52 322 222 0000' },
                { key: 'email',        label: 'Email',                                             placeholder: 'hola@turestaurante.com' },
                { key: 'website',      label: 'Website',                                           placeholder: 'https://turestaurante.com' },
                { key: 'area',         label: isEs ? 'Zona en PV' : 'Area in PV',                 placeholder: isEs ? 'Zona Romántica, Marina, Centro...' : 'Romantic Zone, Marina, Downtown...' },
              ] as const).map(field => (
                <div key={field.key}>
                  <Label
                    className="tracking-wider uppercase mb-1.5 block"
                    style={{ fontSize: '10px', color: 'rgba(245,240,232,0.5)' }}
                  >
                    {field.label}
                  </Label>
                  <Input
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    className="rounded-xl h-11"
                    style={{
                      background: 'rgba(15,26,46,0.8)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      color: '#f5f0e8',
                      fontSize: '14px',
                    }}
                  />
                </div>
              ))}

              <div>
                <Label
                  className="tracking-wider uppercase mb-1.5 block"
                  style={{ fontSize: '10px', color: 'rgba(245,240,232,0.5)' }}
                >
                  {isEs ? 'Descripción' : 'Description'}
                </Label>
                <Textarea
                  placeholder={isEs ? 'Cuéntanos sobre tu negocio...' : 'Tell us about your business...'}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="rounded-xl min-h-24"
                  style={{
                    background: 'rgba(15,26,46,0.8)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    color: '#f5f0e8',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>

            <div className="space-y-5">
              <h2
                className="font-bold tracking-widest uppercase"
                style={{ color: '#c9a84c', fontSize: '10px', letterSpacing: '0.25em' }}
              >
                {isEs ? 'Elige tu Plan' : 'Choose a Plan'}
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(PRICING) as PricingTier[]).map(t => {
                  const p = PRICING[t]
                  const selected = tier === t
                  return (
                    <button
                      key={t}
                      onClick={() => setTier(t)}
                      className="p-4 rounded-2xl text-left transition-all"
                      style={{
                        background: selected ? 'rgba(201,168,76,0.12)' : 'rgba(15,26,46,0.6)',
                        border: selected ? '1px solid rgba(201,168,76,0.5)' : '1px solid rgba(201,168,76,0.1)',
                      }}
                    >
                      <p
                        className="font-bold tracking-widest uppercase mb-1"
                        style={{ color: selected ? '#c9a84c' : 'rgba(245,240,232,0.4)', fontSize: '10px' }}
                      >
                        {isEs ? p.labelEs : p.label}
                      </p>
                      <p
                        className="font-semibold"
                        style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: '#f5f0e8' }}
                      >
                        {p.mxn === 0 ? (isEs ? 'Gratis' : 'Free') : `$${p.mxn.toLocaleString()} MXN`}
                      </p>
                      {p.mxn > 0 && (
                        <p style={{ fontSize: '10px', color: 'rgba(245,240,232,0.3)' }}>
                          ${p.usd} USD / {isEs ? 'mes' : 'mo'}
                        </p>
                      )}
                      <ul className="mt-2 space-y-0.5">
                        {(isEs ? p.featuresEs : p.features).map(f => (
                          <li
                            key={f}
                            className="flex items-start gap-1"
                            style={{ fontSize: '11px', color: 'rgba(245,240,232,0.45)' }}
                          >
                            <span style={{ color: '#c9a84c' }}>·</span> {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  )
                })}
              </div>

              <div
                className="p-4 rounded-2xl cursor-pointer transition-all"
                style={{
                  background: nonprofit ? 'rgba(74,222,128,0.08)' : 'rgba(15,26,46,0.6)',
                  border: nonprofit ? '1px solid rgba(74,222,128,0.3)' : '1px solid rgba(74,222,128,0.1)',
                }}
                onClick={() => setNonprofit(!nonprofit)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 transition-all"
                    style={{
                      background: nonprofit ? '#4ade80' : 'rgba(15,26,46,0.8)',
                      border: '1px solid rgba(74,222,128,0.4)',
                    }}
                  >
                    {nonprofit && (
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#0a1628' }}>✓</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: '#4ade80' }}>
                      ♥ {isEs ? 'Donar $50 USD / mes a NW Kids' : 'Donate $50 USD / mo to NW Kids'}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>
                      {isEs ? '→ Recibe 25% de descuento en tu plan' : '→ Receive 25% off your plan'}
                    </p>
                    {nonprofit && tier !== 'demo' && (
                      <p className="text-sm font-semibold mt-2" style={{ color: '#c9a84c' }}>
                        ${discountedMxn.toLocaleString()} MXN / {isEs ? 'mes' : 'mo'} (${discountedUsd} USD)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <Button
                className="w-full py-5 rounded-2xl font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c, #d4b85a)',
                  color: '#0a1628',
                  border: 'none',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
                disabled={submitting}
                onClick={handleSubmit}
              >
                {submitting
                  ? (isEs ? 'Enviando...' : 'Submitting...')
                  : (isEs ? 'Enviar Solicitud' : 'Submit Application')}
              </Button>

              <p className="text-center" style={{ color: 'rgba(245,240,232,0.2)', fontSize: '11px' }}>
                {isEs
                  ? 'Nuestro equipo te contactará por WhatsApp en 24h'
                  : 'Our team will contact you via WhatsApp within 24h'}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
