
import { useState } from "react";
import TourCard from "./TourCard";
import { Button } from "@/components/ui/button";
import { tours } from "@/assets/tour-data";

const categories = ["All", "Adventure", "Nature", "Cultural", "Water", "Food & Drink"];

const ToursSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleTours, setVisibleTours] = useState(6);

  const filteredTours = activeCategory === "All" 
    ? tours 
    : tours.filter(tour => tour.category === activeCategory);

  const handleLoadMore = () => {
    setVisibleTours(prev => Math.min(prev + 3, filteredTours.length));
  };

  return (
    <section id="tours" className="py-24 px-6 md:px-10 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-sm font-medium text-ocean-600 tracking-wide uppercase">
            Sunset Vallarta Originals
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">
            Private Sunsets & Hidden Routes
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover our handpicked selection of extraordinary tours and activities that showcase the best of Puerto Vallarta's hidden gems.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setVisibleTours(6);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-ocean-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.slice(0, visibleTours).map((tour) => (
            <div 
              key={tour.id}
              className={tour.featured ? "lg:col-span-2" : ""}
            >
              <TourCard tour={tour} featured={tour.featured} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleTours < filteredTours.length && (
          <div className="text-center mt-16">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="rounded-full px-8 py-6 border-ocean-200 text-ocean-800 hover:bg-ocean-50"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ToursSection;
