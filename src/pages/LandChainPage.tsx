import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Shield,
  Calendar,
  Building,
  DollarSign,
  Ruler,
  CheckCircle,
  Hash,
  Zap,
  Eye,
  UserCheck,
} from "lucide-react";
import { LandDetails, LandTransfer } from "../types/LandTypes";
import { ChainBlock } from "../components/blockchain/ChainBlock";
import { CurrentOwnerCard } from "../components/blockchain/CurrentOwnerCard";
import LoadingOverlay from "../components/LoadingOverlay";

const LandChainVisualization: React.FC = () => {
  const { landId } = useParams<{ landId: string }>();
  const [transfers, setTransfers] = useState<LandTransfer[]>([]);
  const [landDetails, setLandDetails] = useState<LandDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/lands/chain/${landId}`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const chain = data.content.chain;

        if (!Array.isArray(chain)) {
          throw new Error("Invalid chain data");
        }

        const mappedTransfers: LandTransfer[] = chain.map((item: any) => ({
          id: item.id,
          transferDate: item.transferDate,
          verifiedBy: item.verifiedBy,
          blockIndex: item.blockIndex,
          blockHash: item.blockHash,
          prevBlockHash: item.prevBlockHash,
          fromLandOwner: item.from_id
            ? {
                id: item.from_id,
                ownerId: item.from_ownerId,
                firstName: item.from_firstName,
                lastName: item.from_lastName,
                nic: item.from_nic,
                address: item.from_address,
                contactNo: item.from_contactNo,
              }
            : null,
          toLandOwner: {
            id: item.to_id,
            ownerId: item.to_ownerId,
            firstName: item.to_firstName,
            lastName: item.to_lastName,
            nic: item.to_nic,
            address: item.to_address,
            contactNo: item.to_contactNo,
          },
        }));
        setLandDetails(data.content.land);
        setTransfers(mappedTransfers);
      } catch (err) {
        console.error(err);
        setError("Failed to load land ownership data");
      } finally {
        setIsLoading(false);
      }
    };

    if (landId) {
      fetchData();
    }
  }, [landId]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border border-red-200 text-red-600 px-8 py-6 rounded-xl shadow-md">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(217, 91%, 60%) 0%, transparent 70%), 
                           radial-gradient(circle at 75% 75%, hsl(271, 81%, 56%) 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Zap className="w-4 h-4" />
            බ්ලොක්චේන් සත්‍යාපනය කරන ලදී
          </div>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 p-5">
            භූමි හිමිකම් බ්ලොක්චේන්
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            <span className="text-blue-600 font-semibold">
              {landDetails?.landName}
            </span>{" "}
            සඳහා වෙනස් කළ නොහැකි බ්ලොක්චේන් වාර්තාවක්
          </p>
        </div>
        {landDetails && (
          <div className="mb-20">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md relative overflow-hidden group hover:shadow-lg transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                  <div className="flex items-center gap-4 mb-6 lg:mb-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {landDetails.landName}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-500 mt-1">
                        <Hash className="w-4 h-4" />
                        <span className="font-mono">{landDetails.landId}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{landDetails.landPlace}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 px-6 py-4 rounded-xl">
                    <div className="flex items-center gap-2 text-blue-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">
                        තත්වය: {landDetails.landStatus}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        ලියාපදිංචි කර ඇත:{" "}
                        {new Date(
                          landDetails.registerDate.year,
                          landDetails.registerDate.month - 1,
                          landDetails.registerDate.day
                        ).toDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl group hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Ruler className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-500">
                        භූමි ප්‍රමාණය
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {landDetails.landSize.toLocaleString()} sq.ft
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl group hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-500">
                        ඇස්තමේන්තුගත වටිනාකම
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      LKR {landDetails.landValue.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl group hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Building className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-500">
                        ඉඩම් වර්ගය
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {landDetails.landType}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl group hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <UserCheck className="w-5 h-5 text-orange-500" />
                      <span className="text-sm font-medium text-gray-500">
                        වත්මන් හිමිකරු
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {transfers[transfers.length - 1]?.toLandOwner?.firstName}{" "}
                      {transfers[transfers.length - 1]?.toLandOwner?.lastName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blockchain Visualization */}
        <div className="relative">
          {/* Central blockchain line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-600 to-green-500 transform -translate-x-1/2 hidden lg:block" />

          <div className="space-y-20">
            {transfers.map((transfer, index) => (
              <div key={transfer.id} className="relative">
                <ChainBlock
                  transfer={transfer}
                  index={index}
                  isLast={index === transfers.length - 1}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Current Owner */}
        {transfers.length > 0 && (
          <div className="mt-32 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
              <Eye className="w-4 h-4" />
              Current Status
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Current Owner
            </h3>
            <CurrentOwnerCard
              owner={transfers[transfers.length - 1].toLandOwner}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandChainVisualization;
