import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Shield, CheckCircle, Zap, ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'ලියාපදිංචිය',
      description: 'SL-UDI ඩිජිටල් හැඳුනුම්පත සමඟ ඔබේ ගිණුම සාදන්න. ආරක්ෂිත සත්‍යාපන ක්‍රියාවලියක් හරහා ඔබේ අනන්‍යතාව තහවුරු කරන්න.',
      icon: Users,
      features: ['ඩිජිටල් හැඳුනුම්පත සත්‍යාපනය', 'ආරක්ෂිත ගිණුම් සැකසුම', 'ක්ෂණික ප්‍රවේශය'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      iconBg: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      step: '02',
      title: 'ලේඛන උඩුගත කිරීම',
      description: 'ඔබේ ඉඩම් ලේඛන සහ සර්වේ වාර්තා උඩුගත කරන්න. AI සහ NLP තාක්ෂණය සිංහල ලේඛන ස්වයංක්‍රීයව විශ්ලේෂණය කරයි.',
      icon: FileText,
      features: ['සිංහල NLP විශ්ලේෂණය', 'ස්වයංක්‍රීය සත්‍යාපනය', 'ආරක්ෂිත ගබඩාව'],
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      iconBg: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      step: '03',
      title: 'බ්ලොක්චේන් සත්‍යාපනය',
      description: 'ස්මාර්ට් කොන්ත්‍රාක්ට මගින් ස්වයංක්‍රීය සත්‍යාපනය සහ බ්ලොක්චේන් ලේඛනාගාරයට ස්ථිර සටහන් කිරීම.',
      icon: Shield,
      features: ['බ්ලොක්චේන් සුරක්ෂිතතාව', 'ස්මාර්ට් කොන්ත්‍රාක්ට්', 'ස්ථිර සටහන්'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      iconBg: 'bg-gradient-to-r from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full filter blur-3xl opacity-20"></div>
        
        {/* Geometric Patterns */}
        <div className="absolute top-10 right-10 w-32 h-32 border border-blue-200 rounded-2xl rotate-12 opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 border border-purple-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg rotate-45 opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700 mb-6">
            <Zap className="w-4 h-4 mr-2" />
            සරල ක්‍රියාවලිය
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            එය ක්‍රියා කරන්නේ කෙසේද?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            සරල පියවර තුනකින් ඔබේ ඉඩම ආරක්ෂිතව ලියාපදිංචි කරන්න
          </p>
        </motion.div>

        {/* Steps Grid - Mobile First Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Step Card */}
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:-translate-y-2 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors duration-300">
                      {item.step}
                    </div>
                    <div className={`w-16 h-16 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                      {item.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-3">
                      {item.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.2 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-gray-700 group-hover:text-gray-800 transition-colors duration-300"
                        >
                          <div className={`w-5 h-5 rounded-full ${item.iconBg} flex items-center justify-center mr-3 flex-shrink-0`}>
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white to-gray-50 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-gray-50 to-white rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>

                {/* Connection Line for Desktop */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 transform -translate-y-1/2 z-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full"></div>
                  </div>
                )}

                {/* Arrow for Mobile */}
                {index < 2 && (
                  <div className="lg:hidden flex justify-center mt-6 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                      <ArrowDown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                ඔබේ ඉඩම ආරක්ෂිත කරන්න
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                අද ම ආරම්භ කර ඔබේ ඉඩම් අයිතිය සදහටම සුරක්ෂිත කරන්න. 
                නවීන තාක්ෂණයේ ශක්තියෙන් ඔබේ ඉඩම් ආරක්ෂා කරන්න.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>දැන්ම ආරම්භ කරන්න</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/search"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 rounded-xl font-semibold text-lg transition-all duration-300"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  ඉඩම් ගවේෂණය
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;