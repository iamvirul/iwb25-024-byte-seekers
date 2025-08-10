import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, User, Hash, AlertCircle, Eye } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface Property {
  id: string;
  title: string;
  location: string;
  area: number;
  owner: string;
  registrationDate: number;
  disputes: any[];
}

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card hover onClick={() => onClick(property)}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">{property.title}</h3>
              {property.disputes.length > 0 && (
                <Badge variant="danger" icon={AlertCircle} size="sm">
                  ගැටළු
                </Badge>
              )}
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{property.location}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{property.owner}</span>
              </div>
              <div className="flex items-center">
                <Hash className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{property.id}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right ml-4 flex-shrink-0">
            <div className="text-lg font-bold text-blue-600 mb-3">
              {property.area} අක්කර
            </div>
            <Button variant="outline" size="sm" icon={Eye}>
              විස්තර
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;