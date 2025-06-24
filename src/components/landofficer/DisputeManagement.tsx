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
    Filter
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

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
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">සියලු තත්ත්වයන්</option>
                        <option value="pending">රැදී සිටින</option>
                        <option value="investigating">විමර්ශනය</option>
                        <option value="resolved">නිරාකරණය</option>
                        <option value="rejected">ප්‍රතික්ෂේප</option>
                    </select>
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
                                    onClick={() => onViewDetails(dispute)}
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
        </div>
    );
};

export default DisputeManagement;