import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileText, 
  Users, 
  Zap, 
  Globe, 
  Award,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Lock,
  Star,
  TrendingUp,
  MapPin,
  Smartphone,
  ArrowDown,
  Sparkles,
  Database,
  Cpu
} from 'lucide-react';

const Home = () => {
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
      description: 'AI සහායකත්වයෙන් ඉක්මන් සහ සාධාරණ ගැටළු නිරාකරණය',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { label: 'ලියාපදිංචි ගම්මාන', value: '2,500+', icon: Globe },
    { label: 'සුරක්ෂිත ගනුදෙනු', value: '15,000+', icon: Lock },
    { label: 'නිරාකරණය කළ ගැටළු', value: '500+', icon: CheckCircle },
    { label: 'ක්‍රියාකාරී අවුරුදු', value: '3+', icon: Award }
  ];

  const benefits = [
    'විනිවිද දැකිය හැකි ගනුදෙනු',
    'වංචා වැළැක්වීම',
    'ඉක්මන් ගැටළු නිරාකරණය',
    'මොබයිල් ප්‍රවේශය',
    'AI සහායකත්වය',
    'නිරවද්‍ය ලේඛන'
  ];

  const testimonials = [
    {
      name: 'සුනිල් පෙරේරා',
      role: 'ගම්පහ ගොවියා',
      content: 'මෙම පද්ධතිය මගේ ඉඩම් ගැටළුව ඉතා ඉක්මනින් විසඳා ගත්තා.',
      rating: 5
    },
    {
      name: 'කමලා සිල්වා',
      role: 'කොළඹ නිවාස හිමියා',
      content: 'ඉතා ආරක්ෂිත සහ පහසු. ඉඩම් ගනුදෙනු කිරීම දැන් ඉතා සරලයි.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Super Enhanced Hero Section */}
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
                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-white transition-colors duration-200">100% ආරක්ෂිත</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-white transition-colors duration-200">මොබයිල් ප්‍රවේශය</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-white transition-colors duration-200">24/7 සේවාව</span>
                </div>
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

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
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

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              පරිශීලක අත්දැකීම්
            </h2>
            <p className="text-xl text-gray-600">
              අපගේ සේවාව භාවිතා කරන පරිශීලකයින්ගේ අදහස්
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Redesigned How It Works Section */}
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
            {[
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
            ].map((item, index) => {
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
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
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 + featureIndex * 0.1 }}
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
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
                    <Sparkles className="w-8 h-8 text-white" />
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
                    <MapPin className="w-5 h-5 mr-2" />
                    ඉඩම් ගවේෂණය
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              අද ඔබේ ඉඩම ආරක්ෂිත කරන්න
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              ශ්‍රී ලංකාවේ නවීනතම බ්ලොක්චේන් ඉඩම් ලේඛනාගාරයට සම්බන්ධ වන්න
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-gray-900 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>දැන්ම ආරම්භ කරන්න</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                <MapPin className="w-5 h-5 mr-2" />
                ඉඩම් ගවේෂණය
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;