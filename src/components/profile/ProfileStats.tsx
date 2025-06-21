import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, FileText, Shield } from 'lucide-react';
import Card from '../ui/Card';

interface ProfileStatsProps {
  documents: any[];
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ documents }) => {
  const stats = [
    { 
      label: 'සත්‍යාපිත ලේඛන', 
      value: documents.filter(d => d.status === 'verified').length, 
      icon: CheckCircle, 
      color: 'text-green-600' 
    },
    { 
      label: 'සත්‍යාපනය වෙමින්', 
      value: documents.filter(d => d.status === 'pending').length, 
      icon: Clock, 
      color: 'text-yellow-600' 
    },
    { 
      label: 'මුළු ලේඛන', 
      value: documents.length, 
      icon: FileText, 
      color: 'text-blue-600' 
    },
    { 
      label: 'ගිණුම් ආරක්ෂාව', 
      value: '98%', 
      icon: Shield, 
      color: 'text-purple-600' 
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} hover className="text-center h-full">
            <div className="flex flex-col items-center h-full justify-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </Card>
        );
      })}
    </motion.div>
  );
};

export default ProfileStats;