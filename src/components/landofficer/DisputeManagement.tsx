import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gavel,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  FileText,
  MapPin,
  Calendar,
  MessageSquare,
  Eye,
  Download,
  Search,
  Filter,
  X,
  Hash,
  Scale
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Select from '../ui/Select';

interface Dispute {
  id: string;
  propertyId: string;
  complainant: string;
  defendant: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'rejected';
  filedDate: number;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignedOfficer?: string;
  documents: string[];
}

interface DisputeManagementProps {
  disputes: Dispute[];
  onAssignDispute: (disputeId: string, officerId: string) => void;
  onUpdateStatus: (disputeId: string, status: string) => void;
  onViewDetails: (dispute: Dispute) => void;
}

const DisputeManagement: React.FC<DisputeManagementProps> = ({
  disputes,
  onAssignDispute,
  onUpdateStatus,
  onViewDetails
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'සියලු තත්ත්වයන්' },
    { value: 'pending', label: 'රැදී සිටින' },
    { value: 'investigating', label: 'විමර්ශනය' },
    { value: 'resolved', label: 'නිරාකරණය' },
    { value: 'rejected', label: 'ප්‍රතික්ෂේප' }
  ];

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = dispute.propertyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.complainant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.defendant.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || dispute.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">රැදී සිටින</span>;
      case 'investigating':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">විමර්ශනය</span>;
      case 'resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">නිරාකරණය</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">ප්‍රතික්ෂේප</span>;
      default:
        return null;
    }
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

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('si-LK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewDetails = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setShowDetailsModal(true);
    onViewDetails(dispute);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ගැටළු සොයන්න..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-48">
            <Select
              value={filterStatus}
              onChange={setFilterStatus}
              options={statusOptions}
            />
          </div>
        </div>
      </Card>

      {/* Disputes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDisputes.map((dispute, index) => (
          <motion.div
            key={dispute.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card hover className="h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Gavel className="w-4 h-4 text-red-600" />
                  <h3 className="font-semibold text-gray-900 text-sm">
                    ගැටළුව #{dispute.id.slice(-6)}
                  </h3>
                </div>
                <div className="flex space-x-2">
                  {getPriorityBadge(dispute.priority)}
                  {getStatusBadge(dispute.status)}
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  ඉඩම්: {dispute.propertyId}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  පැමිණිලිකරු: {dispute.complainant}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  විත්තිකරු: {dispute.defendant}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(dispute.filedDate)}
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {dispute.description}
                </p>

                {dispute.assignedOfficer && (
                  <div className="text-sm text-blue-600">
                    පවරන ලද: {dispute.assignedOfficer}
                  </div>
                )}
              </div>

              <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Eye}
                  onClick={() => handleViewDetails(dispute)}
                  className="flex-1"
                >
                  විස්තර
                </Button>
                {dispute.status === 'pending' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onUpdateStatus(dispute.id, 'investigating')}
                    className="flex-1"
                  >
                    පිළිගන්න
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredDisputes.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Gavel className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ගැටළු නොමැත</h3>
            <p className="text-gray-600">
              ඔබේ සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න
            </p>
          </div>
        </Card>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">ගැටළුව #{selectedDispute.id.slice(-6)}</h3>
                <p className="text-sm text-gray-600 mt-1">ගැටළු ID: {selectedDispute.id}</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">ගැටළු තොරතුරු</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ගැටළු ID:</span>
                        <span className="font-medium">{selectedDispute.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ඉඩම් ID:</span>
                        <span>{selectedDispute.propertyId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ප්‍රමුඛතාව:</span>
                        <span>{getPriorityBadge(selectedDispute.priority)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">තත්ත්වය:</span>
                        <span>{getStatusBadge(selectedDispute.status)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ගොනු කළ දිනය:</span>
                        <span>{formatDate(selectedDispute.filedDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">පාර්ශ්වයන්</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">පැමිණිලිකරු:</span>
                        <span className="ml-2 font-medium">{selectedDispute.complainant}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">විත්තිකරු:</span>
                        <span className="ml-2 font-medium">{selectedDispute.defendant}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">ගැටළුවේ විස්තරය</h4>
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
                      {selectedDispute.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">සහාය ලේඛන</h4>
                    <div className="space-y-2">
                      {selectedDispute.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-blue-500" />
                            <span>{doc}</span>
                          </div>
                          <Button variant="ghost" size="sm" icon={Download}>
                            බාගන්න
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">ක්‍රියාමාර්ග</h4>
                    <div className="space-y-3">
                      {selectedDispute.status === 'pending' && (
                        <>
                          <Button
                            variant="primary"
                            icon={CheckCircle}
                            onClick={() => {
                              onUpdateStatus(selectedDispute.id, 'investigating');
                              setShowDetailsModal(false);
                            }}
                            className="w-full"
                          >
                            විමර්ශනය ආරම්භ කරන්න
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              onUpdateStatus(selectedDispute.id, 'rejected');
                              setShowDetailsModal(false);
                            }}
                            className="w-full"
                          >
                            ප්‍රතික්ෂේප කරන්න
                          </Button>
                        </>
                      )}

                      {selectedDispute.status === 'investigating' && (
                        <Button
                          variant="primary"
                          icon={Scale}
                          onClick={() => {
                            onUpdateStatus(selectedDispute.id, 'resolved');
                            setShowDetailsModal(false);
                          }}
                          className="w-full"
                        >
                          නිරාකරණය කරන්න
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        icon={MessageSquare}
                        className="w-full"
                      >
                        නීති නිලධාරියාට යොමු කරන්න
                      </Button>
                    </div>
                  </div>

                  {selectedDispute.assignedOfficer && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">පවරන ලද නිලධාරී</h4>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700 font-medium">
                          {selectedDispute.assignedOfficer}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-900 mb-2">වැදගත් සටහන</h4>
                    <p className="text-sm text-red-700">
                      ගැටළු නිරාකරණය කිරීමට පෙර සියලු සාක්ෂි සහ ලේඛන සම්පූර්ණයෙන් පරීක්ෂා කර ගන්න.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
                  වසන්න
                </Button>
                <Button
                  icon={Download}
                  onClick={() => {
                    // Handle download functionality
                    alert('ගැටළු වාර්තාව බාගත කරමින්...');
                  }}
                >
                  වාර්තාව බාගන්න
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DisputeManagement;