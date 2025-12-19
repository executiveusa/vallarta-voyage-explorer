import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SpotVibe = 'Chill' | 'Party' | 'Romantic' | 'Crowded' | 'Adventure';
export type AccessType = 'Public' | 'Private' | 'Restaurant' | 'Hike';

export interface SunsetSpot {
  id: string;
  slug: string;
  name: string;
  description: string;
  area: string;
  coordinates: { lat: number; lng: number };
  imageUrl: string;
  vibe: SpotVibe;
  accessType: AccessType;
  bestTimeOffsetMinutes: number;
  tips: string[];
}

const MOCK_SPOTS: SunsetSpot[] = [
  {
    id: "1",
    slug: "los-muertos-pier",
    name: "Los Muertos Pier",
    description: "The iconic sail-shaped pier lights up beautifully at dusk. Perfect for people-watching and capturing the classic Vallarta silhouette.",
    area: "Romantic Zone",
    coordinates: { lat: 20.6033, lng: -105.2397 },
    imageUrl: "https://images.unsplash.com/photo-1565624796698-316886acbd7c?q=80&w=1000&auto=format&fit=crop",
    vibe: "Crowded",
    accessType: "Public",
    bestTimeOffsetMinutes: -15,
    tips: ["Arrive early for a bench seat", "Great for panoramic photos"]
  },
  {
    id: "2",
    slug: "mirador-cerro-de-la-cruz",
    name: "Mirador Cerro de La Cruz",
    description: "The highest viewpoint in Centro, offering sweeping 360-degree views of the bay and the mountains. A steep climb but worth every step.",
    area: "Centro",
    coordinates: { lat: 20.6099, lng: -105.2319 },
    imageUrl: "https://images.unsplash.com/photo-1570737142750-324c4786422d?q=80&w=1000&auto=format&fit=crop",
    vibe: "Adventure",
    accessType: "Hike",
    bestTimeOffsetMinutes: -45,
    tips: ["Bring water for the climb", "Sunset light hits the church towers perfectly"]
  },
  {
    id: "3",
    slug: "conchas-chinas-beach",
    name: "Conchas Chinas Beach",
    description: "A series of hidden coves and rock pools just south of the main city. Quiet, pristine, and incredibly romantic.",
    area: "Conchas Chinas",
    coordinates: { lat: 20.5925, lng: -105.2433 },
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    vibe: "Romantic",
    accessType: "Public",
    bestTimeOffsetMinutes: -30,
    tips: ["Watch the tide pools reflect the sky", "Bring a picnic"]
  },
  {
    id: "4",
    slug: "el-barracuda",
    name: "El Barracuda",
    description: "Laid-back beachfront dining where you can stick your toes in the sand while sipping a margarita as the sun dips.",
    area: "5 de Diciembre",
    coordinates: { lat: 20.6186, lng: -105.2325 },
    imageUrl: "https://images.unsplash.com/photo-1544144433-d50bc5b552cc?q=80&w=1000&auto=format&fit=crop",
    vibe: "Party",
    accessType: "Restaurant",
    bestTimeOffsetMinutes: -60,
    tips: ["Reservations recommended for front-row tables", "Try the seafood tacos"]
  },
  {
    id: "5",
    slug: "colomitos-beach",
    name: "Colomitos Beach",
    description: "Mexico's smallest beach, accessible only by hike or water taxi. A jungle paradise framing the sunset.",
    area: "South Shore",
    coordinates: { lat: 20.5065, lng: -105.2950 },
    imageUrl: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1000&auto=format&fit=crop",
    vibe: "Adventure",
    accessType: "Hike",
    bestTimeOffsetMinutes: -90, // Need time to get back!
    tips: ["Leave before it gets fully dark if hiking", "Water taxi is safer for return"]
  },
  {
    id: "6",
    slug: "barcelona-tapas",
    name: "Barcelona Tapas",
    description: "Rooftop dining with an expansive view over the terracotta roofs of Centro and the entire bay.",
    area: "5 de Diciembre",
    coordinates: { lat: 20.6139, lng: -105.2308 },
    imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop",
    vibe: "Romantic",
    accessType: "Restaurant",
    bestTimeOffsetMinutes: -45,
    tips: ["Ask for a railing table", "Great sangria"]
  },
  {
    id: "7",
    slug: "marina-lighthouse",
    name: "Marina Lighthouse Bar",
    description: "Elevated view looking out over the yachts and the bay entrance. Sophisticated and chill.",
    area: "Marina Vallarta",
    coordinates: { lat: 20.6676, lng: -105.2497 },
    imageUrl: "https://images.unsplash.com/photo-1566421948332-9cb7e7191146?q=80&w=1000&auto=format&fit=crop",
    vibe: "Chill",
    accessType: "Restaurant",
    bestTimeOffsetMinutes: -20,
    tips: ["Perfect for watching cruise ships depart", "Happy hour often coincides with sunset"]
  },
  {
    id: "8",
    slug: "yelapa-main-beach",
    name: "Yelapa Main Beach",
    description: "A remote fishing village bay. The angle of the sun setting over the distant point is magical.",
    area: "Yelapa",
    coordinates: { lat: 20.4897, lng: -105.4419 },
    imageUrl: "https://images.unsplash.com/photo-1534008897969-31763dbd4c5b?q=80&w=1000&auto=format&fit=crop",
    vibe: "Chill",
    accessType: "Public",
    bestTimeOffsetMinutes: 0,
    tips: ["Requires a boat trip", "Stay overnight for the best experience"]
  }
];

export const useSunsetSpots = () => {
  const [spots, setSpots] = useState<SunsetSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpots() {
      try {
        const { data, error } = await supabase
          .from('sunset_spots')
          .select(`*, places(*)`);

        if (error || !data || data.length === 0) {
          console.warn('Using mock data for sunset spots due to empty DB or error:', error);
          setSpots(MOCK_SPOTS);
          return;
        }

        // Flatten the relationship for the UI
        const flattenedSpots: SunsetSpot[] = data.map((item: any) => ({
          id: item.id,
          slug: item.places.slug,
          name: item.places.name,
          description: item.places.description || "",
          area: item.places.area,
          coordinates: item.places.coordinates 
            ? { lat: item.places.coordinates.coordinates[1], lng: item.places.coordinates.coordinates[0] } // Parse PostGIS Point
            : { lat: 0, lng: 0 },
          imageUrl: item.image_url || "",
          vibe: item.vibe as SpotVibe,
          accessType: item.access_type as AccessType,
          bestTimeOffsetMinutes: item.best_time_offset_minutes || 0,
          tips: item.tips || []
        }));

        setSpots(flattenedSpots);
        
      } catch (err) {
        console.error('Supabase fetch error, fallback to mock:', err);
        setSpots(MOCK_SPOTS);
      } finally {
        setLoading(false);
      }
    }

    fetchSpots();
  }, []);

  const getSpotBySlug = (slug: string) => {
    return spots.find(spot => spot.slug === slug);
  };

  const getFeaturedSpots = () => {
    return spots.slice(0, 3);
  };

  return {
    spots,
    loading,
    getSpotBySlug,
    getFeaturedSpots
  };
};
