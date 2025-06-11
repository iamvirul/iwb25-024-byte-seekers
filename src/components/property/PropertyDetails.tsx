import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, User, Calendar, Hash, FileText, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';

interface Property {
  id: string;
  title: string;
  location: string;
  coordinates: { lat: number; lng: number };
  area: number;
  owner: string;
  ownerId: string;
  registrationDate: number;
  documents: string[];
  disputes: any[];
  blockchainHash: string;
}

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('si-LK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">ඉඩම් විස්තර</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">{property.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span className="font-medium">{property.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ප්‍රමාණය:</span>
                <span className="font-medium">{property.area} අක්කර</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">ස්ථානය</h4>
            <p className="text-gray-600 mb-3">{property.location}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">අක්ෂාංශය:</span>
                <span className="font-mono">{property.coordinates.lat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">දේශාංශය:</span>
                <span className="font-mono">{property.coordinates.lng}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">හිමිකරු</h4>
            <p className="text-gray-600 mb-1">{property.owner}</p>
            <p className="text-sm text-gray-500">SL-UDI: {property.ownerId}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">ලියාපදිංචි දිනය</h4>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(property.registrationDate)}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">බ්ලොක්චේන් හැෂ්</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-mono break-all text-gray-600">
                {property.blockchainHash}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">ලේඛන</h4>
            {property.documents.length > 0 ? (
              <div className="space-y-2">
                {property.documents.map((doc, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600 p-2 bg-gray-50 rounded">
                    <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{doc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">ලේඛන උඩුගත කර නැත</p>
            )}
          </div>

          {property.disputes.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                ගැටළු
              </h4>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">
                  මෙම ඉඩම සම්බන්ධයෙන් {property.disputes.length} ගැටළු(ව) ගොනු කර ඇත.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default PropertyDetails;