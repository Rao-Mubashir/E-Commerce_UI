import { Plus, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { motion } from 'motion/react';
import { useState } from 'react';

interface ProductCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export function ProductCard({ item, onAddToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {item.category && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs rounded-full">
            {item.category}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{item.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-gray-900">
            ${item.price.toFixed(2)}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span className="text-sm">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}