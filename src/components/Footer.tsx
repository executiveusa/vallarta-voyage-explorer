
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1 - Company */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              <span className="text-ocean-400">SUNSET</span> VALLARTA
            </h3>
            <p className="text-gray-400 mb-6">
              Private sunsets, hidden streets, and curated Vallarta experiences.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-gray-800 p-2 rounded-full hover:bg-ocean-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 p-2 rounded-full hover:bg-ocean-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 p-2 rounded-full hover:bg-ocean-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "Tours", "About Us", "Destinations", "Gallery", "FAQ"].map((item) => (
                <li key={item}>
                  <a 
                    href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Popular Tours */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Popular Tours</h4>
            <ul className="space-y-4">
              {[
                "Turtle Release Experience", 
                "Hidden Beach Excursion", 
                "Jungle ATV Adventure",
                "Luxury Sailing & Snorkeling",
                "Tequila Tasting Journey"
              ].map((item) => (
                <li key={item}>
                  <a 
                    href="/#tours"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-ocean-400 mr-3 mt-0.5" />
                <span className="text-gray-400">
                  123 Malecón, Zona Romántica,<br />
                  Puerto Vallarta, Jalisco, Mexico
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-ocean-400 mr-3" />
                <a href="tel:+523221234567" className="text-gray-400 hover:text-white">
                  +52 322 123 4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-ocean-400 mr-3" />
                <a href="mailto:info@visitvallarta.com" className="text-gray-400 hover:text-white">
                  info@visitvallarta.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-10 border-t border-gray-800 text-center md:text-left md:flex md:justify-between text-gray-500 text-sm">
          <div>
            <p>© {currentYear} Sunset Vallarta. All rights reserved.</p>
            <p className="mt-1 text-ocean-400 font-medium">Hosted by Effrian</p>
          </div>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
