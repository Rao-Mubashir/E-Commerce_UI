import { motion } from 'motion/react';
import { Tag, ShoppingCart, Percent, Timer } from 'lucide-react';
import { Offer } from '../types';

interface OfferCardProps {
  offer: Offer;
  onAddToCart?: (offer: Offer) => void;
  onClick?: () => void;
}

export function OfferCard({ offer, onAddToCart, onClick }: OfferCardProps) {
  const discountedPrice = offer.originalPrice * (1 - offer.discount / 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="relative rounded-[2rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row bg-white h-full cursor-pointer"
    >
      {/* Image Section - Stacked on Mobile, Left Side on Desktop */}
      <div className="relative w-full sm:w-2/5 h-48 sm:h-auto min-h-[12rem] overflow-hidden flex-shrink-0">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-80" />

        {/* Discount Badge */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <div className="bg-white/95 backdrop-blur-md text-emerald-600 px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-1.5 border border-white/50">
            <Percent className="w-4 h-4 fill-current" />
            <span>{offer.discount}% OFF</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative w-full sm:w-3/5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white to-gray-50 flex-1">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm mb-3">
            <Tag className="w-4 h-4" />
            <span className="uppercase tracking-wider text-xs font-bold">Limited Offer</span>
          </div>

          <h3 className="font-bold text-2xl mb-3 text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight">
            {offer.title}
          </h3>

          <p className="text-gray-600 leading-relaxed">
            {offer.description}
          </p>
        </div>

        <div>
          {offer.originalPrice > 0 && (
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-lg text-gray-400 line-through decoration-2">
                ${offer.originalPrice.toFixed(2)}
              </span>
            </div>
          )}

          {onAddToCart && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(offer);
              }}
              className="w-full bg-emerald-600 text-white py-3.5 px-6 rounded-xl hover:bg-emerald-700 active:scale-95 transition-all duration-300 font-bold shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2.5 group/btn"
            >
              <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
