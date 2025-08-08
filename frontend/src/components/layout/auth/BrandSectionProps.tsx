import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, CheckCircle, Globe } from 'lucide-react';

interface Feature {
  icon: React.ComponentType<any>;
  text: string;
  color: string;
}

interface BrandSectionProps {
  features: Feature[];
  showTrustIndicators?: boolean;
}

const BrandSection: React.FC<BrandSectionProps> = ({ 
  features, 
  showTrustIndicators = true 
}) => {
  const trustIndicators = [
    { icon: CheckCircle, text: 'ISO 27001 සහතිකය', color: 'text-green-500' },
    { icon: Shield, text: 'SOC 2 Type II', color: 'text-blue-500' },
    { icon: Globe, text: 'GDPR අනුකූල', color: 'text-purple-500' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center lg:text-left"
    >
      {/* Logo & Brand */}
      <div className="flex items-center justify-center lg:justify-start mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl mr-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ඉඩම් ලේඛනාගාරය</h1>
          <p className="text-sm text-gray-600">ශ්‍රී ලංකා</p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700 mb-6"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          ශ්‍රී ලංකාවේ #1 බ්ලොක්චේන් ඉඩම් ලේඛනාගාරය
        </motion.div>
        
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          ආයුබෝවන්! 👋
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          ඔබේ ඉඩම් ලේඛනාගාර ගිණුමට ප්‍රවේශ වී ආරක්ෂිත සහ විනිවිද දැකිය හැකි 
          ඉඩම් කළමනාකරණයේ අත්දැකීම ලබා ගන්න.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trust Indicators */}
      {showTrustIndicators && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-gray-600"
        >
          {trustIndicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <div key={index} className="flex items-center">
                <Icon className={`w-5 h-5 ${indicator.color} mr-2`} />
                <span className="text-sm">{indicator.text}</span>
              </div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BrandSection;