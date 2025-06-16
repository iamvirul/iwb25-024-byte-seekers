import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBlockchain } from '../contexts/BlockchainContext';
import { motion } from 'framer-motion';
import { 
  Activity, 
  ArrowRight, 
  Calendar,
  Hash,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  Download,
  Eye,
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Sparkles,
  TrendingUp,
  Users,
  FileText,
  Gavel,
  ArrowUpRight,
  ArrowDownLeft,
  BarChart3,
  Shield,
  Zap,
  Database
} from 'lucide-react';
import Card from '../components/ui/Card';
import EmptyState from '../components/common/EmptyState';

const Transactions = () => {
  const { user } = useAuth();
  const { transactions } = useBlockchain();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const userTransactions = transactions.filter(t => 
    t.to === user?.slUdiId || t.from === user?.slUdiId
  );

  const filteredTransactions = userTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.propertyId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getTransactionTitle(transaction.type).toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (filterType !== 'all') matchesFilter = transaction.type === filterType;
    if (statusFilter !== 'all') matchesFilter = matchesFilter && transaction.status === statusFilter;

    // Date range filter
    if (dateRange.start) {
      const startDate = new Date(dateRange.start).getTime();
      if (transaction.timestamp < startDate) matchesFilter = false;
    }
    if (dateRange.end) {
      const endDate = new Date(dateRange.end).getTime() + 86400000; // Add 1 day
      if (transaction.timestamp > endDate) matchesFilter = false;
    }

    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.timestamp - a.timestamp;
      case 'oldest':
        return a.timestamp - b.timestamp;
      case 'type':
        return a.type.localeCompare(b.type);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'register':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'transfer':
        return <ArrowRight className="w-5 h-5 text-blue-600" />;
      case 'dispute':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'resolution':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'smart_contract_execution':
        return <Zap className="w-5 h-5 text-purple-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTransactionTitle = (type: string) => {
    switch (type) {
      case 'register':
        return 'ඉඩම් ලියාපදිංචිය';
      case 'transfer':
        return 'හිමිකම් මාරුව';
      case 'dispute':
        return 'ගැටළු ගොනුව';
      case 'resolution':
        return 'ගැටළු නිරාකරණය';
      case 'smart_contract_execution':
        return 'ස්මාර්ට් කොන්ත්‍රාක්ට් ක්‍රියාත්මක';
      default:
        return 'ගනුදෙනුව';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            සම්පූර්ණයි
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            රැදී සිටින
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            අසාර්ථකයි
          </span>
        );
      default:
        return null;
    }
  };

  const getTransactionDirection = (transaction: any) => {
    if (transaction.to === user?.slUdiId && transaction.from) {
      return { type: 'incoming', icon: ArrowDownLeft, color: 'text-green-600' };
    } else if (transaction.from === user?.slUdiId) {
      return { type: 'outgoing', icon: ArrowUpRight, color: 'text-blue-600' };
    }
    return { type: 'neutral', icon: Activity, color: 'text-gray-600' };
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('si-LK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = [
    { label: 'මුළු ගනුදෙනු', value: userTransactions.length, icon: Activity, color: 'text-blue-600' },
    { label: 'සම්පූර්ණ', value: userTransactions.filter(t => t.status === 'confirmed').length, icon: CheckCircle, color: 'text-green-600' },
    { label: 'රැදී සිටින', value: userTransactions.filter(t => t.status === 'pending').length, icon: Clock, color: 'text-yellow-600' },
    { label: 'මෑත කාලීන', value: userTransactions.filter(t => Date.now() - t.timestamp < 86400000 * 7).length, icon: TrendingUp, color: 'text-purple-600' }
  ];

  const filterOptions = [
    { value: 'all', label: 'සියලු ගනුදෙනු' },
    { value: 'register', label: 'ලියාපදිංචි කිරීම්' },
    { value: 'transfer', label: 'හිමිකම් මාරු' },
    { value: 'dispute', label: 'ගැටළු' },
    { value: 'resolution', label: 'නිරාකරණ' },
    { value: 'smart_contract_execution', label: 'ස්මාර්ට් කොන්ත්‍රාක්ට්' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'නවතම' },
    { value: 'oldest', label: 'පැරණිතම' },
    { value: 'type', label: 'වර්ගය අනුව' },
    { value: 'status', label: 'තත්ත්වය අනුව' }
  ];

  const statusOptions = [
    { value: 'all', label: 'සියලු තත්ත්වයන්' },
    { value: 'confirmed', label: 'සම්පූර්ණ' },
    { value: 'pending', label: 'රැදී සිටින' },
    { value: 'failed', label: 'අසාර්ථක' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full text-sm font-medium text-green-700 mb-6">
            <Activity className="w-4 h-4 mr-2" />
            බ්ලොක්චේන් ගනුදෙනු ඉතිහාසය
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ගනුදෙනු ඉතිහාසය
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ඔබේ සියලු බ්ලොක්චේන් ගනුදෙනු සහ ඉඩම් සම්බන්ධ ක්‍රියාකාරකම්
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
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </Card>
            );
          })}
        </motion.div>

        {/* Enhanced Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
                  className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="ගනුදෙනු ID, ඉඩම් ID හෝ වර්ගය ඇතුළත් කරන්න..."
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <div className="min-w-[200px]">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    උසස් ෆිල්ටර්
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {filteredTransactions.length} ප්‍රතිඵල
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-green-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-green-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    වාර්තාව
                  </button>
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
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
          {/* Transaction List */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                ගනුදෙනු
              </h2>
              {filteredTransactions.length > 0 && (
                <div className="text-sm text-gray-600">
                  {filteredTransactions.length} න් {userTransactions.length}
                </div>
              )}
            </div>
            
            {filteredTransactions.length === 0 ? (
              <Card>
                <EmptyState
                  icon={Activity}
                  title="ගනුදෙනු හමු නොවිය"
                  description="ඔබේ සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න"
                  action={{
                    label: "සියලු ගනුදෙනු බලන්න",
                    onClick: () => {
                      setSearchTerm('');
                      setFilterType('all');
                      setStatusFilter('all');
                      setDateRange({ start: '', end: '' });
                    }
                  }}
                />
              </Card>
            ) : (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-4'}`}>
                {filteredTransactions.map((transaction, index) => {
                  const direction = getTransactionDirection(transaction);
                  const DirectionIcon = direction.icon;
                  
                  return (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={viewMode === 'grid' ? 'h-full' : ''}
                    >
                      {viewMode === 'grid' ? (
                        <div className="h-full">
                          <Card hover onClick={() => setSelectedTransaction(transaction)} className="cursor-pointer h-full flex flex-col">
                            <div className="flex items-start justify-between flex-1">
                              <div className="flex items-start space-x-3 flex-1 min-w-0">
                                <div className="flex-shrink-0">
                                  {getTransactionIcon(transaction.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    {getTransactionTitle(transaction.type)}
                                  </h3>
                                  <p className="text-sm text-gray-600 mb-1">
                                    ඉඩම් ID: {transaction.propertyId}
                                  </p>
                                  <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {formatDate(transaction.timestamp)}
                                  </div>
                                  {(transaction.from || transaction.to) && (
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                      <DirectionIcon className={`w-4 h-4 mr-1 ${direction.color}`} />
                                      <span>
                                        {direction.type === 'incoming' ? `වෙතින්: ${transaction.from}` :
                                         direction.type === 'outgoing' ? `වෙත: ${transaction.to}` :
                                         transaction.to}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                              <div>
                                {getStatusBadge(transaction.status)}
                              </div>
                              <button className="inline-flex items-center px-3 py-1 border border-green-300 text-green-700 rounded-md hover:bg-green-50 transition-colors">
                                <Eye className="w-4 h-4 mr-1" />
                                විස්තර
                              </button>
                            </div>
                          </Card>
                        </div>
                      ) : (
                        <Card hover onClick={() => setSelectedTransaction(transaction)} className="cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                {getTransactionIcon(transaction.type)}
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {getTransactionTitle(transaction.type)}
                                </h3>
                                <p className="text-gray-600 text-sm mb-1">ID: {transaction.id}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>{transaction.propertyId}</span>
                                  <span>•</span>
                                  <span>{formatDate(transaction.timestamp)}</span>
                                  <span>•</span>
                                  {getStatusBadge(transaction.status)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="inline-flex items-center px-3 py-1 border border-green-300 text-green-700 rounded-md hover:bg-green-50 transition-colors">
                                <Eye className="w-4 h-4 mr-1" />
                                විස්තර
                              </button>
                              <ArrowRight className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        </Card>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Transaction Details Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              {selectedTransaction ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">ගනුදෙනු විස්තර</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {getTransactionTitle(selectedTransaction.type)}
                        </h3>
                        {getStatusBadge(selectedTransaction.status)}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">ගනුදෙනු ID:</span>
                          <p className="font-mono text-sm bg-gray-100 p-2 rounded mt-1 break-all">
                            {selectedTransaction.id}
                          </p>
                        </div>

                        <div>
                          <span className="text-sm text-gray-600">ඉඩම් ID:</span>
                          <p className="font-medium mt-1">{selectedTransaction.propertyId}</p>
                        </div>

                        <div>
                          <span className="text-sm text-gray-600">දිනය සහ වේලාව:</span>
                          <div className="flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {formatDate(selectedTransaction.timestamp)}
                          </div>
                        </div>

                        {selectedTransaction.from && (
                          <div>
                            <span className="text-sm text-gray-600">වෙතින්:</span>
                            <p className="font-medium mt-1">{selectedTransaction.from}</p>
                          </div>
                        )}

                        {selectedTransaction.to && (
                          <div>
                            <span className="text-sm text-gray-600">වෙත:</span>
                            <p className="font-medium mt-1">{selectedTransaction.to}</p>
                          </div>
                        )}

                        <div>
                          <span className="text-sm text-gray-600">ගනුදෙනු වර්ගය:</span>
                          <p className="font-medium mt-1">{getTransactionTitle(selectedTransaction.type)}</p>
                        </div>

                        <div>
                          <span className="text-sm text-gray-600">තත්ත්වය:</span>
                          <div className="mt-1">
                            {getStatusBadge(selectedTransaction.status)}
                          </div>
                        </div>
                      </div>

                      {selectedTransaction.smartContractId && (
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-medium text-purple-900 mb-2 flex items-center">
                            <Zap className="w-4 h-4 mr-2" />
                            ස්මාර්ට් කොන්ත්‍රාක්ට්
                          </h4>
                          <p className="text-sm text-purple-700">
                            ID: {selectedTransaction.smartContractId}
                          </p>
                        </div>
                      )}

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-900 mb-2 flex items-center">
                          <Hash className="w-4 h-4 mr-2" />
                          බ්ලොක්චේන් සත්‍යාපනය
                        </h4>
                        <p className="text-sm text-green-700">
                          මෙම ගනුදෙනුව බ්ලොක්චේන් ලේඛනාගාරයේ ස්ථිරව සටහන් කර ඇත සහ වෙනස් කළ නොහැක.
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-colors">
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
                    <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Activity className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">ගනුදෙනුවක් තෝරන්න</h3>
                    <p className="text-gray-600 mb-6">
                      විස්තර බැලීමට ගනුදෙනුවක් මත ක්ලික් කරන්න
                    </p>
                    <div className="space-y-3 text-sm text-gray-500">
                      <div className="flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        <span>සම්පූර්ණ ගනුදෙනු විස්තර</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Hash className="w-4 h-4 mr-2" />
                        <span>බ්ලොක්චේන් සත්‍යාපනය</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Database className="w-4 h-4 mr-2" />
                        <span>ගනුදෙනු මෙටාඩේටා</span>
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

export default Transactions;