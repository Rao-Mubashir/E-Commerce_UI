import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-600 hover:bg-emerald-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6"
          >
            <FileText className="w-8 h-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Terms of Service
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing and using our restaurant ordering platform, you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Use of Service</h2>
            <p className="text-gray-600 mb-4">You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Use the service in any way that violates any applicable laws or regulations</li>
              <li>Impersonate or attempt to impersonate another user or person</li>
              <li>Engage in any conduct that restricts or inhibits anyone's use of the service</li>
              <li>Use any automated system to access the service</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Orders and Payments</h2>
            <p className="text-gray-600 mb-4">When you place an order:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>You agree to provide accurate and complete information</li>
              <li>You authorize us to charge your payment method for the order total</li>
              <li>Prices are subject to change without notice</li>
              <li>We reserve the right to refuse or cancel any order</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Delivery</h2>
            <p className="text-gray-600 mb-6">
              Delivery times are estimates and not guaranteed. We are not responsible for delays caused
              by factors beyond our control, such as weather conditions or traffic.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Account Termination</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to terminate or suspend your account and access to our service at our
              sole discretion, without notice, for conduct that we believe violates these Terms or is
              harmful to other users, us, or third parties.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              To the fullest extent permitted by law, we shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of or relating to your use of the service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these Terms at any time. We will notify you of any changes
              by posting the new Terms on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please contact us at
              <a href="mailto:legal@restaurant.com" className="text-indigo-600 hover:text-indigo-700 ml-1">
                legal@restaurant.com
              </a>
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
