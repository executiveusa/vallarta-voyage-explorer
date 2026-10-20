/**
 * WhatsApp utilities - Verified Vallarta
 *
 * The site's own number comes from VITE_WHATSAPP_NUMBER (digits, country code).
 * When it is unset, every WhatsApp button is hidden. No placeholder numbers.
 */

export function getSiteWhatsAppNumber(): string | null {
  const raw = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? ''
  const digits = raw.replace(/[\s()+-]/g, '')
  return /^\d{8,15}$/.test(digits) ? digits : null
}

export function buildWhatsAppLink(
  phoneNumber: string,
  prefillMessage: string,
): string {
  const cleaned = phoneNumber.replace(/[\s()-]/g, '')
  const number = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned
  const encoded = encodeURIComponent(prefillMessage)
  return `https://wa.me/${number}?text=${encoded}`
}

export function buildBusinessWhatsAppMessage(
  businessName: string,
  lang: 'es' | 'en' = 'es'
): string {
  if (lang === 'es') {
    return `Hola! Vi *${businessName}* en Verificado Vallarta. Me gustaria obtener mas informacion. `
  }
  return `Hi! I found *${businessName}* on Verified Vallarta. I'd love to get more information. `
}
