import { motion } from 'motion/react';
import { DollarSign } from 'lucide-react';

export function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6"
          >
            <DollarSign className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Refund Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-indigo-100"
          >
            Last updated: December 31, 2025
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 mb-6">
              We want you to be completely satisfied with your order. If you're not happy with your 
              purchase, we're here to help with our refund policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Eligible Refunds</h2>
            <p className="text-gray-600 mb-4">You may be eligible for a refund if:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Your order was incorrect or incomplete</li>
              <li>Food quality does not meet our standards</li>
              <li>Your order was significantly delayed</li>
              <li>Your order was never delivered</li>
              <li>You have food allergies and received incorrect items</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Refund Process</h2>
            <p className="text-gray-600 mb-4">To request a refund:</p>
            <ol className="list-decimal pl-6 text-gray-600 mb-6 space-y-2">
              <li>Contact us within 24 hours of receiving your order</li>
              <li>Provide your order number and details about the issue</li>
              <li>Include photos if applicable (incorrect or damaged items)</li>
              <li>Our team will review your request within 1-2 business days</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Refund Timeline</h2>
            <p className="text-gray-600 mb-4">Once your refund is approved:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Refunds will be processed within 3-5 business days</li>
              <li>The refund will be credited to your original payment method</li>
              <li>It may take an additional 5-10 business days for the refund to appear in your account</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Non-Refundable Items</h2>
            <p className="text-gray-600 mb-4">The following are not eligible for refunds:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Orders that have been fully consumed</li>
              <li>Change of mind after delivery</li>
              <li>Incorrect address provided by customer</li>
              <li>Customer unavailable for delivery after multiple attempts</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Partial Refunds</h2>
            <p className="text-gray-600 mb-6">
              In some cases, we may offer partial refunds for minor issues such as missing condiments 
              or small portion discrepancies. The refund amount will be determined based on the nature 
              of the issue.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Contact Us</h2>
            <p className="text-gray-600">
              For refund requests or questions about our policy, please contact us at 
              <a href="mailto:refunds@restaurant.com" className="text-indigo-600 hover:text-indigo-700 ml-1">
                refunds@restaurant.com
              </a>
              {' '}or call us at{' '}
              <a href="tel:+15551234567" className="text-indigo-600 hover:text-indigo-700">
                +1 (555) 123-4567
              </a>
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
