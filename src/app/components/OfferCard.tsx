import { motion } from 'motion/react';
import { Tag, ShoppingCart } from 'lucide-react';
import { Offer } from '../types';

interface OfferCardProps {
  offer: Offer;
  onAddToCart?: (offer: Offer) => void;
}

export function OfferCard({ offer, onAddToCart }: OfferCardProps) {
  const discountedPrice = offer.originalPrice * (1 - offer.discount / 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-2xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {offer.discount > 0 && (
          <div className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
            {offer.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-5 bg-gradient-to-br from-indigo-50/90 to-purple-50/90 backdrop-blur-sm flex flex-col flex-1">
        <div className="flex items-start gap-2 flex-1 mb-4">
          <Tag className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1 text-gray-900">{offer.title}</h3>
            <p className="text-sm text-gray-700 line-clamp-2">{offer.description}</p>
          </div>
        </div>

        {offer.originalPrice > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-500 text-sm line-through">${offer.originalPrice.toFixed(2)}</span>
              <span className="text-indigo-600 font-bold">${discountedPrice.toFixed(2)}</span>
            </div>
          </div>
        )}

        {onAddToCart && (
          <button
            onClick={() => onAddToCart(offer)}
            className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-xl hover:bg-indigo-700 transition-colors duration-300 font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        )}
      </div>
    </motion.div>
  );
}