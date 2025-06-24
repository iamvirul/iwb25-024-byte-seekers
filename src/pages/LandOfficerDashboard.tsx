import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBlockchain } from '../contexts/BlockchainContext';
import { motion } from 'framer-motion';
import { 
  Shield, 
  MapPin, 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Search,
  Filter,
  Eye,
  Download,
  UserCheck,
  FileCheck,
  Gavel,
  Settings,
  Bell,
  Calendar,
  Hash,
  Database,
  Zap,
  Award,
  Target,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';

const LandOfficerDashboard = () => {
  const { user } = useAuth();
  const { properties, transactions, disputes } = useBlockchain();
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Mock data for land officer specific metrics
  const pendingRegistrations = [
    {
      id: 'REG001',
      propertyTitle: 'කොළඹ නගර ඉඩම',
      applicant: 'සමන් ප්‍රේමසිරි',
      submittedDate: Date.now() - 86400000 * 2,
      status: 'pending_verification',
      area: 1.5,
      location: 'කොළඹ 05',
      priority: 'high'
    },
    {
      id: 'REG002',
      propertyTitle: 'ගම්පහ වත්ත',
      applicant: 'නිමල් සිල්වා',
      submittedDate: Date.now() - 86400000 * 5,
      status: 'document_review',
      area: 3.2,
      location: 'ගම්පහ',
      priority: 'medium'
    },
    {
      id: 'REG003',
      propertyTitle: 'කළුතර කෙත්',
      applicant: 'කමලා ජයවර්ධන',
      submittedDate: Date.now() - 86400000 * 1,
      status: 'survey_required',
      area: 5.0,
      location: 'කළුතර',
      priority: 'high'
    }
  ];

  const verificationQueue = [
    {
      id: 'VER001',
      type: 'document_verification',
      propertyId: 'PROP001',
      submittedBy: 'සුනිල් සිල්වා',
      documents: ['deed.pdf', 'survey.pdf', 'nic.jpg'],
      priority: 'urgent',
      daysWaiting: 3
    },
    {
      id: 'VER002',
      type: 'ownership_verification',
      propertyId: 'PROP002',
      submittedBy: 'මාලිනී ජයවර්ධන',
      documents: ['ownership_proof.pdf'],
      priority: 'high',
      daysWaiting: 1
    }
  ];

  const monthlyStats = [
    { month: 'ජන', registrations: 45, verifications: 52, disputes: 8 },
    { month: 'පෙබ', registrations: 38, verifications: 41, disputes: 12 },
    { month: 'මාර්', registrations: 62, verifications: 58, disputes: 6 },
    { month: 'අප්‍රේ', registrations: 55, verifications: 63, disputes: 9 },
    { month: 'මැයි', registrations: 71, verifications: 69, disputes: 4 },
    { month: 'ජුනි', registrations: 68, verifications: 72, disputes: 7 }
  ];

  const statusDistribution = [
    { name: 'අනුමත', value: 156, color: '#10B981' },
    { name: 'සත්‍යාපනය', value: 43, color: '#3B82F6' },
    { name: 'ප්‍රතික්ෂේප', value: 12, color: '#EF4444' },
    { name: 'රැදී සිටින', value: 28, color: '#F59E0B' }
  ];

  const workloadData = [
    { day: 'සඳුදා', completed: 12, pending: 8 },
    { day: 'අඟහ', completed: 15, pending: 6 },
    { day: 'බදාදා', completed: 18, pending: 9 },
    { day: 'බ්‍රහස්', completed: 14, pending: 11 },
    { day: 'සිකු', completed: 16, pending: 7 },
    { day: 'සෙන', completed: 10, pending: 5 },
    { day: 'ඉරිදා', completed: 8, pending: 3 }
  ];

  const stats = [
    { 
      label: 'අද සම්පූර්ණ කළ', 
      value: '12', 
      icon: CheckCircle, 
      color: 'from-green-500 to-green-600',
      change: '+3',
      changeType: 'positive'
    },
    { 
      label: 'සත්‍යාපනය වෙමින්', 
      value: '28', 
      icon: Clock, 
      color: 'from-blue-500 to-blue-600',
      change: '+5',
      changeType: 'positive'
    },
    { 
      label: 'ගැටළු සහිත', 
      value: '7', 
      icon: AlertTriangle, 
      color: 'from-red-500 to-red-600',
      change: '-2',
      changeType: 'negative'
    },
    { 
      label: 'මාසික ඉලක්කය', 
      value: '85%', 
      icon: Target, 
      color: 'from-purple-500 to-purple-600',
      change: '+12%',
      changeType: 'positive'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'verification_completed',
      title: 'ලේඛන සත්‍යාපනය සම්පූර්ණයි',
      description: 'PROP001 සඳහා සියලු ලේඛන සත්‍යාපනය කරන ලදී',
      time: '10 මිනිත්තුවකට පෙර',
      icon: FileCheck,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'registration_approved',
      title: 'ඉඩම් ලියාපදිංචිය අනුමත',
      description: 'කොළඹ නගර ඉඩම ලියාපදිංචිය අනුමත කරන ලදී',
      time: '25 මිනිත්තුවකට පෙර',
      icon: CheckCircle,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'dispute_assigned',
      title: 'ගැටළුවක් පවරන ලදී',
      description: 'ඉඩම් සීමා ගැටළුව ඔබට පවරන ලදී',
      time: '1 පැයකට පෙර',
      icon: Gavel,
      color: 'text-orange-600'
    },
    {
      id: 4,
      type: 'survey_requested',
      title: 'සර්වේ ඉල්ලීමක්',
      description: 'ගම්පහ වත්ත සඳහා නව සර්වේ ඉල්ලීමක්',
      time: '2 පැයකට පෙර',
      icon: MapPin,
      color: 'text-purple-600'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'නව ලියාපදිංචි ඉල්ලීමක්',
      message: 'කොළඹ නගර ඉඩම සඳහා නව ලියාපදිංචි ඉල්ලීමක්',
      time: '5 මිනිත්තුවකට පෙර',
      type: 'info',
      unread: true
    },
    {
      id: 2,
      title: 'හදිසි සත්‍යාපනය',
      message: 'PROP001 සඳහා හදිසි ලේඛන සත්‍යාපනය අවශ්‍යයි',
      time: '15 මිනිත්තුවකට පෙර',
      type: 'urgent',
      unread: true
    },
    {
      id: 3,
      title: 'ගැටළුව නිරාකරණය',
      message: 'DISP001 ගැටළුව සාර්ථකව නිරාකරණය කරන ලදී',
      time: '1 පැයකට පෙර',
      type: 'success',
      unread: false
    }
  ];

  const timeRangeOptions = [
    { value: '7d', label: 'පසුගිය 7 දින' },
    { value: '30d', label: 'පසුගිය 30 දින' },
    { value: '90d', label: 'පසුගිය 90 දින' }
  ];

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowSettings(false);
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
    setShowNotifications(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('si-LK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">හදිසි</span>;
      case 'high':
        return <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">ඉහළ</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">මධ්‍යම</span>;
      case 'low':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">අඩු</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_verification':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">සත්‍යාපනය වෙමින්</span>;
      case 'document_review':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">ලේඛන පරීක්ෂණය</span>;
      case 'survey_required':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">සර්වේ අවශ්‍යයි</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">අනුමතයි</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                ඉඩම් නිලධාරී ඩෑෂ්බෝඩ්
              </h1>
              <p className="text-gray-600">
                ආයුබෝවන්, {user?.name}! ඔබේ දෛනික කාර්ය සාරාංශය
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0 relative">
              <div className="relative">
                <Button 
                  variant="outline" 
                  icon={Bell} 
                  size="sm"
                  onClick={handleNotificationClick}
                  className="relative"
                >
                  දැනුම්දීම්
                  {notifications.filter(n => n.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  )}
                </Button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">දැනුම්දීම්</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                            notification.unread ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900 mb-1">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500">{notification.time}</p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <Button variant="outline" size="sm" className="w-full">
                        සියලු දැනුම්දීම් බලන්න
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="relative">
                <Button 
                  variant="outline" 
                  icon={Settings} 
                  size="sm"
                  onClick={handleSettingsClick}
                >
                  සැකසුම්
                </Button>
                
                {/* Settings Dropdown */}
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">සැකසුම්</h3>
                    </div>
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                        ප්‍රොෆයිල් සැකසුම්
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                        දැනුම්දීම් සැකසුම්
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                        ආරක්ෂණ සැකසුම්
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                        වාර්තා සැකසුම්
                      </button>
                      <hr className="my-2" />
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                        උදව් සහ සහාය
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                        ප්‍රතිපෝෂණ
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} hover className="relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center">
                      <span className={`text-xs font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">පසුගිය සතියට වඩා</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            );
          })}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card padding="none">
            <div className="flex flex-wrap border-b border-gray-200">
              {[
                { id: 'overview', label: 'සාරාංශය', icon: BarChart3 },
                { id: 'registrations', label: 'ලියාපදිංචි කිරීම්', icon: FileText },
                { id: 'verifications', label: 'සත්‍යාපන', icon: UserCheck },
                { id: 'disputes', label: 'ගැටළු', icon: Gavel }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
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

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <>
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monthly Performance */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">මාසික කාර්ය සාධනය</h3>
                      <div className="w-48">
                        <Select
                          value={selectedTimeRange}
                          onChange={setSelectedTimeRange}
                          options={timeRangeOptions}
                        />
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="registrations" fill="#3B82F6" name="ලියාපදිංචි" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="verifications" fill="#10B981" name="සත්‍යාපන" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>

                {/* Status Distribution */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">තත්ත්ව බෙදාහැරීම</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={statusDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {statusDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>
              </div>

              {/* Recent Activities and Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">මෑත ක්‍රියාකාරකම්</h3>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => {
                        const Icon = activity.icon;
                        return (
                          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${activity.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                              <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                              <p className="text-xs text-gray-400 mt-1 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </motion.div>

                {/* Weekly Workload */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">සතිපතා කාර්ය භාරය</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={workloadData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} name="සම්පූර්ණ" />
                        <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={2} name="රැදී සිටින" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>
              </div>
            </>
          )}

          {activeTab === 'registrations' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">රැදී සිටින ලියාපදිංචි කිරීම්</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" icon={Search} size="sm">සොයන්න</Button>
                    <Button variant="outline" icon={Filter} size="sm">ෆිල්ටර්</Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ඉඩම</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">අයදුම්කරු</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ප්‍රමාණය</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">තත්ත්වය</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ප්‍රමුඛතාව</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ක්‍රියාමාර්ග</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingRegistrations.map((registration) => (
                        <tr key={registration.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{registration.propertyTitle}</div>
                              <div className="text-sm text-gray-500">{registration.location}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {registration.applicant}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {registration.area} අක්කර
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(registration.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getPriorityBadge(registration.priority)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <Button variant="outline" icon={Eye} size="sm">බලන්න</Button>
                            <Button variant="primary" size="sm">සත්‍යාපනය</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'verifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">සත්‍යාපන පෝලිම</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" icon={Search} size="sm">සොයන්න</Button>
                    <Button variant="outline" icon={Filter} size="sm">ෆිල්ටර්</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {verificationQueue.map((item) => (
                    <Card key={item.id} hover className="border-l-4 border-l-blue-500">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{item.propertyId}</h4>
                          <p className="text-sm text-gray-600">{item.submittedBy}</p>
                        </div>
                        {getPriorityBadge(item.priority)}
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">ලේඛන:</p>
                        <div className="space-y-1">
                          {item.documents.map((doc, index) => (
                            <div key={index} className="flex items-center text-xs text-gray-500">
                              <FileText className="w-3 h-3 mr-1" />
                              {doc}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {item.daysWaiting} දින රැදී සිටින
                        </span>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm" icon={Eye}>බලන්න</Button>
                          <Button variant="primary" size="sm">සත්‍යාපනය</Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'disputes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">ගැටළු කළමනාකරණය</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" icon={Search} size="sm">සොයන්න</Button>
                    <Button variant="outline" icon={Filter} size="sm">ෆිල්ටර්</Button>
                  </div>
                </div>
                
                <div className="text-center py-12">
                  <Gavel className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">ගැටළු කළමනාකරණය</h4>
                  <p className="text-gray-600 mb-6">
                    ඉඩම් සම්බන්ධ ගැටළු සහ ඒවායේ නිරාකරණ ක්‍රියාවලිය
                  </p>
                  <Button icon={Gavel}>ගැටළු බලන්න</Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Click outside to close dropdowns */}
        {(showNotifications || showSettings) && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => {
              setShowNotifications(false);
              setShowSettings(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LandOfficerDashboard;