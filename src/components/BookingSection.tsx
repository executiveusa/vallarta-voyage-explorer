import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Users, Phone, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"; // Add useSearchParams
import { supabase } from "@/integrations/supabase/client";

const BookingSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams(); // Add search params
  const attributedListingId = searchParams.get("listing_id");

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    date: "",
    guests: "",
    message: "",
    // Honeypot field (hidden from users)
    company_website: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Honeypot check
    if (formData.company_website) {
      // Spam detected - silently fail success
      toast.success("Your booking request has been sent! We'll contact you soon.");
      setFormData({ name: "", email: "", phone: "", date: "", guests: "", message: "", company_website: "" });
      setIsSubmitting(false);
      return;
    }
    
    // 2. Insert into Supabase
    try {
      const { error } = await supabase
        .from('booking_intents')
        .insert({
          name: formData.name,
          contact_email: formData.email,
          phone: formData.phone,
          date: formData.date ? new Date(formData.date) : null,
          guests: formData.guests ? parseInt(formData.guests) : null,
          message: formData.message,
          source_path: location.pathname + location.hash,
          source_type: 'concierge_form',
          attributed_listing_id: attributedListingId || null // Capture attribution
        });

      if (error) throw error;

      toast.success("Your booking request has been sent! We'll contact you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: user?.email || "",
        phone: "",
        date: "",
        guests: "",
        message: "",
        company_website: ""
      });

    } catch (error) {
      console.error('Booking submission error:', error);
      toast.error("There was a problem sending your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="rounded-3xl overflow-hidden h-[500px] shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1964&auto=format&fit=crop" 
              alt="Puerto Vallarta sunset view" 
              className="w-full h-full object-cover"
            />
            <div className="absolute left-8 bottom-8 z-20 text-white">
              <h3 className="text-3xl font-bold mb-2">Your Private Concierge</h3>
              <p className="max-w-sm text-white/80">
                Contact us for custom sunset itineraries and special requests. We're here to create your perfect vacation.
              </p>
            </div>
          </div>

          {/* Right side - Booking form */}
          <div>
            <div className="mb-10">
              <span className="text-sm font-medium text-ocean-600 tracking-wide uppercase">
                Start Your Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">
                Ready for an adventure?
              </h2>
              <p className="text-gray-600">
                Fill out the form below, and we'll help you plan your perfect Puerto Vallarta sunset experience.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Honeypot Field - Hidden */}
               <div className="hidden">
                 <label htmlFor="company_website">Website</label>
                 <input
                   type="text"
                   id="company_website"
                   name="company_website"
                   value={formData.company_website}
                   onChange={handleInputChange}
                   tabIndex={-1}
                   autoComplete="off"
                 />
               </div>

              <div>
                <Input
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl py-6"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl py-6 pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <div className="relative">
                  <Input
                    placeholder="Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="rounded-xl py-6 pl-10"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    placeholder="Preferred Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="rounded-xl py-6"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <div className="relative">
                  <Input
                    placeholder="Number of Guests"
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    min="1"
                    className="rounded-xl py-6 pl-10"
                  />
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <Textarea
                  placeholder="Tell us about your preferred tours or any special requests"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="rounded-xl resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-ocean-600 hover:bg-ocean-700 text-white rounded-full py-6 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Request"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
