/**
 * useDirectoryListings — Verified Vallarta™
 * Frontend-only with static mock data.
 */

import { useState, useEffect } from 'react'

export interface DirectoryListing {
  id: string
  nameEn: string
  nameEs: string
  slug: string
  descriptionEn: string
  descriptionEs: string
  category: string
  area: string
  phone: string | null
  whatsappNumber: string | null
  website: string | null
  verified: boolean
  verifiedBy: string | null
  approvalStatus: string
  imageUrls: string[]
  sunsetView: boolean
  luxuryTier: number
  priceRange: string
  bestPhases: string[]
  goldenHourSpecial: string | null
  isFeatured: boolean
  videoReviewCount: number
  avgRating: number
  nonprofitPartner: boolean
}

const MOCK_LISTINGS: DirectoryListing[] = [
  {
    id: '1',
    nameEn: 'La Palapa Restaurant',
    nameEs: 'Restaurante La Palapa',
    slug: 'la-palapa',
    descriptionEn: 'Iconic beachfront dining in the Romantic Zone with stunning sunset views.',
    descriptionEs: 'Restaurante icónico frente al mar en la Zona Romántica con vistas al atardecer.',
    category: 'Restaurant',
    area: 'Romantic Zone',
    phone: '+52 322 222 5225',
    whatsappNumber: '+52 322 222 5225',
    website: 'https://lapalapa.com',
    verified: true,
    verifiedBy: 'Ivette',
    approvalStatus: 'APPROVED',
    imageUrls: ['https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1000'],
    sunsetView: true,
    luxuryTier: 4,
    priceRange: '$$$',
    bestPhases: ['golden', 'night'],
    goldenHourSpecial: 'Complimentary sunset cocktail',
    isFeatured: true,
    videoReviewCount: 12,
    avgRating: 4.8,
    nonprofitPartner: false,
  },
  {
    id: '2',
    nameEn: 'Vallarta Adventures',
    nameEs: 'Aventuras Vallarta',
    slug: 'vallarta-adventures',
    descriptionEn: 'Premium adventure tours including zip-lining, sailing, and whale watching.',
    descriptionEs: 'Tours de aventura premium incluyendo tirolesa, veleros y avistamiento de ballenas.',
    category: 'Experience',
    area: 'Marina Vallarta',
    phone: '+52 322 226 8413',
    whatsappNumber: '+52 322 226 8413',
    website: 'https://vallarta-adventures.com',
    verified: true,
    verifiedBy: 'Ivette',
    approvalStatus: 'APPROVED',
    imageUrls: ['https://images.unsplash.com/photo-1530053969600-caed2596d242?q=80&w=1000'],
    sunsetView: true,
    luxuryTier: 5,
    priceRange: '$$$$',
    bestPhases: ['day', 'golden'],
    goldenHourSpecial: 'Sunset sailing tour',
    isFeatured: true,
    videoReviewCount: 24,
    avgRating: 4.9,
    nonprofitPartner: true,
  },
]

export function useDirectoryListings(filters?: {
  category?: string
  phase?: string
  featured?: boolean
  search?: string
}) {
  const [listings, setListings] = useState<DirectoryListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let filtered = [...MOCK_LISTINGS]

    if (filters?.category && filters.category !== 'All') {
      filtered = filtered.filter(l => l.category === filters.category)
    }
    if (filters?.featured) {
      filtered = filtered.filter(l => l.isFeatured)
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      filtered = filtered.filter(l =>
        l.nameEn.toLowerCase().includes(q) ||
        l.nameEs.toLowerCase().includes(q) ||
        l.descriptionEn.toLowerCase().includes(q) ||
        l.area.toLowerCase().includes(q)
      )
    }

    setListings(filtered)
    setError(null)
    setLoading(false)
  }, [filters?.category, filters?.phase, filters?.featured, filters?.search])

  return { listings, loading, error }
}
