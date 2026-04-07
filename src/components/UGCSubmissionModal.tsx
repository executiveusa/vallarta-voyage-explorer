import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { toast } from "sonner";

export const UGCSubmissionModal = () => {
  const handleClick = () => {
    toast.info("Photo submissions coming soon! Follow us on social media to share your sunset photos.");
  };

  return (
    <Button 
      variant="outline" 
      className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
      onClick={handleClick}
    >
      <Camera className="w-4 h-4" />
      Share Your View
    </Button>
  );
};
