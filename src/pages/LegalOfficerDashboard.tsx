import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Scale, 
  BarChart3, 
  Gavel, 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  BookOpen,
  Award,
  Eye,
  Edit,
  Download,
  Plus,
  Search,
  Filter,
  Settings,
  Bell,
  MessageSquare,
  Hash,
  X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import CaseManagement from '../components/legal/CaseManagement';
import LegalPrecedents from '../components/legal/LegalPrecedents';
import NotificationsModal from '../components/legal/NotificationsModal';
import SettingsModal from '../components/legal/SettingsModal';

const LegalOfficerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Mock data for legal officer specific metrics
  const [cases, setCases] = useState([
    {
      id: 'CASE001',
      disputeId: 'DISP001',
      title: 'ඉඩම් සීමා ගැටළුව - කොළොන්නාව',
      propertyId: 'PROP001',
      complainant: 'සුනිල් සිල්වා',
      defendant: 'කමල් පෙරේරා',
      filedDate: Date.now() - 86400000 * 15,
      status: 'investigating',
      priority: 'high',
      assignedDate: Date.now() - 86400000 * 10,
      hearingDate: Date.now() + 86400000 * 7,
      caseType: 'boundary_dispute',
      evidence: ['survey_report.pdf', 'witness_statement.pdf', 'photos.zip'],
      legalPrecedents: ['CASE_2023_045', 'CASE_2022_123'],
      estimatedResolutionDays: 30,
      notes: 'සර්වේ වාර්තාව සමාලෝචනය කිරීම අවශ්‍යයි'
    },
    {
      id: 'CASE002',
      disputeId: 'DISP002',
      title: 'හිමිකම් ගැටළුව - ගම්පහ',
      propertyId: 'PROP002',
      complainant: 'මාලිනී ජයවර්ධන',
      defendant: 'රාජ් සිංහ',
      filedDate: Date.now() - 86400000 * 8,
      status: 'pending_review',
      priority: 'medium',
      assignedDate: Date.now() - 86400000 * 5,
      caseType: 'ownership_dispute',
      evidence: ['deed_copy.pdf', 'bank_documents.pdf'],
      legalPrecedents: ['CASE_2023_078'],
      estimatedResolutionDays: 45,
      notes: ''
    },
    {
      id: 'CASE003',
      disputeId: 'DISP003',
      title: 'කොන්ත්‍රාක්ටු උල්ලංඝනය - කළුතර',
      propertyId: 'PROP003',
      complainant: 'අනිල් ප්‍රේමසිරි',
      defendant: 'සුමන් ප්‍රේමසිරි',
      filedDate: Date.now() - 86400000 * 3,
      status: 'hearing_scheduled',
      priority: 'urgent',
      assignedDate: Date.now() - 86400000 * 2,
      hearingDate: Date.now() + 86400000 * 3,
      caseType: 'contract_breach',
      evidence: ['contract.pdf', 'payment_records.pdf', 'correspondence.pdf'],
      legalPrecedents: ['CASE_2024_012', 'CASE_2023_156'],
      estimatedResolutionDays: 21,
      notes: 'හදිසි සිද්ධියක් - ඉක්මන් විභාගයක් අවශ්‍යයි'
    }
  ]);

  const [precedents, setPrecedents] = useState([
    {
      id: 'PREC001',
      caseNumber: 'CASE_2023_045',
      title: 'ඉඩම් සීමා නිර්ණය - සර්වේ වාර්තා මත පදනම්ව',
      year: 2023,
      court: 'high_court',
      summary: 'ඉඩම් සීමා ගැටළුවක් සම්බන්ධයෙන් සර්වේ වාර්තාවේ නිරවද්‍යතාව මත පදනම්ව තීරණයක් ගන්නා ලදී. නිල සර්වේකරුවන්ගේ වාර්තා ප්‍රමුඛත්වය ලබයි.',
      relevantSections: ['ඉඩම් ලියාපදිංචි කිරීමේ ආඥාව 19වන වගන්තිය', 'සර්වේ ආඥාව 12වන වගන්තිය'],
      outcome: 'පැමිණිලිකරුට පක්ෂව',
      applicableScenarios: ['ඉඩම් සීමා ගැටළු', 'සර්වේ වාර්තා මත පදනම්ව තීරණ', 'නිල සර්වේකරුවන්ගේ සාක්ෂි'],
      tags: ['ඉඩම් සීමා', 'සර්වේ වාර්තා', 'මහාධිකරණය'],
      citationCount: 15,
      lastUpdated: Date.now() - 86400000 * 30
    },
    {
      id: 'PREC002',
      caseNumber: 'CASE_2023_078',
      title: 'හිමිකම් ගැටළුව - ලේඛන සත්‍යතාව',
      year: 2023,
      court: 'district_court',
      summary: 'ඉඩම් හිමිකම් ගැටළුවක් සම්බන්ධයෙන් ලේඛනවල සත්‍යතාව සහ නීතිමය වලංගුතාව පරීක්ෂා කරන ලදී. මුල් ලේඛන සහ සහතික කළ පිටපත් අතර වෙනස.',
      relevantSections: ['ඉඩම් ලියාපදිංචි කිරීමේ ආඥාව 25වන වගන්තිය', 'සාක්ෂි ආඥාව 67වන වගන්තිය'],
      outcome: 'විත්තිකරුට පක්ෂව',
      applicableScenarios: ['හිමිකම් ගැටළු', 'ලේඛන සත්‍යතාව', 'සහතික කළ පිටපත්'],
      tags: ['හිමිකම්', 'ලේඛන සත්‍යතාව', 'දිස්ත්‍රික් අධිකරණය'],
      citationCount: 8,
      lastUpdated: Date.now() - 86400000 * 45
    },
    {
      id: 'PREC003',
      caseNumber: 'CASE_2024_012',
      title: 'කොන්ත්‍රාක්ටු උල්ලංඝනය - වන්දි ගෙවීම',
      year: 2024,
      court: 'supreme_court',
      summary: 'ඉඩම් විකිණීමේ කොන්ත්‍රාක්ටුවක් උල්ලංඝනය කිරීම සම්බන්ධයෙන් වන්දි ගෙවීමේ ප්‍රමාණය නිර්ණය කිරීම. වෙළඳපල වටිනාකම සහ අලාභය සලකා බැලීම.',
      relevantSections: ['කොන්ත්‍රාක්ටු ආඥාව 73වන වගන්තිය', 'වන්දි ගෙවීමේ ආඥාව 15වන වගන්තිය'],
      outcome: 'පැමිණිලිකරුට වන්දි ගෙවීමට නියම',
      applicableScenarios: ['කොන්ත්‍රාක්ටු උල්ලංඝනය', 'වන්දි ගණනය කිරීම', 'වෙළඳපල වටිනාකම'],
      tags: ['කොන්ත්‍රාක්ටු', 'වන්දි', 'ශ්‍රේෂ්ඨාධිකරණය'],
      citationCount: 23,
      lastUpdated: Date.now() - 86400000 * 15
    }
  ]);

  // Add precedent modal state
  const [showAddPrecedentModal, setShowAddPrecedentModal] = useState(false);
  const [newPrecedent, setNewPrecedent] = useState({
    caseNumber: '',
    title: '',
    year: new Date().getFullYear(),
    court: '',
    summary: '',
    relevantSections: [''],
    outcome: '',
    applicableScenarios: [''],
    tags: [''],
    citationCount: 0
  });

  // View precedent modal state
  const [showViewPrecedentModal, setShowViewPrecedentModal] = useState(false);
  const [selectedPrecedent, setSelectedPrecedent] = useState(null);

  const monthlyStats = [
    { month: 'ජන', cases: 12, resolved: 8, pending: 4 },
    { month: 'පෙබ', cases: 15, resolved: 11, pending: 4 },
    { month: 'මාර්', cases: 18, resolved: 14, pending: 4 },
    { month: 'අප්‍රේ', cases: 14, resolved: 10, pending: 4 },
    { month: 'මැයි', cases: 20, resolved: 16, pending: 4 },
    { month: 'ජුනි', cases: 16, resolved: 12, pending: 4 }
  ];

  const caseStatusData = [
    { name: 'විමර්ශනය', value: 8, color: '#3B82F6' },
    { name: 'විභාගය නියමිත', value: 5, color: '#8B5CF6' },
    { name: 'නිරාකරණය', value: 12, color: '#10B981' },
    { name: 'සමාලෝචනය', value: 3, color: '#F59E0B' }
  ];

  const resolutionTimeData = [
    { day: 'සඳුදා', avgDays: 28 },
    { day: 'අඟහ', avgDays: 32 },
    { day: 'බදාදා', avgDays: 25 },
    { day: 'බ්‍රහස්', avgDays: 30 },
    { day: 'සිකු', avgDays: 27 },
    { day: 'සෙන', avgDays: 24 },
    { day: 'ඉරිදා', avgDays: 26 }
  ];

  const stats = [
    { 
      label: 'අද සම්පූර්ණ කළ', 
      value: '5', 
      icon: CheckCircle, 
      color: 'from-green-500 to-green-600',
      change: '+2',
      changeType: 'positive'
    },
    { 
      label: 'විමර්ශනය වෙමින්', 
      value: '8', 
      icon: Clock, 
      color: 'from-blue-500 to-blue-600',
      change: '+1',
      changeType: 'positive'
    },
    { 
      label: 'විභාගය නියමිත', 
      value: '5', 
      icon: Calendar, 
      color: 'from-purple-500 to-purple-600',
      change: '+3',
      changeType: 'positive'
    },
    { 
      label: 'සාමාන්‍ය නිරාකරණ කාලය', 
      value: '28 දින', 
      icon: TrendingUp, 
      color: 'from-orange-500 to-orange-600',
      change: '-3 දින',
      changeType: 'positive'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'case_resolved',
      title: 'නීතිමය සිද්ධියක් නිරාකරණය',
      description: 'CASE001 - ඉඩම් සීමා ගැටළුව සාර්ථකව නිරාකරණය කරන ලදී',
      time: '30 මිනිත්තුවකට පෙර',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'hearing_scheduled',
      title: 'විභාගයක් නියම කරන ලදී',
      description: 'CASE003 සඳහා හෙට දින 2:00 PM විභාගය',
      time: '1 පැයකට පෙර',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      id: 3,
      type: 'precedent_added',
      title: 'නව පූර්වාදර්ශයක් එක් කරන ලදී',
      description: 'CASE_2024_089 - හිමිකම් ගැටළු සම්බන්ධයෙන්',
      time: '2 පැයකට පෙර',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'case_assigned',
      title: 'නව සිද්ධියක් පවරන ලදී',
      description: 'CASE004 - කොන්ත්‍රාක්ටු ගැටළුව ඔබට පවරන ලදී',
      time: '3 පැයකට පෙර',
      icon: Gavel,
      color: 'text-orange-600'
    }
  ];

  const timeRangeOptions = [
    { value: '7d', label: 'පසුගිය 7 දින' },
    { value: '30d', label: 'පසුගිය 30 දින' },
    { value: '90d', label: 'පසුගිය 90 දින' }
  ];

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('si-LK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCaseUpdate = (caseId, updates) => {
    setCases(prev => prev.map(case_ => 
      case_.id === caseId ? { ...case_, ...updates } : case_
    ));
  };

  const handleScheduleHearing = (caseId, date) => {
    setCases(prev => prev.map(case_ => 
      case_.id === caseId 
        ? { ...case_, hearingDate: date, status: 'hearing_scheduled' }
        : case_
    ));
  };

  const handleResolveCase = (caseId, resolution) => {
    setCases(prev => prev.map(case_ => 
      case_.id === caseId 
        ? { ...case_, status: 'resolved', resolution }
        : case_
    ));
  };

  const handleAddPrecedent = (precedentData) => {
    const newPrec = {
      id: 'PREC' + (precedents.length + 1).toString().padStart(3, '0'),
      ...precedentData,
      lastUpdated: Date.now()
    };
    setPrecedents(prev => [...prev, newPrec]);
  };

  const handleUpdatePrecedent = (id, updates) => {
    setPrecedents(prev => prev.map(prec => 
      prec.id === id ? { ...prec, ...updates, lastUpdated: Date.now() } : prec
    ));
  };

  const handleDeletePrecedent = (id) => {
    setPrecedents(prev => prev.filter(prec => prec.id !== id));
  };

  // Helper functions for add precedent modal
  const addArrayField = (field) => {
    setNewPrecedent({
      ...newPrecedent,
      [field]: [...newPrecedent[field], '']
    });
  };

  const updateArrayField = (field, index, value) => {
    const newArray = [...newPrecedent[field]];
    newArray[index] = value;
    setNewPrecedent({
      ...newPrecedent,
      [field]: newArray
    });
  };

  const removeArrayField = (field, index) => {
    const newArray = newPrecedent[field].filter((_, i) => i !== index);
    setNewPrecedent({
      ...newPrecedent,
      [field]: newArray
    });
  };

  const handleAddPrecedentSubmit = (e) => {
    e.preventDefault();
    
    const precedentData = {
      ...newPrecedent,
      relevantSections: newPrecedent.relevantSections.filter(section => section.trim() !== ''),
      applicableScenarios: newPrecedent.applicableScenarios.filter(scenario => scenario.trim() !== ''),
      tags: newPrecedent.tags.filter(tag => tag.trim() !== '')
    };

    handleAddPrecedent(precedentData);
    setNewPrecedent({
      caseNumber: '',
      title: '',
      year: new Date().getFullYear(),
      court: '',
      summary: '',
      relevantSections: [''],
      outcome: '',
      applicableScenarios: [''],
      tags: [''],
      citationCount: 0
    });
    setShowAddPrecedentModal(false);
    alert('නීතිමය පූර්වාදර්ශය සාර්ථකව එක් කරන ලදී');
  };

  const getCourtLabel = (court) => {
    switch (court) {
      case 'supreme_court':
        return 'ශ්‍රේෂ්ඨාධිකරණය';
      case 'appeal_court':
        return 'අභියාචනාධිකරණය';
      case 'high_court':
        return 'මහාධිකරණය';
      case 'district_court':
        return 'දිස්ත්‍රික් අධිකරණය';
      default:
        return court;
    }
  };

  const handleViewPrecedent = (precedent) => {
    setSelectedPrecedent(precedent);
    setShowViewPrecedentModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
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
                නීති නිලධාරී ඩෑෂ්බෝඩ්
              </h1>
              <p className="text-gray-600">
                ආයුබෝවන්, {user?.name}! ඔබේ නීතිමය කාර්ය සාරාංශය
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                icon={Bell} 
                size="sm"
                onClick={() => setShowNotificationsModal(true)}
              >
                දැනුම්දීම්
              </Button>
              <Button 
                variant="outline" 
                icon={Settings} 
                size="sm"
                onClick={() => setShowSettingsModal(true)}
              >
                සැකසුම්
              </Button>
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
                { id: 'cases', label: 'නීතිමය සිද්ධි', icon: Gavel },
                { id: 'precedents', label: 'නීතිමය පූර්වාදර්ශ', icon: BookOpen },
                { id: 'analytics', label: 'විශ්ලේෂණ', icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 border-b-2 ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600 bg-purple-50'
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
                        <Bar dataKey="cases" fill="#8B5CF6" name="සිද්ධි" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="resolved" fill="#10B981" name="නිරාකරණය" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>

                {/* Case Status Distribution */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">සිද්ධි තත්ත්ව බෙදාහැරීම</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={caseStatusData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {caseStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>
              </div>

              {/* Recent Activities and Resolution Time */}
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

                {/* Average Resolution Time */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">සාමාන්‍ය නිරාකරණ කාලය</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={resolutionTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="avgDays" stroke="#8B5CF6" strokeWidth={2} name="දින" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>
              </div>
            </>
          )}

          {activeTab === 'cases' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CaseManagement
                cases={cases}
                onCaseUpdate={handleCaseUpdate}
                onScheduleHearing={handleScheduleHearing}
                onResolveCase={handleResolveCase}
              />
            </motion.div>
          )}

          {activeTab === 'precedents' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LegalPrecedents
                precedents={precedents}
                onAddPrecedent={handleAddPrecedent}
                onUpdatePrecedent={handleUpdatePrecedent}
                onDeletePrecedent={handleDeletePrecedent}
              />
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">විශ්ලේෂණ ඩෑෂ්බෝඩ්</h3>
                  <p className="text-gray-600 mb-6">
                    නීතිමය සිද්ධි සහ කාර්ය සාධනය පිළිබඳ සවිස්තරාත්මක විශ්ලේෂණ
                  </p>
                  <Button icon={BarChart3}>විශ්ලේෂණ බලන්න</Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Add Precedent Modal */}
        {showAddPrecedentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">නව නීතිමය පූර්වාදර්ශයක් එක් කරන්න</h3>
                <button
                  onClick={() => setShowAddPrecedentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleAddPrecedentSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      සිද්ධි අංකය
                    </label>
                    <input
                      type="text"
                      value={newPrecedent.caseNumber}
                      onChange={(e) => setNewPrecedent({...newPrecedent, caseNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="CASE_2024_001"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      වර්ෂය
                    </label>
                    <input
                      type="number"
                      value={newPrecedent.year}
                      onChange={(e) => setNewPrecedent({...newPrecedent, year: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      min="1900"
                      max="2030"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      සිරස්තලය
                    </label>
                    <input
                      type="text"
                      value={newPrecedent.title}
                      onChange={(e) => setNewPrecedent({...newPrecedent, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="නීතිමය සිද්ධියේ සිරස්තලය"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      අධිකරණය
                    </label>
                    <select
                      value={newPrecedent.court}
                      onChange={(e) => setNewPrecedent({...newPrecedent, court: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">අධිකරණය තෝරන්න</option>
                      <option value="supreme_court">ශ්‍රේෂ්ඨාධිකරණය</option>
                      <option value="appeal_court">අභියාචනාධිකරණය</option>
                      <option value="high_court">මහාධිකරණය</option>
                      <option value="district_court">දිස්ත්‍රික් අධිකරණය</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      තීරණය
                    </label>
                    <input
                      type="text"
                      value={newPrecedent.outcome}
                      onChange={(e) => setNewPrecedent({...newPrecedent, outcome: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="පැමිණිලිකරුට පක්ෂව"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      සාරාංශය
                    </label>
                    <textarea
                      value={newPrecedent.summary}
                      onChange={(e) => setNewPrecedent({...newPrecedent, summary: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={4}
                      placeholder="නීතිමය සිද්ධියේ සාරාංශය"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      අදාළ නීති වගන්ති
                    </label>
                    {newPrecedent.relevantSections.map((section, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={section}
                          onChange={(e) => updateArrayField('relevantSections', index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="නීති වගන්තිය"
                        />
                        {newPrecedent.relevantSections.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayField('relevantSections', index)}
                          >
                            ඉවත් කරන්න
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField('relevantSections')}
                    >
                      + එක් කරන්න
                    </Button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      අදාළ අවස්ථා
                    </label>
                    {newPrecedent.applicableScenarios.map((scenario, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={scenario}
                          onChange={(e) => updateArrayField('applicableScenarios', index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="අදාළ අවස්ථාව"
                        />
                        {newPrecedent.applicableScenarios.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayField('applicableScenarios', index)}
                          >
                            ඉවත් කරන්න
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField('applicableScenarios')}
                    >
                      + එක් කරන්න
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <Button variant="outline" type="button" onClick={() => setShowAddPrecedentModal(false)}>
                    අවලංගු කරන්න
                  </Button>
                  <Button type="submit" icon={Plus}>
                    පූර්වාදර්ශය එක් කරන්න
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* View Precedent Modal */}
        {showViewPrecedentModal && selectedPrecedent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedPrecedent.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedPrecedent.caseNumber}</p>
                </div>
                <button
                  onClick={() => setShowViewPrecedentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">සිද්ධි තොරතුරු</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">සිද්ධි අංකය:</span>
                          <span className="font-medium">{selectedPrecedent.caseNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">වර්ෂය:</span>
                          <span>{selectedPrecedent.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">අධිකරණය:</span>
                          <span>{getCourtLabel(selectedPrecedent.court)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">උපුටා දැක්වීම්:</span>
                          <span>{selectedPrecedent.citationCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">අවසන් යාවත්කාලීනය:</span>
                          <span>{formatDate(selectedPrecedent.lastUpdated)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">සාරාංශය</h4>
                      <p className="text-gray-700 leading-relaxed">{selectedPrecedent.summary}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">තීරණය</h4>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <Gavel className="w-5 h-5 text-green-600 mr-3" />
                          <span className="font-medium text-green-800">{selectedPrecedent.outcome}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">අදාළ නීති වගන්ති</h4>
                      <div className="space-y-2">
                        {selectedPrecedent.relevantSections.map((section, index) => (
                          <div key={index} className="flex items-start text-sm p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                            <span>{section}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">අදාළ අවස්ථා</h4>
                      <div className="space-y-2">
                        {selectedPrecedent.applicableScenarios.map((scenario, index) => (
                          <div key={index} className="flex items-start text-sm p-3 bg-purple-50 rounded-lg">
                            <Scale className="w-4 h-4 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                            <span>{scenario}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">ටැග්</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPrecedent.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <Button variant="outline" onClick={() => setShowViewPrecedentModal(false)}>
                    වසන්න
                  </Button>
                  <Button variant="outline" icon={Download}>
                    බාගන්න
                  </Button>
                  <Button icon={Edit}>
                    සංස්කරණය
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Notifications Modal */}
        <NotificationsModal 
          isOpen={showNotificationsModal} 
          onClose={() => setShowNotificationsModal(false)} 
        />

        {/* Settings Modal */}
        <SettingsModal 
          isOpen={showSettingsModal} 
          onClose={() => setShowSettingsModal(false)} 
        />
      </div>
    </div>
  );
};

export default LegalOfficerDashboard;