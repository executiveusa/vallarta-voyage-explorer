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
          src="https://images.unsplash.com/photo-1555246718-89f3da74553c?q=80&w=2070&auto=format&fit=crop"
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
            className="bg-ocean-600 hover:bg-ocean-700 text-white rounded-xl px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            onClick={scrollToTours}
          >
            Open sunset tracker
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-transparent border-white text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg backdrop-blur-sm"
            onClick={() => navigate("/directory")}
          >
            Explore private directory
          </Button>
        </div>
      </div>

      {/* Trust signals */}
      <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-6 pb-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-white/80 text-sm">
          <svg className="w-4 h-4 fill-sand-400 text-sand-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <span>4.9 avg rating</span>
        </div>
        <span className="text-white/40 hidden sm:inline">·</span>
        <span className="text-white/80 text-sm">2,400+ experiences booked</span>
        <span className="text-white/40 hidden sm:inline">·</span>
        <span className="text-white/80 text-sm">Local guides since 2019</span>
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
