import { motion } from 'motion/react';
import { Cookie } from 'lucide-react';

export function CookiePolicy() {
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
            <Cookie className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Cookie Policy
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 mb-6">
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              understanding how you use our service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Essential Cookies</h3>
            <p className="text-gray-600 mb-4">
              These cookies are necessary for the website to function properly. They enable core 
              functionality such as:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Security and authentication</li>
              <li>Shopping cart functionality</li>
              <li>Order processing</li>
              <li>Account management</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Performance Cookies</h3>
            <p className="text-gray-600 mb-4">
              These cookies help us understand how visitors interact with our website by collecting 
              information about:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Pages visited most often</li>
              <li>Time spent on pages</li>
              <li>Error messages encountered</li>
              <li>Overall site performance</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Functionality Cookies</h3>
            <p className="text-gray-600 mb-4">
              These cookies allow us to remember your preferences and provide enhanced features:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Language preferences</li>
              <li>Location settings</li>
              <li>Saved delivery addresses</li>
              <li>Display preferences</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Marketing Cookies</h3>
            <p className="text-gray-600 mb-6">
              With your consent, we use marketing cookies to deliver relevant advertisements and track 
              campaign effectiveness. These cookies help us show you offers and promotions that might 
              interest you.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Managing Cookies</h2>
            <p className="text-gray-600 mb-4">
              You can control and manage cookies in several ways:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Use the cookie consent banner when you first visit our site</li>
              <li>Adjust your browser settings to block or delete cookies</li>
              <li>Use browser extensions to manage cookie preferences</li>
              <li>Opt-out of targeted advertising through industry opt-out tools</li>
            </ul>
            <p className="text-gray-600 mb-6">
              Please note that blocking certain cookies may impact your experience and limit some 
              features of our website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Third-Party Cookies</h2>
            <p className="text-gray-600 mb-6">
              We work with trusted third-party service providers who may also set cookies on our website. 
              These include analytics providers, payment processors, and advertising partners. Each 
              third party has its own privacy and cookie policies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Updates to This Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this Cookie Policy from time to time to reflect changes in technology, 
              legislation, or our business practices. We encourage you to review this policy periodically.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about our use of cookies, please contact us at 
              <a href="mailto:privacy@restaurant.com" className="text-indigo-600 hover:text-indigo-700 ml-1">
                privacy@restaurant.com
              </a>
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
