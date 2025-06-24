import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    MapPin,
    User,
    Calendar,
    AlertTriangle,
    CheckCircle,
    Clock,
    Eye,
    Download,
    Search,
    Filter,
    SlidersHorizontal
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Registration {
    id: string;
    propertyTitle: string;
    applicant: string;
    submittedDate: number;
    status: string;
    area: number;
    location: string;
    priority: string;
    documents: string[];
}

interface RegistrationQueueProps {
    registrations: Registration[];
    onViewDetails: (registration: Registration) => void;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
}

const RegistrationQueue: React.FC<RegistrationQueueProps> = ({
    registrations,
    onViewDetails,
    onApprove,
    onReject
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    const filteredRegistrations = registrations.filter(reg => {
        const matchesSearch = reg.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || reg.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || reg.priority === filterPriority;

        return matchesSearch && matchesStatus && matchesPriority;
    });

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

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending_verification':
                return <Clock className="w-4 h-4 text-yellow-600" />;
            case 'document_review':
                return <FileText className="w-4 h-4 text-blue-600" />;
            case 'survey_required':
                return <MapPin className="w-4 h-4 text-purple-600" />;
            case 'approved':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'rejected':
                return <AlertTriangle className="w-4 h-4 text-red-600" />;
            default:
                return <Clock className="w-4 h-4 text-gray-600" />;
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
            {/* Search and Filter Bar */}
            <Card>
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="ඉඩම, අයදුම්කරු හෝ ස්ථානය සොයන්න..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <Button
                            variant="outline"
                            icon={SlidersHorizontal}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            ෆිල්ටර්
                        </Button>
                    </div>

                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">තත්ත්වය</label>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">සියලු තත්ත්වයන්</option>
                                    <option value="pending_verification">සත්‍යාපනය වෙමින්</option>
                                    <option value="document_review">ලේඛන පරීක්ෂණය</option>
                                    <option value="survey_required">සර්වේ අවශ්‍යයි</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ප්‍රමුඛතාව</label>
                                <select
                                    value={filterPriority}
                                    onChange={(e) => setFilterPriority(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">සියලු ප්‍රමුඛතා</option>
                                    <option value="urgent">හදිසි</option>
                                    <option value="high">ඉහළ</option>
                                    <option value="medium">මධ්‍යම</option>
                                    <option value="low">අඩු</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilterStatus('all');
                                        setFilterPriority('all');
                                    }}
                                    className="w-full"
                                >
                                    ෆිල්ටර් ඉවත් කරන්න
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </Card>

            {/* Registration Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRegistrations.map((registration, index) => (
                    <motion.div
                        key={registration.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <Card hover className="h-full flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(registration.status)}
                                    <h3 className="font-semibold text-gray-900 text-sm">
                                        {registration.propertyTitle}
                                    </h3>
                                </div>
                                {getPriorityBadge(registration.priority)}
                            </div>

                            <div className="space-y-3 flex-1">
                                <div className="flex items-center text-sm text-gray-600">
                                    <User className="w-4 h-4 mr-2" />
                                    {registration.applicant}
                                </div>

                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {registration.location} • {registration.area} අක්කර
                                </div>

                                <div className="flex items-center text-sm text-gray-600">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {formatDate(registration.submittedDate)}
                                </div>

                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">ලේඛන:</span> {registration.documents.length}
                                </div>
                            </div>

                            <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    icon={Eye}
                                    onClick={() => onViewDetails(registration)}
                                    className="flex-1"
                                >
                                    විස්තර
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    icon={CheckCircle}
                                    onClick={() => onApprove(registration.id)}
                                    className="flex-1"
                                >
                                    අනුමත
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {filteredRegistrations.length === 0 && (
                <Card>
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">ලියාපදිංචි කිරීම් නොමැත</h3>
                        <p className="text-gray-600">
                            ඔබේ සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default RegistrationQueue;