import { motion } from 'motion/react';
import { ChefHat, Heart, Award, Users } from 'lucide-react';

export function AboutUs() {
  const values = [
    {
      icon: <ChefHat className="w-8 h-8" />,
      title: 'Medicine',
      description: 'We meticulously source the most effective compounds to formulate treatments that advance your health and well-being.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Customer Experience',
      description: 'Our customers are at the heart of everything we do. Your satisfaction is our priority.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for excellence in every delivery, ensuring consistent quality.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community',
      description: 'We believe in building strong relationships with our community and giving back.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-600 hover:bg-emerald-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-indigo-100"
          >
            Crafting exceptional experiences since day one
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
            <p>
              Welcome to our practice, where expertise meets compassion. Our journey began with a simple mission: to enhance the well-being of our community through exceptional healthcare and personalized patient experiences.
            </p>
            <p>
              Every treatment plan we develop is crafted with care, utilizing evidence-based practices and the latest medical advancements. We believe that quality healthcare has the power to transform lives and bring peace of mind to our patients and their families.
            </p>
            <p>
              Our team of dedicated clinicians and support staff work tirelessly to ensure that every visit exceeds your expectations. Whether you are visiting us in person or consulting through our telehealth services, we are committed to delivering the same high standards of safety, integrity, and clinical excellence.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Our Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 text-white rounded-full mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
