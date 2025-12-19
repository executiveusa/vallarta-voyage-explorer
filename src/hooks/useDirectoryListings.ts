import { useState, useEffect } from "react";

export interface DirectoryListing {
  id: string;
  name: string;
  category: string;
  area: string;
  description: string;
  tags: string[];
  isFeatured: boolean;
  imageUrl?: string;
  contactUrl?: string;
}

// Mock data
const MOCK_LISTINGS: DirectoryListing[] = [
  {
    id: "1",
    name: "La Palapa",
    category: "Food & Drink",
    area: "Romantic Zone",
    description: "Iconic beachfront dining with elegant Mexican cuisine and perfect sunset views.",
    tags: ["Beachfront", "Fine Dining", "Sunset"],
    isFeatured: true,
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "El Mirador",
    category: "Experiences",
    area: "Centro",
    description: "A hidden lookout point perfect for private sunset viewing away from the crowds.",
    tags: ["Viewpoint", "Hidden Gem", "Photography"],
    isFeatured: true,
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Vallarta Adventures",
    category: "Experiences",
    area: "Marina Vallarta",
    description: "Premier tour operator offering luxury sailing and wildlife encounters.",
    tags: ["Adventure", "Sailing", "Wildlife"],
    isFeatured: false,
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Cafe des Artistes",
    category: "Food & Drink",
    area: "Centro",
    description: "French cuisine with Mexican inspiration in a lush garden setting.",
    tags: ["Fine Dining", "Romantic", "Garden"],
    isFeatured: true,
    imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Olas Altas Wellness",
    category: "Wellness",
    area: "Romantic Zone",
    description: "Holistic spa treatments and yoga sessions by the sea.",
    tags: ["Spa", "Yoga", "Relaxation"],
    isFeatured: false,
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop"
  }
];

export const useDirectoryListings = () => {
  const [listings, setListings] = useState<DirectoryListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with Supabase query
    // const { data, error } = await supabase.from("directory_listings").select("*");
    
    // Simulate API call
    const timer = setTimeout(() => {
      setListings(MOCK_LISTINGS);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { listings, loading };
};
