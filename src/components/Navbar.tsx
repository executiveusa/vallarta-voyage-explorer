/**
 * Navbar — Verified Vallarta™
 *
 * Design: Transparent → navy glass on scroll
 * Logo: VV wordmark
 * Links: Directory | Sunsets | Tours | About
 * Right: Lang toggle + Claim CTA + Auth
 * Mobile: Full-screen navy overlay
 *
 * UDEC targets: TYP 9/10, CLR 9/10, ACC 9/10
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { VVLogo } from '@/components/VVLogo'
import { LangToggle } from '@/components/LangToggle'
import { useLang } from '@/context/LanguageContext'
import UserMenuButton from '@/components/UserMenuButton'

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: t('nav.directory'), to: '/directory' },
    { label: t('nav.sunsets'), to: '/sunsets' },
    { label: t('nav.tours'), href: '/#tours' },
    { label: t('nav.about'), href: '/#about' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out py-4 px-6 md:px-10',
        scrolled ? 'vv-glass shadow-lg shadow-black/20' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative z-10 flex-shrink-0">
          <VVLogo size={36} variant="wordmark" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.to ? (
                <Link
                  to={link.to}
                  className="font-medium tracking-wider uppercase transition-colors duration-200 hover:text-vv-gold"
                  style={{
                    color: scrolled ? '#f5f0e8' : 'rgba(245,240,232,0.9)',
                    letterSpacing: '0.12em',
                    fontSize: '11px',
                  }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="font-medium tracking-wider uppercase transition-colors duration-200 hover:text-vv-gold"
                  style={{
                    color: scrolled ? '#f5f0e8' : 'rgba(245,240,232,0.9)',
                    letterSpacing: '0.12em',
                    fontSize: '11px',
                  }}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-4">
          <LangToggle />
          <Link to="/claim">
            <Button
              size="sm"
              className="rounded-full font-semibold px-5"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #d4b85a)',
                color: '#0a1628',
                border: 'none',
                letterSpacing: '0.12em',
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            >
              {t('nav.claim')}
            </Button>
          </Link>
          <UserMenuButton />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden relative z-50 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{ color: '#f5f0e8' }}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out flex flex-col justify-center items-center gap-8',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: '#0a1628' }}
      >
        <Link to="/" onClick={() => setOpen(false)}>
          <VVLogo size={60} variant="mark" />
        </Link>

        {navLinks.map((link) =>
          link.to ? (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className="text-xl font-light tracking-widest uppercase hover:text-vv-gold transition-colors"
              style={{ color: '#f5f0e8', letterSpacing: '0.25em', fontFamily: 'Cormorant Garamond, serif' }}
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-xl font-light tracking-widest uppercase hover:text-vv-gold transition-colors"
              style={{ color: '#f5f0e8', letterSpacing: '0.25em', fontFamily: 'Cormorant Garamond, serif' }}
            >
              {link.label}
            </a>
          )
        )}

        <div className="flex items-center gap-4 mt-4">
          <LangToggle />
          <Link to="/claim" onClick={() => setOpen(false)}>
            <Button
              size="sm"
              className="rounded-full font-semibold px-5"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #d4b85a)',
                color: '#0a1628',
                border: 'none',
                letterSpacing: '0.12em',
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            >
              {t('nav.claim')}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
