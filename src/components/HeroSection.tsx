import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToTours = () => {
    const toursSection = document.getElementById("tours");
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 z-10"></div>
        <img
          src="/pv-sunset.jpg"
          onError={(e) => {
             e.currentTarget.src = "https://images.unsplash.com/photo-1555246718-89f3da74553c?q=80&w=2070&auto=format&fit=crop";
          }}
          alt="Puerto Vallarta sunset"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white flex flex-col items-center justify-center h-full pt-20">
        <div className="animate-fade-up opacity-0" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            Sunset Vallarta
          </h1>
        </div>
        
        <div className="animate-fade-up opacity-0" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-white/90 font-light">
            Capture your sunset, follow the hidden routes, and unlock curated local experiences.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0" style={{ animationDelay: "700ms", animationFillMode: "forwards" }}>
          <Button 
            size="lg" 
            className="bg-ocean-600 hover:bg-ocean-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            onClick={scrollToTours}
          >
            Open sunset tracker
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-transparent border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg backdrop-blur-sm"
            onClick={() => navigate("/directory")}
          >
            Explore private directory
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce cursor-pointer opacity-80 hover:opacity-100 transition-opacity" 
        onClick={scrollToTours}
      >
        <ChevronDown className="w-10 h-10 text-white" />
      </div>
    </section>
  );
};

export default HeroSection;
