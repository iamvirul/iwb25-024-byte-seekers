import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

// Import components
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import TabNavigation from '../components/profile/TabNavigation';
import PersonalInfoTab from '../components/profile/PersonalInfoTab';
import DocumentsTab from '../components/profile/DocumentsTab';
import SecurityTab from '../components/profile/SecurityTab';
import SettingsTab from '../components/profile/SettingsTab';

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

  const [documents, setDocuments] = useState([
    {
      id: 'DOC001',
      name: 'ජාතික හැඳුනුම්පත (ඉදිරිපස)',
      type: 'nic_front',
      status: 'verified',
      uploadDate: Date.now() - 86400000 * 30,
      size: '2.1 MB',
      url: '/documents/nic-front.jpg'
    },
    {
      id: 'DOC002',
      name: 'ජාතික හැඳුනුම්පත (පිටුපස)',
      type: 'nic_back',
      status: 'verified',
      uploadDate: Date.now() - 86400000 * 30,
      size: '1.9 MB',
      url: '/documents/nic-back.jpg'
    },
    {
      id: 'DOC003',
      name: 'SL-UDI ඩිජිටල් හැඳුනුම්පත',
      type: 'sl_udi',
      status: 'verified',
      uploadDate: Date.now() - 86400000 * 25,
      size: '3.2 MB',
      url: '/documents/sl-udi.pdf'
    },
    {
      id: 'DOC004',
      name: 'උපන් සහතිකය',
      type: 'birth_certificate',
      status: 'pending',
      uploadDate: Date.now() - 86400000 * 5,
      size: '2.8 MB',
      url: '/documents/birth-cert.pdf'
    }
  ]);

  const [newDocuments, setNewDocuments] = useState<File[]>([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState('other');

  const documentTypes = [
    { value: 'nic_front', label: 'ජාතික හැඳුනුම්පත (ඉදිරිපස)' },
    { value: 'nic_back', label: 'ජාතික හැඳුනුම්පත (පිටුපස)' },
    { value: 'sl_udi', label: 'SL-UDI ඩිජිටල් හැඳුනුම්පත' },
    { value: 'birth_certificate', label: 'උපන් සහතිකය' },
    { value: 'profile_photo', label: 'ප්‍රොෆයිල් ඡායාරූපය' },
    { value: 'passport', label: 'ගමන් බලපත්‍රය' },
    { value: 'driving_license', label: 'රියදුරු බලපත්‍රය' },
    { value: 'utility_bill', label: 'උපයෝගිතා බිල්පත' },
    { value: 'bank_statement', label: 'බැංකු ප්‍රකාශනය' },
    { value: 'other', label: 'වෙනත්' }
  ];

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      alert('ප්‍රොෆයිල් සාර්ථකව යාවත්කාලීන කරන ලදී');
    }, 1000);
  };

  const handleDocumentUpload = () => {
    if (newDocuments.length === 0) return;

    // Validate file types based on selected document type
    const isValidFileType = (file: File, type: string) => {
      if (type === 'profile_photo') {
        return file.type.startsWith('image/');
      }
      return true; // Allow all file types for other documents
    };

    // Validate file sizes
    const maxSize = selectedDocumentType === 'profile_photo' ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB for images, 10MB for others
    
    const validFiles = newDocuments.filter(file => {
      if (!isValidFileType(file, selectedDocumentType)) {
        alert(`${file.name}: වලංගු නොවන ගොනු වර්ගය`);
        return false;
      }
      if (file.size > maxSize) {
        const maxSizeMB = maxSize / (1024 * 1024);
        alert(`${file.name}: ගොනුව ${maxSizeMB}MB ට වඩා කුඩා විය යුතුයි`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const uploadedDocs = validFiles.map((file, index) => ({
      id: 'DOC' + (documents.length + index + 1).toString().padStart(3, '0'),
      name: file.name,
      type: selectedDocumentType,
      status: 'pending',
      uploadDate: Date.now(),
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      url: URL.createObjectURL(file)
    }));

    setDocuments([...documents, ...uploadedDocs]);
    setNewDocuments([]);
    
    // Show success message
    const message = selectedDocumentType === 'profile_photo' 
      ? 'ප්‍රොෆයිල් ඡායාරූපය සාර්ථකව උඩුගත කරන ලදී'
      : 'ලේඛන සාර්ථකව උඩුගත කරන ලදී';
    alert(message);
  };

  const deleteDocument = (docId: string) => {
    if (confirm('ඔබට මෙම ලේඛනය ඉවත් කිරීමට අවශ්‍යද?')) {
      setDocuments(documents.filter(doc => doc.id !== docId));
      alert('ලේඛනය ඉවත් කරන ලදී');
    }
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
      case 'documents':
        return (
          <DocumentsTab
            documents={documents}
            newDocuments={newDocuments}
            selectedDocumentType={selectedDocumentType}
            documentTypes={documentTypes}
            onNewDocumentsChange={setNewDocuments}
            onDocumentTypeChange={setSelectedDocumentType}
            onDocumentUpload={handleDocumentUpload}
            onDocumentDelete={deleteDocument}
          />
        );
      case 'security':
        return <SecurityTab />;
      case 'settings':
        return <SettingsTab />;
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

        {/* Stats Cards */}
        <ProfileStats documents={documents} />

        {/* Profile Header Card */}
        <ProfileHeader
          user={user}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(!isEditing)}
          onSave={handleSave}
        />

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
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