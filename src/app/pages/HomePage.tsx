import { motion } from 'motion/react';
import { useStore } from '../store';
import { ProductCard } from '../components/ProductCard';
import { OfferCard } from '../components/OfferCard';
import { ChefHat, Sparkles, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';

export function HomePage() {
  const { menuItems, offers, addToCart, addOfferToCart } = useStore();
  const activeOffers = offers.filter(o => o.active);
  const sliderRef = useRef<Slider>(null);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: Math.min(3, activeOffers.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
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
      <section className="relative bg-gray-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1703797967065-539818bc9770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHRhYmxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjcxNjg5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Restaurant Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-900/70 backdrop-blur-[2px]" />
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Fresh • Delicious • Fast Delivery</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Delicious Food,
              <br />
              <span className="text-indigo-200">Delivered Fast</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8">
              Experience culinary excellence with our handcrafted dishes made from the finest ingredients
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>30 min delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5" />
                <span>Expert chefs</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-indigo-300 text-indigo-300" />
                <span>4.9 rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offers Section */}
      {activeOffers.length > 0 && (
        <section className="py-12 sm:py-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-indigo-600 px-4"
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #4f46e5, #7c3aed, #4f46e5)',
                  backgroundSize: '200% auto',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Special Offers
              </motion.span>
            </motion.h2>

            <div className="relative">
              {/* Carousel */}
              <div className="max-w-[95vw] sm:max-w-7xl mx-auto">
                <Slider ref={sliderRef} {...sliderSettings} className="offer-carousel mb-8">
                  {activeOffers.map((offer) => (
                    <div key={offer.id} className="px-2 sm:px-4 py-4">
                      <OfferCard offer={offer} onAddToCart={addOfferToCart} />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-center gap-4 px-4">
                <button
                  className="bg-white shadow-lg rounded-full p-3 hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-gray-200 hover:border-indigo-600 active:scale-95"
                  onClick={() => sliderRef.current?.slickPrev()}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <div className="flex gap-2">
                  {activeOffers.map((_, index) => (
                    <button
                      key={index}
                      className="w-2 h-2 rounded-full bg-gray-300 hover:bg-indigo-600 transition-all duration-300"
                      onClick={() => sliderRef.current?.slickGoTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  className="bg-white shadow-lg rounded-full p-3 hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-gray-200 hover:border-indigo-600 active:scale-95"
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
          <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
            Our Menu
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <ProductCard item={item} onAddToCart={addToCart} />
              </motion.div>
            ))}
          </div>

          {menuItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <ChefHat className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No menu items available yet.</p>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}