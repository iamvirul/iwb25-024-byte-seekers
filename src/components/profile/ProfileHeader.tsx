import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle, Shield, Edit, Save, X } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ProfileHeaderProps {
  user: any;
  isEditing: boolean;
  onEditToggle: () => void;
  onSave: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isEditing,
  onEditToggle,
  onSave
}) => {


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8"
    >
      <Card>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <User className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{user?.name}</h2>
            <p className="text-gray-600 mb-1">{user?.email}</p>
            <p className="text-sm text-gray-500 mb-4">SL-UDI: {user?.slUdiId}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-1" />
                සත්‍යාපිත ගිණුම
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4 mr-1" />
                {user?.role === 'land_owner' ? 'සාමාන්‍ය පුරවැසියා' : 
                 user?.role === 'land_officer' ? 'ඉඩම් නිලධාරියා' : 'නීති නිලධාරියා'}
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant={isEditing ? "secondary" : "primary"}
              icon={isEditing ? X : Edit}
              onClick={onEditToggle}
            >
              {isEditing ? 'අවලංගු' : 'සංස්කරණය'}
            </Button>
            {isEditing && (
              <Button
                variant="primary"
                icon={Save}
                onClick={onSave}
              >
                සුරකින්න
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileHeader;