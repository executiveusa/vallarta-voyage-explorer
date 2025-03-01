
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  // Redirect authenticated users to home page
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="hidden lg:block rounded-3xl overflow-hidden h-[600px] shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1588461256558-cbe667ee7008?q=80&w=2574&auto=format&fit=crop" 
                alt="Puerto Vallarta sunset view" 
                className="w-full h-full object-cover"
              />
              <div className="absolute left-8 bottom-8 z-20 text-white">
                <h3 className="text-3xl font-bold mb-2">VISIT VALLARTA</h3>
                <p className="max-w-sm text-white/80">
                  Sign in to book your next adventure and explore the beautiful destinations of Puerto Vallarta.
                </p>
              </div>
            </div>

            {/* Right side - Auth form */}
            <div>
              <AuthForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
