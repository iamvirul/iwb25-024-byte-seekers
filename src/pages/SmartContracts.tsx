import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Play,
  CheckCircle,
  Clock,
  AlertCircle,
  Code,
  Hash,
  Calendar,
  User,
  Eye,
  Download,
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Sparkles,
  TrendingUp,
  Users,
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  Database,
  Cpu,
  Settings,
  DollarSign,
  Scale,
  Gavel
} from 'lucide-react';
import Card from '../components/ui/Card';
import EmptyState from '../components/common/EmptyState';

const SmartContracts = () => {
  const { user } = useAuth();
  const [contracts, setContracts] = useState([
    {
      id: 'SC001',
      name: 'ඉඩම් විකිණීමේ කොන්ත්‍රාක්ටුව',
      type: 'sale',
      propertyId: 'PROP001',
      parties: ['සුනිල් සිල්වා', 'කමල් පෙරේරා'],
      amount: 2500000,
      status: 'active',
      createdDate: Date.now() - 86400000 * 10,
      executedDate: null,
      conditions: [
        'ගැනුම්කරු විසින් මුළු මුදල ගෙවීම',
        'ඉඩම් ලේඛන සත්‍යාපනය',
        'නීතිමය පරීක්ෂණ සම්පූර්ණ කිරීම'
      ],
      blockchainHash: '0xabc123def456'
    },
    {
      id: 'SC002',
      name: 'ඉඩම් කුලියට දීමේ ගිණුම',
      type: 'lease',
      propertyId: 'PROP002',
      parties: ['මාලිනී ජයවර්ධන', 'රාජ් සිංහ'],
      amount: 25000,
      status: 'executed',
      createdDate: Date.now() - 86400000 * 30,
      executedDate: Date.now() - 86400000 * 25,
      conditions: [
        'මාසික කුලිය නියමිත දිනට ගෙවීම',
        'ඉඩම නිසි ලෙස භාවිතා කිරීම',
        '6 මාස කාලයක් සඳහා වලංගු'
      ],
      blockchainHash: '0xdef456abc123'
    },
    {
      id: 'SC003',
      name: 'ඉඩම් උකස් කොන්ත්‍රාක්ටුව',
      type: 'mortgage',
      propertyId: 'PROP001',
      parties: ['සුනිල් සිල්වා', 'ජාතික බැංකුව'],
      amount: 1800000,
      status: 'active',
      createdDate: Date.now() - 86400000 * 60,
      executedDate: null,
      conditions: [
        'මාසික වාරික නියමිත දිනට ගෙවීම',
        'ඉඩම් ලේඛන බැංකුවේ තැන්පත් කිරීම',
        'වාරික නොගෙවීමේදී ඉඩම අලෙවි කිරීමේ අයිතිය'
      ],
      blockchainHash: '0x789abc456def'
    },
    {
      id: 'SC004',
      name: 'හවුල් ඉඩම් බෙදීමේ ගිණුම',
      type: 'partition',
      propertyId: 'PROP003',
      parties: ['අනිල් ප්‍රේමසිරි', 'සුමන් ප්‍රේමසිරි', 'නිමල් ප්‍රේමසිරි'],
      amount: 0,
      status: 'pending',
      createdDate: Date.now() - 86400000 * 5,
      executedDate: null,
      conditions: [
        'සියලු පාර්ශ්වයන්ගේ එකඟතාව',
        'ඉඩම් සර්වේ සම්පූර්ණ කිරීම',
        'නීතිමය ලේඛන සකස් කිරීම'
      ],
      blockchainHash: '0x456def789abc'
    }
  ]);

  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [showNewContract, setShowNewContract] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [formData, setFormData] = useState({
    name: '',
    type: 'sale',
    propertyId: '',
    parties: ['', ''],
    amount: '',
    conditions: ['']
  });

  const contractTemplates = {
    sale: {
      name: 'ඉඩම් විකිණීමේ කොන්ත්‍රාක්ටුව',
      conditions: [
        'ගැනුම්කරු විසින් මුළු මුදල ගෙවීම',
        'ඉඩම් ලේඛන සත්‍යාපනය',
        'නීතිමය පරීක්ෂණ සම්පූර්ණ කිරීම',
        'ඉඩම් මාරු කිරීමේ ලේඛන සම්පූර්ණ කිරීම'
      ]
    },
    lease: {
      name: 'ඉඩම් කුලියට දීමේ ගිණුම',
      conditions: [
        'මාසික කුලිය නියමිත දිනට ගෙවීම',
        'ඉඩම නිසි ලෙස භාවිතා කිරීම',
        'කුලී කාලය අවසානයේ ඉඩම ආපසු ලබා දීම'
      ]
    },
    mortgage: {
      name: 'ඉඩම් උකස් කොන්ත්‍රාක්ටුව',
      conditions: [
        'මාසික වාරික නියමිත දිනට ගෙවීම',
        'ඉඩම් ලේඛන බැංකුවේ තැන්පත් කිරීම',
        'වාරික නොගෙවීමේදී ඉඩම අලෙවි කිරීමේ අයිතිය'
      ]
    },
    partition: {
      name: 'හවුල් ඉඩම් බෙදීමේ ගිණුම',
      conditions: [
        'සියලු පාර්ශ්වයන්ගේ එකඟතාව',
        'ඉඩම් සර්වේ සම්පූර්ණ කිරීම',
        'නීතිමය ලේඛන සකස් කිරීම'
      ]
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = 
      contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.propertyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.parties.some(party => party.toLowerCase().includes(searchTerm.toLowerCase()));

    let matchesFilter = true;
    if (filterType !== 'all') matchesFilter = contract.type === filterType;
    if (statusFilter !== 'all') matchesFilter = matchesFilter && contract.status === statusFilter;

    // Date range filter
    if (dateRange.start) {
      const startDate = new Date(dateRange.start).getTime();
      if (contract.createdDate < startDate) matchesFilter = false;
    }
    if (dateRange.end) {
      const endDate = new Date(dateRange.end).getTime() + 86400000; // Add 1 day
      if (contract.createdDate > endDate) matchesFilter = false;
    }

    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.createdDate - a.createdDate;
      case 'oldest':
        return a.createdDate - b.createdDate;
      case 'amount-desc':
        return b.amount - a.amount;
      case 'amount-asc':
        return a.amount - b.amount;
      case 'status':
        return a.status.localeCompare(b.status);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  const handleCreateContract = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newContract = {
      id: 'SC' + (contracts.length + 1).toString().padStart(3, '0'),
      name: formData.name,
      type: formData.type,
      propertyId: formData.propertyId,
      parties: formData.parties.filter(party => party.trim() !== ''),
      amount: parseFloat(formData.amount) || 0,
      status: 'pending',
      createdDate: Date.now(),
      executedDate: null,
      conditions: formData.conditions.filter(condition => condition.trim() !== ''),
      blockchainHash: '0x' + Math.random().toString(16).substr(2, 12)
    };

    setContracts([...contracts, newContract]);
    setFormData({
      name: '',
      type: 'sale',
      propertyId: '',
      parties: ['', ''],
      amount: '',
      conditions: ['']
    });
    setShowNewContract(false);
    alert('ස්මාර්ට් කොන්ත්‍රාක්ටුව සාර්ථකව සාදන ලදී');
  };

  const executeContract = (contractId: string) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId 
        ? { ...contract, status: 'executed', executedDate: Date.now() }
        : contract
    ));
    alert('ස්මාර්ට් කොන්ත්‍රාක්ටුව සාර්ථකව ක්‍රියාත්මක කරන ලදී');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            සක්‍රීය
          </span>
        );
      case 'executed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            ක්‍රියාත්මක
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            රැදී සිටින
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            කල් ඉකුත්
          </span>
        );
      default:
        return null;
    }
  };

  const getContractTypeLabel = (type: string) => {
    switch (type) {
      case 'sale':
        return 'විකිණීම';
      case 'lease':
        return 'කුලියට දීම';
      case 'mortgage':
        return 'උකස්';
      case 'partition':
        return 'බෙදීම';
      default:
        return type;
    }
  };

  const getContractIcon = (type: string) => {
    switch (type) {
      case 'sale':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'lease':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'mortgage':
        return <Shield className="w-5 h-5 text-purple-600" />;
      case 'partition':
        return <Scale className="w-5 h-5 text-orange-600" />;
      default:
        return <Code className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('si-LK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    if (amount === 0) return 'N/A';
    return new Intl.NumberFormat('si-LK', {
      style: 'currency',
      currency: 'LKR'
    }).format(amount);
  };

  const stats = [
    { label: 'මුළු කොන්ත්‍රාක්ට්', value: contracts.length, icon: Code, color: 'text-purple-600' },
    { label: 'සක්‍රීය', value: contracts.filter(c => c.status === 'active').length, icon: Zap, color: 'text-blue-600' },
    { label: 'ක්‍රියාත්මක', value: contracts.filter(c => c.status === 'executed').length, icon: CheckCircle, color: 'text-green-600' },
    { label: 'මුළු වටිනාකම', value: `₨${(contracts.reduce((sum, c) => sum + c.amount, 0) / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'text-orange-600' }
  ];

  const filterOptions = [
    { value: 'all', label: 'සියලු කොන්ත්‍රාක්ට්' },
    { value: 'sale', label: 'විකිණීම' },
    { value: 'lease', label: 'කුලියට දීම' },
    { value: 'mortgage', label: 'උකස්' },
    { value: 'partition', label: 'බෙදීම' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'නවතම' },
    { value: 'oldest', label: 'පැරණිතම' },
    { value: 'amount-desc', label: 'වටිනාකම (වැඩි)' },
    { value: 'amount-asc', label: 'වටිනාකම (අඩු)' },
    { value: 'status', label: 'තත්ත්වය අනුව' },
    { value: 'type', label: 'වර්ගය අනුව' }
  ];

  const statusOptions = [
    { value: 'all', label: 'සියලු තත්ත්වයන්' },
    { value: 'active', label: 'සක්‍රීය' },
    { value: 'executed', label: 'ක්‍රියාත්මක' },
    { value: 'pending', label: 'රැදී සිටින' },
    { value: 'expired', label: 'කල් ඉකුත්' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-full text-sm font-medium text-purple-700 mb-6">
            <Cpu className="w-4 h-4 mr-2" />
            ස්වයංක්‍රීය ඉඩම් ගනුදෙනු කළමනාකරණය
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ස්මාර්ට් කොන්ත්‍රාක්ට්
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            බ්ලොක්චේන් තාක්ෂණයෙන් ශක්තිමත් කරන ලද ස්වයංක්‍රීය ඉඩම් ගනුදෙනු
          </p>
        </motion.div>

        {/* Stats Cards */}
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
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </Card>
            );
          })}
        </motion.div>

        {/* New Contract Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-end mb-8"
        >
          <button
            onClick={() => setShowNewContract(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Plus className="w-5 h-5 mr-2" />
            නව කොන්ත්‍රාක්ටුවක්
          </button>
        </motion.div>

        {/* New Contract Form */}
        {showNewContract && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">නව ස්මාර්ට් කොන්ත්‍රාක්ටුවක් සාදන්න</h2>
              
              <form onSubmit={handleCreateContract} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                      කොන්ත්‍රාක්ටු වර්ගය
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => {
                        const selectedType = e.target.value as keyof typeof contractTemplates;
                        setFormData({
                          ...formData,
                          type: selectedType,
                          name: contractTemplates[selectedType].name,
                          conditions: [...contractTemplates[selectedType].conditions]
                        });
                      }}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="sale">ඉඩම් විකිණීම</option>
                      <option value="lease">ඉඩම් කුලියට දීම</option>
                      <option value="mortgage">ඉඩම් උකස්</option>
                      <option value="partition">හවුල් ඉඩම් බෙදීම</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-2">
                      ඉඩම් ID
                    </label>
                    <input
                      type="text"
                      id="propertyId"
                      value={formData.propertyId}
                      onChange={(e) => setFormData({...formData, propertyId: e.target.value})}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="PROP001"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    කොන්ත්‍රාක්ටු නම
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    පාර්ශ්වයන්
                  </label>
                  {formData.parties.map((party, index) => (
                    <input
                      key={index}
                      type="text"
                      value={party}
                      onChange={(e) => {
                        const newParties = [...formData.parties];
                        newParties[index] = e.target.value;
                        setFormData({...formData, parties: newParties});
                      }}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 mb-3"
                      placeholder={`පාර්ශ්වය ${index + 1}`}
                      required
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, parties: [...formData.parties, '']})}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    + පාර්ශ්වයක් එක් කරන්න
                  </button>
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    මුදල (රුපියල්)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="2500000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    කොන්ත්‍රාක්ටු කොන්දේසි
                  </label>
                  {formData.conditions.map((condition, index) => (
                    <textarea
                      key={index}
                      value={condition}
                      onChange={(e) => {
                        const newConditions = [...formData.conditions];
                        newConditions[index] = e.target.value;
                        setFormData({...formData, conditions: newConditions});
                      }}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 mb-3"
                      rows={2}
                      placeholder={`කොන්දේසිය ${index + 1}`}
                      required
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, conditions: [...formData.conditions, '']})}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    + කොන්දේසියක් එක් කරන්න
                  </button>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <Cpu className="w-6 h-6 text-purple-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-purple-800 mb-2">ස්මාර්ට් කොන්ත්‍රාක්ට් විශේෂාංග</h4>
                      <p className="text-purple-700 leading-relaxed mb-4">
                        ඔබේ කොන්ත්‍රාක්ටුව සාදන ලද පසු, එය බ්ලොක්චේන් ලේඛනාගාරයේ ස්ථිරව සටහන් වේ 
                        සහ නියමිත කොන්දේසි සම්පූර්ණ වූ විට ස්වයංක්‍රීයව ක්‍රියාත්මක වේ.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="flex items-center text-sm text-purple-600">
                          <Shield className="w-4 h-4 mr-2" />
                          <span>ආරක්ෂිත</span>
                        </div>
                        <div className="flex items-center text-sm text-purple-600">
                          <Zap className="w-4 h-4 mr-2" />
                          <span>ස්වයංක්‍රීය</span>
                        </div>
                        <div className="flex items-center text-sm text-purple-600">
                          <Database className="w-4 h-4 mr-2" />
                          <span>විනිවිද දැකිය හැකි</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowNewContract(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    අවලංගු කරන්න
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-colors"
                  >
                    කොන්ත්‍රාක්ටුව සාදන්න
                  </button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Enhanced Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="mb-8">
            <div className="space-y-6">
              {/* Main Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="කොන්ත්‍රාක්ටු නම, ID හෝ පාර්ශ්වයන් ඇතුළත් කරන්න..."
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <div className="min-w-[200px]">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {filterOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="min-w-[180px]">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className={`inline-flex items-center px-4 py-2 border rounded-lg transition-all duration-200 ${
                      showAdvancedFilters 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    උසස් ෆිල්ටර්
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {filteredContracts.length} ප්‍රතිඵල
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-purple-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-purple-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 pt-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        තත්ත්වය
                      </label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ආරම්භක දිනය
                      </label>
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        අවසාන දිනය
                      </label>
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => {
                          setFilterType('all');
                          setStatusFilter('all');
                          setDateRange({ start: '', end: '' });
                          setSearchTerm('');
                        }}
                        className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        ෆිල්ටර් ඉවත් කරන්න
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Results Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Contracts List */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                ස්මාර්ට් කොන්ත්‍රාක්ට්
              </h2>
              {filteredContracts.length > 0 && (
                <div className="text-sm text-gray-600">
                  {filteredContracts.length} න් {contracts.length}
                </div>
              )}
            </div>
            
            {filteredContracts.length === 0 ? (
              <Card>
                <EmptyState
                  icon={Code}
                  title="කොන්ත්‍රාක්ට් හමු නොවිය"
                  description="ඔබේ සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න"
                  action={{
                    label: "නව කොන්ත්‍රාක්ටුවක් සාදන්න",
                    onClick: () => setShowNewContract(true)
                  }}
                />
              </Card>
            ) : (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-4'}`}>
                {filteredContracts.map((contract, index) => (
                  <motion.div
                    key={contract.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={viewMode === 'grid' ? 'h-full' : ''}
                  >
                    {viewMode === 'grid' ? (
                      <div className="h-full">
                        <Card hover onClick={() => setSelectedContract(contract)} className="cursor-pointer h-full flex flex-col">
                          <div className="flex items-start justify-between flex-1">
                            <div className="flex items-start space-x-3 flex-1 min-w-0">
                              <div className="flex-shrink-0">
                                {getContractIcon(contract.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {contract.name}
                                </h3>
                                <div className="space-y-1 text-sm text-gray-600 mb-4">
                                  <div className="flex items-center">
                                    <FileText className="w-4 h-4 mr-2" />
                                    ඉඩම්: {contract.propertyId}
                                  </div>
                                  <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    පාර්ශ්වයන්: {contract.parties.length}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {formatDate(contract.createdDate)}
                                  </div>
                                  <div className="text-lg font-semibold text-purple-600">
                                    {formatCurrency(contract.amount)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <div>
                              {getStatusBadge(contract.status)}
                            </div>
                            <div className="flex space-x-2">
                              {contract.status === 'active' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    executeContract(contract.id);
                                  }}
                                  className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                >
                                  <Play className="w-4 h-4 mr-1" />
                                  ක්‍රියාත්මක
                                </button>
                              )}
                              <button className="inline-flex items-center px-3 py-1 border border-purple-300 text-purple-700 rounded-md hover:bg-purple-50 transition-colors">
                                <Eye className="w-4 h-4 mr-1" />
                                විස්තර
                              </button>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ) : (
                      <Card hover onClick={() => setSelectedContract(contract)} className="cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                              {getContractIcon(contract.type)}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {contract.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-1">{getContractTypeLabel(contract.type)} • {contract.propertyId}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{formatCurrency(contract.amount)}</span>
                                <span>•</span>
                                <span>{formatDate(contract.createdDate)}</span>
                                <span>•</span>
                                {getStatusBadge(contract.status)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {contract.status === 'active' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  executeContract(contract.id);
                                }}
                                className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                              >
                                <Play className="w-4 h-4 mr-1" />
                                ක්‍රියාත්මක
                              </button>
                            )}
                            <button className="inline-flex items-center px-3 py-1 border border-purple-300 text-purple-700 rounded-md hover:bg-purple-50 transition-colors">
                              <Eye className="w-4 h-4 mr-1" />
                              විස්තර
                            </button>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Contract Details Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              {selectedContract ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">කොන්ත්‍රාක්ටු විස්තර</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {selectedContract.name}
                        </h3>
                        {getStatusBadge(selectedContract.status)}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">කොන්ත්‍රාක්ටු ID:</span>
                          <p className="font-medium mt-1">{selectedContract.id}</p>
                        </div>

                        <div>
                          <span className="text-sm text-gray-600">වර්ගය:</span>
                          <p className="font-medium mt-1">{getContractTypeLabel(selectedContract.type)}</p>
                        </div>

                        <div>
                          <span className="text-sm text-gray-600">ඉඩම් ID:</span>
                          <p className="font-medium mt-1">{selectedContract.propertyId}</p>
                        </div>

                        <div>
                          <span className="text-sm text-gray-600">මුදල:</span>
                          <p className="font-medium mt-1 text-lg text-purple-600">
                            {formatCurrency(selectedContract.amount)}
                          </p>
                        </div>

                        <div>
                          <span className="text-sm text-gray-600">සාදන ලද දිනය:</span>
                          <div className="flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {formatDate(selectedContract.createdDate)}
                          </div>
                        </div>

                        {selectedContract.executedDate && (
                          <div>
                            <span className="text-sm text-gray-600">ක්‍රියාත්මක කළ දිනය:</span>
                            <div className="flex items-center mt-1">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              {formatDate(selectedContract.executedDate)}
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">පාර්ශ්වයන්</h4>
                        <div className="space-y-1">
                          {selectedContract.parties.map((party: string, index: number) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <User className="w-4 h-4 mr-2" />
                              {party}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">කොන්ත්‍රාක්ටු කොන්දේසි</h4>
                        <div className="space-y-2">
                          {selectedContract.conditions.map((condition: string, index: number) => (
                            <div key={index} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                              {condition}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-medium text-purple-900 mb-2 flex items-center">
                          <Hash className="w-4 h-4 mr-2" />
                          බ්ලොක්චේන් හැෂ්
                        </h4>
                        <p className="text-xs font-mono bg-white p-2 rounded break-all">
                          {selectedContract.blockchainHash}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        {selectedContract.status === 'active' && (
                          <button
                            onClick={() => executeContract(selectedContract.id)}
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            ක්‍රියාත්මක කරන්න
                          </button>
                        )}
                        <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          <Download className="w-4 h-4 mr-2" />
                          බාගන්න
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <Card>
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Code className="w-10 h-10 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">කොන්ත්‍රාක්ටුවක් තෝරන්න</h3>
                    <p className="text-gray-600 mb-6">
                      විස්තර බැලීමට කොන්ත්‍රාක්ටුවක් මත ක්ලික් කරන්න
                    </p>
                    <div className="space-y-3 text-sm text-gray-500">
                      <div className="flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        <span>සම්පූර්ණ කොන්ත්‍රාක්ටු විස්තර</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Hash className="w-4 h-4 mr-2" />
                        <span>බ්ලොක්චේන් සත්‍යාපනය</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Database className="w-4 h-4 mr-2" />
                        <span>කොන්ත්‍රාක්ටු මෙටාඩේටා</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartContracts;