import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Camera, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSunsetSpots } from "@/hooks/useSunsetSpots";

export const UGCSubmissionModal = () => {
  const { spots } = useSunsetSpots();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [file, setFile] = useState<File | null>(null);
  const [spotId, setSpotId] = useState("");
  const [caption, setCaption] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size too large. Max 5MB.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent fail
    
    // Cooldown check (simple localstorage)
    const lastUpload = localStorage.getItem("last_sunset_upload");
    if (lastUpload && Date.now() - parseInt(lastUpload) < 1000 * 60 * 10) { // 10 min
      toast.error("Please wait a few minutes before posting again.");
      return;
    }

    if (!file || !spotId) {
      toast.error("Please select a spot and a photo.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload Image
      const fileExt = file.name.split('.').pop();
      const fileName = `${spotId}/${crypto.randomUUID()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('ugc-sunsets')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Insert DB Record
      const { error: dbError } = await supabase
        .from('sunset_photos')
        .insert({
          sunset_spot_id: spotId,
          image_path: fileName,
          caption: caption,
          status: 'pending'
        });

      if (dbError) throw dbError;

      // Success
      localStorage.setItem("last_sunset_upload", Date.now().toString());
      setIsSuccess(true);
      toast.success("Photo submitted! It will appear after moderation.");
      
      // Delay and close
      setTimeout(() => {
        setIsOpen(false);
        // Reset form
        setIsSuccess(false);
        setFile(null);
        setSpotId("");
        setCaption("");
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to upload photo. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm">
          <Camera className="w-4 h-4" />
          Share Your View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white text-gray-900">
        <DialogHeader>
          <DialogTitle>{isSuccess ? "Submission Received!" : "Post a Sunset"}</DialogTitle>
          <DialogDescription>
             {isSuccess 
               ? "Thanks for sharing. Your photo is now pending moderation." 
               : "Show off tonight's view. Photos are moderated before appearing in the feed."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-green-600">
            <CheckCircle className="w-16 h-16 mb-4" />
            <p className="font-semibold">Great shot!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
             {/* Honeypot */}
             <input type="text" className="hidden" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />

            <div className="space-y-2">
              <Label>Select Spot</Label>
              <Select onValueChange={setSpotId} value={spotId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Where are you?" />
                </SelectTrigger>
                <SelectContent>
                  {spots.map(spot => (
                    <SelectItem key={spot.id} value={spot.id}>{spot.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Photo</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors relative">
                <Input 
                  type="file" 
                  accept="image/png, image/jpeg, image/webp"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  required
                />
                {file ? (
                  <span className="text-sm font-medium text-ocean-600">{file.name}</span>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Tap to upload (max 5MB)</span>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Caption (Optional)</Label>
              <Textarea 
                placeholder="How's the vibe tonight?" 
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={140}
                className="resize-none"
              />
            </div>

            <Button type="submit" className="w-full bg-ocean-600 hover:bg-ocean-700 text-white" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Share Photo"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
