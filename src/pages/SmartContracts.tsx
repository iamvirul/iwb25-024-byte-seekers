import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Play,
  CheckCircle,
  Clock,
  AlertCircle,
  Code,
  Hash,
  Calendar,
  User,
  Eye,
  Download
} from 'lucide-react';

const SmartContracts = () => {
  const { user } = useAuth();
  const [contracts, setContracts] = useState([
    {
      id: 'SC001',
      name: 'ඉඩම් විකිණීමේ කොන්ත්‍රාක්ටුව',
      type: 'sale',
      propertyId: 'PROP001',
      parties: ['සුනිල් සිල්වා', 'කමල් පෙරේරා'],
      amount: 2500000,
      status: 'active',
      createdDate: Date.now() - 86400000 * 10,
      executedDate: null,
      conditions: [
        'ගැනුම්කරු විසින් මුළු මුදල ගෙවීම',
        'ඉඩම් ලේඛන සත්‍යාපනය',
        'නීතිමය පරීක්ෂණ සම්පූර්ණ කිරීම'
      ],
      blockchainHash: '0xabc123def456'
    },
    {
      id: 'SC002',
      name: 'ඉඩම් කුලියට දීමේ ගිණුම',
      type: 'lease',
      propertyId: 'PROP002',
      parties: ['මාලිනී ජයවර්ධන', 'රාජ් සිංහ'],
      amount: 25000,
      status: 'executed',
      createdDate: Date.now() - 86400000 * 30,
      executedDate: Date.now() - 86400000 * 25,
      conditions: [
        'මාසික කුලිය නියමිත දිනට ගෙවීම',
        'ඉඩම නිසි ලෙස භාවිතා කිරීම',
        '6 මාස කාලයක් සඳහා වලංගු'
      ],
      blockchainHash: '0xdef456abc123'
    }
  ]);

  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [showNewContract, setShowNewContract] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'sale',
    propertyId: '',
    parties: ['', ''],
    amount: '',
    conditions: ['']
  });

  const contractTemplates = {
    sale: {
      name: 'ඉඩම් විකිණීමේ කොන්ත්‍රාක්ටුව',
      conditions: [
        'ගැනුම්කරු විසින් මුළු මුදල ගෙවීම',
        'ඉඩම් ලේඛන සත්‍යාපනය',
        'නීතිමය පරීක්ෂණ සම්පූර්ණ කිරීම',
        'ඉඩම් මාරු කිරීමේ ලේඛන සම්පූර්ණ කිරීම'
      ]
    },
    lease: {
      name: 'ඉඩම් කුලියට දීමේ ගිණුම',
      conditions: [
        'මාසික කුලිය නියමිත දිනට ගෙවීම',
        'ඉඩම නිසි ලෙස භාවිතා කිරීම',
        'කුලී කාලය අවසානයේ ඉඩම ආපසු ලබා දීම'
      ]
    },
    mortgage: {
      name: 'ඉඩම් උකස් කොන්ත්‍රාක්ටුව',
      conditions: [
        'මාසික වාරික නියමිත දිනට ගෙවීම',
        'ඉඩම් ලේඛන බැංකුවේ තැන්පත් කිරීම',
        'වාරික නොගෙවීමේදී ඉඩම අලෙවි කිරීමේ අයිතිය'
      ]
    }
  };

  const handleCreateContract = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newContract = {
      id: 'SC' + (contracts.length + 1).toString().padStart(3, '0'),
      name: formData.name,
      type: formData.type,
      propertyId: formData.propertyId,
      parties: formData.parties.filter(party => party.trim() !== ''),
      amount: parseFloat(formData.amount),
      status: 'active',
      createdDate: Date.now(),
      executedDate: null,
      conditions: formData.conditions.filter(condition => condition.trim() !== ''),
      blockchainHash: '0x' + Math.random().toString(16).substr(2, 12)
    };

    setContracts([...contracts, newContract]);
    setFormData({
      name: '',
      type: 'sale',
      propertyId: '',
      parties: ['', ''],
      amount: '',
      conditions: ['']
    });
    setShowNewContract(false);
    alert('ස්මාර්ට් කොන්ත්‍රාක්ටුව සාර්ථකව සාදන ලදී');
  };

  const executeContract = (contractId: string) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId 
        ? { ...contract, status: 'executed', executedDate: Date.now() }
        : contract
    ));
    alert('ස්මාර්ට් කොන්ත්‍රාක්ටුව සාර්ථකව ක්‍රියාත්මක කරන ලදී');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            සක්‍රීය
          </span>
        );
      case 'executed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            ක්‍රියාත්මක
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            කල් ඉකුත්
          </span>
        );
      default:
        return null;
    }
  };

  const getContractTypeLabel = (type: string) => {
    switch (type) {
      case 'sale':
        return 'විකිණීම';
      case 'lease':
        return 'කුලියට දීම';
      case 'mortgage':
        return 'උකස්';
      default:
        return type;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('si-LK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('si-LK', {
      style: 'currency',
      currency: 'LKR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">ස්මාර්ට් කොන්ත්‍රාක්ට්</h1>
              <p className="text-gray-600">ස්වයංක්‍රීය ඉඩම් ගනුදෙනු කළමනාකරණය</p>
            </div>
            <button
              onClick={() => setShowNewContract(true)}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              නව කොන්ත්‍රාක්ටුවක්
            </button>
          </div>

          {/* New Contract Form */}
          {showNewContract && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">නව ස්මාර්ට් කොන්ත්‍රාක්ටුවක් සාදන්න</h2>
              
              <form onSubmit={handleCreateContract} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                      කොන්ත්‍රාක්ටු වර්ගය
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => {
                        const selectedType = e.target.value as keyof typeof contractTemplates;
                        setFormData({
                          ...formData,
                          type: selectedType,
                          name: contractTemplates[selectedType].name,
                          conditions: [...contractTemplates[selectedType].conditions]
                        });
                      }}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="sale">ඉඩම් විකිණීම</option>
                      <option value="lease">ඉඩම් කුලියට දීම</option>
                      <option value="mortgage">ඉඩම් උකස්</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-2">
                      ඉඩම් ID
                    </label>
                    <input
                      type="text"
                      id="propertyId"
                      value={formData.propertyId}
                      onChange={(e) => setFormData({...formData, propertyId: e.target.value})}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="PROP001"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    කොන්ත්‍රාක්ටු නම
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    පාර්ශ්වයන්
                  </label>
                  {formData.parties.map((party, index) => (
                    <input
                      key={index}
                      type="text"
                      value={party}
                      onChange={(e) => {
                        const newParties = [...formData.parties];
                        newParties[index] = e.target.value;
                        setFormData({...formData, parties: newParties});
                      }}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                      placeholder={`පාර්ශ්වය ${index + 1}`}
                      required
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, parties: [...formData.parties, '']})}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    + පාර්ශ්වයක් එක් කරන්න
                  </button>
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    මුදල (රුපියල්)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="2500000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    කොන්ත්‍රාක්ටු කොන්දේසි
                  </label>
                  {formData.conditions.map((condition, index) => (
                    <textarea
                      key={index}
                      value={condition}
                      onChange={(e) => {
                        const newConditions = [...formData.conditions];
                        newConditions[index] = e.target.value;
                        setFormData({...formData, conditions: newConditions});
                      }}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                      rows={2}
                      placeholder={`කොන්දේසිය ${index + 1}`}
                      required
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, conditions: [...formData.conditions, '']})}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    + කොන්දේසියක් එක් කරන්න
                  </button>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowNewContract(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    අවලංගු කරන්න
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    කොන්ත්‍රාක්ටුව සාදන්න
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contracts List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                ස්මාර්ට් කොන්ත්‍රාක්ට් ({contracts.length})
              </h2>
              
              {contracts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <Code className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">කොන්ත්‍රාක්ට් නැත</h3>
                  <p className="text-gray-600">තවම ස්මාර්ට් කොන්ත්‍රාක්ට් සාදා නැත</p>
                </div>
              ) : (
                contracts.map((contract) => (
                  <motion.div
                    key={contract.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => setSelectedContract(contract)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{contract.name}</h3>
                          {getStatusBadge(contract.status)}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            ඉඩම්: {contract.propertyId}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            පාර්ශ්වයන්: {contract.parties.join(', ')}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(contract.createdDate)}
                          </div>
                          <div className="text-lg font-semibold text-purple-600">
                            {formatCurrency(contract.amount)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {contract.status === 'active' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              executeContract(contract.id);
                            }}
                            className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            ක්‍රියාත්මක
                          </button>
                        )}
                        <button className="inline-flex items-center px-3 py-1 border border-purple-300 text-purple-700 rounded-md hover:bg-purple-50 transition-colors">
                          <Eye className="w-4 h-4 mr-1" />
                          විස්තර
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Contract Details */}
            <div className="lg:sticky lg:top-8">
              {selectedContract ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">කොන්ත්‍රාක්ටු විස්තර</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{selectedContract.name}</h3>
                      {getStatusBadge(selectedContract.status)}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">කොන්ත්‍රාක්ටු ID:</span>
                        <p className="font-medium mt-1">{selectedContract.id}</p>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">වර්ගය:</span>
                        <p className="font-medium mt-1">{getContractTypeLabel(selectedContract.type)}</p>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">ඉඩම් ID:</span>
                        <p className="font-medium mt-1">{selectedContract.propertyId}</p>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">මුදල:</span>
                        <p className="font-medium mt-1 text-lg text-purple-600">
                          {formatCurrency(selectedContract.amount)}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">සාදන ලද දිනය:</span>
                        <div className="flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {formatDate(selectedContract.createdDate)}
                        </div>
                      </div>

                      {selectedContract.executedDate && (
                        <div>
                          <span className="text-sm text-gray-600">ක්‍රියාත්මක කළ දිනය:</span>
                          <div className="flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {formatDate(selectedContract.executedDate)}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">පාර්ශ්වයන්</h4>
                      <div className="space-y-1">
                        {selectedContract.parties.map((party: string, index: number) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <User className="w-4 h-4 mr-2" />
                            {party}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">කොන්ත්‍රාක්ටු කොන්දේසි</h4>
                      <div className="space-y-2">
                        {selectedContract.conditions.map((condition: string, index: number) => (
                          <div key={index} className="flex items-start text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                            {condition}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Hash className="w-4 h-4 mr-2" />
                        බ්ලොක්චේන් හැෂ්
                      </h4>
                      <p className="text-xs font-mono bg-white p-2 rounded break-all">
                        {selectedContract.blockchainHash}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      {selectedContract.status === 'active' && (
                        <button
                          onClick={() => executeContract(selectedContract.id)}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          ක්‍රියාත්මක කරන්න
                        </button>
                      )}
                      <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        බාගන්න
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <Code className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">කොන්ත්‍රාක්ටුවක් තෝරන්න</h3>
                  <p className="text-gray-600">විස්තර බැලීමට කොන්ත්‍රාක්ටුවක් මත ක්ලික් කරන්න</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SmartContracts;