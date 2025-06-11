import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  shadow = 'md',
  onClick
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const baseClasses = `bg-white rounded-lg border border-gray-100 ${shadowClasses[shadow]} ${paddingClasses[padding]}`;
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer' : '';

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${className} transition-all duration-200`}
      whileHover={hover ? { y: -2 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;