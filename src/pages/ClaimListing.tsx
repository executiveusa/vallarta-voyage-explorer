import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, Info } from "lucide-react";

const ClaimListing = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const listingId = searchParams.get("listing_id");
  const listingName = searchParams.get("listing_name") || "this listing";
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    proof_text: ""
  });

  useEffect(() => {
    if (!listingId) {
      toast.error("No listing specified to claim.");
      navigate("/directory");
    }
  }, [listingId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('listing_claims')
        .insert({
          listing_id: listingId,
          name: formData.name,
          email: formData.email,
          proof_text: formData.proof_text,
          status: 'pending'
        });

      if (error) throw error;

      toast.success("Claim submitted successfully! Our team will review your request.");
      // Navigate to success state or show payment link
      setIsSuccess(true); 

    } catch (error) {
      console.error('Claim submission error:', error);
      toast.error("There was a problem submitting your claim. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 px-6 md:px-12 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full border border-gray-100">
           <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-12 h-12 bg-ocean-100 text-ocean-600 rounded-full mb-4">
               <ShieldCheck className="w-6 h-6" />
             </div>
             <h1 className="text-2xl font-bold text-gray-900">Claim {listingName}</h1>
             <p className="text-gray-600 mt-2">
               Verify your ownership to unlock premium features and manage your presence on Sunset Vallarta.
             </p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
               <Input 
                 name="name"
                 value={formData.name} 
                 onChange={handleInputChange} 
                 required 
                 placeholder="Full Name"
                 className="rounded-lg"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
               <Input 
                 name="email" 
                 type="email"
                 value={formData.email} 
                 onChange={handleInputChange} 
                 required 
                 placeholder="owner@business.com"
                 className="rounded-lg"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                 Proof of Ownership <Info className="inline w-3 h-3 text-gray-400 ml-1" />
               </label>
               <Textarea 
                 name="proof_text"
                 value={formData.proof_text}
                 onChange={handleInputChange}
                 required
                 placeholder="Describe your role or provide a verification link (e.g. LinkedIn, official website footer)."
                 className="rounded-lg resize-none"
                 rows={4}
               />
             </div>

             <Button 
               type="submit" 
               disabled={isSubmitting}
               className="w-full bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg py-6"
             >
               {isSubmitting ? "Submitting..." : "Submit Claim Request"}
             </Button>
           </form>

           <div className="mt-6 text-center text-sm text-gray-500">
             By claiming this listing, you agree to our Terms of Service.
           </div>
           
           {isSuccess && (
             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
               <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
                 <ShieldCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                 <h2 className="text-2xl font-bold mb-2">Claim Received!</h2>
                 <p className="text-gray-600 mb-6">
                   To get verified immediately and unlock premium features, activate your Verified Partner status now.
                 </p>
                 <a 
                   href={import.meta.env.VITE_STRIPE_VERIFIED_LINK || "#"} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="block mb-3"
                 >
                   <Button className="w-full bg-ocean-600 hover:bg-ocean-700 text-white py-6 text-lg">
                     Become a Verified Partner ($49/mo)
                   </Button>
                 </a>
                 <Button variant="ghost" onClick={() => navigate("/directory")}>
                   No thanks, I'll wait for manual review
                 </Button>
               </div>
             </div>
           )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClaimListing;
