import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, CheckCircle, Shield, Edit, Save, X } from 'lucide-react';
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
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('කරුණාකර වලංගු ඡායාරූපයක් තෝරන්න');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('ඡායාරූපය 5MB ට වඩා කුඩා විය යුතුයි');
        return;
      }

      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      // Here you would typically upload to your server
      // For now, we'll just show a success message
      setTimeout(() => {
        alert('ප්‍රොෆයිල් ඡායාරූපය සාර්ථකව යාවත්කාලීන කරන ලදී');
      }, 1000);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

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
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            <button 
              onClick={triggerImageUpload}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors group"
              title="ප්‍රොෆයිල් ඡායාරූපය වෙනස් කරන්න"
            >
              <Camera className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
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
                {user?.role === 'citizen' ? 'සාමාන්‍ය පුරවැසියා' : 
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

        {/* Image Upload Instructions */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <div className="flex items-start">
            <Camera className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-800 mb-1">ප්‍රොෆයිල් ඡායාරූපය</h4>
              <p className="text-xs text-blue-700">
                කැමරා අයිකනය ක්ලික් කර ඔබේ ප්‍රොෆයිල් ඡායාරූපය යාවත්කාලීන කරන්න. 
                JPG, PNG ආකෘති සහාය දක්වයි (උපරිම 5MB).
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileHeader;