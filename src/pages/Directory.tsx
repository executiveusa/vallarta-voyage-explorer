/**
 * Directory — Verified Vallarta™
 *
 * The verified luxury directory of Puerto Vallarta.
 * Tablet III enforced at data layer — only APPROVED businesses shown.
 *
 * Features: bilingual, category filter, search, nonprofit callout
 * UDEC target: 9.0/10
 */

import { useState } from 'react'
import { Search } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BusinessCard } from '@/components/BusinessCard'
import { VVLogo, VerifiedBadge } from '@/components/VVLogo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useLang } from '@/context/LanguageContext'
import { useDirectoryListings } from '@/hooks/useDirectoryListings'

const CATEGORIES = ['All', 'Hotel', 'Restaurant', 'Bar', 'Tour', 'Spa', 'Experience']
const CATEGORY_ES: Record<string, string> = {
  All: 'Todos', Hotel: 'Hoteles', Restaurant: 'Restaurantes',
  Bar: 'Bares', Tour: 'Tours', Spa: 'Spa', Experience: 'Experiencias',
}

export default function Directory() {
  const { lang } = useLang()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const { listings, loading, error } = useDirectoryListings({
    category: category !== 'All' ? category : undefined,
    search: search || undefined,
  })

  const categoryLabel = (c: string) => lang === 'es' ? (CATEGORY_ES[c] || c) : c
  const isEs = lang === 'es'

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#060d1a' }}>
      <Navbar />

      <main className="flex-grow pt-24 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6">
              <VVLogo size={56} variant="mark" />
            </div>
            <h1
              className="mb-3"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#f5f0e8',
              }}
            >
              {isEs ? 'Directorio Verificado' : 'Verified Directory'}
            </h1>
            <p
              className="max-w-xl mx-auto mb-6"
              style={{ fontSize: '15px', letterSpacing: '0.04em', color: 'rgba(245,240,232,0.45)' }}
            >
              {isEs
                ? 'Cada negocio vetado personalmente por nuestro equipo. Solo lugares reales.'
                : 'Every business personally vetted by our team. Real places only.'}
            </p>
            <VerifiedBadge size="lg" />
          </div>

          {/* Nonprofit callout */}
          <div
            className="mb-10 p-5 rounded-2xl flex items-center justify-between flex-wrap gap-4"
            style={{
              background: 'rgba(74,222,128,0.05)',
              border: '1px solid rgba(74,222,128,0.15)',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💚</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#4ade80' }}>
                  {isEs ? 'Proyecto Indigo Asoul / NW Kids' : 'Indigo Asoul Project / NW Kids'}
                </p>
                <p className="text-xs" style={{ color: 'rgba(245,240,232,0.45)' }}>
                  {isEs
                    ? 'Parte de cada suscripción apoya a niños en Puerto Vallarta'
                    : 'Part of every subscription supports children in Puerto Vallarta'}
                </p>
              </div>
            </div>
            <a href="/claim">
              <Button
                size="sm"
                className="rounded-full font-semibold px-4"
                style={{
                  background: 'rgba(74,222,128,0.12)',
                  border: '1px solid rgba(74,222,128,0.3)',
                  color: '#4ade80',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {isEs ? 'Únete y Dona' : 'Join & Donate'}
              </Button>
            </a>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: 'rgba(245,240,232,0.25)' }}
              />
              <Input
                placeholder={isEs ? 'Buscar negocios, zonas...' : 'Search businesses, areas...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 rounded-xl h-11 text-sm"
                style={{
                  background: 'rgba(15,26,46,0.8)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: '#f5f0e8',
                }}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="px-4 py-2 rounded-xl font-medium tracking-widest uppercase transition-all"
                  style={{
                    background: category === cat
                      ? 'linear-gradient(135deg, #c9a84c, #d4b85a)'
                      : 'rgba(15,26,46,0.8)',
                    color: category === cat ? '#0a1628' : 'rgba(245,240,232,0.55)',
                    border: category === cat ? 'none' : '1px solid rgba(201,168,76,0.15)',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                  }}
                >
                  {categoryLabel(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {!loading && (
            <p
              className="mb-6 tracking-widest uppercase"
              style={{ color: 'rgba(245,240,232,0.3)', letterSpacing: '0.2em', fontSize: '10px' }}
            >
              {listings.length} {isEs ? 'negocios verificados' : 'verified businesses'}
            </p>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-96 rounded-2xl"
                  style={{ background: 'rgba(15,26,46,0.8)' }}
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p style={{ color: '#ed6a5a' }}>{error}</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-20">
              <VVLogo size={48} variant="mark" className="mx-auto mb-4 opacity-30" />
              <p style={{ color: 'rgba(245,240,232,0.35)' }}>
                {isEs
                  ? 'No encontramos negocios con esos filtros'
                  : 'No businesses match those filters'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <BusinessCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
