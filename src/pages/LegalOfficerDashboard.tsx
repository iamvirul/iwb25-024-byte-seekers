import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBlockchain } from '../contexts/BlockchainContext';
import { motion } from 'framer-motion';
import { 
  Scale, 
  Gavel, 
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
  Settings,
  Bell,
  Calendar,
  Hash,
  Database,
  Zap,
  Award,
  Target,
  Activity,
  X,
  MessageSquare,
  Shield,
  BookOpen,
  Briefcase,
  PlusCircle,
  Edit,
  Archive,
  Send
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';

const LegalOfficerDashboard = () => {
  const { user } = useAuth();
  const { properties, transactions, disputes } = useBlockchain();
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchCategory, setSearchCategory] = useState('all');
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [caseNotes, setCaseNotes] = useState('');

  // Mock data for legal officer specific metrics
  const legalCases = [
    {
      id: 'CASE001',
      disputeId: 'DISP001',
      title: 'ඉඩම් සීමා ගැටළුව - කොළඹ',
      propertyId: 'PROP001',
      complainant: 'සුනිල් සිල්වා',
      defendant: 'කමල් ප්‍රේමසිරි',
      filedDate: Date.now() - 86400000 * 15,
      status: 'investigating',
      priority: 'high',
      assignedDate: Date.now() - 86400000 * 10,
      hearingDate: Date.now() + 86400000 * 5,
      caseType: 'boundary_dispute',
      evidence: ['survey_report.pdf', 'witness_statements.pdf', 'photos.zip'],
      legalPrecedents: ['Case_2019_45', 'Case_2020_12'],
      estimatedResolutionDays: 30
    },
    {
      id: 'CASE002',
      disputeId: 'DISP002',
      title: 'හිමිකම් ගැටළුව - ගම්පහ',
      propertyId: 'PROP002',
      complainant: 'මාලිනී ජයවර්ධන',
      defendant: 'නිමල් රත්නායක',
      filedDate: Date.now() - 86400000 * 25,
      status: 'hearing_scheduled',
      priority: 'medium',
      assignedDate: Date.now() - 86400000 * 20,
      hearingDate: Date.now() + 86400000 * 3,
      caseType: 'ownership_dispute',
      evidence: ['title_deeds.pdf', 'inheritance_docs.pdf'],
      legalPrecedents: ['Case_2018_78', 'Case_2021_33'],
      estimatedResolutionDays: 45
    },
    {
      id: 'CASE003',
      disputeId: 'DISP003',
      title: 'කොන්ත්‍රාක්ටු උල්ලංඝනය - කළුතර',
      propertyId: 'PROP003',
      complainant: 'රාජ් ප්‍රේමසිරි',
      defendant: 'සමන් සිල්වා',
      filedDate: Date.now() - 86400000 * 5,
      status: 'pending_review',
      priority: 'urgent',
      assignedDate: Date.now() - 86400000 * 2,
      hearingDate: null,
      caseType: 'contract_breach',
      evidence: ['contract.pdf', 'payment_records.pdf'],
      legalPrecedents: ['Case_2022_15'],
      estimatedResolutionDays: 20
    }
  ];

  const legalPrecedents = [
    {
      id: 'PREC001',
      caseNumber: 'Case_2022_15',
      title: 'ඉඩම් කොන්ත්‍රාක්ටු උල්ලංඝන නීති',
      year: 2022,
      court: 'ශ්‍රේෂ්ඨාධිකරණය',
      summary: 'ඉඩම් විකිණීමේ කොන්ත්‍රාක්ටු උල්ලංඝනය සම්බන්ධයෙන් නීතිමය තීරණය',
      relevantSections: ['ඉඩම් ලේඛන පනත 15 වන වගන්තිය', 'කොන්ත්‍රාක්ටු පනත 23 වන වගන්තිය'],
      outcome: 'පැමිණිලිකරුට පක්ෂව',
      applicableScenarios: ['කොන්ත්‍රාක්ටු උල්ලංඝනය', 'ගෙවීම් ප්‍රමාදය']
    },
    {
      id: 'PREC002',
      caseNumber: 'Case_2021_33',
      title: 'ඉඩම් හිමිකම් උරුමය',
      year: 2021,
      court: 'අභියාචනාධිකරණය',
      summary: 'පවුල් සාමාජිකයන් අතර ඉඩම් හිමිකම් බෙදීම සම්බන්ධ නීතිමය තීරණය',
      relevantSections: ['උරුම පනත 12 වන වගන්තිය', 'ඉඩම් ලේඛන පනත 8 වන වගන්තිය'],
      outcome: 'සමාන බෙදීම',
      applicableScenarios: ['උරුම ගැටළු', 'පවුල් ඉඩම් බෙදීම']
    }
  ];

  const monthlyStats = [
    { month: 'ජන', cases: 12, resolved: 8, pending: 4 },
    { month: 'පෙබ', cases: 15, resolved: 11, pending: 4 },
    { month: 'මාර්', cases: 18, resolved: 14, pending: 4 },
    { month: 'අප්‍රේ', cases: 14, resolved: 10, pending: 4 },
    { month: 'මැයි', cases: 20, resolved: 16, pending: 4 },
    { month: 'ජුනි', cases: 16, resolved: 12, pending: 4 }
  ];

  const caseTypeDistribution = [
    { name: 'සීමා ගැටළු', value: 35, color: '#3B82F6' },
    { name: 'හිමිකම් ගැටළු', value: 28, color: '#10B981' },
    { name: 'කොන්ත්‍රාක්ටු උල්ලංඝනය', value: 20, color: '#F59E0B' },
    { name: 'උරුම ගැටළු', value: 17, color: '#EF4444' }
  ];

  const resolutionTimeData = [
    { type: 'සීමා ගැටළු', avgDays: 25, target: 30 },
    { type: 'හිමිකම්', avgDays: 35, target: 45 },
    { type: 'කොන්ත්‍රාක්ටු', avgDays: 18, target: 20 },
    { type: 'උරුම', avgDays: 40, target: 50 }
  ];

  const stats = [
    { 
      label: 'අද සම්පූර්ණ කළ', 
      value: '3', 
      icon: CheckCircle, 
      color: 'from-green-500 to-green-600',
      change: '+1',
      changeType: 'positive'
    },
    { 
      label: 'විමර්ශනය වෙමින්', 
      value: '8', 
      icon: Search, 
      color: 'from-blue-500 to-blue-600',
      change: '+2',
      changeType: 'positive'
    },
    { 
      label: 'නීතිමය සමාලෝචනය', 
      value: '5', 
      icon: Scale, 
      color: 'from-purple-500 to-purple-600',
      change: '0',
      changeType: 'neutral'
    },
    { 
      label: 'මාසික ඉලක්කය', 
      value: '92%', 
      icon: Target, 
      color: 'from-orange-500 to-orange-600',
      change: '+8%',
      changeType: 'positive'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'case_resolved',
      title: 'නීතිමය තීරණය ලබා දෙන ලදී',
      description: 'CASE001 සඳහා අවසාන තීරණය ලබා දෙන ලදී',
      time: '15 මිනිත්තුවකට පෙර',
      icon: Gavel,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'hearing_scheduled',
      title: 'නීතිමය විභාගය නියම කරන ලදී',
      description: 'CASE002 සඳහා ඊළඟ සතියේ විභාගය',
      time: '1 පැයකට පෙර',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'evidence_reviewed',
      title: 'සාක්ෂි සමාලෝචනය',
      description: 'CASE003 සඳහා නව සාක්ෂි සමාලෝචනය කරන ලදී',
      time: '2 පැයකට පෙර',
      icon: FileCheck,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'precedent_research',
      title: 'නීතිමය පූර්වාදර්ශ පර්යේෂණය',
      description: 'සමාන නීතිමය සිද්ධි සොයා ගන්නා ලදී',
      time: '3 පැයකට පෙර',
      icon: BookOpen,
      color: 'text-orange-600'
    }
  ];

  const timeRangeOptions = [
    { value: '7d', label: 'පසුගිය 7 දින' },
    { value: '30d', label: 'පසුගිය 30 දින' },
    { value: '90d', label: 'පසුගිය 90 දින' }
  ];

  const searchCategoryOptions = [
    { value: 'all', label: 'සියල්ල' },
    { value: 'cases', label: 'නීතිමය සිද්ධි' },
    { value: 'precedents', label: 'පූර්වාදර්ශ' },
    { value: 'properties', label: 'ඉඩම්' },
    { value: 'parties', label: 'පාර්ශ්වයන්' }
  ];

  // Search functionality
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const results: any[] = [];
    const term = searchTerm.toLowerCase();

    // Search in legal cases
    if (searchCategory === 'all' || searchCategory === 'cases') {
      const matchingCases = legalCases.filter(case_ =>
        case_.title.toLowerCase().includes(term) ||
        case_.complainant.toLowerCase().includes(term) ||
        case_.defendant.toLowerCase().includes(term) ||
        case_.id.toLowerCase().includes(term) ||
        case_.propertyId.toLowerCase().includes(term)
      );
      results.push(...matchingCases.map(case_ => ({ ...case_, type: 'case' })));
    }

    // Search in legal precedents
    if (searchCategory === 'all' || searchCategory === 'precedents') {
      const matchingPrecedents = legalPrecedents.filter(prec =>
        prec.title.toLowerCase().includes(term) ||
        prec.caseNumber.toLowerCase().includes(term) ||
        prec.summary.toLowerCase().includes(term)
      );
      results.push(...matchingPrecedents.map(prec => ({ ...prec, type: 'precedent' })));
    }

    // Search in properties
    if (searchCategory === 'all' || searchCategory === 'properties') {
      const matchingProperties = properties.filter(prop =>
        prop.title.toLowerCase().includes(term) ||
        prop.location.toLowerCase().includes(term) ||
        prop.owner.toLowerCase().includes(term) ||
        prop.id.toLowerCase().includes(term)
      );
      results.push(...matchingProperties.map(prop => ({ ...prop, type: 'property' })));
    }

    setSearchResults(results);
    setShowSearchModal(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowSearchModal(false);
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
      case 'pending_review':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">සමාලෝචනය වෙමින්</span>;
      case 'investigating':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">විමර්ශනය</span>;
      case 'hearing_scheduled':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">විභාගය නියමිත</span>;
      case 'resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">නිරාකරණය</span>;
      case 'dismissed':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">ප්‍රතික්ෂේප</span>;
      default:
        return null;
    }
  };

  const getCaseTypeLabel = (type: string) => {
    switch (type) {
      case 'boundary_dispute':
        return 'සීමා ගැටළුව';
      case 'ownership_dispute':
        return 'හිමිකම් ගැටළුව';
      case 'contract_breach':
        return 'කොන්ත්‍රාක්ටු උල්ලංඝනය';
      case 'inheritance_dispute':
        return 'උරුම ගැටළුව';
      default:
        return type;
    }
  };

  const getResultTypeIcon = (type: string) => {
    switch (type) {
      case 'case':
        return <Gavel className="w-4 h-4 text-purple-600" />;
      case 'precedent':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'property':
        return <FileText className="w-4 h-4 text-green-600" />;
      default:
        return <Search className="w-4 h-4 text-gray-600" />;
    }
  };

  const getResultTypeLabel = (type: string) => {
    switch (type) {
      case 'case':
        return 'නීතිමය සිද්ධිය';
      case 'precedent':
        return 'පූර්වාදර්ශය';
      case 'property':
        return 'ඉඩම';
      default:
        return 'ප්‍රතිඵලය';
    }
  };

  const handleCaseAction = (caseId: string, action: string) => {
    // Handle case actions like resolve, schedule hearing, etc.
    switch (action) {
      case 'resolve':
        alert(`නීතිමය සිද්ධිය ${caseId} නිරාකරණය කරන ලදී`);
        break;
      case 'schedule_hearing':
        alert(`නීතිමය සිද්ධිය ${caseId} සඳහා විභාගය නියම කරන ලදී`);
        break;
      case 'request_evidence':
        alert(`නීතිමය සිද්ධිය ${caseId} සඳහා අමතර සාක්ෂි ඉල්ලා ඇත`);
        break;
      default:
        break;
    }
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
              <Button variant="outline" icon={Bell} size="sm">
                දැනුම්දීම්
              </Button>
              <Button variant="outline" icon={Settings} size="sm">
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
                        stat.changeType === 'positive' ? 'text-green-600' : 
                        stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
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
                { id: 'precedents', label: 'පූර්වාදර්ශ', icon: BookOpen },
                { id: 'research', label: 'පර්යේෂණ', icon: Search }
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
                {/* Monthly Case Performance */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">මාසික නීතිමය කාර්ය සාධනය</h3>
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
                        <Bar dataKey="cases" fill="#8B5CF6" name="නව සිද්ධි" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="resolved" fill="#10B981" name="නිරාකරණය" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>

                {/* Case Type Distribution */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">නීතිමය සිද්ධි වර්ගීකරණය</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={caseTypeDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {caseTypeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>
              </div>

              {/* Resolution Time Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">නිරාකරණ කාල විශ්ලේෂණය</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={resolutionTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avgDays" fill="#3B82F6" name="සාමාන්‍ය දින" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" fill="#10B981" name="ඉලක්ක දින" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>

              {/* Recent Activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
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
            </>
          )}

          {activeTab === 'cases' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">නීතිමය සිද්ධි කළමනාකරණය</h3>
                  <div className="flex items-center space-x-3">
                    {/* Enhanced Search Section */}
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="සොයන්න..."
                        className="pl-8 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm w-64"
                      />
                      <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      {searchTerm && (
                        <button
                          onClick={clearSearch}
                          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="w-32">
                      <Select
                        value={searchCategory}
                        onChange={setSearchCategory}
                        options={searchCategoryOptions}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {legalCases.map((case_) => (
                    <Card key={case_.id} hover className="border-l-4 border-l-purple-500">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{case_.title}</h4>
                          <p className="text-sm text-gray-600">{getCaseTypeLabel(case_.caseType)}</p>
                        </div>
                        {getPriorityBadge(case_.priority)}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="text-sm">
                          <span className="text-gray-600">සිද්ධි ID:</span>
                          <span className="ml-2 font-medium">{case_.id}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">ඉඩම්:</span>
                          <span className="ml-2 font-medium">{case_.propertyId}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">පැමිණිලිකරු:</span>
                          <span className="ml-2">{case_.complainant}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">විත්තිකරු:</span>
                          <span className="ml-2">{case_.defendant}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">ගොනු කළ දිනය:</span>
                          <span className="ml-2">{formatDate(case_.filedDate)}</span>
                        </div>
                        {case_.hearingDate && (
                          <div className="text-sm">
                            <span className="text-gray-600">විභාග දිනය:</span>
                            <span className="ml-2 font-medium text-purple-600">{formatDate(case_.hearingDate)}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          {getStatusBadge(case_.status)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {case_.estimatedResolutionDays} දින ඇස්තමේන්තුව
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={Eye}
                          onClick={() => {
                            setSelectedCase(case_);
                            setShowCaseModal(true);
                          }}
                          className="w-full"
                        >
                          සම්පූර්ණ විස්තර
                        </Button>
                        <div className="flex space-x-2">
                          {case_.status === 'pending_review' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCaseAction(case_.id, 'schedule_hearing')}
                              className="flex-1"
                            >
                              විභාගය නියම කරන්න
                            </Button>
                          )}
                          {case_.status === 'investigating' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCaseAction(case_.id, 'resolve')}
                              className="flex-1"
                            >
                              නිරාකරණය
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'precedents' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">නීතිමය පූර්වාදර්ශ</h3>
                  <Button icon={PlusCircle}>නව පූර්වාදර්ශයක් එක් කරන්න</Button>
                </div>
                
                <div className="space-y-6">
                  {legalPrecedents.map((precedent) => (
                    <Card key={precedent.id} hover className="border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{precedent.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span className="font-medium">{precedent.caseNumber}</span>
                            <span>•</span>
                            <span>{precedent.year}</span>
                            <span>•</span>
                            <span>{precedent.court}</span>
                          </div>
                          <p className="text-gray-700 mb-4">{precedent.summary}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" icon={Eye}>
                            බලන්න
                          </Button>
                          <Button variant="outline" size="sm" icon={Edit}>
                            සංස්කරණය
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">අදාළ නීති වගන්ති:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {precedent.relevantSections.map((section, index) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                                {section}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">අදාළ අවස්ථා:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {precedent.applicableScenarios.map((scenario, index) => (
                              <li key={index} className="flex items-center">
                                <Scale className="w-3 h-3 mr-2 text-purple-500" />
                                {scenario}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <Gavel className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-sm font-medium text-green-800">
                            තීරණය: {precedent.outcome}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'research' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">නීතිමය පර්යේෂණ මධ්‍යස්ථානය</h4>
                  <p className="text-gray-600 mb-6">
                    නීතිමය පර්යේෂණ සහ විශ්ලේෂණ මෙවලම්
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <Button icon={Search} variant="outline">
                      නීති සොයන්න
                    </Button>
                    <Button icon={BookOpen} variant="outline">
                      පූර්වාදර්ශ සොයන්න
                    </Button>
                    <Button icon={FileText} variant="outline">
                      වාර්තා සාදන්න
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Search Results Modal */}
        {showSearchModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">සෙවුම් ප්‍රතිඵල</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    "{searchTerm}" සඳහා {searchResults.length} ප්‍රතිඵල හමු විය
                  </p>
                </div>
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {searchResults.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">ප්‍රතිඵල නොමැත</h4>
                    <p className="text-gray-600">
                      ඔබේ සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {searchResults.map((result, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            {getResultTypeIcon(result.type)}
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-gray-900">
                                  {result.title || result.name || result.caseNumber || result.id}
                                </h4>
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                  {getResultTypeLabel(result.type)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {result.summary || result.description || result.location}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                {result.propertyId && (
                                  <span>ඉඩම්: {result.propertyId}</span>
                                )}
                                {result.year && (
                                  <span>වර්ෂය: {result.year}</span>
                                )}
                                {result.filedDate && (
                                  <span>දිනය: {formatDate(result.filedDate)}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" icon={Eye}>
                              බලන්න
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Case Details Modal */}
        {showCaseModal && selectedCase && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedCase.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">සිද්ධි ID: {selectedCase.id}</p>
                </div>
                <button
                  onClick={() => setShowCaseModal(false)}
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
                          <span className="text-gray-600">වර්ගය:</span>
                          <span>{getCaseTypeLabel(selectedCase.caseType)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ප්‍රමුඛතාව:</span>
                          <span>{getPriorityBadge(selectedCase.priority)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">තත්ත්වය:</span>
                          <span>{getStatusBadge(selectedCase.status)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ඉඩම් ID:</span>
                          <span>{selectedCase.propertyId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ගොනු කළ දිනය:</span>
                          <span>{formatDate(selectedCase.filedDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">පවරන ලද දිනය:</span>
                          <span>{formatDate(selectedCase.assignedDate)}</span>
                        </div>
                        {selectedCase.hearingDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">විභාග දිනය:</span>
                            <span className="font-medium text-purple-600">{formatDate(selectedCase.hearingDate)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">පාර්ශ්වයන්</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">පැමිණිලිකරු:</span>
                          <span className="ml-2 font-medium">{selectedCase.complainant}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">විත්තිකරු:</span>
                          <span className="ml-2 font-medium">{selectedCase.defendant}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">සාක්ෂි</h4>
                      <div className="space-y-2">
                        {selectedCase.evidence.map((item: string, index: number) => (
                          <div key={index} className="flex items-center text-sm">
                            <FileText className="w-4 h-4 mr-2 text-blue-500" />
                            <span>{item}</span>
                            <Button variant="ghost" size="sm" icon={Download} className="ml-auto">
                              බාගන්න
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">නීතිමය පූර්වාදර්ශ</h4>
                      <div className="space-y-2">
                        {selectedCase.legalPrecedents.map((precedent: string, index: number) => (
                          <div key={index} className="flex items-center text-sm">
                            <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                            <span>{precedent}</span>
                            <Button variant="ghost" size="sm" icon={Eye} className="ml-auto">
                              බලන්න
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">නීතිමය සටහන්</h4>
                      <textarea
                        value={caseNotes}
                        onChange={(e) => setCaseNotes(e.target.value)}
                        placeholder="නීතිමය සටහන් ඇතුළත් කරන්න..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={6}
                      />
                      <div className="flex justify-end mt-3">
                        <Button icon={Send} size="sm">
                          සටහන් සුරකින්න
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-2">ඇස්තමේන්තු නිරාකරණ කාලය</h4>
                      <p className="text-sm text-purple-700">
                        {selectedCase.estimatedResolutionDays} දින
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <Button variant="outline" onClick={() => setShowCaseModal(false)}>
                    වසන්න
                  </Button>
                  {selectedCase.status === 'pending_review' && (
                    <Button 
                      icon={Calendar}
                      onClick={() => {
                        handleCaseAction(selectedCase.id, 'schedule_hearing');
                        setShowCaseModal(false);
                      }}
                    >
                      විභාගය නියම කරන්න
                    </Button>
                  )}
                  {selectedCase.status === 'investigating' && (
                    <Button 
                      icon={Gavel}
                      onClick={() => {
                        handleCaseAction(selectedCase.id, 'resolve');
                        setShowCaseModal(false);
                      }}
                    >
                      නිරාකරණය
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalOfficerDashboard;