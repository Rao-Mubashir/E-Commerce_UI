import { ArrowLeft, ShoppingCart, Star, Truck, ShieldCheck } from 'lucide-react';
import { useStore } from '../store';
import { motion } from 'motion/react';
import { MenuItem, Offer } from '../types';

interface ProductDetailsPageProps {
    id: string;
    type: 'menu' | 'offer';
    onNavigate: (page: string) => void;
}

export function ProductDetailsPage({ id, type, onNavigate }: ProductDetailsPageProps) {
    const { menuItems, offers, addToCart, addOfferToCart } = useStore();

    const item = type === 'menu'
        ? menuItems.find(i => i.id === id)
        : offers.find(o => o.id === id);

    if (!item) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                <button
                    onClick={() => onNavigate('home')}
                    className="text-emerald-600 font-medium hover:underline flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </button>
            </div>
        );
    }

    const isOffer = (i: typeof item): i is Offer => type === 'offer';

    const handleAddToCart = () => {
        if (isOffer(item)) {
            addOfferToCart(item);
        } else {
            addToCart(item as MenuItem);
        }
    };

    const price = isOffer(item)
        ? item.originalPrice * (1 - item.discount / 100)
        : (item as MenuItem).price;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-8 group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Products</span>
            </button>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-96 md:h-auto min-h-[500px] overflow-hidden bg-gray-100 group">
                        <motion.img
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            src={item.image}
                            alt={isOffer(item) ? item.title : (item as MenuItem).name}
                            className="w-full h-full object-cover"
                        />
                        {isOffer(item) && (
                            <div className="absolute top-6 left-6">
                                <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                                    {item.discount}% OFF
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center gap-2 text-emerald-600 font-medium mb-4">
                                <Star className="w-5 h-5 fill-current" />
                                <span>Premium Quality</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                {isOffer(item) ? item.title : (item as MenuItem).name}
                            </h1>

                            <div className="h-1 w-20 bg-emerald-500 rounded-full mb-8" />

                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                {item.description}
                            </p>

                            {/* Price Block */}
                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="text-5xl font-bold text-gray-900">
                                    ${price.toFixed(2)}
                                </span>
                                {isOffer(item) && (
                                    <span className="text-2xl text-gray-400 line-through">
                                        ${item.originalPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <Truck className="w-6 h-6 text-emerald-600" />
                                    <span className="text-sm font-medium text-gray-700">Free Delivery</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                                    <span className="text-sm font-medium text-gray-700">Certified</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-emerald-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:bg-emerald-700 active:scale-95 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 group"
                            >
                                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span>Add to Cart</span>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Detailed Description Section */}
            {item.detailPageDescription && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-8 w-1 bg-emerald-500 rounded-full" />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">About this Product</h2>
                    </div>
                    <div className="prose prose-emerald max-w-none">
                        <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                            {item.detailPageDescription}
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
