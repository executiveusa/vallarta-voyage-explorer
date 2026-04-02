/**
 * BusinessCard — Verified Vallarta™
 *
 * Luxury card for directory listings.
 * Shows: image, VV verified badge, name, category, area,
 *        price range, rating, golden hour special, WhatsApp CTA.
 *
 * WhatsApp button is THE primary CTA — it fires leads directly.
 * UDEC target: 9.0/10
 */

import { ExternalLink, MessageCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VerifiedBadge } from '@/components/VVLogo'
import { useLang } from '@/context/LanguageContext'
import { buildWhatsAppLink, buildBusinessWhatsAppMessage } from '@/lib/whatsapp'
import type { DirectoryListing } from '@/hooks/useDirectoryListings'

interface BusinessCardProps {
  listing: DirectoryListing
}

const CATEGORY_ICONS: Record<string, string> = {
  Hotel: '🏨',
  Restaurant: '🍽️',
  Bar: '🍸',
  Tour: '⛵',
  Spa: '🧘',
  Experience: '✨',
  Shop: '🛍️',
  Transport: '🚤',
}

export function BusinessCard({ listing }: BusinessCardProps) {
  const { lang, t } = useLang()

  const name = lang === 'es' ? listing.nameEs : listing.nameEn
  const description = lang === 'es' ? listing.descriptionEs : listing.descriptionEn
  const imageUrl = listing.imageUrls[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800'
  const icon = CATEGORY_ICONS[listing.category] || '✨'

  const waLink = listing.whatsappNumber
    ? buildWhatsAppLink(
        listing.whatsappNumber,
        buildBusinessWhatsAppMessage(name, lang),
      )
    : null

  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      style={{
        background: '#0f1a2e',
        border: '1px solid rgba(201, 168, 76, 0.15)',
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a2e] via-transparent to-transparent opacity-80" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {listing.verified && <VerifiedBadge size="sm" />}
          {listing.isFeatured && (
            <span
              className="px-2 py-0.5 rounded-full font-bold tracking-widest uppercase"
              style={{
                background: 'rgba(10,22,40,0.8)',
                color: '#c9a84c',
                border: '1px solid rgba(201,168,76,0.3)',
                fontSize: '9px',
              }}
            >
              Destacado
            </span>
          )}
          {listing.nonprofitPartner && (
            <span
              className="px-2 py-0.5 rounded-full font-bold tracking-widest uppercase"
              style={{
                background: 'rgba(10,22,40,0.8)',
                color: '#4ade80',
                border: '1px solid rgba(74,222,128,0.3)',
                fontSize: '9px',
              }}
            >
              ♥ NW Kids
            </span>
          )}
        </div>

        {/* Sunset view */}
        {listing.sunsetView && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)' }}
          >
            <span style={{ fontSize: '10px' }}>🌅</span>
            <span style={{ fontSize: '9px', color: '#c9a84c', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Vista</span>
          </div>
        )}

        {/* Category chip */}
        <div className="absolute bottom-3 left-3">
          <span
            className="font-medium tracking-wider uppercase px-2 py-1 rounded-full"
            style={{ background: 'rgba(10,22,40,0.85)', color: '#f5f0e8', fontSize: '10px' }}
          >
            {icon} {listing.category} · {listing.area}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name + price */}
        <div className="flex items-start justify-between mb-2">
          <h3
            className="font-semibold leading-tight flex-1 pr-2"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.1rem',
              color: '#f5f0e8',
            }}
          >
            {name}
          </h3>
          <span className="text-xs font-mono flex-shrink-0 mt-0.5" style={{ color: '#c9a84c' }}>
            {listing.priceRange}
          </span>
        </div>

        {/* Stars */}
        {listing.videoReviewCount > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star
                  key={i}
                  className="w-3 h-3"
                  fill={i <= Math.round(listing.avgRating) ? '#c9a84c' : 'transparent'}
                  stroke="#c9a84c"
                />
              ))}
            </div>
            <span style={{ fontSize: '10px', color: 'rgba(245,240,232,0.5)' }}>
              {listing.videoReviewCount} {t('dir.review_count')}
            </span>
          </div>
        )}

        {/* Description */}
        <p
          className="mb-4 leading-relaxed"
          style={{ fontSize: '13px', lineHeight: 1.55, color: 'rgba(245,240,232,0.55)' }}
        >
          {description?.slice(0, 110)}{(description?.length ?? 0) > 110 ? '...' : ''}
        </p>

        {/* Golden hour special */}
        {listing.goldenHourSpecial && (
          <div
            className="mb-4 px-3 py-2 rounded-lg flex items-start gap-2"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
          >
            <span style={{ fontSize: '11px' }}>🌅</span>
            <span style={{ fontSize: '11px', color: 'rgba(201,168,76,0.9)' }}>{listing.goldenHourSpecial}</span>
          </div>
        )}

        {/* CTAs */}
        <div className="flex gap-2">
          {waLink ? (
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button
                className="w-full rounded-xl font-semibold tracking-widest uppercase py-2.5 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                }}
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                {t('dir.whatsapp')}
              </Button>
            </a>
          ) : (
            <div className="flex-1">
              <Button
                variant="outline"
                className="w-full rounded-xl font-medium tracking-wider uppercase py-2.5"
                style={{
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: 'rgba(201,168,76,0.4)',
                  background: 'transparent',
                  fontSize: '10px',
                }}
                disabled
              >
                Sin WhatsApp aún
              </Button>
            </div>
          )}

          {listing.website && (
            <a href={listing.website} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl flex-shrink-0"
                style={{
                  border: '1px solid rgba(245,240,232,0.12)',
                  color: '#f5f0e8',
                  background: 'transparent',
                  width: '38px',
                  height: '38px',
                }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
