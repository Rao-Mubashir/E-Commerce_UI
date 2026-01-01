import { motion } from 'motion/react';
import { useStore } from '../store';
import { ProductCard } from '../components/ProductCard';
import { OfferCard } from '../components/OfferCard';
import { Stethoscope, Sparkles, Truck, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';

interface HomePageProps {
  onNavigate?: (page: string, id?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { menuItems, offers, addToCart, addOfferToCart } = useStore();
  const activeOffers = offers.filter(o => o.active);
  const sliderRef = useRef<Slider>(null);

  const handleCardClick = (type: 'menu' | 'offer', id: string) => {
    if (onNavigate) {
      onNavigate(type === 'menu' ? 'product-details' : 'offer-details', id);
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: Math.min(3, activeOffers.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, activeOffers.length),
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative bg-emerald-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1979&auto=format&fit=crop"
            alt="Medical Hero"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/80 backdrop-blur-[1px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-emerald-200/20"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span className="text-sm font-medium text-emerald-50">Trusted • Certified • Fast Delivery</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Health,
              <br />
              <span className="text-white">Our Priority</span>
            </h1>
            <p className="text-lg sm:text-xl text-emerald-100/90 mb-8 max-w-2xl mx-auto">
              Get genuine medicines, supplements, and healthcare products delivered safely to your doorstep with MediCare.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-emerald-50 bg-white/5 py-4 px-6 rounded-2xl border border-white/10 w-fit mx-auto">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-400" />
                <span>Express Delivery</span>
              </div>
              <div className="w-px h-4 bg-white/20 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-emerald-400" />
                <span>Expert Pharmacists</span>
              </div>
              <div className="w-px h-4 bg-white/20 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>100% Genuine</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offers Section */}
      {activeOffers.length > 0 && (
        <section className="py-12 sm:py-16 overflow-hidden bg-white">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-emerald-800 px-4"
            >
              Healthcare Deals
            </motion.h2>

            <div className="relative">
              {/* Carousel */}
              <div className="max-w-[95vw] sm:max-w-7xl mx-auto">
                <Slider ref={sliderRef} {...sliderSettings} className="offer-carousel mb-8">
                  {activeOffers.map((offer) => (
                    <div key={offer.id} className="px-2 sm:px-4 py-4">
                      <OfferCard
                        offer={offer}
                        onAddToCart={addOfferToCart}
                        onClick={() => handleCardClick('offer', offer.id)}
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-center gap-4 px-4">
                <button
                  className="bg-white shadow-lg rounded-full p-3 hover:bg-emerald-600 hover:text-white transition-all duration-300 border border-gray-100 hover:border-emerald-600 active:scale-95"
                  onClick={() => sliderRef.current?.slickPrev()}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <div className="flex gap-2">
                  {activeOffers.map((_, index) => (
                    <button
                      key={index}
                      className="w-2 h-2 rounded-full bg-gray-200 hover:bg-emerald-500 transition-all duration-300"
                      onClick={() => sliderRef.current?.slickGoTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  className="bg-white shadow-lg rounded-full p-3 hover:bg-emerald-600 hover:text-white transition-all duration-300 border border-gray-100 hover:border-emerald-600 active:scale-95"
                  onClick={() => sliderRef.current?.slickNext()}
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Menu Items Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-emerald-800">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <ProductCard
                  item={item}
                  onAddToCart={addToCart}
                  onClick={() => handleCardClick('menu', item.id)}
                />
              </motion.div>
            ))}
          </div>

          {menuItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Stethoscope className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No products available yet.</p>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}