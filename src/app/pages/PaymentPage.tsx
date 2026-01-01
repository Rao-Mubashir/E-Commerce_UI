import { useState } from 'react';
import { useStore } from '../store';
import { CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe outside component
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface CheckoutFormProps {
  onNavigate: (page: string, orderId?: string) => void;
  total: number;
}

function CheckoutForm({ onNavigate, total }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { customerInfo, createOrder } = useStore();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cardholderName, setCardholderName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !customerInfo) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // 1. Create PaymentIntent on the backend
      // Using /api prefix as we assume proxy or direct URL will be handled
      const res = await fetch('http://localhost:3000/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });

      if (!res.ok) {
        throw new Error('Failed to initialize payment');
      }

      const { clientSecret } = await res.json();

      // 2. Confirm Card Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: cardholderName,
            email: customerInfo.email,
            phone: customerInfo.phone,
          },
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          // 3. Create Order
          const order = createOrder(customerInfo);
          setProcessing(false);
          onNavigate('confirmation', order.id);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 bg-green-50 border border-green-200 p-3 rounded-lg">
          <Lock className="w-4 h-4 text-green-600" />
          <span>Your payment information is encrypted and secure</span>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="John Doe"
              required
              disabled={processing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Details
            </label>
            <div className="px-4 py-4 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 bg-white">
              <CardElement options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }} />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Payment Button */}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
      >
        {processing ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            <span>Pay ${total.toFixed(2)}</span>
          </>
        )}
      </button>
    </form>
  );
}

interface PaymentPageProps {
  onNavigate: (page: string, orderId?: string) => void;
}

export function PaymentPage({ onNavigate }: PaymentPageProps) {
  const { customerInfo, cartTotal } = useStore();

  // Redirect if no customer info
  if (!customerInfo) {
    onNavigate('cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Secure Payment</h1>
            <p className="text-gray-600">Complete your order with card payment</p>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm onNavigate={onNavigate} total={cartTotal} />
          </Elements>

          <div className="mt-6">
            <button
              onClick={() => onNavigate('cart')}
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
              type="button"
            >
              Back to Cart
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>PCI Compliant</span>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}