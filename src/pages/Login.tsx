import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Mail, 
  LogIn, 
  Shield,
  Zap,
  Globe,
  ArrowRight,
  XCircle
} from 'lucide-react';

import AuthLayout from '../components/layout/auth/AuthLayout';
import BrandSection from '../components/layout/auth/BrandSectionProps';
import FormCard from '../components/layout/auth/FormCard';
import FormInput from '../components/layout/auth/FormInput';
import PasswordInput from '../components/layout/auth/PasswordInput';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('වලංගු නොවන ඊමේල් හෝ මුරපදය');
      }
    } catch (err) {
      setError('පුරනය වීමේදී දෝෂයක් ඇතිවිය');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Shield, text: '100% ආරක්ෂිත', color: 'text-green-600' },
    { icon: Zap, text: 'ක්ෂණික ප්‍රවේශය', color: 'text-blue-600' },
    { icon: Globe, text: '24/7 සේවාව', color: 'text-purple-600' }
  ];

  return (
    <AuthLayout backgroundVariant="blue">
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Branding & Features */}
            <BrandSection features={features} />

            {/* Right Side - Login Form */}
            <FormCard
              title="ගිණුමට ප්‍රවේශය"
              subtitle="ඔබේ ඉඩම් ලේඛනාගාර ගිණුමට ප්‍රවේශ වන්න"
              icon={LogIn}
            >
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center"
                >
                  <XCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  label="ඊමේල් ලිපිනය"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                  placeholder="ඔබේ ඊමේල් ලිපිනය ඇතුළත් කරන්න"
                  required
                />

                <PasswordInput
                  id="password"
                  name="password"
                  label="මුරපදය"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="ඔබේ මුරපදය ඇතුළත් කරන්න"
                  required
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm font-medium text-gray-700">
                      මතක තබන්න
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200">
                      මුරපදය අමතකයි?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      ප්‍රවේශ වෙමින්...
                    </div>
                  ) : (
                    <>
                      <span>ප්‍රවේශය</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </form>

              {/* Register Link */}
              <div className="text-center mt-8">
                <p className="text-sm text-gray-600">
                  ගිණුමක් නැද්ද?{' '}
                  <Link 
                    to="/register" 
                    className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200"
                  >
                    ලියාපදිංචි වන්න
                  </Link>
                </p>
              </div>

            </FormCard>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;