import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { useSunsetSpots } from "@/hooks/useSunsetSpots";
import { useDirectoryListings } from "@/hooks/useDirectoryListings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Info, ArrowLeft, Star, Navigation } from "lucide-react";

const SunsetSpotDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getSpotBySlug } = useSunsetSpots();
  const { listings } = useDirectoryListings();

  const spot = getSpotBySlug(slug || "");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!spot) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Spot Not Found</h1>
            <p className="text-gray-600 mb-8">The sunset spot you are looking for doesn't exist or has moved.</p>
            <Button onClick={() => navigate('/sunsets')}>Return to Tracker</Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Filter nearby partners (same area), fallback to featured if none
  const nearbyListings = listings.filter(l => l.area === spot.area);
  const displayListings = nearbyListings.length > 0 ? nearbyListings : listings.filter(l => l.isFeatured).slice(0, 3);
  const isFallback = nearbyListings.length === 0;

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Place", "TouristAttraction"],
          "name": spot.name,
          "description": spot.description,
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": spot.coordinates.lat,
            "longitude": spot.coordinates.lng
          },
          "image": spot.imageUrl,
          "address": {
             "@type": "PostalAddress",
             "addressLocality": "Puerto Vallarta",
             "addressRegion": "Jalisco",
             "addressCountry": "MX",
             "streetAddress": spot.area // Placeholder until full address data available
          },
          "publicAccess": spot.accessType === 'Public',
          "touristType": "Sunset Viewing"
        })}
      </script>
      <Navbar />
      
      <main>
        {/* Full-width Hero Image */}
        <div className="relative h-[50vh] min-h-[400px]">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src={spot.imageUrl} 
            alt={spot.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 px-6 md:px-12 max-w-7xl mx-auto">
            <Link to="/sunsets" className="text-white/80 hover:text-white mb-6 flex items-center gap-2 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Back to Tracker
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-ocean-600 text-white hover:bg-ocean-700 border-none text-base py-1 px-3">
                {spot.area}
              </Badge>
              <Badge variant="outline" className="text-white border-white bg-white/10 backdrop-blur-sm text-base py-1 px-3">
                {spot.vibe}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{spot.name}</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Spot</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {spot.description}
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-ocean-50 p-6 rounded-2xl border border-ocean-100">
                 <div className="flex items-center gap-3 mb-3 text-ocean-800 font-semibold">
                   <Clock className="w-5 h-5" /> Best Arrival Time
                 </div>
                 <p className="text-ocean-700">
                   Plan to arrive <strong>{Math.abs(spot.bestTimeOffsetMinutes)} minutes</strong> before sunset for the best experience.
                 </p>
               </div>
               <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                 <div className="flex items-center gap-3 mb-3 text-gray-800 font-semibold">
                   <Navigation className="w-5 h-5" /> Access Type
                 </div>
                 <p className="text-gray-700">
                   {spot.accessType} access. {spot.tips[0]}
                 </p>
               </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-ocean-600" /> Insider Tips
              </h3>
              <ul className="space-y-3">
                {spot.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 mt-2.5 flex-shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

            <ApprovedFeed spotId={spot.id} />
      
            {/* Nearby verified partners module */}
            <section className="pt-8 border-t border-gray-100">
              <div className="flex justify-between items-end mb-6">
                <div>
                   <h3 className="text-2xl font-bold text-gray-900">
                     {isFallback ? "Recommended Nearby" : `Verified Partners in ${spot.area}`}
                   </h3>
                   <p className="text-gray-500 mt-1">
                     {isFallback ? "Explore featured partners while you're in the area." : "Extend your evening at these approved locations."}
                   </p>
                </div>
                <Link to="/directory">
                  <Button variant="ghost" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50">
                    View full directory
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayListings.map((listing) => (
                  <Card key={listing.id} className="hover:shadow-md transition-shadow border-gray-200">
                    <CardContent className="p-4 flex gap-4 items-center">
                       <div className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                         {listing.imageUrl ? (
                           <img src={listing.imageUrl} alt={listing.name} className="w-full h-full object-cover" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                             <MapPin className="w-8 h-8" />
                           </div>
                         )}
                       </div>
                       <div>
                         <h4 className="font-bold text-gray-900">{listing.name}</h4>
                         <p className="text-sm text-gray-500 mb-1">{listing.category} • {listing.area}</p>
                         {listing.isFeatured && (
                           <span className="inline-flex items-center text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full font-medium">
                             <Star className="w-3 h-3 mr-1 fill-current" /> Featured
                           </span>
                         )}
                       </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
             <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Want a VIP View?</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Our concierge can reserve the best table or a private boat for this exact spot.
                </p>
                <div className="space-y-3">
                  <a href="/#booking" className="block">
                    <Button className="w-full bg-ocean-600 hover:bg-ocean-700 text-white shadow-md">
                      Book a Guide
                    </Button>
                  </a>
                  <Link to="/directory" className="block">
                    <Button variant="outline" className="w-full border-ocean-200 text-ocean-700 hover:bg-ocean-50">
                      Browse Directory
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-center text-gray-400 mt-4">
                  Free cancellation up to 24h before.
                </p>
             </div>
          </div>

        </div>
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default SunsetSpotDetail;
