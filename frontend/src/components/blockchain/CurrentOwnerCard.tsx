import { MapPin, Phone, User } from "lucide-react";
import { LandOwner } from "../../types/LandTypes";

export const CurrentOwnerCard: React.FC<{ owner: LandOwner }> = ({ owner }) => {
  return (
    <div className="inline-block bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
          {owner.firstName.charAt(0)}{owner.lastName.charAt(0)}
        </div>
        <div className="text-left">
          <h4 className="text-2xl font-bold text-gray-900 mb-2">
            {owner.firstName} {owner.lastName}
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-gray-500 font-mono">{owner.nic}</span>
            </div>
            {owner.contactNo && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600" />
                <span className="text-gray-500">{owner.contactNo}</span>
              </div>
            )}
            {owner.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span className="text-gray-500">{owner.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};