import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Filter } from "lucide-react";
import { useDirectoryListings } from "@/hooks/useDirectoryListings";

const Directory = () => {
  const { listings, loading } = useDirectoryListings();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories = ["All", ...Array.from(new Set(listings.map(l => l.category)))];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          listing.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || listing.category === selectedCategory;
    const matchesFeatured = !showFeaturedOnly || listing.isFeatured;

    return matchesSearch && matchesCategory && matchesFeatured;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Sunset Vallarta Private Directory",
          "description": "Curated locals and vetted partners of Sunset Vallarta.",
          "provider": {
            "@type": "Organization",
            "name": "Sunset Vallarta",
            "url": "https://sunsetvallarta.com"
          },
          "about": [
             {"@type": "Thing", "name": "Food & Drink"},
             {"@type": "Thing", "name": "Wellness"},
             {"@type": "Thing", "name": "Experiences"}
          ]
        })}
      </script>
      <Navbar />
      
      <main className="flex-grow pt-24 px-4 md:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Private Directory</h1>
            <p className="text-xl text-gray-600">Curated locals and vetted partners of Sunset Vallarta.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 space-y-6 flex-shrink-0">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <div className="flex items-center gap-2 font-semibold text-lg mb-4">
                  <Filter className="w-5 h-5" /> Filters
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-700">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Search..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-700">Category</label>
                    <div className="space-y-2">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedCategory === cat 
                              ? "bg-ocean-50 text-ocean-700 font-medium" 
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={showFeaturedOnly}
                        onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                        className="rounded border-gray-300 text-ocean-600 focus:ring-ocean-500"
                      />
                      <span className="text-sm text-gray-700">Verified Only</span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Listings Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="mb-4 text-gray-500 text-sm">Showing {filteredListings.length} results</p>
                  
                  {filteredListings.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                      <p className="text-gray-500">No listings found matching your criteria.</p>
                      <Button 
                        variant="link" 
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("All");
                          setShowFeaturedOnly(false);
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredListings.map(listing => (
                        <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow border-gray-100 flex flex-col h-full">
                          <div className="h-48 overflow-hidden relative bg-gray-100">
                            {listing.imageUrl ? (
                              <img 
                                src={listing.imageUrl} 
                                alt={listing.name} 
                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-ocean-50 text-ocean-300">
                                <MapPin className="w-12 h-12" />
                              </div>
                            )}
                            {listing.isFeatured && (
                               <Badge className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 hover:bg-yellow-500 border-none shadow-sm">
                                <Star className="w-3 h-3 mr-1 fill-current" /> Verified
                              </Badge>
                            )}
                          </div>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <Badge variant="outline" className="mb-2 text-xs font-normal text-gray-500 border-gray-200">
                                  {listing.category}
                                </Badge>
                                <CardTitle className="text-xl text-gray-900">{listing.name}</CardTitle>
                              </div>
                            </div>
                            <CardDescription className="flex items-center mt-1 text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" /> {listing.area}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-gray-600 text-sm line-clamp-3">{listing.description}</p>
                            <div className="flex flex-wrap gap-1 mt-3">
                              {listing.tags.map(tag => (
                                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0 mt-auto border-t border-gray-50 p-4 bg-gray-50/50">
                            <div className="flex flex-col gap-2 w-full">
                              {listing.isFeatured ? (
                                 <a 
                                  href={listing.contactUrl || "#"} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="w-full"
                                 >
                                    <Button className="w-full bg-ocean-600 text-white hover:bg-ocean-700">
                                      Visit Website
                                    </Button>
                                 </a>
                              ) : (
                                <Button className="w-full bg-white text-ocean-600 border border-ocean-200 hover:bg-ocean-50 hover:text-ocean-700">
                                  View Details
                                </Button>
                              )}
                              
                              {!listing.isFeatured && (
                                listing.claimStatus === 'claimed' ? (
                                   <a 
                                    href={import.meta.env.VITE_STRIPE_VERIFIED_LINK || "#"} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full"
                                   >
                                     <Button 
                                      className="w-full bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100 mt-2"
                                     >
                                       Upgrade to Verified
                                     </Button>
                                   </a>
                                ) : (
                                  <Button 
                                    variant="link" 
                                    className="text-xs text-gray-400 hover:text-gray-600 h-auto p-0"
                                    onClick={() => window.location.href = `/claim?listing_id=${listing.id}&listing_name=${encodeURIComponent(listing.name)}`}
                                  >
                                    Claim this listing
                                  </Button>
                                )
                              )}
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Directory;
