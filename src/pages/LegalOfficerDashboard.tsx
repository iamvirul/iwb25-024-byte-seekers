import React, { useEffect, useState } from 'react';
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
  const [cases, setCases] = useState([]);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [precedents, setPrecedents] = useState([]);
  const [statsData, setStatsData] = useState({
    pending: 0,
    rejected: 0,
    resolved: 0,
    legalPrecedents: 0
  });

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


  useEffect(() => {
    const userId = localStorage.getItem("userSessionId");
    const socket = new WebSocket(`ws://127.0.0.1:8075/proxy/${userId}`);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received message:', data);
      setCases(data.content?.disputes || []);
      setPrecedents(data.content?.precedents || []);

      if (data.content?.stats) {
        setStatsData(data.content.stats);
      } else {
        const pending = data.content?.stats?.filter(c => c.status === 'pending').length || 0;
        const rejected = data.content?.stats?.filter(c => c.status === 'rejected').length || 0;
        const resolved = data.content?.stats?.filter(c => c.status === 'resolved').length || 0;
        const legalPrecedents = data.content?.stats?.legalPrecedents.length || 0;

        setStatsData({
          pending,
          rejected,
          resolved,
          legalPrecedents
        });
      }

      if (data.event == "Precedent Created") {
        const newPrecedent = {
          ...data.message.precedent,
          id: data.message.precedent.id,
          legalclauses: data.message.clauses,
          dispute: data.message.dispute
        };
        console.log(newPrecedent);
        setPrecedents(prev => [...prev, newPrecedent]);
        setStatsData(prev => ({
          ...prev,
          legalPrecedents: prev.legalPrecedents + 1
        }));
        return;
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  const stats = [
    {
      label: 'පොරොත්තුවෙන් සිටින',
      value: statsData.pending.toString(),
      icon: Clock,
      color: 'from-blue-500 to-blue-600',
      change: '+0',
      changeType: 'neutral'
    },
    {
      label: 'ප්‍රතික්ෂේප කළ',
      value: statsData.rejected.toString(),
      icon: Gavel,
      color: 'from-red-500 to-red-600',
      change: '+0',
      changeType: 'neutral'
    },
    {
      label: 'නිරාකරණය කළ',
      value: statsData.resolved.toString(),
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      change: '+0',
      changeType: 'neutral'
    },
    {
      label: 'නීතිමය පූර්වාදර්ශ',
      value: statsData.legalPrecedents.toString(),
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      change: '+0',
      changeType: 'neutral'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <DashboardHeader
          userName={user?.name}
          type='legal_officer'
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