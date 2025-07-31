import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  Eye
} from 'lucide-react';
import { LandDetails, LandTransfer } from '../types/LandTypes';
import { ChainBlock } from '../components/blockchain/ChainBlock';
import { CurrentOwnerCard } from '../components/blockchain/CurrentOwnerCard';



const LandChainVisualization: React.FC = () => {
  const { landId } = useParams<{ landId: string }>();
  const [transfers, setTransfers] = useState<LandTransfer[]>([]);
  const [landDetails, setLandDetails] = useState<LandDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch with dummy data
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Dummy land details
        const dummyLand: LandDetails = {
          id: 1,
          landId: landId || 'LND-001',
          landName: 'Sunset Valley Estate',
          landPlace: 'Colombo 07',
          landLat: 6.927079,
          landLang: 79.861244,
          landSize: 2500,
          landValue: 125000000,
          landType: 'Residential',
          registerDate: '2020-05-15',
          landStatus: 'VERIFIED',
          priority: 1
        };

        // Dummy transfer history
        const dummyTransfers: LandTransfer[] = [
          {
            id: 1,
            transferDate: '2018-03-10T10:30:00',
            verifiedBy: 'REG-001',
            blockIndex: 1,
            blockHash: '0x3a4f...c2d1',
            prevBlockHash: '0x0000...0000',
            fromLandOwner: {
              id: 1,
              ownerId: 'OWN-001',
              firstName: 'Government',
              lastName: 'of Sri Lanka',
              nic: '000000000V',
              address: 'Colombo',
              contactNo: '0112345678'
            },
            toLandOwner: {
              id: 2,
              ownerId: 'OWN-002',
              firstName: 'Rajapaksa',
              lastName: 'Developers',
              nic: '123456789V',
              address: 'Colombo 05',
              contactNo: '0118765432'
            }
          },
          {
            id: 2,
            transferDate: '2020-05-15T14:45:00',
            verifiedBy: 'REG-002',
            blockIndex: 2,
            blockHash: '0x5b6e...f4a3',
            prevBlockHash: '0x3a4f...c2d1',
            fromLandOwner: {
              id: 2,
              ownerId: 'OWN-002',
              firstName: 'Rajapaksa',
              lastName: 'Developers',
              nic: '123456789V',
              address: 'Colombo 05',
              contactNo: '0118765432'
            },
            toLandOwner: {
              id: 3,
              ownerId: 'OWN-003',
              firstName: 'Sunil',
              lastName: 'Perera',
              nic: '987654321V',
              address: 'Colombo 07',
              contactNo: '0771234567'
            }
          },
          {
            id: 3,
            transferDate: '2023-01-20T09:15:00',
            verifiedBy: 'REG-003',
            blockIndex: 3,
            blockHash: '0x7c8d...e6b5',
            prevBlockHash: '0x5b6e...f4a3',
            fromLandOwner: {
              id: 3,
              ownerId: 'OWN-003',
              firstName: 'Sunil',
              lastName: 'Perera',
              nic: '987654321V',
              address: 'Colombo 07',
              contactNo: '0771234567'
            },
            toLandOwner: {
              id: 4,
              ownerId: 'OWN-004',
              firstName: 'Nimal',
              lastName: 'Fernando',
              nic: '456789123V',
              address: 'Colombo 03',
              contactNo: '0769876543'
            }
          }
        ];

        setLandDetails(dummyLand);
        setTransfers(dummyTransfers);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load land ownership data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [landId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500 border-b-transparent rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    );
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
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(217, 91%, 60%) 0%, transparent 70%), 
                           radial-gradient(circle at 75% 75%, hsl(271, 81%, 56%) 0%, transparent 70%)`
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Zap className="w-4 h-4" />
            Blockchain Verified
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Land Ownership Chain
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Immutable blockchain record for <span className="text-blue-600 font-semibold">{landDetails?.landName}</span>
          </p>
        </div>

        {/* Land Details Card */}
        {landDetails && (
          <div className="mb-20">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md relative overflow-hidden group hover:shadow-lg transition-all duration-500">
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                  <div className="flex items-center gap-4 mb-6 lg:mb-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{landDetails.landName}</h2>
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
                      <span className="font-semibold">Status: {landDetails.landStatus}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>Registered: {new Date(landDetails.registerDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl group hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Ruler className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-500">Land Size</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{landDetails.landSize.toLocaleString()} sq.ft</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl group hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-500">Estimated Value</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">LKR {landDetails.landValue.toLocaleString()}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl group hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Building className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-500">Land Type</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{landDetails.landType}</p>
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
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Current Owner</h3>
            <CurrentOwnerCard owner={transfers[transfers.length - 1].toLandOwner} />
          </div>
        )}
      </div>
    </div>
  );
};



export default LandChainVisualization;