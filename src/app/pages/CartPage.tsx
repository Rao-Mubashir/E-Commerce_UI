import { useState } from 'react';
import { useStore } from '../store';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CustomerInfo } from '../types';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, setCustomerInfo } = useStore();

  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = () => {
    if (cart.length === 0) {
      return;
    }

    if (validateForm()) {
      setCustomerInfo(formData);
      onNavigate('payment');
    }
  };

  const total = cartTotal;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shadow-lg shadow-emerald-600/30"
          >
            Browse Menu
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => {
                const isOffer = !!item.offer;
                const id = isOffer ? item.offer!.id : item.menuItem!.id;
                const name = isOffer ? item.offer!.title : item.menuItem!.name;
                const description = isOffer ? item.offer!.description : item.menuItem!.description;
                const image = isOffer ? item.offer!.image : item.menuItem!.image;

                let itemPrice = 0;
                let originalPrice = 0;
                let discountPercent = 0;

                if (isOffer) {
                  originalPrice = item.offer!.originalPrice || 0;
                  discountPercent = item.offer!.discount || 0;
                  itemPrice = originalPrice * (1 - discountPercent / 100);
                } else {
                  itemPrice = item.menuItem!.price || 0;
                }

                const lineTotal = itemPrice * item.quantity;

                // Create unique key by combining type and id
                const uniqueKey = isOffer ? `offer-${id}` : `menu-${id}`;

                return (
                  <motion.div
                    key={uniqueKey}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex gap-4">
                      <img
                        src={image}
                        alt={name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{name}</h3>
                              {isOffer && (
                                <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-bold">
                                  {discountPercent}% OFF
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {description}
                            </p>

                            {/* Show pricing breakdown for offers */}
                            {isOffer && (
                              <div className="mt-2 space-y-1">
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-gray-500">Original:</span>
                                  <span className="text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-gray-700 font-medium">Discounted:</span>
                                  <span className="text-emerald-600 font-bold">${itemPrice.toFixed(2)}</span>
                                  <span className="text-green-600 text-xs">Save ${(originalPrice - itemPrice).toFixed(2)}</span>
                                </div>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateCartQuantity(id, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            {isOffer && item.quantity > 1 && (
                              <div className="text-xs text-gray-500 mb-1">
                                ${itemPrice.toFixed(2)} × {item.quantity}
                              </div>
                            )}
                            <span className="font-bold text-lg">
                              ${lineTotal.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Customer Information Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h2 className="text-xl font-bold mb-4">Your Information</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="123 Main St, Anytown, USA"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Summary (Sticky on desktop) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmOrder}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-emerald-600/30"
                  >
                    <span>Confirm Order</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onNavigate('home')}
                    className="w-full mt-3 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}