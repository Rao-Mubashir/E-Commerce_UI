import { ShoppingCart, Menu, X, Pill, Activity } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { cart } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { label: 'Home', value: 'home' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-emerald-600/30">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-lg hidden sm:block text-gray-900 tracking-tight">MediCare</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`relative transition-colors font-medium ${currentPage === item.value
                  ? 'text-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {item.label}
                {currentPage === item.value && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Cart Icon */}
          <button
            onClick={() => onNavigate('cart')}
            className="relative p-2 rounded-xl hover:bg-emerald-50 transition-colors group"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-emerald-700" />
            {cartItemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center shadow-lg"
              >
                {cartItemCount}
              </motion.span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-green-100 bg-white/90 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map(item => (
                <button
                  key={item.value}
                  onClick={() => {
                    onNavigate(item.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors font-medium ${currentPage === item.value
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-600 hover:bg-emerald-50/50'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
