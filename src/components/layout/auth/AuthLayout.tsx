import React from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  backgroundVariant?: 'blue' | 'purple';
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  backgroundVariant = 'blue' 
}) => {
  const gradients = {
    blue: 'from-blue-50 via-indigo-50 to-purple-100',
    purple: 'from-indigo-50 via-purple-50 to-pink-100'
  };

  const orbs = {
    blue: [
      'from-blue-200/30 to-indigo-200/30',
      'from-purple-200/30 to-pink-200/30',
      'from-green-200/20 to-emerald-200/20'
    ],
    purple: [
      'from-indigo-200/30 to-purple-200/30',
      'from-pink-200/30 to-rose-200/30',
      'from-blue-200/20 to-cyan-200/20'
    ]
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradients[backgroundVariant]} relative overflow-hidden`}>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className={`absolute top-20 left-20 w-96 h-96 bg-gradient-to-r ${orbs[backgroundVariant][0]} rounded-full filter blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r ${orbs[backgroundVariant][1]} rounded-full filter blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r ${orbs[backgroundVariant][2]} rounded-full filter blur-3xl animate-pulse delay-2000`}></div>
        
        {/* Floating Elements */}
        <div className={`absolute top-10 right-10 w-32 h-32 border border-${backgroundVariant === 'blue' ? 'blue' : 'purple'}-200/30 rounded-2xl rotate-12 animate-float`}></div>
        <div className={`absolute bottom-10 left-10 w-24 h-24 border border-${backgroundVariant === 'blue' ? 'purple' : 'indigo'}-200/30 rounded-full animate-bounce-slow`}></div>
        <div className={`absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-${backgroundVariant === 'blue' ? 'blue' : 'purple'}-200/20 to-${backgroundVariant === 'blue' ? 'indigo' : 'pink'}-200/20 rounded-lg rotate-45 animate-pulse`}></div>
      </div>

      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;