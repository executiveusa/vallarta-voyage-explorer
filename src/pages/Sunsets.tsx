import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { useSunsetSpots } from "@/hooks/useSunsetSpots";
import { useShareCard } from "@/hooks/useShareCard";
import { UGCSubmissionModal } from "@/components/UGCSubmissionModal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ApprovedFeed } from "@/components/ApprovedFeed";
import { Share2, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ShareCardButton = ({ spotName, area, imageUrl, isForecast = false }) => {
    const { drawForecastCard, drawSpotCard } = useShareCard();
    
    const handleShare = async () => {
       let blob;
       let shareTitle;
       let fileName;
       let analyticsEvent;

       if (isForecast) {
         blob = await drawForecastCard("02:45:12", "7:00 PM"); // Mock times for now, would be better to pass real props
         shareTitle = 'Sunset Vallarta Forecast';
         fileName = 'sunset-forecast.png';
         analyticsEvent = { name: "share_forecast", properties: { type: "forecast" } };
       } else {
         blob = await drawSpotCard(spotName, area, imageUrl);
         shareTitle = `Sunset Spot: ${spotName}`;
         fileName = `sunset-spot-${spotName.toLowerCase().replace(/\s/g, '-')}.png`;
         analyticsEvent = { name: "share_spot", properties: { spot: spotName } };
       }
       
       if (!blob) return;

       if (navigator.share) {
         const file = new File([blob], fileName, { type: 'image/png' });
         try {
           await navigator.share({
             title: 'Sunset Vallarta Forecast',
             files: [file]
           });
         } catch (e) {
           console.log('Share canceled', e);
         }
       } else {
         // Fallback: Download
         const url = URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.href = url;
         a.download = 'sunset-forecast.png';
         a.click();
         toast.success("Image downloaded!");
       }
       
       // Track
       import("@/lib/analytics").then(({ trackEvent }) => trackEvent("share_forecast", { type: "forecast" }));
    };

    return (
      <Button onClick={handleShare} variant="outline" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm">
        <Share2 className="w-4 h-4" />
        Share Forecast
      </Button>
    );
};

const Sunsets = () => {
  const { spots } = useSunsetSpots();
  const [timeLeft, setTimeLeft] = useState("");

  // Simple countdown mock to next "sunset" (approx 7 PM)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const sunset = new Date();
      sunset.setHours(19, 0, 0, 0); // 7:00 PM today

      if (now > sunset) {
        // If past sunset, show for tomorrow
        sunset.setDate(sunset.getDate() + 1);
      }

      const diff = sunset.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      return `${hours}h ${minutes}m`;
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Today's Sunset in Vallarta",
          "description": "Real-time sunset forecasts and curated viewing spots in Puerto Vallarta.",
          "mainEntity": {
             "@type": "ItemList",
             "itemListElement": spots.map((spot, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://sunsetvallarta.com/sunset-spots/${spot.slug}`
             }))
          }
        })}
      </script>
      <Navbar />
      
      <main>
        {/* Full-width Hero */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-900 z-0 animate-gradient-x bg-[length:200%_200%]"></div>
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Today's Sunset in Vallarta
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-xl mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <Clock className="w-5 h-5" />
                <span>Sunset: <strong>7:00 PM</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                 <span>Countdown: <strong>{timeLeft}</strong></span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <ShareCardButton />
              <UGCSubmissionModal />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          
          {/* Main Grid */}
          <div className="mb-12 text-center md:text-left">
             <h2 className="text-3xl font-bold text-gray-900">Best Spots Tonight</h2>
             <p className="text-gray-600 mt-2">Curated locations based on crowd forecasts and visibility.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {spots.map((spot) => (
              <Card key={spot.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                   <img 
                    src={spot.imageUrl} 
                    alt={spot.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                   <div className="absolute top-3 right-3">
                     <Badge className="bg-black/50 backdrop-blur-md border-none text-white hover:bg-black/60">
                       {spot.vibe}
                     </Badge>
                   </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1 group-hover:text-ocean-600 transition-colors">
                        <Link to={`/sunset-spots/${spot.slug}`} className="hover:underline">
                          {spot.name}
                        </Link>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {spot.area}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm line-clamp-2">{spot.description}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to={`/sunset-spots/${spot.slug}`} className="w-full">
                     <Button variant="outline" className="w-full group-hover:bg-ocean-50 border-ocean-100 text-ocean-700">
                       View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                     </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Map Placeholder */}
          <section className="mb-20">
            <div className="bg-gray-100 rounded-3xl p-8 md:p-12 text-center border-2 border-dashed border-gray-300 relative overflow-hidden">
               <div className="relative z-10">
                 <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                 <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Map Coming Soon</h3>
                 <p className="text-gray-600 max-w-md mx-auto">
                   We are mapping every secret rooftop and hidden beach coordinate. Check back shortly for the full interactive experience.
                 </p>
               </div>
               {/* Decorative background pattern */}
               <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-100"></div>
            </div>
          </section>

          <ApprovedFeed />

          {/* CTA Block */}
          <section className="bg-ocean-900 text-white rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the sunset like a local VIP</h2>
              <p className="text-white/80 text-lg mb-8">
                Don't just watch from the sidewalk. Book a private boat or reserve a front-row concierge table.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/#booking">
                   <Button size="lg" className="bg-white text-ocean-900 hover:bg-gray-100 rounded-full px-8 text-lg font-semibold w-full sm:w-auto">
                     Plan a private sunset cruise
                   </Button>
                </a>
                <Link to="/directory?category=Food%20%26%20Drink">
                   <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 text-lg w-full sm:w-auto">
                     Find unparalleled dining views
                   </Button>
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Sunsets;
