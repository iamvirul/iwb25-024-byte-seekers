import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, FileText, Users } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'අතිශය ආරක්ෂිත',
      description: 'බ්ලොක්චේන් තාක්ෂණය සහ SL-UDI ඩිජිටල් හැඳුනුම්පත ඒකාබද්ධයෙන් සම්පූර්ණ ආරක්ෂාව',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'ක්ෂණික ගනුදෙනු',
      description: 'ස්මාර්ට් කොන්ත්‍රාක්ට් මගින් ස්වයංක්‍රීය සහ වේගවත් ඉඩම් ගනුදෙනු',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FileText,
      title: 'සියළු ලේඛන',
      description: 'සිංහල භාෂාවේ NLP සහායෙන් ලේඛන විශ්ලේෂණය සහ ගබඩා කිරීම',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'ගැටළු නිරාකරණය',
      description: 'ඉක්මන් සහ සාධාරණ ගැටළු නිරාකරණය',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            විශේෂාංග
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            නවීන තාක්ෂණය සහ ශ්‍රී ලාංකික අවශ්‍යතා ඒකාබද්ධ කරන ලද සම්පූර්ණ සේවාව
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;