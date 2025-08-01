import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  MapPin,
  BarChart3,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  TrendingUp,
  Settings,
  Bell
} from 'lucide-react';

// Import components
import DashboardHeader from '../components/legal/DashboardHeader';
import StatsSection from '../components/legal/StatsSection';
import TabNavigationSection from '../components/legal/TabNavigationSection';
import DashboardOverviewSection from '../components/landofficer/DashboardOverviewSection';
import RegistrationQueueSection from '../components/landofficer/RegistrationQueueSection';
import DisputeManagementSection from '../components/landofficer/DisputeManagementSection';
import VerificationPanelSection from '../components/landofficer/VerificationPanelSection';
import AnalyticsSection from '../components/landofficer/AnalyticsSection';
import NotificationsModal from '../components/legal/NotificationsModal';
import SettingsModal from '../components/legal/SettingsModal';

const LandOfficerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Mock data for land officer specific metrics
  const [registrations, setRegistrations] = useState([
    {
      id: 'REG001',
      propertyTitle: 'කොළොන්නාව ඉඩම',
      applicant: 'සුනිල් සිල්වා',
      submittedDate: Date.now() - 86400000 * 2,
      status: 'pending_verification',
      area: 2.5,
      location: 'කොළොන්නාව, කොළඹ',
      priority: 'high',
      documents: ['deed.pdf', 'survey.pdf']
    },
    {
      id: 'REG002',
      propertyTitle: 'ගම්පහ වත්ත',
      applicant: 'මාලිනී ජයවර්ධන',
      submittedDate: Date.now() - 86400000 * 5,
      status: 'document_review',
      area: 1.8,
      location: 'ගම්පහ',
      priority: 'medium',
      documents: ['deed.pdf', 'id_copy.pdf']
    },
    {
      id: 'REG003',
      propertyTitle: 'කළුතර ඉඩම',
      applicant: 'අනිල් ප්‍රේමසිරි',
      submittedDate: Date.now() - 86400000 * 1,
      status: 'survey_required',
      area: 3.2,
      location: 'කළුතර',
      priority: 'urgent',
      documents: ['deed.pdf', 'tax_receipt.pdf']
    }
  ]);

  const [disputes, setDisputes] = useState([
    {
      id: 'DISP001',
      propertyId: 'PROP001',
      complainant: 'සුනිල් සිල්වා',
      defendant: 'කමල් පෙරේරා',
      description: 'ඉඩම් සීමා ගැටළුව - අසල්වැසියා සීමාව ඉක්මවා ඇත',
      status: 'pending',
      filedDate: Date.now() - 86400000 * 3,
      priority: 'high',
      documents: ['complaint.pdf', 'photos.zip']
    },
    {
      id: 'DISP002',
      propertyId: 'PROP002',
      complainant: 'මාලිනී ජයවර්ධන',
      defendant: 'රාජ් සිංහ',
      description: 'හිමිකම් ගැටළුව - ඔප්පුවේ වලංගුතාව ප්‍රශ්න කෙරේ',
      status: 'investigating',
      filedDate: Date.now() - 86400000 * 7,
      priority: 'medium',
      assignedOfficer: 'නීති නිලධාරී',
      documents: ['deed_copy.pdf', 'complaint.pdf']
    }
  ]);

  const [verificationItems, setVerificationItems] = useState([
    {
      id: 'VER001',
      propertyId: 'PROP001',
      applicant: 'සුනිල් සිල්වා',
      submittedDate: Date.now() - 86400000 * 2,
      priority: 'high',
      documents: [
        {
          id: 'DOC001',
          name: 'ඔප්පුව',
          type: 'deed',
          status: 'pending',
          uploadDate: Date.now() - 86400000 * 2,
          size: '2.4 MB',
          url: '/documents/deed.pdf'
        },
        {
          id: 'DOC002',
          name: 'සර්වේ වාර්තාව',
          type: 'survey',
          status: 'pending',
          uploadDate: Date.now() - 86400000 * 2,
          size: '1.8 MB',
          url: '/documents/survey.pdf'
        }
      ],
      verificationNotes: ''
    },
    {
      id: 'VER002',
      propertyId: 'PROP002',
      applicant: 'මාලිනී ජයවර්ධන',
      submittedDate: Date.now() - 86400000 * 5,
      priority: 'medium',
      documents: [
        {
          id: 'DOC003',
          name: 'ඔප්පුව',
          type: 'deed',
          status: 'verified',
          uploadDate: Date.now() - 86400000 * 5,
          size: '3.1 MB',
          url: '/documents/deed2.pdf'
        },
        {
          id: 'DOC004',
          name: 'හැඳුනුම්පත් පිටපත',
          type: 'id',
          status: 'pending',
          uploadDate: Date.now() - 86400000 * 5,
          size: '1.2 MB',
          url: '/documents/id.pdf'
        }
      ],
      verificationNotes: 'ඔප්පුව සත්‍යාපනය කර ඇත, හැඳුනුම්පත තවමත් පරීක්ෂා කරමින් පවතී'
    }
  ]);

  const monthlyStats = [
    { month: 'ජන', registrations: 15, verifications: 12 },
    { month: 'පෙබ', registrations: 18, verifications: 15 },
    { month: 'මාර්', registrations: 22, verifications: 20 },
    { month: 'අප්‍රේ', registrations: 16, verifications: 14 },
    { month: 'මැයි', registrations: 25, verifications: 22 },
    { month: 'ජුනි', registrations: 20, verifications: 18 }
  ];

  const statusData = [
    { name: 'සත්‍යාපනය වෙමින්', value: 12, color: '#3B82F6' },
    { name: 'ලේඛන පරීක්ෂණය', value: 8, color: '#8B5CF6' },
    { name: 'සර්වේ අවශ්‍යයි', value: 5, color: '#F59E0B' },
    { name: 'සම්පූර්ණයි', value: 18, color: '#10B981' }
  ];

  const stats = [
    {
      label: 'අද ලියාපදිංචි',
      value: '8',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      change: '+3',
      changeType: 'positive'
    },
    {
      label: 'සත්‍යාපනය වෙමින්',
      value: '12',
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      change: '+2',
      changeType: 'positive'
    },
    {
      label: 'ගැටළු',
      value: '5',
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      change: '+1',
      changeType: 'negative'
    },
    {
      label: 'සම්පූර්ණ කළ',
      value: '18',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      change: '+5',
      changeType: 'positive'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'registration_approved',
      title: 'ලියාපදිංචිය අනුමත කරන ලදී',
      description: 'REG001 - කොළොන්නාව ඉඩම සාර්ථකව අනුමත කරන ලදී',
      time: '30 මිනිත්තුවකට පෙර',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'document_verified',
      title: 'ලේඛන සත්‍යාපනය',
      description: 'DOC003 - ඔප්පුව සත්‍යාපනය කරන ලදී',
      time: '1 පැයකට පෙර',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'dispute_assigned',
      title: 'ගැටළුව පවරන ලදී',
      description: 'DISP001 - ඉඩම් සීමා ගැටළුව නීති නිලධාරියාට පවරන ලදී',
      time: '2 පැයකට පෙර',
      icon: AlertCircle,
      color: 'text-orange-600'
    },
    {
      id: 4,
      type: 'survey_requested',
      title: 'සර්වේ ඉල්ලීම',
      description: 'REG003 - කළුතර ඉඩම සඳහා සර්වේ ඉල්ලීමක් යවන ලදී',
      time: '3 පැයකට පෙර',
      icon: MapPin,
      color: 'text-purple-600'
    }
  ];

  const timeRangeOptions = [
    { value: '7d', label: 'පසුගිය 7 දින' },
    { value: '30d', label: 'පසුගිය 30 දින' },
    { value: '90d', label: 'පසුගිය 90 දින' }
  ];

  const tabs = [
    { id: 'overview', label: 'සාරාංශය', icon: BarChart3 },
    { id: 'registrations', label: 'ලියාපදිංචි කිරීම්', icon: FileText },
    { id: 'verification', label: 'සත්‍යාපනය', icon: CheckCircle },
    { id: 'disputes', label: 'ගැටළු', icon: AlertCircle },
    { id: 'analytics', label: 'විශ්ලේෂණ', icon: TrendingUp }
  ];

  const handleViewRegistrationDetails = (registration) => {
    console.log('View registration details:', registration);
  };

  const handleApproveRegistration = (id) => {
    setRegistrations(prev => prev.map(reg =>
      reg.id === id ? { ...reg, status: 'approved' } : reg
    ));
    alert('ලියාපදිංචිය සාර්ථකව අනුමත කරන ලදී');
  };

  const handleRejectRegistration = (id) => {
    setRegistrations(prev => prev.map(reg =>
      reg.id === id ? { ...reg, status: 'rejected' } : reg
    ));
    alert('ලියාපදිංචිය ප්‍රතික්ෂේප කරන ලදී');
  };

  const handleAssignDispute = (disputeId, officerId) => {
    setDisputes(prev => prev.map(dispute =>
      dispute.id === disputeId ? { ...dispute, assignedOfficer: officerId } : dispute
    ));
  };

  const handleUpdateDisputeStatus = (disputeId, status) => {
    setDisputes(prev => prev.map(dispute =>
      dispute.id === disputeId ? { ...dispute, status } : dispute
    ));
  };

  const handleViewDisputeDetails = (dispute) => {
    console.log('View dispute details:', dispute);
  };

  const handleVerifyDocument = (itemId, documentId, status, notes) => {
    setVerificationItems(prev => prev.map(item =>
      item.id === itemId
        ? {
          ...item,
          documents: item.documents.map(doc =>
            doc.id === documentId ? { ...doc, status } : doc
          ),
          verificationNotes: notes || item.verificationNotes
        }
        : item
    ));
    alert(`ලේඛනය ${status === 'verified' ? 'සත්‍යාපනය' : 'ප්‍රතික්ෂේප'} කරන ලදී`);
  };

  const handleCompleteVerification = (itemId) => {
    setVerificationItems(prev => prev.filter(item => item.id !== itemId));
    alert('සත්‍යාපනය සම්පූර්ණ කරන ලදී');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <DashboardHeader
          userName={user?.name}
          type='land_officer'
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
            statusData={statusData}
            recentActivities={recentActivities}
          />

          <RegistrationQueueSection
            activeTab={activeTab}
            registrations={registrations}
            onViewDetails={handleViewRegistrationDetails}
            onApprove={handleApproveRegistration}
            onReject={handleRejectRegistration}
          />

          <VerificationPanelSection
            activeTab={activeTab}
            verificationItems={verificationItems}
            onVerifyDocument={handleVerifyDocument}
            onCompleteVerification={handleCompleteVerification}
          />

          <DisputeManagementSection
            activeTab={activeTab}
            disputes={disputes}
            onAssignDispute={handleAssignDispute}
            onUpdateStatus={handleUpdateDisputeStatus}
            onViewDetails={handleViewDisputeDetails}
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

export default LandOfficerDashboard;