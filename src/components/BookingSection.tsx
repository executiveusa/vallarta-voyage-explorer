
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Users, Phone, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const BookingSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    date: "",
    guests: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.info("Please sign in to submit your booking request");
      navigate("/auth");
      return;
    }
    
    console.log("Form submitted:", formData);
    toast.success("Your booking request has been sent! We'll contact you soon.");
    
    // Reset form
    setFormData({
      name: "",
      email: user?.email || "",
      phone: "",
      date: "",
      guests: "",
      message: ""
    });
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
                    readOnly={!!user}
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
                className="w-full bg-ocean-600 hover:bg-ocean-700 text-white rounded-full py-6 flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
