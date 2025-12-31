import { Store, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigation = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <Store className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-lg text-white">FoodHub</span>
            </div>
            <p className="text-sm">
              Delicious food delivered fresh to your doorstep. Quality ingredients, exceptional taste.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={handleNavigation('about')} className="hover:text-indigo-300 transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={handleNavigation('home')} className="hover:text-indigo-300 transition-colors text-left">
                  Menu
                </button>
              </li>
              <li>
                <button onClick={handleNavigation('home')} className="hover:text-indigo-300 transition-colors text-left">
                  Offers
                </button>
              </li>
              <li>
                <button onClick={handleNavigation('contact')} className="hover:text-indigo-300 transition-colors text-left">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={handleNavigation('privacy')} className="hover:text-indigo-300 transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={handleNavigation('terms')} className="hover:text-indigo-300 transition-colors text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={handleNavigation('refund')} className="hover:text-indigo-300 transition-colors text-left">
                  Refund Policy
                </button>
              </li>
              <li>
                <button onClick={handleNavigation('cookies')} className="hover:text-indigo-300 transition-colors text-left">
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-300" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-300" />
                <span>hello@foodhub.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-300 mt-1" />
                <span>123 Food Street<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2025 FoodHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}