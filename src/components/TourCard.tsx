
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tour } from "@/assets/tour-data";
import { cn } from "@/lib/utils";

interface TourCardProps {
  tour: Tour;
  featured?: boolean;
}

const TourCard = ({ tour, featured = false }: TourCardProps) => {
  return (
    <div 
      className={cn(
        "tour-card rounded-2xl overflow-hidden bg-white shadow-sm h-full flex flex-col",
        featured ? "md:col-span-2" : ""
      )}
    >
      <div className="image-hover-zoom relative h-64">
        <img 
          src={tour.image} 
          alt={tour.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-ocean-800">
            {tour.category}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-sand-400/90 text-sand-900">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">{tour.duration}</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-sand-500 fill-sand-500 mr-1" />
            <span className="text-sm font-medium">{tour.rating}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{tour.name}</h3>
        
        <p className="text-gray-600 mb-6 text-sm flex-grow">{tour.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-ocean-800">${tour.price}</span>
          <Button 
            className="rounded-full px-5 bg-ocean-600 hover:bg-ocean-700 text-white"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
