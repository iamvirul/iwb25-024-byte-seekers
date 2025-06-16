import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  CheckCircle,
  MapPin,
  Sparkles,
  Star,
  Smartphone,
  TrendingUp,
  Shield,
  Database,
  Lock,
  Cpu
} from 'lucide-react';

const HeroSection: React.FC = () => {
  const benefits = [
    'විනිවිද දැකිය හැකි ගනුදෙනු',
    'වංචා වැළැක්වීම',
    'ඉක්මන් ගැටළු නිරාකරණය',
    'මොබයිල් ප්‍රවේශය',
    'AI සහායකත්වය',
    'නිරවද්‍ය ලේඛන'
  ];

  const trustIndicators = [
    { icon: Shield, text: '100% ආරක්ෂිත', color: 'text-green-500' },
    { icon: Smartphone, text: 'මොබයිල් ප්‍රවේශය', color: 'text-blue-500' },
    { icon: TrendingUp, text: '24/7 සේවාව', color: 'text-purple-500' }
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white overflow-hidden min-h-screen flex items-center">
      {/* Multi-layered Enhanced Background Pattern */}
      <div className="absolute inset-0">
        {/* Layer 1: Large animated gradient orbs */}
        <div className="absolute top-10 left-10 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/30 to-cyan-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/30 to-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/2 w-[700px] h-[700px] bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-green-400/25 to-teal-300/25 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-3000"></div>
        
        {/* Layer 2: Medium floating elements */}
        <div className="absolute top-20 right-1/4 w-40 h-40 border-2 border-white/10 rounded-2xl rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-32 h-32 border-2 border-white/15 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/3 left-1/5 w-24 h-24 border border-white/20 rounded-lg rotate-12 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/5 w-28 h-28 border border-white/15 rounded-full animate-spin-slow delay-1000"></div>
        
        {/* Layer 3: Small geometric patterns */}
        <div className="absolute top-1/4 right-1/3 w-16 h-16 bg-white/5 rounded-lg rotate-45 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-white/5 rounded-full animate-float-delayed"></div>
        <div className="absolute top-2/3 right-1/4 w-12 h-12 bg-white/10 rounded-lg animate-bounce-slow"></div>
        
        {/* Layer 4: Floating tech icons */}
        <div className="absolute top-1/4 left-1/3 opacity-10 animate-float">
          <Shield className="w-20 h-20 text-white" />
        </div>
        <div className="absolute top-1/3 right-1/3 opacity-10 animate-float-delayed">
          <Database className="w-16 h-16 text-white" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 opacity-10 animate-float-slow">
          <Lock className="w-18 h-18 text-white" />
        </div>
        <div className="absolute top-2/3 right-1/5 opacity-10 animate-float delay-1000">
          <Cpu className="w-14 h-14 text-white" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 opacity-10 animate-bounce-slow">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        
        {/* Layer 5: Animated lines and connections */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="50%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M100,200 Q300,100 500,200 T900,200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse" />
          <path d="M200,400 Q400,300 600,400 T1000,400" stroke="url(#lineGradient)" strokeWidth="1.5" fill="none" className="animate-pulse delay-1000" />
          <path d="M50,600 Q250,500 450,600 T850,600" stroke="url(#lineGradient)" strokeWidth="1" fill="none" className="animate-pulse delay-2000" />
        </svg>
        
        {/* Layer 6: Enhanced grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 60px 60px, 20px 20px, 20px 20px'
          }}></div>
        </div>
        
        {/* Layer 7: Particle effect simulation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Layer 8: Radial gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/10 to-blue-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full text-sm font-medium border border-blue-400/30 shadow-lg"
              >
                <Star className="w-4 h-4 mr-2 text-yellow-400 animate-pulse" />
                ශ්‍රී ලංකාවේ #1 බ්ලොක්චේන් ඉඩම් ලේඛනාගාරය
                <Sparkles className="w-4 h-4 ml-2 text-blue-300 animate-pulse delay-500" />
              </motion.span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              ශ්‍රී ලංකා{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse">
                බ්ලොක්චේන්
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
                ඉඩම් ලේඛනාගාරය
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed"
            >
              ආරක්ෂිත, විනිවිද දැකිය හැකි සහ කාර්යක්ෂම ඉඩම් හිමිකම් කළමනාකරණ පද්ධතිය. 
              <span className="text-yellow-300 font-semibold"> AI සහ බ්ලොක්චේන් තාක්ෂණයෙන්</span> ශක්තිමත් කරන ලද.
            </motion.p>

            {/* Enhanced Benefits List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + (0.1 * index) }}
                  className="flex items-center text-blue-100 group"
                >
                  <div className="w-5 h-5 mr-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm group-hover:text-white transition-colors duration-200">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-gray-900 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                  <span>ආරම්භ කරන්න</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  to="/search"
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <MapPin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  ඉඩම් සොයන්න
                </Link>
              </motion.div>
            </div>

            {/* Enhanced Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap items-center gap-6 text-blue-200"
            >
              {trustIndicators.map((indicator, index) => {
                const Icon = indicator.icon;
                return (
                  <div key={index} className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-white transition-colors duration-200">{indicator.text}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Enhanced Right Content - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Enhanced Card */}
            <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl relative"
                >
                  <Shield className="w-10 h-10 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl animate-pulse opacity-50"></div>
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">ඩිජිටල් ඉඩම් සහතිකය</h3>
                <p className="text-blue-200 text-sm">බ්ලොක්චේන් තාක්ෂණයෙන් සුරක්ෂිත</p>
              </div>

              {/* Enhanced Mock Certificate */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 text-gray-800 shadow-xl border border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">PROP001</span>
                  <span className="px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs rounded-full border border-green-200">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    සත්‍යාපිත
                  </span>
                </div>
                <h4 className="font-semibold text-sm mb-3 text-gray-900">කොළොන්නාව ඉඩම</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>ප්‍රමාණය:</span>
                    <span className="font-medium">2.5 අක්කර</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>හිමිකරු:</span>
                    <span className="font-medium">සුනිල් සිල්වා</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ලියාපදිංචි:</span>
                    <span className="font-medium">2024</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <div className="flex items-center text-xs text-gray-500">
                      <Lock className="w-3 h-3 mr-1" />
                      <span>බ්ලොක්චේන් සුරක්ෂිත</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Floating Elements */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse"
              >
                <Lock className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="absolute top-1/2 -left-4 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-xl animate-float"
              >
                <Database className="w-6 h-6 text-white" />
              </motion.div>
            </div>

            {/* Enhanced Floating Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="absolute -top-12 -left-12 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">15,000+</div>
                <div className="text-xs text-blue-200">සුරක්ෂිත ගනුදෙනු</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -bottom-12 -right-12 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">99.9%</div>
                <div className="text-xs text-blue-200">ආරක්ෂිත ප්‍රතිශතය</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="absolute top-1/2 -right-8 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-xl"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">AI</div>
                <div className="text-xs text-blue-200">සහායකත්වය</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Clean Modern Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          className="w-full h-24 fill-gray-50"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,120 C240,40 480,40 720,60 C960,80 1200,80 1440,40 L1440,120 Z" 
            className="fill-gray-50"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;