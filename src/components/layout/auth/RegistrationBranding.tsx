import React from "react";
import { motion } from "framer-motion";
import { Shield, UserPlus, CheckCircle, Globe } from "lucide-react";

export default function RegistrationBranding({
  features,
}: {
  features: { icon: React.ComponentType<any>; text: string; color: string }[];
}) {
  return (
    <div className="hidden lg:block">
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
            <UserPlus className="w-4 h-4 mr-2" />
            නව ගිණුමක් සාදන්න
          </motion.div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            ආරම්භ කරන්න! 🚀
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            ශ්‍රී ලංකාවේ නවීනතම බ්ලොක්චේන් ඉඩම් ලේඛනාගාරයට සම්බන්ධ වී ඔබේ ඉඩම්
            කළමනාකරණය ආරක්ෂිතව සිදු කරන්න.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {feature.text}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-gray-600"
        >
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm">ISO 27001 සහතිකය</span>
          </div>
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm">SOC 2 Type II</span>
          </div>
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm">GDPR අනුකූල</span>
          </div>
        </motion.div>

        {/* Registration Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            ලියාපදිංචි වීමේ ප්‍රතිලාභ
          </h3>
          <div className="space-y-3">
            <div className="flex items-center text-blue-700">
              <CheckCircle className="w-4 h-4 mr-3 text-blue-600" />
              <span className="text-sm">ඉඩම් ආරක්ෂිතව ලියාපදිංචි කරන්න</span>
            </div>
            <div className="flex items-center text-blue-700">
              <CheckCircle className="w-4 h-4 mr-3 text-blue-600" />
              <span className="text-sm">ස්වයංක්‍රීය ගනුදෙනු සිදු කරන්න</span>
            </div>
            <div className="flex items-center text-blue-700">
              <CheckCircle className="w-4 h-4 mr-3 text-blue-600" />
              <span className="text-sm">AI සහායකත්වයෙන් ගැටළු නිරාකරණය</span>
            </div>
            <div className="flex items-center text-blue-700">
              <CheckCircle className="w-4 h-4 mr-3 text-blue-600" />
              <span className="text-sm">24/7 ඩිජිටල් ප්‍රවේශය</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
