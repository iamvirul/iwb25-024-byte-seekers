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
  Eye
} from 'lucide-react';

const Transactions = () => {
  const { user } = useAuth();
  const { transactions } = useBlockchain();
  const [filterType, setFilterType] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const userTransactions = transactions.filter(t => 
    t.to === user?.slUdiId || t.from === user?.slUdiId
  );

  const filteredTransactions = userTransactions.filter(transaction => {
    if (filterType === 'all') return true;
    return transaction.type === filterType;
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

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('si-LK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ගනුදෙනු ඉතිහාසය</h1>
            <p className="text-gray-600">ඔබේ සියලු බ්ලොක්චේන් ගනුදෙනු</p>
          </div>

          {/* Filter and Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">සියලු ගනුදෙනු</option>
                    <option value="register">ලියාපදිංචි කිරීම්</option>
                    <option value="transfer">හිමිකම් මාරු</option>
                    <option value="dispute">ගැටළු</option>
                    <option value="resolution">නිරාකරණ</option>
                  </select>
                </div>
                <div className="text-sm text-gray-600">
                  මුළු ගනුදෙනු: {filteredTransactions.length}
                </div>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                වාර්තාව බාගන්න
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Transaction List */}
            <div className="space-y-4">
              {filteredTransactions.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">ගනුදෙනු නැත</h3>
                  <p className="text-gray-600">තවම ගනුදෙනු සිදු කර නැත</p>
                </div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {getTransactionTitle(transaction.type)}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            ඉඩම් ID: {transaction.propertyId}
                          </p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(transaction.timestamp)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {getStatusBadge(transaction.status)}
                        <button className="inline-flex items-center px-3 py-1 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors">
                          <Eye className="w-4 h-4 mr-1" />
                          විස්තර
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Transaction Details */}
            <div className="lg:sticky lg:top-8">
              {selectedTransaction ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
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
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">ස්මාර්ට් කොන්ත්‍රාක්ට්</h4>
                        <p className="text-sm text-blue-700">
                          ID: {selectedTransaction.smartContractId}
                        </p>
                      </div>
                    )}

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Hash className="w-4 h-4 mr-2" />
                        බ්ලොක්චේන් සත්‍යාපනය
                      </h4>
                      <p className="text-sm text-gray-600">
                        මෙම ගනුදෙනුව බ්ලොක්චේන් ලේඛනාගාරයේ ස්ථිරව සටහන් කර ඇත සහ වෙනස් කළ නොහැක.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">ගනුදෙනුවක් තෝරන්න</h3>
                  <p className="text-gray-600">විස්තර බැලීමට ගනුදෙනුවක් මත ක්ලික් කරන්න</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Transactions;