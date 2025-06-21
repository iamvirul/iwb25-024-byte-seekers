import React from 'react';
import { Eye, Download, Trash2, CheckCircle, Clock, AlertCircle, CreditCard, Shield, FileText, Camera, File } from 'lucide-react';
import Card from '../ui/Card';

interface DocumentCardProps {
  document: any;
  onDelete: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onDelete }) => {
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'nic_front':
      case 'nic_back':
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'sl_udi':
        return <Shield className="w-5 h-5 text-purple-600" />;
      case 'birth_certificate':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'profile_photo':
        return <Camera className="w-5 h-5 text-orange-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'nic_front':
        return 'ජාතික හැඳුනුම්පත (ඉදිරිපස)';
      case 'nic_back':
        return 'ජාතික හැඳුනුම්පත (පිටුපස)';
      case 'sl_udi':
        return 'SL-UDI ඩිජිටල් හැඳුනුම්පත';
      case 'birth_certificate':
        return 'උපන් සහතිකය';
      case 'profile_photo':
        return 'ප්‍රොෆයිල් ඡායාරූපය';
      case 'passport':
        return 'ගමන් බලපත්‍රය';
      case 'driving_license':
        return 'රියදුරු බලපත්‍රය';
      case 'utility_bill':
        return 'උපයෝගිතා බිල්පත';
      case 'bank_statement':
        return 'බැංකු ප්‍රකාශනය';
      case 'other':
        return 'වෙනත්';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            සත්‍යාපිතයි
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            සත්‍යාපනය වෙමින්
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
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
    <Card hover className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            {getDocumentIcon(document.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">
              {document.name}
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              {getDocumentTypeLabel(document.type)}
            </p>
            <div className="text-xs text-gray-500">
              {document.size} • {formatDate(document.uploadDate)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <div>
          {getStatusBadge(document.status)}
        </div>
        <div className="flex space-x-1">
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button 
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default DocumentCard;