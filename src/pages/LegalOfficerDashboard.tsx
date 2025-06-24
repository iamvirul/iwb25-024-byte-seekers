import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Scale, 
  BarChart3, 
  Gavel, 
  BookOpen,
  TrendingUp,
  CheckCircle, 
  Clock, 
  Calendar
} from 'lucide-react';

// Import components
import DashboardHeader from '../components/legal/DashboardHeader';
import StatsSection from '../components/legal/StatsSection';
import TabNavigationSection from '../components/legal/TabNavigationSection';
import DashboardOverviewSection from '../components/legal/DashboardOverviewSection';
import CaseManagementSection from '../components/legal/CaseManagementSection';
import LegalPrecedentsSection from '../components/legal/LegalPrecedentsSection';
import AnalyticsSection from '../components/legal/AnalyticsSection';
import NotificationsModal from '../components/legal/NotificationsModal';
import SettingsModal from '../components/legal/SettingsModal';

const LegalOfficerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Mock data for legal officer specific metrics
  const [cases, setCases] = useState([
    {
      id: 'CASE001',
      disputeId: 'DISP001',
      title: 'ඉඩම් සීමා ගැටළුව - කොළොන්නාව',
      propertyId: 'PROP001',
      complainant: 'සුනිල් සිල්වා',
      defendant: 'කමල් පෙරේරා',
      filedDate: Date.now() - 86400000 * 15,
      status: 'investigating',
      priority: 'high',
      assignedDate: Date.now() - 86400000 * 10,
      hearingDate: Date.now() + 86400000 * 7,
      caseType: 'boundary_dispute',
      evidence: ['survey_report.pdf', 'witness_statement.pdf', 'photos.zip'],
      legalPrecedents: ['CASE_2023_045', 'CASE_2022_123'],
      estimatedResolutionDays: 30,
      notes: 'සර්වේ වාර්තාව සමාලෝචනය කිරීම අවශ්‍යයි'
    },
    {
      id: 'CASE002',
      disputeId: 'DISP002',
      title: 'හිමිකම් ගැටළුව - ගම්පහ',
      propertyId: 'PROP002',
      complainant: 'මාලිනී ජයවර්ධන',
      defendant: 'රාජ් සිංහ',
      filedDate: Date.now() - 86400000 * 8,
      status: 'pending_review',
      priority: 'medium',
      assignedDate: Date.now() - 86400000 * 5,
      caseType: 'ownership_dispute',
      evidence: ['deed_copy.pdf', 'bank_documents.pdf'],
      legalPrecedents: ['CASE_2023_078'],
      estimatedResolutionDays: 45,
      notes: ''
    },
    {
      id: 'CASE003',
      disputeId: 'DISP003',
      title: 'කොන්ත්‍රාක්ටු උල්ලංඝනය - කළුතර',
      propertyId: 'PROP003',
      complainant: 'අනිල් ප්‍රේමසිරි',
      defendant: 'සුමන් ප්‍රේමසිරි',
      filedDate: Date.now() - 86400000 * 3,
      status: 'hearing_scheduled',
      priority: 'urgent',
      assignedDate: Date.now() - 86400000 * 2,
      hearingDate: Date.now() + 86400000 * 3,
      caseType: 'contract_breach',
      evidence: ['contract.pdf', 'payment_records.pdf', 'correspondence.pdf'],
      legalPrecedents: ['CASE_2024_012', 'CASE_2023_156'],
      estimatedResolutionDays: 21,
      notes: 'හදිසි සිද්ධියක් - ඉක්මන් විභාගයක් අවශ්‍යයි'
    }
  ]);

  const [precedents, setPrecedents] = useState([
    {
      id: 'PREC001',
      caseNumber: 'CASE_2023_045',
      title: 'ඉඩම් සීමා නිර්ණය - සර්වේ වාර්තා මත පදනම්ව',
      year: 2023,
      court: 'high_court',
      summary: 'ඉඩම් සීමා ගැටළුවක් සම්බන්ධයෙන් සර්වේ වාර්තාවේ නිරවද්‍යතාව මත පදනම්ව තීරණයක් ගන්නා ලදී. නිල සර්වේකරුවන්ගේ වාර්තා ප්‍රමුඛත්වය ලබයි.',
      relevantSections: ['ඉඩම් ලියාපදිංචි කිරීමේ ආඥාව 19වන වගන්තිය', 'සර්වේ ආඥාව 12වන වගන්තිය'],
      outcome: 'පැමිණිලිකරුට පක්ෂව',
      applicableScenarios: ['ඉඩම් සීමා ගැටළු', 'සර්වේ වාර්තා මත පදනම්ව තීරණ', 'නිල සර්වේකරුවන්ගේ සාක්ෂි'],
      tags: ['ඉඩම් සීමා', 'සර්වේ වාර්තා', 'මහාධිකරණය'],
      citationCount: 15,
      lastUpdated: Date.now() - 86400000 * 30
    },
    {
      id: 'PREC002',
      caseNumber: 'CASE_2023_078',
      title: 'හිමිකම් ගැටළුව - ලේඛන සත්‍යතාව',
      year: 2023,
      court: 'district_court',
      summary: 'ඉඩම් හිමිකම් ගැටළුවක් සම්බන්ධයෙන් ලේඛනවල සත්‍යතාව සහ නීතිමය වලංගුතාව පරීක්ෂා කරන ලදී. මුල් ලේඛන සහ සහතික කළ පිටපත් අතර වෙනස.',
      relevantSections: ['ඉඩම් ලියාපදිංචි කිරීමේ ආඥාව 25වන වගන්තිය', 'සාක්ෂි ආඥාව 67වන වගන්තිය'],
      outcome: 'විත්තිකරුට පක්ෂව',
      applicableScenarios: ['හිමිකම් ගැටළු', 'ලේඛන සත්‍යතාව', 'සහතික කළ පිටපත්'],
      tags: ['හිමිකම්', 'ලේඛන සත්‍යතාව', 'දිස්ත්‍රික් අධිකරණය'],
      citationCount: 8,
      lastUpdated: Date.now() - 86400000 * 45
    },
    {
      id: 'PREC003',
      caseNumber: 'CASE_2024_012',
      title: 'කොන්ත්‍රාක්ටු උල්ලංඝනය - වන්දි ගෙවීම',
      year: 2024,
      court: 'supreme_court',
      summary: 'ඉඩම් විකිණීමේ කොන්ත්‍රාක්ටුවක් උල්ලංඝනය කිරීම සම්බන්ධයෙන් වන්දි ගෙවීමේ ප්‍රමාණය නිර්ණය කිරීම. වෙළඳපල වටිනාකම සහ අලාභය සලකා බැලීම.',
      relevantSections: ['කොන්ත්‍රාක්ටු ආඥාව 73වන වගන්තිය', 'වන්දි ගෙවීමේ ආඥාව 15වන වගන්තිය'],
      outcome: 'පැමිණිලිකරුට වන්දි ගෙවීමට නියම',
      applicableScenarios: ['කොන්ත්‍රාක්ටු උල්ලංඝනය', 'වන්දි ගණනය කිරීම', 'වෙළඳපල වටිනාකම'],
      tags: ['කොන්ත්‍රාක්ටු', 'වන්දි', 'ශ්‍රේෂ්ඨාධිකරණය'],
      citationCount: 23,
      lastUpdated: Date.now() - 86400000 * 15
    }
  ]);

  const monthlyStats = [
    { month: 'ජන', cases: 12, resolved: 8, pending: 4 },
    { month: 'පෙබ', cases: 15, resolved: 11, pending: 4 },
    { month: 'මාර්', cases: 18, resolved: 14, pending: 4 },
    { month: 'අප්‍රේ', cases: 14, resolved: 10, pending: 4 },
    { month: 'මැයි', cases: 20, resolved: 16, pending: 4 },
    { month: 'ජුනි', cases: 16, resolved: 12, pending: 4 }
  ];

  const caseStatusData = [
    { name: 'විමර්ශනය', value: 8, color: '#3B82F6' },
    { name: 'විභාගය නියමිත', value: 5, color: '#8B5CF6' },
    { name: 'නිරාකරණය', value: 12, color: '#10B981' },
    { name: 'සමාලෝචනය', value: 3, color: '#F59E0B' }
  ];

  const resolutionTimeData = [
    { day: 'සඳුදා', avgDays: 28 },
    { day: 'අඟහ', avgDays: 32 },
    { day: 'බදාදා', avgDays: 25 },
    { day: 'බ්‍රහස්', avgDays: 30 },
    { day: 'සිකු', avgDays: 27 },
    { day: 'සෙන', avgDays: 24 },
    { day: 'ඉරිදා', avgDays: 26 }
  ];

  const stats = [
    { 
      label: 'අද සම්පූර්ණ කළ', 
      value: '5', 
      icon: CheckCircle, 
      color: 'from-green-500 to-green-600',
      change: '+2',
      changeType: 'positive'
    },
    { 
      label: 'විමර්ශනය වෙමින්', 
      value: '8', 
      icon: Clock, 
      color: 'from-blue-500 to-blue-600',
      change: '+1',
      changeType: 'positive'
    },
    { 
      label: 'විභාගය නියමිත', 
      value: '5', 
      icon: Calendar, 
      color: 'from-purple-500 to-purple-600',
      change: '+3',
      changeType: 'positive'
    },
    { 
      label: 'සාමාන්‍ය නිරාකරණ කාලය', 
      value: '28 දින', 
      icon: TrendingUp, 
      color: 'from-orange-500 to-orange-600',
      change: '-3 දින',
      changeType: 'positive'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'case_resolved',
      title: 'නීතිමය සිද්ධියක් නිරාකරණය',
      description: 'CASE001 - ඉඩම් සීමා ගැටළුව සාර්ථකව නිරාකරණය කරන ලදී',
      time: '30 මිනිත්තුවකට පෙර',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'hearing_scheduled',
      title: 'විභාගයක් නියම කරන ලදී',
      description: 'CASE003 සඳහා හෙට දින 2:00 PM විභාගය',
      time: '1 පැයකට පෙර',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      id: 3,
      type: 'precedent_added',
      title: 'නව පූර්වාදර්ශයක් එක් කරන ලදී',
      description: 'CASE_2024_089 - හිමිකම් ගැටළු සම්බන්ධයෙන්',
      time: '2 පැයකට පෙර',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'case_assigned',
      title: 'නව සිද්ධියක් පවරන ලදී',
      description: 'CASE004 - කොන්ත්‍රාක්ටු ගැටළුව ඔබට පවරන ලදී',
      time: '3 පැයකට පෙර',
      icon: Gavel,
      color: 'text-orange-600'
    }
  ];

  const timeRangeOptions = [
    { value: '7d', label: 'පසුගිය 7 දින' },
    { value: '30d', label: 'පසුගිය 30 දින' },
    { value: '90d', label: 'පසුගිය 90 දින' }
  ];

  const tabs = [
    { id: 'overview', label: 'සාරාංශය', icon: BarChart3 },
    { id: 'cases', label: 'නීතිමය සිද්ධි', icon: Gavel },
    { id: 'precedents', label: 'නීතිමය පූර්වාදර්ශ', icon: BookOpen },
    { id: 'analytics', label: 'විශ්ලේෂණ', icon: TrendingUp }
  ];

  const handleCaseUpdate = (caseId, updates) => {
    setCases(prev => prev.map(case_ => 
      case_.id === caseId ? { ...case_, ...updates } : case_
    ));
  };

  const handleScheduleHearing = (caseId, date) => {
    setCases(prev => prev.map(case_ => 
      case_.id === caseId 
        ? { ...case_, hearingDate: date, status: 'hearing_scheduled' }
        : case_
    ));
  };

  const handleResolveCase = (caseId, resolution) => {
    setCases(prev => prev.map(case_ => 
      case_.id === caseId 
        ? { ...case_, status: 'resolved', resolution }
        : case_
    ));
  };

  const handleAddPrecedent = (precedentData) => {
    const newPrec = {
      id: 'PREC' + (precedents.length + 1).toString().padStart(3, '0'),
      ...precedentData,
      lastUpdated: Date.now()
    };
    setPrecedents(prev => [...prev, newPrec]);
  };

  const handleUpdatePrecedent = (id, updates) => {
    setPrecedents(prev => prev.map(prec => 
      prec.id === id ? { ...prec, ...updates, lastUpdated: Date.now() } : prec
    ));
  };

  const handleDeletePrecedent = (id) => {
    setPrecedents(prev => prev.filter(prec => prec.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <DashboardHeader
          userName={user?.name}
          onNotificationsClick={() => setShowNotificationsModal(true)}
          onSettingsClick={() => setShowSettingsModal(true)}
        />

        {/* Stats Cards */}
        <StatsSection stats={stats} />

        {/* Tab Navigation */}
        <TabNavigationSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />

        {/* Tab Content */}
        <div className="space-y-8">
          <DashboardOverviewSection
            activeTab={activeTab}
            selectedTimeRange={selectedTimeRange}
            setSelectedTimeRange={setSelectedTimeRange}
            timeRangeOptions={timeRangeOptions}
            monthlyStats={monthlyStats}
            caseStatusData={caseStatusData}
            resolutionTimeData={resolutionTimeData}
            recentActivities={recentActivities}
          />

          <CaseManagementSection
            activeTab={activeTab}
            cases={cases}
            onCaseUpdate={handleCaseUpdate}
            onScheduleHearing={handleScheduleHearing}
            onResolveCase={handleResolveCase}
          />

          <LegalPrecedentsSection
            activeTab={activeTab}
            precedents={precedents}
            onAddPrecedent={handleAddPrecedent}
            onUpdatePrecedent={handleUpdatePrecedent}
            onDeletePrecedent={handleDeletePrecedent}
          />

          <AnalyticsSection activeTab={activeTab} />
        </div>

        {/* Modals */}
        <NotificationsModal 
          isOpen={showNotificationsModal} 
          onClose={() => setShowNotificationsModal(false)} 
        />

        <SettingsModal 
          isOpen={showSettingsModal} 
          onClose={() => setShowSettingsModal(false)} 
        />
      </div>
    </div>
  );
};

export default LegalOfficerDashboard;