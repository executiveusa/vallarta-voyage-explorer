/**
 * Navbar — Verified Vallarta™
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/directory"
                className={cn(
                  "font-medium transition-colors hover:text-ocean-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-ocean-600 after:transition-all",
                  scrolled ? "text-gray-800" : "text-gray-900"
                )}
              >
                Directory
              </Link>
            </li>
            <li>
              <Link
                to="/sunsets"
                className={cn(
                  "font-medium transition-colors hover:text-ocean-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-ocean-600 after:transition-all",
                  scrolled ? "text-gray-800" : "text-gray-900"
                )}
              >
                Tracker
              </Link>
            </li>
            <li>
              <a
                href="/#tours"
                className={cn(
                  "font-medium transition-colors hover:text-ocean-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-ocean-600 after:transition-all",
                  scrolled ? "text-gray-800" : "text-gray-900"
                )}
              >
                Tours
              </a>
            </li>
            <li>
              <a
                href="/#booking"
                className={cn(
                  "font-medium transition-colors hover:text-ocean-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-ocean-600 after:transition-all",
                  scrolled ? "text-gray-800" : "text-gray-900"
                )}
              >
                Book
              </a>
            </li>
          </ul>
          <LangToggle />
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

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden pt-24 px-8",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <ul className="flex flex-col space-y-6">
          <li>
            <Link to="/directory" className="text-xl font-medium text-gray-800 hover:text-ocean-600" onClick={() => setOpen(false)}>
              Directory
            </Link>
          </li>
          <li>
            <Link to="/sunsets" className="text-xl font-medium text-gray-800 hover:text-ocean-600" onClick={() => setOpen(false)}>
              Tracker
            </Link>
          </li>
          <li>
            <a href="/#tours" className="text-xl font-medium text-gray-800 hover:text-ocean-600" onClick={() => setOpen(false)}>
              Tours
            </a>
          </li>
          <li>
            <a href="/#booking" className="text-xl font-medium text-gray-800 hover:text-ocean-600" onClick={() => setOpen(false)}>
              Book
            </a>
          </li>
        </ul>
        <div className="mt-8 flex items-center gap-4">
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
