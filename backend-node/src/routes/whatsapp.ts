/**
 * WhatsApp Cloud API Webhook — Verified Vallarta™
 *
 * Receives inbound WhatsApp messages and routes to SYNTHIA for handling.
 * SYNTHIA qualifies leads, books tours, requests video reviews.
 *
 * Tablet VI: SYNTHIA identifies as AI when sincerely asked.
 * Tablet VI: Only books, informs, qualifies. No false promises.
 *
 * Environment:
 *   WHATSAPP_VERIFY_TOKEN  — set in Meta App Dashboard
 *   WHATSAPP_ACCESS_TOKEN  — permanent system user token
 *   WHATSAPP_PHONE_NUMBER_ID — from Meta API Setup
 */

import { Hono } from 'hono'

const app = new Hono()

// ── Webhook verification (Meta GET challenge) ─────────────────────────────────
app.get('/', (c) => {
  const mode      = c.req.query('hub.mode')
  const token     = c.req.query('hub.verify_token')
  const challenge = c.req.query('hub.challenge')

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'vv-verify-2026'

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[WhatsApp] Webhook verified ✓')
    return c.text(challenge || '', 200)
  }

  return c.text('Verification failed', 403)
})

// ── Inbound message handler ───────────────────────────────────────────────────
app.post('/', async (c) => {
  let body: Record<string, unknown>
  try {
    body = await c.req.json() as Record<string, unknown>
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400)
  }

  if ((body as { object?: string }).object !== 'whatsapp_business_account') {
    return c.json({ status: 'ignored' }, 200)
  }

  const entry   = (body as { entry?: unknown[] }).entry?.[0] as Record<string, unknown> | undefined
  const change  = (entry?.changes as Record<string, unknown>[])?.[0]
  const value   = change?.value as Record<string, unknown> | undefined

  const messages = value?.messages as Array<{
    from: string
    id: string
    timestamp: string
    type: string
    text?: { body: string }
  }> | undefined

  if (!messages?.length) {
    return c.json({ status: 'ok' }, 200)
  }

  const message       = messages[0]
  const from          = message.from
  const text          = message.text?.body || ''
  const phoneNumberId = (value?.metadata as Record<string, string>)?.phone_number_id

  console.log(`[WhatsApp] Message from ${from}: "${text.slice(0, 50)}"`)

  storeLead(from, text).catch(console.error)

  const response = generateSynthiaResponse(from, text)
  if (response && phoneNumberId) {
    await sendWhatsAppMessage(phoneNumberId, from, response)
  }

  return c.json({ status: 'ok' }, 200)
})

// ── Send message via WhatsApp Cloud API ───────────────────────────────────────
async function sendWhatsAppMessage(
  phoneNumberId: string,
  to: string,
  text: string
): Promise<void> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN
  if (!token) {
    console.warn('[WhatsApp] No access token — message not sent')
    return
  }

  const url = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: { body: text },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`[WhatsApp] Send failed (${res.status}):`, err)
  } else {
    console.log(`[WhatsApp] Message sent to ${to} ✓`)
  }
}

// ── SYNTHIA rule-based responses ──────────────────────────────────────────────
// Smart rule-based for demo. Replace with LLM routing in production.
function generateSynthiaResponse(from: string, message: string): string | null {
  void from
  const lower = message.toLowerCase()

  const isEnglish = /\b(hi|hello|hey|book|want|need|price|cost|how much)\b/i.test(message)
  const lang = isEnglish ? 'en' : 'es'

  const isBooking  = /\b(reserv|book|appoint|cita|disponib|availab)\b/i.test(lower)
  const isPrice    = /\b(precio|price|cost|cuánto|how much|costo)\b/i.test(lower)
  const isGreeting = /^(hola|hi|hello|hey|buenos)\b/i.test(lower.trim())

  if (isGreeting) {
    return lang === 'es'
      ? `¡Hola! 👋 Soy Alex, asistente de Verified Vallarta™.\n\nPuedo ayudarte con:\n• 📅 Reservaciones\n• ℹ️ Información del negocio\n• 💰 Precios y disponibilidad\n\n¿En qué te puedo ayudar hoy?`
      : `Hi! 👋 I'm Alex, assistant for Verified Vallarta™.\n\nI can help you with:\n• 📅 Reservations\n• ℹ️ Business information\n• 💰 Prices and availability\n\nHow can I help you today?`
  }

  if (isBooking) {
    return lang === 'es'
      ? `¡Perfecto! Para tu reservación necesito:\n\n• 📅 ¿Qué fecha te interesa?\n• 👥 ¿Cuántas personas?\n• 📱 ¿Tu nombre?\n\nResponde y lo gestiono de inmediato 🌅`
      : `Perfect! To make your reservation I need:\n\n• 📅 What date interests you?\n• 👥 How many people?\n• 📱 Your name?\n\nReply and I'll arrange it right away 🌅`
  }

  if (isPrice) {
    return lang === 'es'
      ? `Para darte precios exactos, ¿puedes decirme:\n\n• ¿Para qué fecha?\n• ¿Cuántas personas?\n• ¿Alguna preferencia especial?\n\nAsí te doy la mejor opción 🌟`
      : `To give you exact prices, can you tell me:\n\n• What date?\n• How many people?\n• Any special preferences?\n\nThat way I can give you the best available option 🌟`
  }

  return lang === 'es'
    ? `Gracias por contactar a través de *Verified Vallarta™* 🌅\n\nNuestro equipo revisará tu mensaje y te responderá pronto.\n\n_Soy Alex, asistente de IA. Lo identifico porque creemos en la transparencia._`
    : `Thank you for contacting through *Verified Vallarta™* 🌅\n\nOur team will review your message and respond shortly.\n\n_I'm Alex, AI assistant. Identified as AI because we believe in transparency._`
}

// ── Store lead in Supabase ─────────────────────────────────────────────────────
async function storeLead(from: string, message: string): Promise<void> {
  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )

    await supabase.from('whatsapp_leads').insert({
      from_number:     from,
      message_body:    message,
      synthia_handled: false,
      status:          'pending',
      created_at:      new Date().toISOString(),
    })
  } catch (err) {
    console.error('[WhatsApp] Failed to store lead:', err)
  }
}

export default app
