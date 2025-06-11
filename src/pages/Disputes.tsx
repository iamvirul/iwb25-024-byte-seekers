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
  Search
} from 'lucide-react';

const Disputes = () => {
  const { user } = useAuth();
  const { disputes, fileDispute, resolveDispute, properties } = useBlockchain();
  const [showNewDispute, setShowNewDispute] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<any>(null);
  const [formData, setFormData] = useState({
    propertyId: '',
    defendant: '',
    description: '',
    documents: [] as File[]
  });

  const userDisputes = disputes.filter(d => 
    d.complainant === user?.name || d.defendant === user?.name
  );

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

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('si-LK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">ගැටළු කළමනාකරණය</h1>
              <p className="text-gray-600">ඉඩම් සම්බන්ධ ගැටළු සහ නිරාකරණ</p>
            </div>
            <button
              onClick={() => setShowNewDispute(true)}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              නව ගැටළුවක් ගොනු කරන්න
            </button>
          </div>

          {/* New Dispute Form */}
          {showNewDispute && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">නව ගැටළුවක් ගොනු කරන්න</h2>
              
              <form onSubmit={handleSubmitDispute} className="space-y-4">
                <div>
                  <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-2">
                    ඉඩම් ID
                  </label>
                  <select
                    id="propertyId"
                    value={formData.propertyId}
                    onChange={(e) => setFormData({...formData, propertyId: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="විත්තිකරුගේ නම"
                    required
                  />
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
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ගැටළුව සම්බන්ධයෙන් සම්පූර්ණ විස්තරයක් ලියන්න"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-2">
                    සහාය ලේඛන
                  </label>
                  <input
                    type="file"
                    id="documents"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => setFormData({...formData, documents: Array.from(e.target.files || [])})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowNewDispute(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    අවලංගු කරන්න
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    ගැටළුව ගොනු කරන්න
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Disputes List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                මගේ ගැටළු ({userDisputes.length})
              </h2>
              
              {userDisputes.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <Gavel className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">ගැටළු නැත</h3>
                  <p className="text-gray-600">තවම ගැටළු ගොනු කර නැත</p>
                </div>
              ) : (
                userDisputes.map((dispute) => (
                  <motion.div
                    key={dispute.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => setSelectedDispute(dispute)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            ගැටළුව #{dispute.id.slice(-6)}
                          </h3>
                          {getStatusBadge(dispute.status)}
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {dispute.description}
                        </p>
                        <div className="space-y-1 text-sm text-gray-500">
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
                      <div className="flex-shrink-0">
                        <AlertCircle className="w-6 h-6 text-red-500" />
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Dispute Details */}
            <div className="lg:sticky lg:top-8">
              {selectedDispute ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
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
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          AI විශ්ලේෂණය
                        </h4>
                        <p className="text-sm text-blue-700">
                          {selectedDispute.nlpAnalysis}
                        </p>
                      </div>
                    )}

                    {user?.role === 'legal_official' && selectedDispute.status === 'pending' && (
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
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <Gavel className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">ගැටළුවක් තෝරන්න</h3>
                  <p className="text-gray-600">විස්තර බැලීමට ගැටළුවක් මත ක්ලික් කරන්න</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Disputes;