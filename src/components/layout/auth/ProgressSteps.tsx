import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  color: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 bg-gradient-to-r from-gray-50 to-indigo-50/30 border-b border-gray-200/50">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          
          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div 
                  className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                      : isActive 
                        ? `bg-gradient-to-r ${step.color} text-white shadow-xl scale-110` 
                        : 'bg-white text-gray-400 border-2 border-gray-200'
                  }`}
                  whileHover={{ scale: isActive ? 1.15 : 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                  ) : (
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  )}
                </motion.div>
                <div className="mt-2 sm:mt-3 text-center">
                  <div className={`text-xs sm:text-sm font-semibold ${
                    isActive ? 'text-indigo-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`mx-2 sm:mx-6 h-1 w-8 sm:w-20 rounded-full transition-all duration-500 ${
                  isCompleted ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;