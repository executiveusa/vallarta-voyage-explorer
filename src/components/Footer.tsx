import { Link } from 'react-router-dom'
import { VVLogo } from '@/components/VVLogo'
import { useLang } from '@/context/LanguageContext'
import { Instagram, MessageCircle } from 'lucide-react'

export default function Footer() {
  const { lang } = useLang()
  const year = new Date().getFullYear()
  const isEs = lang === 'es'

  return (
    <footer
      className="pt-16 pb-8 px-6 md:px-10"
      style={{ background: '#040b18', borderTop: '1px solid rgba(201,168,76,0.1)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand column */}
          <div>
            <VVLogo size={44} variant="wordmark" className="mb-5" />
            <p
              className="leading-relaxed mb-6"
              style={{ color: 'rgba(245,240,232,0.4)', fontSize: '13px' }}
            >
              {isEs
                ? 'No construimos sitios web. Construimos mundos.'
                : "We don't build websites. We build worlds."}
            </p>

            {/* Nonprofit callout */}
            <div
              className="p-3 rounded-xl"
              style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.12)' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: '#4ade80' }}>
                ♥ Indigo Asoul Project / NW Kids
              </p>
              <p style={{ fontSize: '11px', color: 'rgba(245,240,232,0.35)' }}>
                {isEs
                  ? 'Parte de cada suscripción apoya a niños en Puerto Vallarta'
                  : 'Part of every subscription supports children in Puerto Vallarta'}
              </p>
            </div>
          </div>

          {/* Links column */}
          <div>
            <h4
              className="font-bold tracking-widest uppercase mb-6"
              style={{ color: '#c9a84c', fontSize: '10px', letterSpacing: '0.25em' }}
            >
              {isEs ? 'Explora' : 'Explore'}
            </h4>
            <ul className="space-y-4">
              {[
                { label: isEs ? 'Directorio' : 'Directory', to: '/directory' },
                { label: isEs ? 'Atardeceres' : 'Sunsets', to: '/sunsets' },
                { label: isEs ? 'Registrar Negocio' : 'List Business', to: '/claim' },
                { label: isEs ? 'Dejar Reseña' : 'Leave Review', to: '/review' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-vv-gold transition-colors"
                    style={{ color: 'rgba(245,240,232,0.45)', fontSize: '13px' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4
              className="font-bold tracking-widest uppercase mb-6"
              style={{ color: '#c9a84c', fontSize: '10px', letterSpacing: '0.25em' }}
            >
              {isEs ? 'Contacto' : 'Contact'}
            </h4>
            <div className="space-y-4">
              <a
                href="https://instagram.com/verifiedvallarta"
                className="flex items-center gap-3 hover:text-vv-gold transition-colors"
                style={{ color: 'rgba(245,240,232,0.45)', fontSize: '13px' }}
              >
                <Instagram className="w-4 h-4 flex-shrink-0" style={{ color: '#c9a84c' }} />
                @verifiedvallarta
              </a>
            </div>

            <div className="mt-8">
              <Link to="/claim">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:opacity-90 transition-opacity font-semibold tracking-widest uppercase"
                  style={{
                    background: 'linear-gradient(135deg, #c9a84c, #d4b85a)',
                    color: '#0a1628',
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                  }}
                >
                  {isEs ? 'Registrar mi Negocio' : 'List My Business'}
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-10 border-t border-gray-800 text-center md:text-left md:flex md:justify-between text-gray-500 text-sm">
          <div>
            <p>© {year} Verified Vallarta</p>
          </div>
          <nav aria-label={isEs ? 'Confianza y legal' : 'Trust and legal'} className="mt-4 md:mt-0 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/verified" className="hover:text-white">{isEs ? 'Cómo verificamos' : 'How we verify'}</Link>
            <Link to="/how-we-make-money" className="hover:text-white">{isEs ? 'Cómo ganamos dinero' : 'How we make money'}</Link>
            <Link to="/report" className="hover:text-white">{isEs ? 'Reportar un problema' : 'Report a problem'}</Link>
            <Link to="/privacidad" className="hover:text-white">{isEs ? 'Privacidad' : 'Privacy'}</Link>
            <Link to="/terms" className="hover:text-white">{isEs ? 'Términos' : 'Terms'}</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
