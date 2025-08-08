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
  const [disputes, setDisputes] = useState<Dispute[]>([
    {
      id: "DPT-2023-001",
      propertyId: "PROP-1001",
      complainant: "සුමිත් පෙරේරා",
      defendant: "රවින්ද්‍ර සිල්වා",
      description: "ඉඩමේ බටහිර දෙසට අයිතිවාසිකම් පවසන අතර එම භූමිය මගේ පියාගේ අයිතියක් බව පවසයි",
      status: "pending",
      filedDate: Date.now() - 86400000 * 2, // 2 days ago
      documents: ["අයිතිවාසිකම්_ලියුම.pdf", "සාක්ෂි_1.jpg"],
      nlpAnalysis: "AI විශ්ලේෂණයට අනුව, මෙම ගැටළුවේ 78% සමානත්වයක් පෙර තීන්දු ගැටළු සමග පෙනේ"
    },
    {
      id: "DPT-2023-002",
      propertyId: "PROP-1005",
      complainant: "කමලා ද සිල්වා",
      defendant: "ජයසිංහ රාජපක්ෂ",
      description: "ඉඩමේ මායිම් ගැටළුවක් පවතින අතර අසල්වැසියා මගේ ඉඩමේ කොටසක් අත්පත් කරගෙන ඇත",
      status: "investigating",
      filedDate: Date.now() - 86400000 * 5, // 5 days ago
      documents: ["සීමා_සිතියම.pdf", "සාධාරණ_සාක්ෂි.pdf"],
      nlpAnalysis: "මායිම් ගැටළුවක් ලෙස හඳුනාගෙන ඇති මෙම අවස්ථාවේ 92% සමානත්වයක් පෙනෙන්නේ 2021 දී විසඳූ ගැටළු සමග"
    },
    {
      id: "DPT-2023-003",
      propertyId: "PROP-1012",
      complainant: "නිර්මලා ප්‍රනාන්දු",
      defendant: "සනත් ගුණතිලක",
      description: "ඉඩම විකිණීමේ ගිවිසුම අවලංගු කරන ලෙස ඉල්ලා සිටිමින්, මුදල් ගෙවීම් නොකළ බව පවසයි",
      status: "resolved",
      filedDate: Date.now() - 86400000 * 10, // 10 days ago
      documents: ["ගිවිසුම.pdf", "මුදල්_පිටපත්.pdf"],
      nlpAnalysis: "ගිවිසුම් ගැටළුවක් ලෙස හඳුනාගෙන ඇති මෙය 85% නිවැරදි බව AI ආකල්ප විශ්ලේෂණයෙන් පෙනේ"
    },
    {
      id: "DPT-2023-004",
      propertyId: "PROP-1008",
      complainant: "රන්ජිත් ප්‍රනාන්දු",
      defendant: "මාලිනී ජයවර්ධන",
      description: "ඉඩමේ ගංවතුර බාධකයක් ඉවත් කරන ලෙස ඉල්ලා සිටිමින්, එය ගංගාවේ ස්වාභාවික ගලායාමට බාධා කරන බව පවසයි",
      status: "rejected",
      filedDate: Date.now() - 86400000 * 15, // 15 days ago
      documents: ["භූමි_සම්ප්‍රදාය.pdf", "ඡායාරූප.pdf"]
    },
    {
      id: "DPT-2023-005",
      propertyId: "PROP-1015",
      complainant: "සුනිල් ප්‍රේමරත්න",
      defendant: "අනුර රත්නායක",
      description: "ඉඩමේ තිබෙන පැරණි ගොඩනැගිල්ලක් බිඳදැමීමට අවසර ඉල්ලා සිටිමින්, එය ඓතිහාසික වටිනාකමක් ඇති බව පවසයි",
      status: "pending",
      filedDate: Date.now() - 86400000 * 1, // 1 day ago
      documents: ["ඓතිහාසික_ලියකියවිලි.pdf", "ඡායාරූප_සටහන්.zip"],
      nlpAnalysis: "ඓතිහාසික අයිතිවාසිකම් සම්බන්ධ ගැටළුවක් ලෙස හඳුනාගෙන ඇති මෙය 67% සමානත්වයක් පෙන්වයි"
    }
  ]);

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