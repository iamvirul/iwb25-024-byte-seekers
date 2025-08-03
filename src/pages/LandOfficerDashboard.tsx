import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  BarChart3,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

// Import components
import DashboardHeader from "../components/legal/DashboardHeader";
import StatsSection from "../components/legal/StatsSection";
import TabNavigationSection from "../components/legal/TabNavigationSection";
import DashboardOverviewSection from "../components/landofficer/DashboardOverviewSection";
import RegistrationQueueSection from "../components/landofficer/RegistrationQueueSection";
import VerificationPanelSection from "../components/landofficer/VerificationPanelSection";
import NotificationsModal from "../components/legal/NotificationsModal";
import SettingsModal from "../components/legal/SettingsModal";

const LandOfficerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [statsFromRes, setStatsFromRes] = useState({
    stats: {
      pending_lands: "0",
      registered_today: "0",
      rejected_lands: "0",
      accepted_lands: "0",
    },
    lands: [],
  });
  const [registrations, setRegistrations] = useState([]);
  const [verificationItems, setVerificationItems] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const userSessionId = localStorage.getItem("userSessionId");

  // Helper function to get current owner from transfer chain
  const getCurrentOwner = (land) => {
    if (!land?.landtransferchains || land.landtransferchains.length === 0) {
      return null;
    }
    const lastTransfer =
      land.landtransferchains[land.landtransferchains.length - 1];
    return `Owner ID: ${lastTransfer.toLandOwnersId}`;
  };

  // Helper function to calculate time ago
  const getTimeAgo = (registerDate) => {
    if (!registerDate) return "Unknown time";
    const now = new Date();
    const regDate = new Date(
      registerDate.year,
      registerDate.month - 1,
      registerDate.day
    );
    const diffInHours = Math.floor((now - regDate) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} පැයකට පෙර`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} දිනකට පෙර`;
    }
  };

  // WebSocket connection and message handling
  useEffect(() => {
    let socket: WebSocket;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;

    const connect = () => {
      socket = new WebSocket(`ws://127.0.0.1:8065/proxy/${userSessionId}`);

      socket.onopen = () => {
        console.log("Connected to the server");
        reconnectAttempts = 0;
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        if (reconnectAttempts < maxReconnectAttempts) {
          const delay = Math.min(1000 * reconnectAttempts, 5000);
          console.log(`Reconnecting in ${delay}ms...`);
          setTimeout(connect, delay);
          reconnectAttempts++;
        }
      };

      // Updated WebSocket message handler
      socket.onmessage = (event: any) => {
        const data = JSON.parse(event.data);
        console.log("Received data:", data);

        if (data.success && data.content) {
          setStatsFromRes(data.content);
        } else if (data.event === "Created" || data.event === "StatusUpdated") {
          const updatedLand = data.message;
          const status = (updatedLand.landStatus || "PENDING").toLowerCase();

          // Create the updated registration object
          const updatedRegister = {
            id: updatedLand.landId?.toString() || Math.random().toString(),
            propertyTitle: updatedLand.landName || "Unknown Property",
            applicant:
              getCurrentOwner(updatedLand) || "Applicant not specified",
            submittedDate: updatedLand.registerDate
              ? new Date(
                  updatedLand.registerDate.year,
                  updatedLand.registerDate.month - 1,
                  updatedLand.registerDate.day
                ).getTime()
              : Date.now(),
            status: status,
            area: updatedLand.landSize || "N/A",
            location: updatedLand.landPlace || "Unknown Location",
            priority: updatedLand.priority === 1 ? "high" : "medium",
            documents: updatedLand.landdocuments?.map((doc) => doc?.name) || [],
          };

          // Update stats based on the land status
          setStatsFromRes((prev) => {
            const prevStats = prev.stats || {
              pending_lands: "0",
              registered_today: "0",
              rejected_lands: "0",
              accepted_lands: "0",
            };

            let pending = parseInt(prevStats.pending_lands);
            let accepted = parseInt(prevStats.accepted_lands);
            let rejected = parseInt(prevStats.rejected_lands);
            let registeredToday = parseInt(prevStats.registered_today);

            const isNewLand = data.event === "Created";
            const isStatusUpdate = data.event === "StatusUpdated";

            if (isNewLand) {
              // For new lands, increment count based on their initial status
              if (status === "pending") pending += 1;
              else if (status === "verified") {
                accepted += 1;
                // Check if this was registered today
                const today = new Date();
                const regDate = updatedLand.registerDate
                  ? new Date(
                      updatedLand.registerDate.year,
                      updatedLand.registerDate.month - 1,
                      updatedLand.registerDate.day
                    )
                  : new Date();
                if (
                  today.getDate() === regDate.getDate() &&
                  today.getMonth() === regDate.getMonth() &&
                  today.getFullYear() === regDate.getFullYear()
                ) {
                  registeredToday += 1;
                }
              } else if (status === "rejected") rejected += 1;
            } else if (isStatusUpdate) {
              // For status updates, adjust counts based on previous and new status
              const prevLand = prev.lands.find(
                (land) => land.landId === updatedLand.landId
              );
              const prevStatus =
                prevLand?.landStatus?.toLowerCase() || "pending";

              // Decrement count from previous status
              if (prevStatus === "pending") pending -= 1;
              else if (prevStatus === "verified") accepted -= 1;
              else if (prevStatus === "rejected") rejected -= 1;

              // Increment count for new status
              if (status === "pending") pending += 1;
              else if (status === "verified") {
                accepted += 1;
                const today = new Date();
                const regDate = updatedLand.registerDate
                  ? new Date(
                      updatedLand.registerDate.year,
                      updatedLand.registerDate.month - 1,
                      updatedLand.registerDate.day
                    )
                  : new Date();
                if (
                  today.getDate() === regDate.getDate() &&
                  today.getMonth() === regDate.getMonth() &&
                  today.getFullYear() === regDate.getFullYear()
                ) {
                  registeredToday += 1;
                }
              } else if (status === "rejected") rejected += 1;
            }

            // Update the lands array
            let updatedLands = [...(prev.lands || [])];
            const existingIndex = updatedLands.findIndex(
              (land) => land.landId === updatedLand.landId
            );

            if (existingIndex >= 0) {
              updatedLands[existingIndex] = updatedLand;
            } else {
              updatedLands = [...updatedLands, updatedLand];
            }

            return {
              ...prev,
              stats: {
                ...prevStats,
                pending_lands: pending.toString(),
                accepted_lands: accepted.toString(),
                rejected_lands: rejected.toString(),
                registered_today: registeredToday.toString(),
              },
              lands: updatedLands,
            };
          });

          // Update registrations state
          setRegistrations((prev) => {
            const existingIndex = prev.findIndex(
              (reg) => reg.id === updatedRegister.id
            );
            if (existingIndex >= 0) {
              return prev.map((reg, index) =>
                index === existingIndex ? updatedRegister : reg
              );
            } else {
              return [...prev, updatedRegister];
            }
          });
        }
      };
    };

    const timer = setTimeout(connect, 300);

    return () => {
      clearTimeout(timer);
      if (socket) {
        socket.onclose = null;
        socket.close();
      }
    };
  }, [userSessionId]);

  // Update registrations when lands change
  useEffect(() => {
    if (statsFromRes?.lands) {
      const mappedRegistrations = statsFromRes.lands.map((land) => ({
        id: land.landId?.toString() || Math.random().toString(),
        propertyTitle: land.landName || "Unknown Property",
        applicant: getCurrentOwner(land) || "Applicant not specified",
        submittedDate: land.registerDate
          ? new Date(
              land.registerDate.year,
              land.registerDate.month - 1,
              land.registerDate.day
            ).getTime()
          : Date.now(),
        status: (land.landStatus || "PENDING").toLowerCase(),
        area: land.landSize || "N/A",
        location: land.landPlace || "Unknown Location",
        priority: land.priority === 1 ? "high" : "medium",
        documents: land.landdocuments?.map((doc) => doc?.name) || [],
      }));
      setRegistrations(mappedRegistrations);
    }
  }, [statsFromRes.lands]);

  // Update verification items when lands change
  useEffect(() => {
    if (statsFromRes?.lands) {
      const pendingLands = statsFromRes.lands.filter(
        (land) => land.landStatus === "PENDING"
      );
      const mappedVerificationItems = pendingLands.map((land) => ({
        id: land.landId?.toString() || Math.random().toString(),
        propertyId: land.landId,
        applicant: getCurrentOwner(land) || "Applicant not specified",
        submittedDate: land.registerDate
          ? new Date(
              land.registerDate.year,
              land.registerDate.month - 1,
              land.registerDate.day
            ).getTime()
          : Date.now(),
        priority: land.priority === 1 ? "high" : "medium",
        documents:
          land.landdocuments?.map((doc) => ({
            id: doc?.id?.toString() || Math.random().toString(36).substring(7),
            name: doc?.name || "Document",
            type: doc?.type || "unknown",
            status: "pending",
            uploadDate: Date.now(),
            size: "N/A",
            url: doc?.url || "#",
          })) || [],
        verificationNotes: land.notes || "",
      }));
      setVerificationItems(mappedVerificationItems);
    }
  }, [statsFromRes.lands]);

  // Update recent activities when lands change
  useEffect(() => {
    if (statsFromRes?.lands) {
      const recentLands = [...statsFromRes.lands]
        .sort((a, b) => {
          const dateA = a.registerDate
            ? new Date(
                a.registerDate.year,
                a.registerDate.month - 1,
                a.registerDate.day
              )
            : new Date(0);
          const dateB = b.registerDate
            ? new Date(
                b.registerDate.year,
                b.registerDate.month - 1,
                b.registerDate.day
              )
            : new Date(0);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 4);

      const mappedActivities = recentLands.map((land, index) => ({
        id: index + 1,
        type:
          land.landStatus === "VERIFIED"
            ? "registration_approved"
            : "new_registration",
        title:
          land.landStatus === "VERIFIED"
            ? "ලියාපදිංචිය අනුමත කරන ලදී"
            : "නව ලියාපදිංචිය",
        description: `${land.landId || "N/A"} - ${land.landName || "Unknown"} ${
          land.landStatus === "VERIFIED"
            ? "සාර්ථකව අනුමත කරන ලදී"
            : "ලියාපදිංචි කරන ලදී"
        }`,
        time: getTimeAgo(land.registerDate),
        icon: land.landStatus === "VERIFIED" ? CheckCircle : FileText,
        color:
          land.landStatus === "VERIFIED" ? "text-green-600" : "text-blue-600",
      }));
      setRecentActivities(mappedActivities);
    }
  }, [statsFromRes.lands]);

  // Stats data
  const stats = [
    {
      label: "සත්‍යාපනය කිරීමට නියමිත ඉඩම්",
      value: statsFromRes.stats?.pending_lands || "0",
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
      change: "+0",
      changeType: "neutral",
    },
    {
      label: "අද ලියාපදිංචි",
      value: statsFromRes.stats?.registered_today || "0",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      change: "+0",
      changeType: "neutral",
    },
    {
      label: "ප්‍රතික්ෂේප කළ",
      value: statsFromRes.stats?.rejected_lands || "0",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
      change: "+0",
      changeType: "neutral",
    },
    {
      label: "පිළිගත්",
      value: statsFromRes.stats?.accepted_lands || "0",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      change: "+0",
      changeType: "neutral",
    },
  ];

  // Status data for charts
  const statusData = [
    {
      name: "සත්‍යාපනය වෙමින්",
      value: parseInt(statsFromRes.stats?.pending_lands || "0"),
      color: "#3B82F6",
    },
    {
      name: "පිළිගත්",
      value: parseInt(statsFromRes.stats?.accepted_lands || "0"),
      color: "#10B981",
    },
    {
      name: "ප්‍රතික්ෂේප කළ",
      value: parseInt(statsFromRes.stats?.rejected_lands || "0"),
      color: "#F59E0B",
    },
  ];

  const timeRangeOptions = [
    { value: "7d", label: "පසුගිය 7 දින" },
    { value: "30d", label: "පසුගිය 30 දින" },
    { value: "90d", label: "පසුගිය 90 දින" },
  ];

  const tabs = [
    { id: "overview", label: "සාරාංශය", icon: BarChart3 },
    { id: "registrations", label: "ලියාපදිංචි කිරීම්", icon: FileText },
    { id: "verification", label: "සත්‍යාපනය", icon: CheckCircle },
  ];

  const handleViewRegistrationDetails = (registration) => {
    console.log("View registration details:", registration);
  };

  const handleApproveRegistration = (id) => {
    setRegistrations((prev) =>
      prev.map((reg) => (reg.id === id ? { ...reg, status: "verified" } : reg))
    );
    alert("ලියාපදිංචිය සාර්ථකව අනුමත කරන ලදී");
  };

  const handleRejectRegistration = (id) => {
    setRegistrations((prev) =>
      prev.map((reg) => (reg.id === id ? { ...reg, status: "rejected" } : reg))
    );
    alert("ලියාපදිංචිය ප්‍රතික්ෂේප කරන ලදී");
  };

  const handleVerifyDocument = (itemId, documentId, status, notes) => {
    setVerificationItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              documents: item.documents.map((doc) =>
                doc.id === documentId ? { ...doc, status } : doc
              ),
              verificationNotes: notes || item.verificationNotes,
            }
          : item
      )
    );
    alert(
      `ලේඛනය ${status === "verified" ? "සත්‍යාපනය" : "ප්‍රතික්ෂේප"} කරන ලදී`
    );
  };

  const handleCompleteVerification = (itemId) => {
    setVerificationItems((prev) => prev.filter((item) => item.id !== itemId));
    alert("සත්‍යාපනය සම්පූර්ණ කරන ලදී");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          userName={user?.name}
          type="land_officer"
          onNotificationsClick={() => setShowNotificationsModal(true)}
          onSettingsClick={() => setShowSettingsModal(true)}
        />

        <StatsSection stats={stats} />

        <TabNavigationSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />

        <div className="space-y-8">
          <DashboardOverviewSection
            activeTab={activeTab}
            selectedTimeRange={selectedTimeRange}
            setSelectedTimeRange={setSelectedTimeRange}
            timeRangeOptions={timeRangeOptions}
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
        </div>

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
