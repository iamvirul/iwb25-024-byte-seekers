import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileCheck,
    AlertCircle,
    CheckCircle,
    XCircle,
    Download,
    Eye,
    Clock,
    User,
    FileText,
    MapPin,
    Hash,
    Shield
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Document {
    id: string;
    name: string;
    type: string;
    status: 'pending' | 'verified' | 'rejected';
    uploadDate: number;
    size: string;
    url: string;
}

interface VerificationItem {
    id: string;
    propertyId: string;
    applicant: string;
    submittedDate: number;
    priority: 'urgent' | 'high' | 'medium' | 'low';
    documents: Document[];
    verificationNotes: string;
}

interface VerificationPanelProps {
    items: VerificationItem[];
    onVerifyDocument: (itemId: string, documentId: string, status: 'verified' | 'rejected', notes?: string) => void;
    onCompleteVerification: (itemId: string) => void;
}

const VerificationPanel: React.FC<VerificationPanelProps> = ({
    items,
    onVerifyDocument,
    onCompleteVerification
}) => {
    const [selectedItem, setSelectedItem] = useState<VerificationItem | null>(null);
    const [verificationNotes, setVerificationNotes] = useState('');

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'border-red-500 bg-red-50';
            case 'high': return 'border-orange-500 bg-orange-50';
            case 'medium': return 'border-yellow-500 bg-yellow-50';
            case 'low': return 'border-green-500 bg-green-50';
            default: return 'border-gray-500 bg-gray-50';
        }
    };

    const getDocumentStatusIcon = (status: string) => {
        switch (status) {
            case 'verified':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'rejected':
                return <XCircle className="w-4 h-4 text-red-600" />;
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-600" />;
            default:
                return <FileText className="w-4 h-4 text-gray-600" />;
        }
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('si-LK', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Verification Queue */}
            <div className="lg:col-span-1">
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">සත්‍යාපන පෝලිම</h3>
                    <div className="space-y-3">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
                                className={`p-4 border-l-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${selectedItem?.id === item.id ? 'bg-blue-50 border-l-blue-500' : getPriorityColor(item.priority)
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-900 text-sm">{item.propertyId}</h4>
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${item.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                            item.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                                item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                        }`}>
                                        {item.priority === 'urgent' ? 'හදිසි' :
                                            item.priority === 'high' ? 'ඉහළ' :
                                                item.priority === 'medium' ? 'මධ්‍යම' : 'අඩු'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{item.applicant}</p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{item.documents.length} ලේඛන</span>
                                    <span>{formatDate(item.submittedDate)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Verification Details */}
            <div className="lg:col-span-2">
                {selectedItem ? (
                    <div className="space-y-6">
                        {/* Item Header */}
                        <Card>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{selectedItem.propertyId}</h3>
                                    <p className="text-gray-600">{selectedItem.applicant}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-500">ඉදිරිපත් කළ දිනය</div>
                                    <div className="font-medium">{formatDate(selectedItem.submittedDate)}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center">
                                    <Hash className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>ID: {selectedItem.id}</span>
                                </div>
                                <div className="flex items-center">
                                    <FileText className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{selectedItem.documents.length} ලේඛන</span>
                                </div>
                                <div className="flex items-center">
                                    <Shield className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>සත්‍යාපනය අවශ්‍යයි</span>
                                </div>
                            </div>
                        </Card>

                        {/* Documents List */}
                        <Card>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">ලේඛන සත්‍යාපනය</h4>
                            <div className="space-y-4">
                                {selectedItem.documents.map((document) => (
                                    <div key={document.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                {getDocumentStatusIcon(document.status)}
                                                <div>
                                                    <h5 className="font-medium text-gray-900">{document.name}</h5>
                                                    <p className="text-sm text-gray-600">{document.type} • {document.size}</p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm" icon={Eye}>
                                                    බලන්න
                                                </Button>
                                                <Button variant="outline" size="sm" icon={Download}>
                                                    බාගන්න
                                                </Button>
                                            </div>
                                        </div>

                                        {document.status === 'pending' && (
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    icon={CheckCircle}
                                                    onClick={() => onVerifyDocument(selectedItem.id, document.id, 'verified')}
                                                >
                                                    අනුමත කරන්න
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    icon={XCircle}
                                                    onClick={() => onVerifyDocument(selectedItem.id, document.id, 'rejected')}
                                                >
                                                    ප්‍රතික්ෂේප කරන්න
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Verification Notes */}
                        <Card>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">සත්‍යාපන සටහන්</h4>
                            <textarea
                                value={verificationNotes}
                                onChange={(e) => setVerificationNotes(e.target.value)}
                                placeholder="සත්‍යාපන සටහන් ඇතුළත් කරන්න..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                            />

                            <div className="flex justify-end space-x-3 mt-4">
                                <Button variant="outline">
                                    කෙටුම්පත සුරකින්න
                                </Button>
                                <Button
                                    variant="primary"
                                    icon={FileCheck}
                                    onClick={() => onCompleteVerification(selectedItem.id)}
                                >
                                    සත්‍යාපනය සම්පූර්ණ කරන්න
                                </Button>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <Card>
                        <div className="text-center py-12">
                            <FileCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">සත්‍යාපන අයිතමයක් තෝරන්න</h3>
                            <p className="text-gray-600">
                                සත්‍යාපනය ආරම්භ කිරීමට වම් පසින් අයිතමයක් තෝරන්න
                            </p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default VerificationPanel;