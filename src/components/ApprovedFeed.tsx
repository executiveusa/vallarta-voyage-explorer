import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CommunityPhoto {
  id: string;
  image_path: string;
  caption: string;
}

export const ApprovedFeed = ({ spotId }: { spotId?: string }) => {
  const [photos, setPhotos] = useState<CommunityPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        let query = supabase
          .from('sunset_photos')
          .select('id, image_path, caption')
          .eq('status', 'approved')
          .order('created_at', { ascending: false })
          .limit(12);

        if (spotId) {
          query = query.eq('sunset_spot_id', spotId);
        }

        const { data, error } = await query;
        if (error) throw error;
        setPhotos(data || []);
      } catch (err) {
        console.error('Error fetching feed:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [spotId]);

  if (loading) return <div className="p-8 text-center text-gray-400">Loading community photos...</div>;
  if (photos.length === 0) return null; // Hide section if empty

  return (
    <section className="py-12">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 px-6 max-w-7xl mx-auto">
        {spotId ? "Community Photos" : "Latest Community Sunsets"}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 max-w-7xl mx-auto">
        {photos.map((photo) => (
          <div key={photo.id} className="relative aspect-square group overflow-hidden rounded-xl bg-gray-100">
             <img 
               src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/ugc-sunsets/${photo.image_path}`} 
               alt={photo.caption || "Community sunset photo"}
               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
             />
             {photo.caption && (
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                 <p className="text-white text-sm font-medium line-clamp-2">{photo.caption}</p>
               </div>
             )}
          </div>
        ))}
      </div>
    </section>
  );
};
