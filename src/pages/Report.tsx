import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/context/LanguageContext'
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client'

const T = {
  en: {
    title: 'Report a problem',
    lead: 'Tell us about a wrong listing or a business that behaved badly. We read every report.',
    biz: 'Business name', details: 'What happened', contact: 'Your email or phone (optional)',
    send: 'Send report', sending: 'Sending...',
    ok: 'Report received. Thank you.',
    fail: 'We could not save your report. Please try again later.',
    closed: 'The report form is not open yet. Please check back soon.',
  },
  es: {
    title: 'Reportar un problema',
    lead: 'Cuéntanos de un listado incorrecto o de un negocio que se portó mal. Leemos cada reporte.',
    biz: 'Nombre del negocio', details: 'Qué pasó', contact: 'Tu correo o teléfono (opcional)',
    send: 'Enviar reporte', sending: 'Enviando...',
    ok: 'Reporte recibido. Gracias.',
    fail: 'No pudimos guardar tu reporte. Inténtalo más tarde.',
    closed: 'El formulario de reportes aún no está abierto. Vuelve pronto.',
  },
} as const

export default function Report() {
  const { lang } = useLang()
  const t = T[lang]
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'fail'>('idle')
  const [f, setF] = useState({ business_name: '', details: '', contact: '', website: '' })
  const input = 'w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-[#f5f0e8] placeholder:text-[#f5f0e8]/60'

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (f.website) return // honeypot: bots fill it; show nothing, save nothing
    setState('sending')
    const { error } = await supabase.from('business_reports').insert({
      business_name: f.business_name.trim(),
      details: f.details.trim(),
      contact: f.contact.trim() || null,
      lang,
    })
    setState(error ? 'fail' : 'ok')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0b1630', color: '#f5f0e8' }}>
      <Navbar />
      <main id="main-content" className="flex-1 mx-auto w-full max-w-2xl px-6 pt-32 pb-20">
        <h1 className="mb-4 text-4xl font-semibold md:text-5xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{t.title}</h1>
        <p className="mb-8 text-lg opacity-90">{t.lead}</p>
        {!isSupabaseConfigured ? (
          <p role="status" className="rounded-lg border border-white/30 p-4">{t.closed}</p>
        ) : state === 'ok' ? (
          <p role="status" className="rounded-lg border border-white/30 p-4">{t.ok}</p>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="hidden" aria-hidden="true">
              <input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} />
            </div>
            <label className="block"><span className="mb-1 block text-sm">{t.biz}</span>
              <input className={input} required minLength={2} maxLength={200} value={f.business_name} onChange={(e) => setF({ ...f, business_name: e.target.value })} /></label>
            <label className="block"><span className="mb-1 block text-sm">{t.details}</span>
              <textarea className={input} required minLength={10} maxLength={4000} rows={6} value={f.details} onChange={(e) => setF({ ...f, details: e.target.value })} /></label>
            <label className="block"><span className="mb-1 block text-sm">{t.contact}</span>
              <input className={input} maxLength={200} value={f.contact} onChange={(e) => setF({ ...f, contact: e.target.value })} /></label>
            {state === 'fail' && <p role="alert" className="text-[#ffb4a8]">{t.fail}</p>}
            <button disabled={state === 'sending'} className="rounded-full bg-[#f5f0e8] px-8 py-3 font-semibold text-[#0b1630] disabled:opacity-60">
              {state === 'sending' ? t.sending : t.send}
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  )
}
