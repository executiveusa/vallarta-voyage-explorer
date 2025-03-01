
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, KeyRound, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type AuthMode = "signin" | "signup";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast.success("Welcome back!");
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast.success("Account created! Check your email to confirm your sign up.");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-xl bg-white">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {mode === "signin" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          {mode === "signin" 
            ? "Sign in to access your VISIT VALLARTA account" 
            : "Join us to explore the best of Puerto Vallarta"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 py-6 rounded-xl"
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="relative">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 py-6 rounded-xl"
            minLength={6}
          />
          <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-ocean-600 hover:bg-ocean-700 text-white py-6 rounded-xl"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === "signin" ? "Signing in..." : "Creating account..."}
            </>
          ) : (
            mode === "signin" ? "Sign In" : "Create Account"
          )}
        </Button>

        <div className="text-center mt-4">
          <button 
            type="button"
            onClick={toggleMode}
            className="text-sm text-ocean-600 hover:text-ocean-800 font-medium"
          >
            {mode === "signin" 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
