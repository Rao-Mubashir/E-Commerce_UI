import { useStore } from '../store';
import { CheckCircle2, Package, Clock, Home } from 'lucide-react';
import { motion } from 'motion/react';

interface OrderConfirmationPageProps {
  orderId: string;
  onNavigate: (page: string) => void;
}

export function OrderConfirmationPage({ orderId, onNavigate }: OrderConfirmationPageProps) {
  const { orders } = useStore();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold mb-3"
          >
            Order Confirmed!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-lg"
          >
            Thank you for your order. We're preparing it now!
          </motion.p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 mb-6"
        >
          <div className="flex items-center justify-between mb-6 pb-6 border-b">
            <div>
              <p className="text-sm text-gray-600 mb-1">Order ID</p>
              <p className="font-mono font-bold text-lg">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Delivery Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium text-gray-900">Name:</span> {order.customerName}</p>
              <p><span className="font-medium text-gray-900">Email:</span> {order.email}</p>
              <p><span className="font-medium text-gray-900">Phone:</span> {order.phone}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.menuItem.id} className="flex justify-between text-sm">
                  <div className="flex gap-3">
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{item.menuItem.name}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ${(item.menuItem.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-orange-600">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6"
        >
          <h3 className="font-semibold mb-4">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium">Order Processing</p>
                <p className="text-sm text-gray-600">
                  Our chefs are preparing your delicious meal
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-sm text-gray-600">
                  Your order will arrive in approximately 30-45 minutes
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          <button
            onClick={() => onNavigate('admin')}
            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
          >
            Track Order (Admin)
          </button>
        </motion.div>

        {/* Thank You Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-sm text-gray-600"
        >
          <p>A confirmation email has been sent to <strong>{order.email}</strong></p>
          <p className="mt-2">Thank you for choosing FoodHub! 🎉</p>
        </motion.div>
      </div>
    </div>
  );
}
