import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  X, 
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Clock,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Calendar,
  FileText,
  Gavel,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile Settings
    profile: {
      name: 'නීති නිලධාරී',
      email: 'legal@landregistry.lk',
      phone: '+94771234567',
      department: 'නීති අංශය',
      position: 'ජ්‍යෙෂ්ඨ නීති නිලධාරී'
    },
    // Notification Settings
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      caseUpdates: true,
      hearingReminders: true,
      documentAlerts: true,
      systemAlerts: true,
      weeklyReports: false,
      marketingEmails: false
    },
    // Security Settings
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAlerts: true
    },
    // Appearance Settings
    appearance: {
      theme: 'light', // light, dark, system
      language: 'sinhala',
      fontSize: 'medium',
      compactMode: false
    },
    // System Settings
    system: {
      autoSave: true,
      defaultView: 'grid',
      itemsPerPage: 20,
      timezone: 'Asia/Colombo'
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const tabs = [
    { id: 'profile', label: 'ප්‍රොෆයිලය', icon: User },
    { id: 'notifications', label: 'දැනුම්දීම්', icon: Bell },
    { id: 'security', label: 'ආරක්ෂාව', icon: Shield },
    { id: 'appearance', label: 'පෙනුම', icon: Palette },
    { id: 'system', label: 'පද්ධතිය', icon: Settings }
  ];

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Simulate saving settings
    alert('සැකසුම් සාර්ථකව සුරකින ලදී');
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('මුරපද නොගැලපේ');
      return;
    }
    if (newPassword.length < 6) {
      alert('මුරපදය අවම වශයෙන් අක්ෂර 6ක් තිබිය යුතුයි');
      return;
    }
    alert('මුරපදය සාර්ථකව වෙනස් කරන ලදී');
    setNewPassword('');
    setConfirmPassword('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">සැකසුම්</h3>
              <p className="text-sm text-gray-600">
                ඔබේ ගිණුම් සහ පද්ධති සැකසුම් වෙනස් කරන්න
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex h-[calc(85vh-76px)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 bg-gray-50 p-4">
            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">ප්‍රොෆයිල් සැකසුම්</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      නම
                    </label>
                    <input
                      type="text"
                      value={settings.profile.name}
                      onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ඊමේල් ලිපිනය
                    </label>
                    <input
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      දුරකථන අංකය
                    </label>
                    <input
                      type="tel"
                      value={settings.profile.phone}
                      onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      දෙපාර්තමේන්තුව
                    </label>
                    <input
                      type="text"
                      value={settings.profile.department}
                      onChange={(e) => updateSetting('profile', 'department', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      තනතුර
                    </label>
                    <input
                      type="text"
                      value={settings.profile.position}
                      onChange={(e) => updateSetting('profile', 'position', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <User className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium text-blue-800 mb-1">ප්‍රොෆයිල් තොරතුරු</h5>
                      <p className="text-sm text-blue-700">
                        ඔබේ ප්‍රොෆයිල් තොරතුරු යාවත්කාලීන කිරීමෙන් පද්ධතිය තුළ ඔබව හඳුනා ගැනීමට පහසු වේ.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">දැනුම්දීම් සැකසුම්</h4>
                
                <div className="space-y-4">
                  <h5 className="font-medium text-gray-900">දැනුම්දීම් ක්‍රම</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">ඊමේල් දැනුම්දීම්</p>
                          <p className="text-sm text-gray-600">ඔබේ ඊමේල් ලිපිනයට දැනුම්දීම් ලැබේ</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={settings.notifications.emailNotifications}
                          onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Smartphone className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">SMS දැනුම්දීම්</p>
                          <p className="text-sm text-gray-600">ඔබේ දුරකථනයට කෙටි පණිවිඩ ලැබේ</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={settings.notifications.smsNotifications}
                          onChange={(e) => updateSetting('notifications', 'smsNotifications', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 text-orange-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">පුෂ් දැනුම්දීම්</p>
                          <p className="text-sm text-gray-600">වෙබ් බ්‍රවුසරයේ දැනුම්දීම් ලැබේ</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={settings.notifications.pushNotifications}
                          onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  <h5 className="font-medium text-gray-900">දැනුම්දීම් වර්ග</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        id="caseUpdates" 
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        checked={settings.notifications.caseUpdates}
                        onChange={(e) => updateSetting('notifications', 'caseUpdates', e.target.checked)}
                      />
                      <label htmlFor="caseUpdates" className="text-sm text-gray-700">
                        සිද්ධි යාවත්කාලීන
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        id="hearingReminders" 
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        checked={settings.notifications.hearingReminders}
                        onChange={(e) => updateSetting('notifications', 'hearingReminders', e.target.checked)}
                      />
                      <label htmlFor="hearingReminders" className="text-sm text-gray-700">
                        විභාග මතක් කිරීම්
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        id="documentAlerts" 
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        checked={settings.notifications.documentAlerts}
                        onChange={(e) => updateSetting('notifications', 'documentAlerts', e.target.checked)}
                      />
                      <label htmlFor="documentAlerts" className="text-sm text-gray-700">
                        ලේඛන ඇඟවීම්
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        id="systemAlerts" 
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        checked={settings.notifications.systemAlerts}
                        onChange={(e) => updateSetting('notifications', 'systemAlerts', e.target.checked)}
                      />
                      <label htmlFor="systemAlerts" className="text-sm text-gray-700">
                        පද්ධති ඇඟවීම්
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        id="weeklyReports" 
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        checked={settings.notifications.weeklyReports}
                        onChange={(e) => updateSetting('notifications', 'weeklyReports', e.target.checked)}
                      />
                      <label htmlFor="weeklyReports" className="text-sm text-gray-700">
                        සතිපතා වාර්තා
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        id="marketingEmails" 
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        checked={settings.notifications.marketingEmails}
                        onChange={(e) => updateSetting('notifications', 'marketingEmails', e.target.checked)}
                      />
                      <label htmlFor="marketingEmails" className="text-sm text-gray-700">
                        අලෙවිකරණ ඊමේල්
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <Bell className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium text-purple-800 mb-1">දැනුම්දීම් ඉඟි</h5>
                      <p className="text-sm text-purple-700">
                        වැදගත් සිද්ධි සහ විභාග සඳහා දැනුම්දීම් සක්‍රීය කිරීමෙන් ඔබට කිසිවක් මඟ නොහැරේ.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">ආරක්ෂක සැකසුම්</h4>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">මුරපද වෙනස් කිරීම</h5>
                    <div className="space-y-3">
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="නව මුරපදය"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="නව මුරපදය නැවත ඇතුළත් කරන්න"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      
                      <Button onClick={handlePasswordChange}>
                        මුරපදය වෙනස් කරන්න
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Smartphone className="w-5 h-5 text-purple-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">ද්විමාන සත්‍යාපනය</p>
                        <p className="text-sm text-gray-600">ඔබේ ගිණුමට අමතර ආරක්ෂාවක් ලබා දෙන්න</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">සැසි කාලය (මිනිත්තු)</h5>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                      min="5"
                      max="120"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      අක්‍රීය කාලය පසු වූ පසු ඔබව ස්වයංක්‍රීයව ඉවත් කරනු ලැබේ
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 text-orange-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">පිවිසුම් ඇඟවීම්</p>
                        <p className="text-sm text-gray-600">නව උපාංගයකින් පිවිසුම් සිදු වූ විට දැනුම්දීම්</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.security.loginAlerts}
                        onChange={(e) => updateSetting('security', 'loginAlerts', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium text-red-800 mb-1">ආරක්ෂක උපදෙස්</h5>
                      <p className="text-sm text-red-700">
                        ඔබේ ගිණුම ආරක්ෂා කිරීම සඳහා ශක්තිමත් මුරපදයක් භාවිතා කරන්න සහ ද්විමාන සත්‍යාපනය සක්‍රීය කරන්න.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">පෙනුම් සැකසුම්</h4>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">තේමාව</h5>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => updateSetting('appearance', 'theme', 'light')}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                          settings.appearance.theme === 'light'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <Sun className="w-8 h-8 text-orange-500 mb-2" />
                        <span className="text-sm font-medium">ආලෝකමත්</span>
                      </button>
                      
                      <button
                        onClick={() => updateSetting('appearance', 'theme', 'dark')}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                          settings.appearance.theme === 'dark'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <Moon className="w-8 h-8 text-indigo-500 mb-2" />
                        <span className="text-sm font-medium">අඳුරු</span>
                      </button>
                      
                      <button
                        onClick={() => updateSetting('appearance', 'theme', 'system')}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                          settings.appearance.theme === 'system'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <Monitor className="w-8 h-8 text-gray-500 mb-2" />
                        <span className="text-sm font-medium">පද්ධතිය</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">භාෂාව</h5>
                    <select
                      value={settings.appearance.language}
                      onChange={(e) => updateSetting('appearance', 'language', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="sinhala">සිංහල</option>
                      <option value="tamil">தமிழ்</option>
                      <option value="english">English</option>
                    </select>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">අකුරු ප්‍රමාණය</h5>
                    <div className="flex items-center space-x-4">
                      {['small', 'medium', 'large'].map((size) => (
                        <label key={size} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="fontSize"
                            value={size}
                            checked={settings.appearance.fontSize === size}
                            onChange={() => updateSetting('appearance', 'fontSize', size)}
                            className="sr-only"
                          />
                          <div className={`w-12 h-12 flex items-center justify-center rounded-lg border ${
                            settings.appearance.fontSize === size
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 text-gray-700'
                          }`}>
                            {size === 'small' && 'අ'}
                            {size === 'medium' && 'අ'}
                            {size === 'large' && 'අ'}
                          </div>
                          <span className="ml-2 text-sm text-gray-700">
                            {size === 'small' && 'කුඩා'}
                            {size === 'medium' && 'මධ්‍යම'}
                            {size === 'large' && 'විශාල'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Palette className="w-5 h-5 text-purple-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">සංක්ෂිප්ත මාදිලිය</p>
                        <p className="text-sm text-gray-600">අන්තර්ගතය වඩාත් සංක්ෂිප්තව පෙන්වන්න</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.appearance.compactMode}
                        onChange={(e) => updateSetting('appearance', 'compactMode', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <Palette className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium text-purple-800 mb-1">පෙනුම් සැකසුම්</h5>
                      <p className="text-sm text-purple-700">
                        ඔබේ අවශ්‍යතා අනුව පද්ධතියේ පෙනුම සකසා ගන්න.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">පද්ධති සැකසුම්</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Save className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">ස්වයංක්‍රීය සුරැකීම</p>
                        <p className="text-sm text-gray-600">වෙනස්කම් ස්වයංක්‍රීයව සුරකින්න</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.system.autoSave}
                        onChange={(e) => updateSetting('system', 'autoSave', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">පෙරනිමි දර්ශනය</h5>
                    <div className="flex items-center space-x-4">
                      {['grid', 'list'].map((view) => (
                        <label key={view} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="defaultView"
                            value={view}
                            checked={settings.system.defaultView === view}
                            onChange={() => updateSetting('system', 'defaultView', view)}
                            className="sr-only"
                          />
                          <div className={`w-12 h-12 flex items-center justify-center rounded-lg border ${
                            settings.system.defaultView === view
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 text-gray-700'
                          }`}>
                            {view === 'grid' && 'ජාලය'}
                            {view === 'list' && 'ලැයිස්තුව'}
                          </div>
                          <span className="ml-2 text-sm text-gray-700">
                            {view === 'grid' && 'ජාලය'}
                            {view === 'list' && 'ලැයිස්තුව'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">පිටුවකට අයිතම ගණන</h5>
                    <select
                      value={settings.system.itemsPerPage}
                      onChange={(e) => updateSetting('system', 'itemsPerPage', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">කාල කලාපය</h5>
                    <select
                      value={settings.system.timezone}
                      onChange={(e) => updateSetting('system', 'timezone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Asia/Colombo">ශ්‍රී ලංකාව (UTC+5:30)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <Settings className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium text-blue-800 mb-1">පද්ධති සැකසුම්</h5>
                      <p className="text-sm text-blue-700">
                        මෙම සැකසුම් ඔබේ පද්ධති අත්දැකීම වඩාත් පහසු කරයි.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <div className="space-x-3">
            <Button variant="outline" onClick={onClose}>
              අවලංගු කරන්න
            </Button>
            <Button icon={Save} onClick={handleSave}>
              සැකසුම් සුරකින්න
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsModal;