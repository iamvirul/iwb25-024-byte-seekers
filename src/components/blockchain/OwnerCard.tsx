import { MapPin, Phone } from "lucide-react";
import { LandOwner } from "../../types/LandTypes";

export const OwnerCard: React.FC<{ 
  owner: LandOwner; 
  label: string;
}> = ({ owner, label }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 w-full lg:w-80 group">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {owner.firstName.charAt(0)}{owner.lastName.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
          </div>
          <h4 className="font-semibold text-gray-900">
            {owner.firstName} {owner.lastName}
          </h4>
          <p className="text-sm text-gray-500 font-mono">{owner.nic}</p>
        </div>
      </div>

      <div className="space-y-2">
        {owner.contactNo && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-green-600" />
            <span className="text-gray-500">{owner.contactNo}</span>
          </div>
        )}
        {owner.address && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-gray-500">{owner.address}</span>
          </div>
        )}
      </div>
    </div>
  );
};