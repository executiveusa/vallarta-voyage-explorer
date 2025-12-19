
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import UserMenuButton from "@/components/UserMenuButton";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-ocean-800 tracking-tight relative z-10"
        >
          <span className="text-ocean-600">SUNSET</span> VALLARTA
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/directory"
                className={cn(
                  "font-medium transition-colors hover:text-ocean-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-ocean-600 after:transition-all",
                  isScrolled ? "text-gray-800" : "text-gray-900"
                )}
              >
                Directory
              </Link>
            </li>
            <li>
              <Link
                to="/sunsets"
                className={cn(
                  "font-medium transition-colors hover:text-ocean-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-ocean-600 after:transition-all",
                  isScrolled ? "text-gray-800" : "text-gray-900"
                )}
              >
                Tracker
              </Link>
            </li>
            {["Tours", "About", "Destinations", "Gallery"].map((item) => (
              <li key={item}>
                <a
                  href={`/#${item.toLowerCase()}`}
                  className={cn(
                    "font-medium transition-colors hover:text-ocean-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-ocean-600 after:transition-all",
                    isScrolled ? "text-gray-800" : "text-gray-900"
                  )}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <UserMenuButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden pt-24 px-8",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <ul className="flex flex-col space-y-6">
            <li>
              <Link
                to="/directory"
                className="text-xl font-medium text-gray-800 hover:text-ocean-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Directory
              </Link>
            </li>
            <li>
              <Link
                to="/sunsets"
                className="text-xl font-medium text-gray-800 hover:text-ocean-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tracker
              </Link>
            </li>
            {["Tours", "About", "Destinations", "Gallery"].map((item) => (
              <li key={item}>
                <a
                  href={`/#${item.toLowerCase()}`}
                  className="text-xl font-medium text-gray-800 hover:text-ocean-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-ocean-600 hover:bg-ocean-700 text-white rounded-full">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
