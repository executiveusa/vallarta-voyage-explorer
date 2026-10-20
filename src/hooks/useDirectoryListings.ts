/**
 * useDirectoryListings — Verified Vallarta™
 * No listings are published yet. Returns an empty list until a real,
 * reviewed data source exists. No placeholder businesses.
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
    let filtered: DirectoryListing[] = []

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
