import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  Download,
  Scale,
  CheckCircle,
  Calendar,
  Award,
  FileText,
  Gavel,
  X
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Select from '../ui/Select';

interface LegalPrecedent {
  id: string;
  caseNumber: string;
  title: string;
  year: number;
  court: string;
  summary: string;
  relevantSections: string[];
  outcome: string;
  applicableScenarios: string[];
  tags: string[];
  citationCount: number;
  lastUpdated: number;
}

interface LegalPrecedentsProps {
  precedents: any[];
  onAddPrecedent: (precedent: Omit<any, 'id' | 'lastUpdated'>) => void;
  onUpdatePrecedent: (id: string, updates: Partial<any>) => void;
  onDeletePrecedent: (id: string) => void;
}

const LegalPrecedents: React.FC<LegalPrecedentsProps> = ({
  precedents,
  onAddPrecedent,
  onUpdatePrecedent,
  onDeletePrecedent
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourt, setFilterCourt] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [selectedPrecedent, setSelectedPrecedent] = useState<any | null>(null);
  const [showPrecedentModal, setShowPrecedentModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    caseNumber: '',
    title: '',
    year: new Date().getFullYear(),
    court: '',
    summary: '',
    relevantSections: [''],
    outcome: '',
    applicableScenarios: [''],
    tags: [''],
    citationCount: 0
  });

  const courtOptions = [
    { value: 'all', label: 'සියලු අධිකරණ' },
    { value: 'SUPREME_COURT', label: 'ශ්‍රේෂ්ඨාධිකරණය' },
    { value: 'APPELLATE_COURT', label: 'අභියාචනාධිකරණය' },
    { value: 'HIGH_COURT', label: 'මහාධිකරණය' },
    { value: 'DISTRICT_COURT', label: 'දිස්ත්‍රික් අධිකරණය' }
  ];

  const yearOptions = [
    { value: 'all', label: 'සියලු වර්ෂ' },
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2014', label: '2014' },
    { value: '2013', label: '2013' },
    { value: '2012', label: '2012' },
    { value: '2011', label: '2011' },
    { value: '2010', label: '2010' },
  ];

  const filteredPrecedents = precedents.filter(precedent => {
    const matchesSearch =
      precedent.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      precedent.disspute.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      precedent.summary.toLowerCase().includes(searchTerm.toLowerCase())
      ;

    const matchesCourt = filterCourt === 'all' || precedent.court === filterCourt;
    const matchesYear = filterYear === 'all' || precedent.year.year.toString() === filterYear;

    return matchesSearch && matchesCourt && matchesYear;
  });

  const getCourtLabel = (court: string) => {
    switch (court) {
      case 'SUPREME_COURT':
        return 'ශ්‍රේෂ්ඨාධිකරණය';
      case 'APPELLATE_COURT':
        return 'අභියාචනාධිකරණය';
      case 'HIGH_COURT':
        return 'මහාධිකරණය';
      case 'DISTRICT_COURT':
        return 'දිස්ත්‍රික් අධිකරණය';
      default:
        return court;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('si-LK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAddPrecedent = (e: React.FormEvent) => {
    e.preventDefault();

    const newPrecedent = {
      ...formData,
      relevantSections: formData.relevantSections.filter(section => section.trim() !== ''),
      applicableScenarios: formData.applicableScenarios.filter(scenario => scenario.trim() !== ''),
      tags: formData.tags.filter(tag => tag.trim() !== '')
    };

    onAddPrecedent(newPrecedent);
    setFormData({
      caseNumber: '',
      title: '',
      year: new Date().getFullYear(),
      court: '',
      summary: '',
      relevantSections: [''],
      outcome: '',
      applicableScenarios: [''],
      tags: [''],
      citationCount: 0
    });
    setShowAddModal(false);
    alert('නීතිමය පූර්වාදර්ශය සාර්ථකව එක් කරන ලදී');
  };

  const addArrayField = (field: 'relevantSections' | 'applicableScenarios' | 'tags') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const updateArrayField = (field: 'relevantSections' | 'applicableScenarios' | 'tags', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const removeArrayField = (field: 'relevantSections' | 'applicableScenarios' | 'tags', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="නීතිමය පූර්වාදර්ශ සොයන්න..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex gap-3">
            <div className="w-48">
              <Select
                value={filterCourt}
                onChange={setFilterCourt}
                options={courtOptions}
              />
            </div>
            <div className="w-32">
              <Select
                value={filterYear}
                onChange={setFilterYear}
                options={yearOptions}
              />
            </div>
            <Button icon={Plus} onClick={() => setShowAddModal(true)}>
              නව පූර්වාදර්ශයක්
            </Button>
          </div>
        </div>
      </Card>

      {/* Precedents List */}
      <div className="space-y-6">
        {filteredPrecedents.map((precedent, index) => (
          <motion.div
            key={precedent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card hover className="border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{precedent.headline}</h4>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                      {precedent.dispute.caseId}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span className="font-medium">{precedent.year.year}</span>
                    <span>•</span>
                    <span>{getCourtLabel(precedent.court)}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{precedent.summary}</p>

                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Eye}
                    onClick={() => {
                      setSelectedPrecedent(precedent);
                      setShowPrecedentModal(true);
                    }}
                  >
                    බලන්න
                  </Button>
                  <Button variant="outline" size="sm" icon={Edit}>
                    සංස්කරණය
                  </Button>
                  <Button variant="outline" size="sm" icon={Download}>
                    බාගන්න
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">අදාළ නීති වගන්ති:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {precedent.legalclauses.slice(0, 3).map((section, sectionIndex) => (
                      <li key={sectionIndex} className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                        {section.legalClause}
                      </li>
                    ))}
                    {precedent.legalclauses.length > 3 && (
                      <li className="text-xs text-gray-500">
                        +{precedent.legalclauses.length - 3} තවත්
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center">
                  <Gavel className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-800">
                    තීරණය: {precedent.decision}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPrecedents.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">නීතිමය පූර්වාදර්ශ නොමැත</h3>
            <p className="text-gray-600 mb-6">
              ඔබේ සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න
            </p>
            <Button icon={Plus} onClick={() => setShowAddModal(true)}>
              නව පූර්වාදර්ශයක් එක් කරන්න
            </Button>
          </div>
        </Card>
      )}

      {/* Add Precedent Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">නව නීතිමය පූර්වාදර්ශයක් එක් කරන්න</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleAddPrecedent} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    සිද්ධි අංකය
                  </label>
                  <input
                    type="text"
                    value={formData.caseNumber}
                    onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Case_2024_001"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    වර්ෂය
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="1900"
                    max="2030"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    සිරස්තලය
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="නීතිමය සිද්ධියේ සිරස්තලය"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    අධිකරණය
                  </label>
                  <select
                    value={formData.court}
                    onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">අධිකරණය තෝරන්න</option>
                    <option value="supreme_court">ශ්‍රේෂ්ඨාධිකරණය</option>
                    <option value="appeal_court">අභියාචනාධිකරණය</option>
                    <option value="high_court">මහාධිකරණය</option>
                    <option value="district_court">දිස්ත්‍රික් අධිකරණය</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    තීරණය
                  </label>
                  <input
                    type="text"
                    value={formData.outcome}
                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="පැමිණිලිකරුට පක්ෂව"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    සාරාංශය
                  </label>
                  <textarea
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={4}
                    placeholder="නීතිමය සිද්ධියේ සාරාංශය"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    අදාළ නීති වගන්ති
                  </label>
                  {formData.relevantSections.map((section, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={section}
                        onChange={(e) => updateArrayField('relevantSections', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="නීති වගන්තිය"
                      />
                      {formData.relevantSections.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayField('relevantSections', index)}
                        >
                          ඉවත් කරන්න
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayField('relevantSections')}
                  >
                    + එක් කරන්න
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    අදාළ අවස්ථා
                  </label>
                  {formData.applicableScenarios.map((scenario, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={scenario}
                        onChange={(e) => updateArrayField('applicableScenarios', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="අදාළ අවස්ථාව"
                      />
                      {formData.applicableScenarios.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayField('applicableScenarios', index)}
                        >
                          ඉවත් කරන්න
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayField('applicableScenarios')}
                  >
                    + එක් කරන්න
                  </Button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" type="button" onClick={() => setShowAddModal(false)}>
                  අවලංගු කරන්න
                </Button>
                <Button type="submit" icon={Plus}>
                  පූර්වාදර්ශය එක් කරන්න
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Precedent Details Modal */}
      {showPrecedentModal && selectedPrecedent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedPrecedent.headline}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedPrecedent.dispute.caseId}</p>
              </div>
              <button
                onClick={() => setShowPrecedentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">සිද්ධි තොරතුරු</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">සිද්ධි අංකය:</span>
                        <span className="font-medium">{selectedPrecedent.dispute.caseId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">වර්ෂය:</span>
                        <span>{selectedPrecedent.year.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">අධිකරණය:</span>
                        <span>{getCourtLabel(selectedPrecedent.court)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">සාරාංශය</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedPrecedent.summary}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">තීරණය</h4>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <Gavel className="w-5 h-5 text-green-600 mr-3" />
                        <span className="font-medium text-green-800">{selectedPrecedent.decision}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">අදාළ නීති වගන්ති</h4>
                    <div className="space-y-2">
                      {selectedPrecedent.legalclauses.map((section, index) => (
                        <div key={index} className="flex items-start text-sm p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                          <span>{section.legalClause}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={() => setShowPrecedentModal(false)}>
                  වසන්න
                </Button>
                <Button variant="outline" icon={Download}>
                  බාගන්න
                </Button>
                <Button icon={Edit}>
                  සංස්කරණය
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LegalPrecedents;