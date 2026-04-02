/**
 * LanguageContext — ES/EN bilingual toggle for Verified Vallarta™
 * Default: Spanish (primary market is PV, Mexico)
 * Toggle persists to localStorage
 */

import { createContext, useContext, useState, type ReactNode } from 'react'

type Lang = 'es' | 'en'

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

// All UI strings — Spanish first, English second
const STRINGS: Record<string, Record<Lang, string>> = {
  // Nav
  'nav.directory':      { es: 'Directorio', en: 'Directory' },
  'nav.sunsets':        { es: 'Atardeceres', en: 'Sunsets' },
  'nav.tours':          { es: 'Tours', en: 'Tours' },
  'nav.about':          { es: 'Nosotros', en: 'About' },
  'nav.claim':          { es: 'Registrar Negocio', en: 'List Business' },
  'nav.signin':         { es: 'Iniciar Sesión', en: 'Sign In' },

  // Hero
  'hero.title':         { es: 'Verificado Vallarta™', en: 'Verified Vallarta™' },
  'hero.subtitle':      { es: 'El directorio de lujo verificado de Puerto Vallarta', en: "Puerto Vallarta's verified luxury directory" },
  'hero.cta.primary':   { es: 'Ver el Directorio', en: 'Browse Directory' },
  'hero.cta.secondary': { es: 'El Atardecer', en: 'Sunset Tracker' },
  'hero.tagline':       { es: 'Solo lugares reales. Verificados personalmente.', en: 'Real places only. Personally verified.' },

  // Directory
  'dir.title':          { es: 'Directorio Verificado', en: 'Verified Directory' },
  'dir.subtitle':       { es: 'Cada negocio vetado personalmente por nuestro equipo', en: 'Every business personally vetted by our team' },
  'dir.search':         { es: 'Buscar negocios...', en: 'Search businesses...' },
  'dir.all':            { es: 'Todos', en: 'All' },
  'dir.featured':       { es: 'Destacados', en: 'Featured' },
  'dir.whatsapp':       { es: 'Contactar por WhatsApp', en: 'Contact on WhatsApp' },
  'dir.website':        { es: 'Ver sitio web', en: 'Visit website' },
  'dir.review_count':   { es: 'reseñas en video', en: 'video reviews' },
  'dir.empty':          { es: 'No encontramos negocios con esos filtros', en: 'No businesses match those filters' },

  // Verified badge
  'badge.verified':     { es: 'Verificado', en: 'Verified' },
  'badge.verified_by':  { es: 'Verificado por VV™', en: 'Verified by VV™' },

  // Sunset
  'sunset.golden':      { es: 'La hora mágica está aquí', en: 'Magic hour is now' },
  'sunset.day':         { es: 'Explora el mejor día en Vallarta', en: 'Explore the best of Vallarta today' },
  'sunset.night':       { es: 'Descubre la vida nocturna de Vallarta', en: "Discover Vallarta's nightlife" },
  'sunset.countdown':   { es: 'El atardecer en', en: 'Sunset in' },
  'sunset.upload':      { es: 'Sube tu atardecer', en: 'Upload your sunset' },

  // WhatsApp
  'wa.greeting':        { es: 'Hola! Vi este negocio en Verified Vallarta 🌅 — ', en: 'Hi! I found this business on Verified Vallarta 🌅 — ' },

  // Nonprofit
  'ngo.name':           { es: 'Proyecto Indigo Asoul / NW Kids', en: 'Indigo Asoul Project / NW Kids' },
  'ngo.tagline':        { es: 'Parte de cada suscripción apoya a niños en Puerto Vallarta', en: 'Part of every subscription supports children in Puerto Vallarta' },
  'ngo.donate':         { es: 'Donar al Proyecto', en: 'Donate to Project' },
  'ngo.pledged':        { es: 'donado este mes', en: 'donated this month' },

  // Video Reviews
  'review.title':       { es: 'Reseñas en Video', en: 'Video Reviews' },
  'review.cta':         { es: 'Deja tu reseña en 30 segundos', en: 'Leave your 30-second review' },
  'review.upload':      { es: 'Grabar o subir video', en: 'Record or upload video' },

  // Footer
  'footer.tagline':     { es: 'No construimos sitios web. Construimos mundos.', en: "We don't build websites. We build worlds." },
  'footer.legal':       { es: 'Todos los derechos reservados', en: 'All rights reserved' },
  'footer.powered':     { es: 'Impulsado por SYNTHIA™', en: 'Powered by SYNTHIA™' },
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
  t: (k) => k,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return (localStorage.getItem('vv-lang') as Lang) || 'es'
    } catch {
      return 'es'
    }
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('vv-lang', l) } catch {}
  }

  const t = (key: string): string => {
    return STRINGS[key]?.[lang] ?? STRINGS[key]?.['es'] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
