import  { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  Home, Search, Users, Gavel,
  Menu, X, LogOut, User, Shield, BarChart3, Scale
} from 'lucide-react';
import Button from '../ui/Button';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navigation = [
    { name: 'මුල් පිටුව', href: '/', icon: Home },
    { name: 'ඉඩම් ගවේෂණය', href: '/search', icon: Search },
    { name: 'ගනුදෙනු', href: '/transactions', icon: Users },
    { name: 'ගැටළු', href: '/disputes', icon: Gavel },
  ];

  // Add land officer specific navigation
  const landOfficerNavigation = [
    { name: 'මුල් පිටුව', href: '/', icon: Home },
    { name: 'ඉඩම් ගවේෂණය', href: '/search', icon: Search },
    { name: 'ඉඩම් නිලධාරී ඩෑෂ්බෝඩ්', href: '/land-officer', icon: BarChart3 },
  ];

  // Add legal officer specific navigation
  const legalOfficerNavigation = [
    { name: 'මුල් පිටුව', href: '/', icon: Home },
    { name: 'ඉඩම් ගවේෂණය', href: '/search', icon: Search },
    { name: 'නීති නිලධාරී ඩෑෂ්බෝඩ්', href: '/legal-officer', icon: Scale },
  ];

  const landOwnerNavigation = [
    { name: 'මුල් පිටුව', href: '/', icon: Home },
    { name: 'ඉඩම් ගවේෂණය', href: '/search', icon: Search },
    { name: 'ගනුදෙනු', href: '/transactions', icon: Users },
    { name: 'ගැටළු', href: '/disputes', icon: Gavel },
    { name: 'ඩෑෂ්බෝඩ්', href: '/dashboard', icon: Scale },
  ];

  const getCurrentNavigation = () => {
    if (user?.role === 'land_officer') return landOfficerNavigation;
    if (user?.role === 'legal_officer') return legalOfficerNavigation;
    if (user?.role === 'land_owner') return landOwnerNavigation;
    return navigation;
  };

  const currentNavigation = getCurrentNavigation();

  const isActive = (path: string) => location.pathname === path;

  const getDashboardPath = () => {
    if (user?.role === 'land_officer') return '/land-officer';
    if (user?.role === 'legal_officer') return '/legal-officer';
    return '/dashboard';
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                ඉඩම් ලේඛනාගාරය
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {currentNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </Link>
                {/* <Link
                  to={getDashboardPath()}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
                >
                  <Shield className="w-4 h-4" />
                  <span>ඩෑෂ්බෝඩ්</span>
                </Link> */}
                <Button
                  variant="ghost"
                  size="sm"
                  icon={LogOut}
                  onClick={handleLogout}
                >
                  ඉවත්වීම
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  ප්‍රවේශය
                </Link>
                <Button as={Link} to="/register" size="sm">
                  ලියාපදිංචිය
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              icon={isMobileMenuOpen ? X : Menu}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {currentNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {isAuthenticated ? (
              <div className="border-t border-gray-200 pt-3 mt-3 space-y-1">
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                  <span>මගේ ප්‍රොෆයිලය</span>
                </Link>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
                >
                  <Shield className="w-5 h-5" />
                  <span>ඩෑෂ්බෝඩ්</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 w-full text-left transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span>ඉවත්වීම</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
                >
                  ප්‍රවේශය
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  ලියාපදිංචිය
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;