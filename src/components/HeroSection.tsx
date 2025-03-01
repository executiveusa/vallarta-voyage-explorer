
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const scrollToTours = () => {
    const toursSection = document.getElementById("tours");
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle video load event
  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // Preload the video to improve chances of loading
      video.preload = "auto";
      
      // Add load and playing event listeners
      const handleCanPlayThrough = () => {
        console.log("Video can play through");
        setVideoLoaded(true);
        // Start playing once it's ready
        video.play().catch(err => console.error("Video play failed:", err));
      };
      
      const handleError = (e: ErrorEvent) => {
        console.error("Video error:", e);
      };
      
      video.addEventListener("canplaythrough", handleCanPlayThrough);
      video.addEventListener("error", handleError);
      
      // Force load attempt
      video.load();
      
      return () => {
        video.removeEventListener("canplaythrough", handleCanPlayThrough);
        video.removeEventListener("error", handleError);
      };
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video with Fallback Image */}
      <div className="absolute inset-0 z-0">
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-transparent z-10"></div>
        
        {/* Fallback image (always displayed as base layer) */}
        <img
          src="https://images.unsplash.com/photo-1555246718-89f3da74553c?q=80&w=2070&auto=format&fit=crop"
          alt="Puerto Vallarta coastline"
          className="object-cover w-full h-full"
        />
        
        {/* Video Background */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className={`object-cover w-full h-full absolute inset-0 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: "opacity 1s ease-in-out" }}
        >
          <source src="https://storage.googleapis.com/lovable-public-assets/puerto-vallarta-beach.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
        <div className="animate-fade-up opacity-0" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
            Explore Puerto Vallarta with us
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl mx-auto mb-6 animate-fade-up opacity-0" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
          <span className="text-balance">Discover the Magic of Puerto Vallarta</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90 animate-fade-up opacity-0" style={{ animationDelay: "700ms", animationFillMode: "forwards" }}>
          Unforgettable experiences and breathtaking adventures await in Mexico's Pacific paradise
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0" style={{ animationDelay: "900ms", animationFillMode: "forwards" }}>
          <Button 
            size="lg" 
            className="bg-ocean-600 hover:bg-ocean-700 text-white rounded-full px-8 py-6 text-base"
            onClick={scrollToTours}
          >
            Explore Tours
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-full px-8 py-6 text-base"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-floating cursor-pointer" 
        onClick={scrollToTours}
      >
        <ChevronDown className="w-10 h-10 text-white" />
      </div>
    </section>
  );
};

export default HeroSection;
