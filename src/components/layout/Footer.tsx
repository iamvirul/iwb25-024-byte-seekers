import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  ArrowRight,
  Heart,
  Globe,
  Lock,
  Zap,
  Users,
  Award,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'ඉඩම් ගවේෂණය', href: '/search' },
      { name: 'ලේඛන කළමනාකරණය', href: '/documents' },
      { name: 'ස්මාර්ට් කොන්ත්‍රාක්ට්', href: '/contracts' },
      { name: 'ගැටළු නිරාකරණය', href: '/disputes' }
    ],
    services: [
      { name: 'ඉඩම් ලියාපදිංචිය', href: '/registry' },
      { name: 'හිමිකම් මාරුව', href: '/transfer' },
      { name: 'AI ලේඛන විශ්ලේෂණය', href: '/analysis' },
      { name: 'බ්ලොක්චේන් සත්‍යාපනය', href: '/verification' }
    ],
    support: [
      { name: 'උදව් මධ්‍යස්ථානය', href: '/help' },
      { name: 'API ලේඛන', href: '/api-docs', external: true },
      { name: 'සම්බන්ධ වන්න', href: '/contact' },
      { name: 'තාක්ෂණික සහාය', href: '/support' }
    ],
    legal: [
      { name: 'පෞද්ගලිකත්ව ප්‍රතිපත්තිය', href: '/privacy' },
      { name: 'සේවා කොන්දේසි', href: '/terms' },
      { name: 'කුකී ප්‍රතිපත්තිය', href: '/cookies' },
      { name: 'නීතිමය දැන්වීම්', href: '/legal' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/srilankalandregistry', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/sllandregistry', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/sl-land-registry', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/sllandregistry', color: 'hover:text-red-600' }
  ];

  const features = [
    { icon: Shield, text: '100% ආරක්ෂිත', color: 'text-green-600' },
    { icon: Zap, text: 'ක්ෂණික ගනුදෙනු', color: 'text-yellow-600' },
    { icon: Lock, text: 'බ්ලොක්චේන් සුරක්ෂිතතාව', color: 'text-blue-600' },
    { icon: Users, text: '24/7 සහාය', color: 'text-purple-600' }
  ];

  const stats = [
    { value: '15,000+', label: 'සුරක්ෂිත ගනුදෙනු' },
    { value: '2,500+', label: 'ලියාපදිංචි ගම්මාන' },
    { value: '500+', label: 'නිරාකරණය කළ ගැටළු' },
    { value: '99.9%', label: 'ආරක්ෂිත ප්‍රතිශතය' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full filter blur-3xl"></div>

      <div className="relative">
        {/* Stats Section */}
        <div className="border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">ඉඩම් ලේඛනාගාරය</h3>
                  <p className="text-sm text-gray-400">ශ්‍රී ලංකා</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                ශ්‍රී ලංකාවේ නවීනතම බ්ලොක්චේන් ඉඩම් ලේඛනාගාරය. 
                ආරක්ෂිත, විනිවිද දැකිය හැකි සහ කාර්යක්ෂම ඉඩම් කළමනාකරණය.
              </p>
            </motion.div>

            {/* Links Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Platform */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">වේදිකාව</h4>
                  <ul className="space-y-3">
                    {footerLinks.platform.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center group"
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">සේවාවන්</h4>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center group"
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">සහාය</h4>
                  <ul className="space-y-3">
                    {footerLinks.support.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center group"
                        >
                          <span>{link.name}</span>
                          {link.external ? (
                            <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                          ) : (
                            <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">නීතිමය</h4>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center group"
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            >
              {/* Copyright */}
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <span>© {currentYear} ශ්‍රී ලංකා ඉඩම් ලේඛනාගාරය. සියලු අයිතිවාසිකම් ආරක්ෂිතයි.</span>
                </div>
                <div className="flex items-center">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" />
                  <span>for Sri Lanka's Digital Future by Byte Seekers</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400 mr-2">Follow us:</span>
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-200 text-gray-400 ${social.color} group`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Certifications & Badges */}
        <div className="border-t border-gray-700 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0"
            >
              <div className="flex items-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  <span>SOC 2 Type II</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-blue-500" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                <span>Powered by Blockchain Technology • Version 2.1.0</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;