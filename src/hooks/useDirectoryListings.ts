/**
 * useDirectoryListings — Verified Vallarta™
 *
 * Reads from Supabase businesses table.
 * Only returns APPROVED businesses (RLS enforced + client filter).
 * Falls back to empty array if Supabase unavailable.
 *
 * Tablet III: Only verified businesses appear. Always.
 */

import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

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

function mapRow(row: Record<string, unknown>): DirectoryListing {
  return {
    id: String(row.id),
    nameEn: String(row.name_en),
    nameEs: String(row.name_es),
    slug: String(row.slug),
    descriptionEn: String(row.description_en || ''),
    descriptionEs: String(row.description_es || ''),
    category: String(row.category),
    area: String(row.area),
    phone: row.phone ? String(row.phone) : null,
    whatsappNumber: row.whatsapp_number ? String(row.whatsapp_number) : null,
    website: row.website ? String(row.website) : null,
    verified: Boolean(row.verified),
    verifiedBy: row.verified_by ? String(row.verified_by) : null,
    approvalStatus: String(row.approval_status),
    imageUrls: (row.image_urls as string[]) || [],
    sunsetView: Boolean(row.sunset_view),
    luxuryTier: Number(row.luxury_tier) || 3,
    priceRange: String(row.price_range || '$$$'),
    bestPhases: (row.best_phases as string[]) || ['day', 'golden', 'night'],
    goldenHourSpecial: row.golden_hour_special ? String(row.golden_hour_special) : null,
    isFeatured: Boolean(row.is_featured),
    videoReviewCount: Number(row.video_review_count) || 0,
    avgRating: Number(row.avg_rating) || 0,
    nonprofitPartner: Boolean(row.nonprofit_partner),
  }
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
    let cancelled = false

    async function fetchListings() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let query = (supabase as any)
          .from('businesses')
          .select('*')
          .eq('approval_status', 'APPROVED')
          .eq('is_active', true)
          .eq('verified', true)
          .order('is_featured', { ascending: false })
          .order('luxury_tier', { ascending: false })

        if (filters?.category && filters.category !== 'All') {
          query = query.eq('category', filters.category)
        }
        if (filters?.featured) {
          query = query.eq('is_featured', true)
        }
        if (filters?.search) {
          query = query.or(
            `name_en.ilike.%${filters.search}%,name_es.ilike.%${filters.search}%,description_en.ilike.%${filters.search}%,area.ilike.%${filters.search}%`
          )
        }

        const { data, error: sbError } = await query

        if (cancelled) return
        if (sbError) throw sbError

        setListings((data || []).map(mapRow))
        setError(null)
      } catch (err) {
        if (cancelled) return
        console.error('[useDirectoryListings] Supabase error:', err)
        setError('Could not load listings')
        setListings([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchListings()
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.category, filters?.phase, filters?.featured, filters?.search])

  return { listings, loading, error }
}
