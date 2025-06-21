import React from 'react';
import { motion } from 'framer-motion';
import { User, FileText, Shield, Settings } from 'lucide-react';
import Card from '../ui/Card';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: Tab[] = [
    { id: 'personal', label: 'පුද්ගලික තොරතුරු', icon: User },
    { id: 'documents', label: 'ලේඛන', icon: FileText },
    { id: 'security', label: 'ආරක්ෂාව', icon: Shield },
    { id: 'settings', label: 'සැකසුම්', icon: Settings }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-8"
    >
      <Card padding="none">
        <div className="flex flex-wrap border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
};

export default TabNavigation;