/**
 * WhatsApp utilities — Verified Vallarta™
 *
 * Generates pre-filled WhatsApp deep links for businesses.
 * Works on any device. Opens WhatsApp directly.
 * SYNTHIA intercepts these messages if the business is connected.
 */

export function buildWhatsAppLink(
  phoneNumber: string,
  prefillMessage: string,
): string {
  const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, '')
  const number = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned
  const encoded = encodeURIComponent(prefillMessage)
  return `https://wa.me/${number}?text=${encoded}`
}

export function buildBusinessWhatsAppMessage(
  businessName: string,
  lang: 'es' | 'en' = 'es'
): string {
  if (lang === 'es') {
    return `Hola! Vi *${businessName}* en Verificado Vallarta 🌅 Me gustaría obtener más información. `
  }
  return `Hi! I found *${businessName}* on Verified Vallarta 🌅 I'd love to get more information. `
}
