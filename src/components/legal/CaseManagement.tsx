import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gavel,
  Calendar,
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  MessageSquare,
  BookOpen,
  Scale,
  Send,
  Plus,
  X
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Select from '../ui/Select';

interface Case {
  id: string;
  disputeId: string;
  title: string;
  propertyId: string;
  complainant: string;
  defendant: string;
  filedDate: number;
  status: string;
  priority: string;
  assignedDate: number;
  hearingDate?: number;
  caseType: string;
  evidence: string[];
  legalPrecedents: string[];
  estimatedResolutionDays: number;
  notes?: string;
}

interface CaseManagementProps {
  cases: any[];
  onCaseUpdate: (caseId: string, updates: Partial<Case>) => void;
  onScheduleHearing: (caseId: string, date: number) => void;
  onResolveCase: (caseId: string, resolution: string) => void;
}

const CaseManagement: React.FC<CaseManagementProps> = ({
  cases,
  onCaseUpdate,
  onScheduleHearing,
  onResolveCase
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [caseNotes, setCaseNotes] = useState('');
  const [hearingDate, setHearingDate] = useState('');

  const statusOptions = [
    { value: 'all', label: 'සියලු තත්ත්වයන්' },
    { value: 'PENDING', label: 'සමාලෝචනය වෙමින්' },
    { value: 'RESOLVED', label: 'නිරාකරණය' },
  ];

  const priorityOptions = [
    { value: 'all', label: 'සියලු ප්‍රමුඛතා' },
    { value: 'urgent', label: 'හදිසි' },
    { value: 'high', label: 'ඉහළ' },
    { value: 'medium', label: 'මධ්‍යම' },
    { value: 'low', label: 'අඩු' }
  ];

  const filteredCases = cases.filter(case_ => {
    const matchesSearch =
      case_.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.witnessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.caseId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || case_.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || case_.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">සමාලෝචනය වෙමින්</span>;
      case 'RESOLVED':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">නිරාකරණය</span>;
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

  const handleScheduleHearing = () => {
    if (selectedCase && hearingDate) {
      const date = new Date(hearingDate).getTime();
      onScheduleHearing(selectedCase.id, date);
      setHearingDate('');
      alert('විභාගය සාර්ථකව නියම කරන ලදී');
    }
  };

  const handleSaveNotes = () => {
    if (selectedCase) {
      onCaseUpdate(selectedCase.id, { notes: caseNotes });
      alert('සටහන් සුරකින ලදී');
    }
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
              placeholder="නීතිමය සිද්ධි සොයන්න..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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

      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCases.map((case_, index) => (
          <motion.div
            key={case_.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card hover className="h-full flex flex-col border-l-4 border-l-purple-500">


              <div className="space-y-2 mb-4 flex-1">
                <div className="text-sm">
                  <span className="text-gray-600 font-semibold">සිද්ධි ID:</span>
                  <span className="ml-2 font-medium">{case_.caseId}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">ඉඩම්:</span>
                  <span className="ml-2 font-medium">{case_.land.landId}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">පැමිණිලිකරු:</span>
                  <span className="ml-2">{case_.user.firstName} {case_.user.lastName}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">විත්තිකරු:</span>
                  <span className="ml-2">{case_.witnessName}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">ගොනු කළ දිනය:</span>
                  <span className="ml-2">{formatDate(case_.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  {getStatusBadge(case_.status)}
                </div>
                <div className="text-sm text-gray-500">
                  {case_.estimateTime} ඇස්තමේන්තුව
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="sm"
                  icon={Eye}
                  onClick={() => {
                    setSelectedCase(case_);
                    setCaseNotes(case_.notes || '');
                    setShowCaseDetails(true);
                  }}
                  className="w-full"
                >
                  සම්පූර්ණ විස්තර
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Gavel className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">නීතිමය සිද්ධි නොමැත</h3>
            <p className="text-gray-600">
              ඔබේ සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න
            </p>
          </div>
        </Card>
      )}

      {/* Case Details Modal */}
      {showCaseDetails && selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mt-1">සිද්ධි ID: {selectedCase.caseId}</p>
              </div>
              <button
                onClick={() => setShowCaseDetails(false)}
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
                        <span className="text-gray-600">තත්ත්වය:</span>
                        <span>{getStatusBadge(selectedCase.status)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ඉඩම් ID:</span>
                        <span>{selectedCase.land.landId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ගොනු කළ දිනය:</span>
                        <span>{formatDate(selectedCase.createdAt)}</span>
                      </div>
                       <div className="flex justify-between">
                        <span className="text-gray-600">තොරතුරු:</span>
                        <span>{selectedCase.disputesDetails}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">පාර්ශ්වයන්</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">පැමිණිලිකරු:</span>
                        <span className="ml-2 font-medium">{selectedCase.user.firstName} {selectedCase.user.lastName}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">විත්තිකරු:</span>
                        <span className="ml-2 font-medium">{selectedCase.witnessName}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">සාක්ෂි</h4>
                    <div className="space-y-2">
                      {selectedCase.disputedocuments.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-blue-500" />
                            <span>{item.docPath}</span>
                          </div>
                          <Button variant="ghost" size="sm" icon={Download}>
                            බාගන්න
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">නීතිමය පූර්වාදර්ශ</h4>
                    <div className="space-y-2">
                      {selectedCase.legalprecedents.map((precedent, index) => (
                        <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                            <span>{precedent.headline}</span>
                          </div>
                          <Button variant="ghost" size="sm" icon={Eye}>
                            බලන්න
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">

                  {/* Case Notes */}
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
                      <Button icon={Send} size="sm" onClick={handleSaveNotes}>
                        සටහන් සුරකින්න
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-2">ඇස්තමේන්තු නිරාකරණ කාලය</h4>
                    <p className="text-sm text-purple-700">
                      {selectedCase.estimateTime} දින
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={() => setShowCaseDetails(false)}>
                  වසන්න
                </Button>
                {selectedCase.status === 'PENDING' && (
                  <Button
                    icon={Gavel}
                    onClick={() => {
                      onResolveCase(selectedCase.id, 'නිරාකරණය කරන ලදී');
                      setShowCaseDetails(false);
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
  );
};

export default CaseManagement;