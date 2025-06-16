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
    <div className="px-8 py-8 bg-gradient-to-r from-gray-50 to-indigo-50/30 border-b border-gray-200/50">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          
          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div 
                  className={`flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg transition-all duration-300 ${
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
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <Icon className="w-8 h-8" />
                  )}
                </motion.div>
                <div className="mt-3 text-center">
                  <div className={`text-sm font-semibold ${
                    isActive ? 'text-indigo-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`mx-6 h-1 w-20 rounded-full transition-all duration-500 ${
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