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
import toast from 'react-hot-toast';

interface LegalPrecedentsProps {
  precedents: any[];
}

const LegalPrecedents: React.FC<LegalPrecedentsProps> = ({
  precedents
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourt, setFilterCourt] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [selectedPrecedent, setSelectedPrecedent] = useState<any | null>(null);
  const [showPrecedentModal, setShowPrecedentModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    caseId: '',
    year: new Date().getFullYear().toString(),
    headline: '',
    court: '',
    decision: '',
    summary: '',
    legalClauses: ['']
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.caseId.trim()) {
      newErrors.caseId = 'සිද්ධි අංකය අවශ්‍යයි';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'වර්ෂය අවශ්‍යයි';
    } else if (isNaN(Number(formData.year)) || Number(formData.year) < 1900 || Number(formData.year) > 2100) {
      newErrors.year = 'වලංගු වර්ෂයක් ඇතුළත් කරන්න';
    }

    if (!formData.headline.trim()) {
      newErrors.headline = 'සිරස්තලය අවශ්‍යයි';
    } else if (formData.headline.length > 255) {
      newErrors.headline = 'සිරස්තලය දිග වැඩිය (උපරිම 255 අක්ෂර)';
    }

    if (!formData.court) {
      newErrors.court = 'අධිකරණය තෝරන්න';
    }

    if (!formData.decision.trim()) {
      newErrors.decision = 'තීරණය අවශ්‍යයි';
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'සාරාංශය අවශ්‍යයි';
    }

    const validClauses = formData.legalClauses.filter(clause => clause.trim() !== '');
    if (validClauses.length === 0) {
      newErrors.legalClauses = 'අවම වශයෙන් එක් නීති වගන්තියක්වත් ඇතුළත් කරන්න';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPrecedent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      legalClauses: formData.legalClauses.filter(clause => clause.trim() !== '')
    };
    const token = localStorage.getItem("token")

    fetch('/api/legal_officer/precedents/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setFormData({
            caseId: '',
            year: new Date().getFullYear().toString(),
            headline: '',
            court: '',
            decision: '',
            summary: '',
            legalClauses: ['']
          });

          setShowAddModal(false);
          toast.success("නීතිමය පූර්වාදර්ශය සාර්ථකව එක් කරන ලදී")
        } else {
          toast.error(data.content)
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('පූර්වාදර්ශය එක් කිරීමට අසමත් විය: ' + (error instanceof Error ? error.message : 'නොදන්නා දෝෂයක්'));
      }).finally(() => {
        setIsSubmitting(false);
      });
    }


    const addLegalClause = () => {
      setFormData({
        ...formData,
        legalClauses: [...formData.legalClauses, '']
      });
    };

    const updateLegalClause = (index: number, value: string) => {
      const newClauses = [...formData.legalClauses];
      newClauses[index] = value;
      setFormData({
        ...formData,
        legalClauses: newClauses
      });
    };

    const removeLegalClause = (index: number) => {
      const newClauses = formData.legalClauses.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        legalClauses: newClauses
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
                    {/* <Button variant="outline" size="sm" icon={Edit}>
                      සංස්කරණය
                    </Button>
                    <Button variant="outline" size="sm" icon={Download}>
                      බාගන්න
                    </Button> */}
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
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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

              <form onSubmit={handleAddPrecedent} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Case ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      සිද්ධි අංකය <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.caseId}
                      onChange={(e) => setFormData({ ...formData, caseId: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.caseId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="CASE-1588890273"
                    />
                    {errors.caseId && <p className="mt-1 text-sm text-red-600">{errors.caseId}</p>}
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      වර්ෂය <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.year ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      min="1900"
                      max="2100"
                    />
                    {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                  </div>

                  {/* Headline */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      සිරස්තලය <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.headline}
                      onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.headline ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="නීතිමය සිද්ධියේ සිරස්තලය"
                    />
                    {errors.headline && <p className="mt-1 text-sm text-red-600">{errors.headline}</p>}
                  </div>

                  {/* Court */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      අධිකරණය <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.court}
                      onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.court ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    >
                      <option value="">අධිකරණය තෝරන්න</option>
                      <option value="SUPREME_COURT">ශ්‍රේෂ්ඨාධිකරණය</option>
                      <option value="APPELLATE_COURT">අභියාචනාධිකරණය</option>
                      <option value="HIGH_COURT">මහාධිකරණය</option>
                      <option value="DISTRICT_COURT">දිස්ත්‍රික් අධිකරණය</option>
                    </select>
                    {errors.court && <p className="mt-1 text-sm text-red-600">{errors.court}</p>}
                  </div>

                  {/* Decision */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      තීරණය <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.decision}
                      onChange={(e) => setFormData({ ...formData, decision: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.decision ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="පැමිණිලිකරුට පක්ෂව"
                    />
                    {errors.decision && <p className="mt-1 text-sm text-red-600">{errors.decision}</p>}
                  </div>

                  {/* Summary */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      සාරාංශය <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      className={`w-full px-4 py-3 border ${errors.summary ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      rows={4}
                      placeholder="නීතිමය සිද්ධියේ සාරාංශය"
                    />
                    {errors.summary && <p className="mt-1 text-sm text-red-600">{errors.summary}</p>}
                  </div>

                  {/* Legal Clauses */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      අදාළ නීති වගන්ති <span className="text-red-500">*</span>
                    </label>
                    {formData.legalClauses.map((clause, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={clause}
                          onChange={(e) => updateLegalClause(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="නීති වගන්තිය"
                        />
                        {formData.legalClauses.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeLegalClause(index)}
                          >
                            ඉවත් කරන්න
                          </Button>
                        )}
                      </div>
                    ))}
                    {errors.legalClauses && <p className="mt-1 text-sm text-red-600">{errors.legalClauses}</p>}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addLegalClause}
                      className="mt-2"
                    >
                      + නීති වගන්තිය එක් කරන්න
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    disabled={isSubmitting}
                  >
                    අවලංගු කරන්න
                  </Button>
                  <Button
                    type="submit"
                    icon={Plus}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'සුරකිමින්...' : 'පූර්වාදර්ශය එක් කරන්න'}
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
                  {/* <Button icon={Edit}>
                    සංස්කරණය
                  </Button> */}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    );
  };

  export default LegalPrecedents;