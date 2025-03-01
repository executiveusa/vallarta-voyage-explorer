
export interface Tour {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  category: string;
  featured?: boolean;
}

export const tours: Tour[] = [
  {
    id: "tour-1",
    name: "Turtle Release Experience",
    description: "Join a guided tour to help baby sea turtles reach the ocean safely. This unforgettable experience connects you with nature's most heartwarming conservation efforts.",
    image: "https://images.unsplash.com/photo-1591025207163-942350e47db2?q=80&w=2066&auto=format&fit=crop",
    price: 50,
    duration: "2 hours",
    rating: 4.9,
    category: "Nature",
    featured: true
  },
  {
    id: "tour-2",
    name: "Hidden Beach Excursion",
    description: "Explore the famous Marietas Islands and its hidden beach. Discover this natural wonder created by volcanic activity and protected as a national park.",
    image: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=1936&auto=format&fit=crop",
    price: 120,
    duration: "6 hours",
    rating: 4.8,
    category: "Adventure",
    featured: true
  },
  {
    id: "tour-3",
    name: "Jungle ATV Adventure",
    description: "Ride through the Sierra Madre jungle trails on an exciting ATV tour. Experience the thrill of off-roading while taking in breathtaking mountain and ocean views.",
    image: "https://images.unsplash.com/photo-1561119245-fea0f19de5a7?q=80&w=2070&auto=format&fit=crop",
    price: 90,
    duration: "4 hours",
    rating: 4.7,
    category: "Adventure"
  },
  {
    id: "tour-4",
    name: "Rhythms of the Night",
    description: "Experience a magical evening with dinner and a spectacular show on a secluded beach accessible only by boat, illuminated by thousands of candles.",
    image: "https://images.unsplash.com/photo-1564594985205-4024bb3a0b6c?q=80&w=2787&auto=format&fit=crop",
    price: 135,
    duration: "5 hours",
    rating: 4.9,
    category: "Cultural",
    featured: true
  },
  {
    id: "tour-5",
    name: "Luxury Sailing & Snorkeling",
    description: "Sail along the stunning coastline aboard a luxury catamaran, with stops for snorkeling at the best reefs in the bay. Includes gourmet lunch and premium open bar.",
    image: "https://images.unsplash.com/photo-1606131731446-5568d87113aa?q=80&w=2864&auto=format&fit=crop",
    price: 110,
    duration: "7 hours",
    rating: 4.8,
    category: "Water"
  },
  {
    id: "tour-6",
    name: "Tequila Tasting Journey",
    description: "Discover the art of tequila making with a guided tour of an authentic distillery, followed by a tasting of premium tequilas paired with regional cuisine.",
    image: "https://images.unsplash.com/photo-1516535794938-6063878f08cc?q=80&w=2944&auto=format&fit=crop",
    price: 75,
    duration: "3 hours",
    rating: 4.6,
    category: "Food & Drink"
  }
];
