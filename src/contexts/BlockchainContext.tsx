import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BlockData {
  id: string;
  timestamp: number;
  previousHash: string;
  transactions: Transaction[];
  hash: string;
}

interface Transaction {
  id: string;
  type: 'register' | 'transfer' | 'dispute' | 'resolution';
  propertyId: string;
  from?: string;
  to?: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  smartContractId?: string;
}

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
  disputes: Dispute[];
  blockchainHash: string;
}

interface Dispute {
  id: string;
  propertyId: string;
  complainant: string;
  defendant: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'rejected';
  filedDate: number;
  documents: string[];
  nlpAnalysis?: string;
}

interface BlockchainContextType {
  blocks: BlockData[];
  properties: Property[];
  transactions: Transaction[];
  disputes: Dispute[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  registerProperty: (property: Omit<Property, 'id' | 'registrationDate' | 'blockchainHash'>) => void;
  transferProperty: (propertyId: string, newOwner: string, newOwnerId: string) => void;
  fileDispute: (dispute: Omit<Dispute, 'id' | 'filedDate'>) => void;
  resolveDispute: (disputeId: string, resolution: string) => void;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};

interface BlockchainProviderProps {
  children: ReactNode;
}

export const BlockchainProvider: React.FC<BlockchainProviderProps> = ({ children }) => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 'PROP001',
      title: 'කොළොන්නාව ඉඩම',
      location: 'කොළොන්නාව, කොළඹ',
      coordinates: { lat: 6.9271, lng: 79.8612 },
      area: 2.5,
      owner: 'සුනිල් සිල්වා',
      ownerId: 'SL-UDI-987654321',
      registrationDate: Date.now() - 86400000 * 365,
      documents: ['deed-001.pdf', 'survey-001.pdf'],
      disputes: [],
      blockchainHash: '0x1234567890abcdef'
    },
    {
      id: 'PROP002',
      title: 'ගම්පහ වත්ත',
      location: 'ගම්පහ',
      coordinates: { lat: 7.0873, lng: 80.0142 },
      area: 1.8,
      owner: 'මාලිනී ජයවර්ධන',
      ownerId: 'SL-UDI-456789123',
      registrationDate: Date.now() - 86400000 * 180,
      documents: ['deed-002.pdf'],
      disputes: [],
      blockchainHash: '0xabcdef1234567890'
    }
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);

  const generateHash = (data: string): string => {
    // Simple hash generation for demo
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return '0x' + Math.abs(hash).toString(16);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: 'TX' + Date.now(),
      timestamp: Date.now()
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const registerProperty = (property: Omit<Property, 'id' | 'registrationDate' | 'blockchainHash'>) => {
    const newProperty: Property = {
      ...property,
      id: 'PROP' + (properties.length + 1).toString().padStart(3, '0'),
      registrationDate: Date.now(),
      blockchainHash: generateHash(JSON.stringify(property))
    };
    setProperties(prev => [...prev, newProperty]);
    
    addTransaction({
      type: 'register',
      propertyId: newProperty.id,
      to: property.ownerId,
      status: 'confirmed'
    });
  };

  const transferProperty = (propertyId: string, newOwner: string, newOwnerId: string) => {
    setProperties(prev => prev.map(prop => 
      prop.id === propertyId 
        ? { ...prop, owner: newOwner, ownerId: newOwnerId }
        : prop
    ));
    
    addTransaction({
      type: 'transfer',
      propertyId,
      to: newOwnerId,
      status: 'confirmed'
    });
  };

  const fileDispute = (dispute: Omit<Dispute, 'id' | 'filedDate'>) => {
    const newDispute: Dispute = {
      ...dispute,
      id: 'DISP' + Date.now(),
      filedDate: Date.now(),
      nlpAnalysis: 'NLP විශ්ලේෂණය: ඉඩම් අයිතිය සම්බන්ධ ගැටළුවක් හඳුනාගෙන ඇත. ලේඛන පරීක්ෂා කිරීම අවශ්යයි.'
    };
    setDisputes(prev => [...prev, newDispute]);
    
    addTransaction({
      type: 'dispute',
      propertyId: dispute.propertyId,
      status: 'pending'
    });
  };

  const resolveDispute = (disputeId: string, resolution: string) => {
    setDisputes(prev => prev.map(dispute => 
      dispute.id === disputeId 
        ? { ...dispute, status: 'resolved' as const }
        : dispute
    ));
    
    const dispute = disputes.find(d => d.id === disputeId);
    if (dispute) {
      addTransaction({
        type: 'resolution',
        propertyId: dispute.propertyId,
        status: 'confirmed'
      });
    }
  };

  const value = {
    blocks,
    properties,
    transactions,
    disputes,
    addTransaction,
    registerProperty,
    transferProperty,
    fileDispute,
    resolveDispute
  };

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
};