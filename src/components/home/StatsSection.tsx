import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Lock, CheckCircle, Award } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    { label: 'ලියාපදිංචි ගම්මාන', value: '2,500+', icon: Globe },
    { label: 'සුරක්ෂිත ගනුදෙනු', value: '15,000+', icon: Lock },
    { label: 'නිරාකරණය කළ ගැටළු', value: '500+', icon: CheckCircle },
    { label: 'ක්‍රියාකාරී අවුරුදු', value: '3+', icon: Award }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;