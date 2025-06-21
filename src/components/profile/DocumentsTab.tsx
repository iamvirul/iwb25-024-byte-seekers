import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Eye, Download, Trash2, Zap } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import FileUpload from '../ui/FileUpload';
import DocumentCard from './DocumentCard';

interface DocumentsTabProps {
  documents: any[];
  newDocuments: File[];
  selectedDocumentType: string;
  documentTypes: any[];
  onNewDocumentsChange: (files: File[]) => void;
  onDocumentTypeChange: (type: string) => void;
  onDocumentUpload: () => void;
  onDocumentDelete: (docId: string) => void;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({
  documents,
  newDocuments,
  selectedDocumentType,
  documentTypes,
  onNewDocumentsChange,
  onDocumentTypeChange,
  onDocumentUpload,
  onDocumentDelete
}) => {
  return (
    <div className="space-y-8">
      {/* Upload New Documents */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">නව ලේඛන උඩුගත කරන්න</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ලේඛන වර්ගය
            </label>
            <select
              value={selectedDocumentType}
              onChange={(e) => onDocumentTypeChange(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {documentTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <FileUpload
            files={newDocuments}
            onChange={onNewDocumentsChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            multiple={true}
            label="ලේඛන තෝරන්න"
            helper="PDF, DOC, DOCX, JPG, PNG (උපරිම 10MB)"
          />

          {newDocuments.length > 0 && (
            <div className="flex justify-end">
              <Button
                onClick={onDocumentUpload}
                icon={Upload}
              >
                උඩුගත කරන්න
              </Button>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mt-6">
          <div className="flex items-start">
            <Zap className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-semibold text-blue-800 mb-2">ස්වයංක්‍රීය සත්‍යාපනය</h4>
              <p className="text-blue-700 leading-relaxed">
                ඔබේ ලේඛන උඩුගත කිරීමෙන් පසු, අපගේ AI පද්ධතිය ස්වයංක්‍රීයව 
                ලේඛන සත්‍යාපනය කර ඔබේ ගිණුමේ ආරක්ෂාව වැඩි දියුණු කරයි.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Existing Documents */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">උඩුගත කළ ලේඛන</h3>
          <span className="text-sm text-gray-600">{documents.length} ලේඛන</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="h-full"
            >
              <DocumentCard
                document={document}
                onDelete={() => onDocumentDelete(document.id)}
              />
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DocumentsTab;