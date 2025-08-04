import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import ProfileHeader from '../components/profile/ProfileHeader';
import TabNavigation from '../components/profile/TabNavigation';
import PersonalInfoTab from '../components/profile/PersonalInfoTab';
import SecurityTab from '../components/profile/SecurityTab';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '+94771234567',
    address: 'කොළඹ 01, ශ්‍රී ලංකාව',
    nic: '199512345678',
    slUdiId: user?.slUdiId || '',
    dateOfBirth: '1995-06-15',
    occupation: 'ඉඩම් හිමියා',
    emergencyContact: '+94112345678'
  });

  const handleSave = () => {
    setTimeout(() => {
      setIsEditing(false);
      toast.success("ප්‍රොෆයිල් සාර්ථකව යාවත්කාලීන කරන ලදී");
    }, 1000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoTab
            profileData={profileData}
            isEditing={isEditing}
            onDataChange={setProfileData}
          />
        );
      case 'security':
        return <SecurityTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700 mb-6">
            <User className="w-4 h-4 mr-2" />
            පරිශීලක ප්‍රොෆයිල් කළමනාකරණය
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            මගේ ප්‍රොෆයිලය
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ඔබේ පුද්ගලික තොරතුරු, ලේඛන සහ ගිණුම් සැකසුම් කළමනාකරණය කරන්න
          </p>
        </motion.div>
        <ProfileHeader
          user={user}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(!isEditing)}
          onSave={handleSave}
        />
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;