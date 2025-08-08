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
  Calendar,
  FileText,
  User,
  AlertCircle
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
import toast from 'react-hot-toast';

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  time: string;
  icon: React.ComponentType<any>;
  color: string;
  timestamp: number;
}

const LegalOfficerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [cases, setCases] = useState([]);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [precedents, setPrecedents] = useState([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [statsData, setStatsData] = useState({
    pending: 0,
    all: 0,
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

  const addActivity = (activity: Omit<RecentActivity, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timestamp = now.getTime();
    
    // Format time as "X minutes/hours ago"
    const formatTime = () => {
      const seconds = Math.floor((Date.now() - timestamp) / 1000);
      if (seconds < 60) return 'මීට මෑතක';
      if (seconds < 3600) return `${Math.floor(seconds / 60)} මිනිත්තුවකට පෙර`;
      if (seconds < 86400) return `${Math.floor(seconds / 3600)} පැයකට පෙර`;
      return `${Math.floor(seconds / 86400)} දිනකට පෙර`;
    };

    setRecentActivities(prev => [
      {
        ...activity,
        id: `activity-${timestamp}`,
        timestamp,
        time: formatTime()
      },
      ...prev.slice(0, 9) // Keep only the last 10 activities
    ]);
  };

  useEffect(() => {
    let socket: WebSocket;
    let initialDataLoaded = false;
    const userId = localStorage.getItem("userSessionId");
    
    const connect = () => {
      socket = new WebSocket(`ws://127.0.0.1:8075/proxy/${userId}`);

      socket.onopen = () => {
        console.log('WebSocket connected');
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received message:', data);

        // Handle different event types properly
        switch (data.event) {
          case 'Status Updated':
            setCases(prev => {
              return prev.map(case_ =>
                case_.id === data.message.id
                  ? { ...case_, status: 'RESOLVED' }
                  : case_
              );
            });
            setStatsData(prev => ({
              ...prev,
              resolved: prev.resolved + 1,
              pending: prev.pending - 1
            }));
            
            // Add activity for resolved case
            addActivity({
              type: 'case_resolved',
              title: 'නීතිමය සිද්ධියක් නිරාකරණය',
              description: `${data.message.caseId} - සිද්ධිය සාර්ථකව නිරාකරණය කරන ලදී`,
              icon: CheckCircle,
              color: 'text-green-600'
            });
            break;

          case 'Precedent Created':
            const newPrecedent = {
              ...data.message.precedent,
              id: data.message.precedent.id,
              legalclauses: data.message.clauses,
              dispute: data.message.dispute
            };
            setPrecedents(prev => [...prev, newPrecedent]);
            setStatsData(prev => ({
              ...prev,
              legalPrecedents: prev.legalPrecedents + 1
            }));
            
            // Add activity for new precedent
            addActivity({
              type: 'precedent_added',
              title: 'නව පූර්වාදර්ශයක් එක් කරන ලදී',
              description: `${data.message.precedent.headline} - ${data.message.precedent.court}`,
              icon: BookOpen,
              color: 'text-blue-600'
            });
            break;

          case "Initial":
            setCases(data.message?.content?.disputes || []);
            setPrecedents(data.message?.content?.precedents || []);
            // Update stats if available
            if (data.message?.content?.stats) {
              setStatsData(data.message?.content.stats);
            }
            
            // Add initial activities if needed
            if (!initialDataLoaded) {
              const initialActivities = data.message?.content?.disputes
                ?.slice(0, 4)
                .map((dispute: any, index: number) => ({
                  type: 'case_created',
                  title: 'නව සිද්ධියක් ලියාපදිංචි කරන ලදී',
                  description: `${dispute.caseId} - ${dispute.disputesDetails.substring(0, 30)}...`,
                  icon: FileText,
                  color: 'text-purple-600',
                  timestamp: Date.now() - (index * 1000 * 60 * 60) // Stagger timestamps
                })) || [];
              
              setRecentActivities(initialActivities);
              initialDataLoaded = true;
            }
            break;

          case 'Estimate Time Updated':
            setCases(prev => prev.map(case_ =>
              case_.id === data.message.id
                ? { ...case_, estimateTime: data.message.estimateTime }
                : case_
            ));
            
            // Add activity for estimate update
            addActivity({
              type: 'estimate_updated',
              title: 'සිද්ධියක් සඳහා ඇස්තමේන්තු කාලය යාවත්කාලීන කරන ලදී',
              description: `${data.message.caseId} - ${data.message.estimateTime}`,
              icon: Clock,
              color: 'text-orange-600'
            });
            break;

          case "Dispute Created":
            setCases(prev => [...prev, data.message.dispute]);
            setStatsData(prev => ({
              ...prev,
              all: prev.all + 1,
              pending: prev.pending + 1
            }));
            
            // Add activity for new dispute
            addActivity({
              type: 'case_created',
              title: 'නව සිද්ධියක් ලියාපදිංචි කරන ලදී',
              description: `${data.message.dispute.caseId} - ${data.message.dispute.disputesDetails.substring(0, 30)}...`,
              icon: FileText,
              color: 'text-purple-600'
            });
            break;

          case "Comment Added":
            // Add activity for new comment
            addActivity({
              type: 'comment_added',
              title: 'සිද්ධියකට අදහසක් එක් කරන ලදී',
              description: `${data.message.caseId} - ${data.message.comment.substring(0, 30)}...`,
              icon: User,
              color: 'text-indigo-600'
            });
            break;

          case "Document Added":
            // Add activity for new document
            addActivity({
              type: 'document_added',
              title: 'නව ලේඛනයක් උඩුගත කරන ලදී',
              description: `${data.message.caseId} - ${data.message.docPath.split('/').pop()}`,
              icon: FileText,
              color: 'text-blue-600'
            });
            break;

          case "Error":
            // Add activity for error
            addActivity({
              type: 'error_occurred',
              title: 'දෝෂයක් ඇතිවිය',
              description: data.message.error,
              icon: AlertCircle,
              color: 'text-red-600'
            });
            break;

          default:
            console.log('Unhandled event type:', data.event);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        addActivity({
          type: 'connection_error',
          title: 'සම්බන්ධතා දෝෂයක්',
          description: 'WebSocket සම්බන්ධතාවය අහිමි විය',
          icon: AlertCircle,
          color: 'text-red-600'
        });
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
        addActivity({
          type: 'connection_closed',
          title: 'සම්බන්ධතාවය වසා ඇත',
          description: 'WebSocket සම්බන්ධතාවය නැවත ස්ථාපිත කිරීමට උත්සාහ කරයි',
          icon: AlertCircle,
          color: 'text-yellow-600'
        });
        
        // Try to reconnect after 5 seconds
        setTimeout(connect, 5000);
      };
    }

    connect();
    return () => socket?.close();
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
      label: 'සියලු ගැටලු',
      value: statsData.all.toString(),
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
          onSettingsClick={() => setShowNotificationsModal(true)}
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
            statsData={statsData}
          />

          <CaseManagementSection
            activeTab={activeTab}
            cases={cases}
            onCaseUpdate={handleCaseUpdate}
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