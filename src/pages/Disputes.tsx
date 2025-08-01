import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBlockchain } from '../contexts/BlockchainContext';
import { motion } from 'framer-motion';
import { 
  Gavel, 
  Plus, 
  AlertCircle,
  Calendar,
  User,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
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
  Scale,
  Eye,
  Download,
  Filter,
  Hash,
  Database
} from 'lucide-react';
import Card from '../components/ui/Card';
import EmptyState from '../components/common/EmptyState';

const Disputes = () => {
  const { user } = useAuth();
  const { disputes, fileDispute, resolveDispute, properties } = useBlockchain();
  const [showNewDispute, setShowNewDispute] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [formData, setFormData] = useState({
    propertyId: '',
    defendant: '',
    description: '',
    documents: [] as File[]
  });

  const userDisputes = disputes.filter(d => 
    d.complainant === user?.name || d.defendant === user?.name
  );

  const filteredDisputes = userDisputes.filter(dispute => {
    const matchesSearch = 
      dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.propertyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.defendant.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (filterType !== 'all') {
      if (filterType === 'my_complaints') matchesFilter = dispute.complainant === user?.name;
      if (filterType === 'against_me') matchesFilter = dispute.defendant === user?.name;
    }
    if (statusFilter !== 'all') matchesFilter = matchesFilter && dispute.status === statusFilter;

    // Date range filter
    if (dateRange.start) {
      const startDate = new Date(dateRange.start).getTime();
      if (dispute.filedDate < startDate) matchesFilter = false;
    }
    if (dateRange.end) {
      const endDate = new Date(dateRange.end).getTime() + 86400000; // Add 1 day
      if (dispute.filedDate > endDate) matchesFilter = false;
    }

    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.filedDate - a.filedDate;
      case 'oldest':
        return a.filedDate - b.filedDate;
      case 'status':
        return a.status.localeCompare(b.status);
      case 'property':
        return a.propertyId.localeCompare(b.propertyId);
      default:
        return 0;
    }
  });

  const handleSubmitDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      fileDispute({
        propertyId: formData.propertyId,
        complainant: user?.name || '',
        defendant: formData.defendant,
        description: formData.description,
        status: 'pending',
        documents: formData.documents.map(file => file.name)
      });

      setFormData({
        propertyId: '',
        defendant: '',
        description: '',
        documents: []
      });
      setShowNewDispute(false);
      alert('ගැටළුව සාර්ථකව ගොනු කරන ලදී');
    } catch (error) {
      alert('ගැටළුව ගොනු කිරීමේදී දෝෂයක් ඇතිවිය');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            රැදී සිටින
          </span>
        );
      case 'investigating':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Search className="w-3 h-3 mr-1" />
            විමර්ශනය
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            නිරාකරණය
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            ප්‍රතික්ෂේප
          </span>
        );
      default:
        return null;
    }
  };

  const getDisputeIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'investigating':
        return <Search className="w-5 h-5 text-blue-600" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('si-LK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stats = [
    { label: 'මුළු ගැටළු', value: userDisputes.length, icon: Gavel, color: 'text-red-600' },
    { label: 'රැදී සිටින', value: userDisputes.filter(d => d.status === 'pending').length, icon: Clock, color: 'text-yellow-600' },
    { label: 'විමර්ශනය', value: userDisputes.filter(d => d.status === 'investigating').length, icon: Search, color: 'text-blue-600' },
    { label: 'නිරාකරණය', value: userDisputes.filter(d => d.status === 'resolved').length, icon: CheckCircle, color: 'text-green-600' }
  ];

  const filterOptions = [
    { value: 'all', label: 'සියලු ගැටළු' },
    { value: 'my_complaints', label: 'මගේ පැමිණිලි' },
    { value: 'against_me', label: 'මට එරෙහි' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'නවතම' },
    { value: 'oldest', label: 'පැරණිතම' },
    { value: 'status', label: 'තත්ත්වය අනුව' },
    { value: 'property', label: 'ඉඩම් අනුව' }
  ];

  const statusOptions = [
    { value: 'all', label: 'සියලු තත්ත්වයන්' },
    { value: 'pending', label: 'රැදී සිටින' },
    { value: 'investigating', label: 'විමර්ශනය' },
    { value: 'resolved', label: 'නිරාකරණය' },
    { value: 'rejected', label: 'ප්‍රතික්ෂේප' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full text-sm font-medium text-red-700 mb-6">
            <Scale className="w-4 h-4 mr-2" />
            AI සහායක ගැටළු නිරාකරණ පද්ධතිය
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ගැටළු කළමනාකරණය
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ඉඩම් සම්බන්ධ ගැටළු සහ නිරාකරණ - AI සහ බ්ලොක්චේන් තාක්ෂණයෙන් සහාය
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
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </Card>
            );
          })}
        </motion.div>

        {/* New Dispute Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-end mb-8"
        >
          <button
            onClick={() => setShowNewDispute(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Plus className="w-5 h-5 mr-2" />
            නව ගැටළුවක් ගොනු කරන්න
          </button>
        </motion.div>

        {/* New Dispute Form */}
        {showNewDispute && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">නව ගැටළුවක් ගොනු කරන්න</h2>
              
              <form onSubmit={handleSubmitDispute} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-2">
                      ඉඩම් ID
                    </label>
                    <select
                      id="propertyId"
                      value={formData.propertyId}
                      onChange={(e) => setFormData({...formData, propertyId: e.target.value})}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">ඉඩමක් තෝරන්න</option>
                      {properties.map(property => (
                        <option key={property.id} value={property.id}>
                          {property.id} - {property.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="defendant" className="block text-sm font-medium text-gray-700 mb-2">
                      විත්තිකරු
                    </label>
                    <input
                      type="text"
                      id="defendant"
                      value={formData.defendant}
                      onChange={(e) => setFormData({...formData, defendant: e.target.value})}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="විත්තිකරුගේ නම"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    ගැටළුවේ විස්තරය
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    placeholder="ගැටළුව සම්බන්ධයෙන් සම්පූර්ණ විස්තරයක් ලියන්න"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-2">
                    සහාය ලේඛන
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-400 transition-colors bg-gradient-to-br from-gray-50 to-red-50/30">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      id="documents"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => setFormData({...formData, documents: Array.from(e.target.files || [])})}
                      className="hidden"
                    />
                    <label htmlFor="documents" className="cursor-pointer">
                      <span className="text-lg font-medium text-red-600 hover:text-red-500">ලේඛන තෝරන්න</span>
                      <span className="text-gray-500"> හෝ මෙහි ඇද දමන්න</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      PDF, DOC, DOCX, JPG, PNG (උපරිම 10MB)
                    </p>
                    {formData.documents.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.documents.map((file, index) => (
                          <div key={index} className="p-3 bg-white rounded-lg border border-red-200">
                            <p className="text-sm text-gray-700 font-medium">
                              {file.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <Scale className="w-6 h-6 text-red-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-red-800 mb-2">AI සහායක ගැටළු විශ්ලේෂණය</h4>
                      <p className="text-red-700 leading-relaxed">
                        ඔබේ ගැටළුව ගොනු කිරීමෙන් පසු, අපගේ AI පද්ධතිය ගැටළුවේ ස්වභාවය විශ්ලේෂණය කර 
                        ඉක්මන් නිරාකරණයක් සඳහා නිර්දේශ ලබා දෙයි.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowNewDispute(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    අවලංගු කරන්න
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-colors"
                  >
                    ගැටළුව ගොනු කරන්න
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
                  className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="ගැටළු ID, ඉඩම් ID හෝ විස්තරය ඇතුළත් කරන්න..."
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <div className="min-w-[180px]">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {filterOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="min-w-[150px]">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                        ? 'border-red-500 bg-red-50 text-red-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    උසස් ෆිල්ටර්
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {filteredDisputes.length} ප්‍රතිඵල
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-red-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-red-500 text-white' 
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
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
          {/* Disputes List */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                ගැටළු
              </h2>
              {filteredDisputes.length > 0 && (
                <div className="text-sm text-gray-600">
                  {filteredDisputes.length} න් {userDisputes.length}
                </div>
              )}
            </div>
            
            {filteredDisputes.length === 0 ? (
              <Card>
                <EmptyState
                  icon={Gavel}
                  title="ගැටළු හමු නොවිය"
                  description="ඔබේ සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න"
                  action={{
                    label: "නව ගැටළුවක් ගොනු කරන්න",
                    onClick: () => setShowNewDispute(true)
                  }}
                />
              </Card>
            ) : (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-4'}`}>
                {filteredDisputes.map((dispute, index) => (
                  <motion.div
                    key={dispute.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={viewMode === 'grid' ? 'h-full' : ''}
                  >
                    {viewMode === 'grid' ? (
                      <div className="h-full">
                        <Card hover onClick={() => setSelectedDispute(dispute)} className="cursor-pointer h-full flex flex-col">
                          <div className="flex items-start justify-between flex-1">
                            <div className="flex items-start space-x-3 flex-1 min-w-0">
                              <div className="flex-shrink-0">
                                {getDisputeIcon(dispute.status)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  ගැටළුව #{dispute.id.slice(-6)}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                  {dispute.description}
                                </p>
                                <div className="space-y-1 text-sm text-gray-500 mb-4">
                                  <div className="flex items-center">
                                    <FileText className="w-4 h-4 mr-2" />
                                    ඉඩම්: {dispute.propertyId}
                                  </div>
                                  <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    විත්තිකරු: {dispute.defendant}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {formatDate(dispute.filedDate)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <div>
                              {getStatusBadge(dispute.status)}
                            </div>
                            <button className="inline-flex items-center px-3 py-1 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors">
                              <Eye className="w-4 h-4 mr-1" />
                              විස්තර
                            </button>
                          </div>
                        </Card>
                      </div>
                    ) : (
                      <Card hover onClick={() => setSelectedDispute(dispute)} className="cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                              {getDisputeIcon(dispute.status)}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                ගැටළුව #{dispute.id.slice(-6)}
                              </h3>
                              <p className="text-gray-600 text-sm mb-1">{dispute.propertyId} • {dispute.defendant}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{formatDate(dispute.filedDate)}</span>
                                <span>•</span>
                                {getStatusBadge(dispute.status)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="inline-flex items-center px-3 py-1 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors">
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

          {/* Dispute Details Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              {selectedDispute ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">ගැටළු විස්තර</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          ගැටළුව #{selectedDispute.id.slice(-6)}
                        </h3>
                        {getStatusBadge(selectedDispute.status)}
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">ගැටළුවේ විස්තරය</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {selectedDispute.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">ඉඩම් ID:</span>
                          <p className="font-medium mt-1">{selectedDispute.propertyId}</p>
                        </div>

                        <div>
                          <span className="text-sm text-gray-600">පැමිණිලිකරු:</span>
                          <p className="font-medium mt-1">{selectedDispute.complainant}</p>
                        </div>

                        <div>
                          <span className="text-sm text-gray-600">විත්තිකරු:</span>
                          <p className="font-medium mt-1">{selectedDispute.defendant}</p>
                        </div>

                        <div>
                          <span className="text-sm text-gray-600">ගොනු කළ දිනය:</span>
                          <div className="flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {formatDate(selectedDispute.filedDate)}
                          </div>
                        </div>
                      </div>

                      {selectedDispute.documents.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">සහාය ලේඛන</h4>
                          <div className="space-y-2">
                            {selectedDispute.documents.map((doc: string, index: number) => (
                              <div key={index} className="flex items-center text-sm text-gray-600">
                                <FileText className="w-4 h-4 mr-2" />
                                {doc}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedDispute.nlpAnalysis && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            AI විශ්ලේෂණය
                          </h4>
                          <p className="text-sm text-blue-700">
                            {selectedDispute.nlpAnalysis}
                          </p>
                        </div>
                      )}

                      {user?.role === 'legal_officer' && selectedDispute.status === 'pending' && (
                        <div className="border-t pt-4">
                          <h4 className="font-medium text-gray-900 mb-3">නිරාකරණ ක්‍රියාමාර්ග</h4>
                          <div className="space-y-2">
                            <button
                              onClick={() => {
                                resolveDispute(selectedDispute.id, 'ගැටළුව සාධාරණව නිරාකරණය කරන ලදී');
                                setSelectedDispute({...selectedDispute, status: 'resolved'});
                              }}
                              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              ගැටළුව නිරාකරණය කරන්න
                            </button>
                            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                              වැඩිදුර විමර්ශනය
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-colors">
                          <Download className="w-4 h-4 mr-2" />
                          බාගන්න
                        </button>
                        <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          <Eye className="w-4 h-4 mr-2" />
                          සම්පූර්ණ විස්තර
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <Card>
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Gavel className="w-10 h-10 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">ගැටළුවක් තෝරන්න</h3>
                    <p className="text-gray-600 mb-6">
                      විස්තර බැලීමට ගැටළුවක් මත ක්ලික් කරන්න
                    </p>
                    <div className="space-y-3 text-sm text-gray-500">
                      <div className="flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        <span>සම්පූර්ණ ගැටළු විස්තර</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        <span>AI විශ්ලේෂණ ප්‍රතිඵල</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Database className="w-4 h-4 mr-2" />
                        <span>ගැටළු මෙටාඩේටා</span>
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

export default Disputes;