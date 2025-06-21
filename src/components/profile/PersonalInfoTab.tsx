import React from 'react';
import { User, Mail, Phone, CreditCard, Shield, Calendar, MapPin } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';

interface PersonalInfoTabProps {
  profileData: any;
  isEditing: boolean;
  onDataChange: (data: any) => void;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({
  profileData,
  isEditing,
  onDataChange
}) => {
  return (
    <Card>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">පුද්ගලික තොරතුරු</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="මුල් නම"
          value={profileData.firstName}
          onChange={(e) => onDataChange({...profileData, firstName: e.target.value})}
          disabled={!isEditing}
          icon={User}
        />

        <Input
          label="අග නම"
          value={profileData.lastName}
          onChange={(e) => onDataChange({...profileData, lastName: e.target.value})}
          disabled={!isEditing}
          icon={User}
        />

        <Input
          label="ඊමේල් ලිපිනය"
          type="email"
          value={profileData.email}
          onChange={(e) => onDataChange({...profileData, email: e.target.value})}
          disabled={!isEditing}
          icon={Mail}
        />

        <Input
          label="දුරකථන අංකය"
          value={profileData.phone}
          onChange={(e) => onDataChange({...profileData, phone: e.target.value})}
          disabled={!isEditing}
          icon={Phone}
        />

        <Input
          label="ජාතික හැඳුනුම්පත් අංකය"
          value={profileData.nic}
          onChange={(e) => onDataChange({...profileData, nic: e.target.value})}
          disabled={!isEditing}
          icon={CreditCard}
        />

        <Input
          label="SL-UDI අංකය"
          value={profileData.slUdiId}
          onChange={(e) => onDataChange({...profileData, slUdiId: e.target.value})}
          disabled={!isEditing}
          icon={Shield}
        />

        <Input
          label="උපන් දිනය"
          type="date"
          value={profileData.dateOfBirth}
          onChange={(e) => onDataChange({...profileData, dateOfBirth: e.target.value})}
          disabled={!isEditing}
          icon={Calendar}
        />

        <Input
          label="රැකියාව"
          value={profileData.occupation}
          onChange={(e) => onDataChange({...profileData, occupation: e.target.value})}
          disabled={!isEditing}
          icon={User}
        />

        <div className="md:col-span-2">
          <Input
            label="ලිපිනය"
            value={profileData.address}
            onChange={(e) => onDataChange({...profileData, address: e.target.value})}
            disabled={!isEditing}
            icon={MapPin}
          />
        </div>

        <Input
          label="හදිසි අවස්ථා සම්බන්ධතාව"
          value={profileData.emergencyContact}
          onChange={(e) => onDataChange({...profileData, emergencyContact: e.target.value})}
          disabled={!isEditing}
          icon={Phone}
        />
      </div>
    </Card>
  );
};

export default PersonalInfoTab;