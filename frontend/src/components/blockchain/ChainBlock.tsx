import { CheckCircle, Clock, LinkIcon, Shield, Zap } from "lucide-react";
import { LandTransfer } from "../../types/LandTypes";
import { OwnerCard } from "./OwnerCard";

export const ChainBlock: React.FC<{ 
  transfer: LandTransfer; 
  index: number; 
  isLast: boolean;
}> = ({ transfer, index, isLast }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative">
      {/* Connection line to next block */}
      {!isLast && (
        <div className="absolute top-full left-1/2 w-0.5 h-20 bg-gradient-to-b from-blue-500 to-purple-600 transform -translate-x-1/2 hidden lg:block opacity-30" />
      )}

      <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        {/* Block Node */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity duration-500" />
          
          <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-500 w-full lg:w-96">
            {/* Block header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Block #{transfer.blockIndex}</h3>
                  <p className="text-sm text-gray-500">Blockchain Record</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-blue-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              </div>
            </div>

            {/* Block details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Transfer Date</p>
                  <p className="text-sm font-medium">{new Date(transfer.transferDate).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Verified By</p>
                  <p className="text-sm font-medium font-mono">{transfer.verifiedBy}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Block Hash</p>
                    <p className="text-xs font-mono text-blue-600 break-all">{transfer.blockHash}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Previous Hash</p>
                    <p className="text-xs font-mono text-purple-600 break-all">{transfer.prevBlockHash}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Arrow */}
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
          <OwnerCard owner={transfer.fromLandOwner} label="From" />
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
          <OwnerCard owner={transfer.toLandOwner} label="To" />
        </div>
      </div>
    </div>
  );
};