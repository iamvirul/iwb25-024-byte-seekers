import React from 'react';
import { motion } from 'framer-motion';

interface FormCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  className?: string;
}

const FormCard: React.FC<FormCardProps> = ({ 
  children, 
  title, 
  subtitle, 
  icon: Icon,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`w-full mx-auto ${className}`}
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10">
        {/* Form Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600">
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </motion.div>
  );
};

export default FormCard;