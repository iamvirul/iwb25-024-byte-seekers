import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Clock } from "lucide-react";
import ProfileHeader from "../components/profile/ProfileHeader";
import TabNavigation from "../components/profile/TabNavigation";
import PersonalInfoTab from "../components/profile/PersonalInfoTab";
import SecurityTab from "../components/profile/SecurityTab";
import PaymentHistoryTab from "../components/profile/PaymentHistoryTab";
import toast from "react-hot-toast";
import LoadingOverlay from "../components/LoadingOverlay";
import { Hourglass } from "react-loader-spinner";

interface Payment {
  id: number;
  referanceNo: string;
  amount: number;
  createdAt: [number, number];
  legalOfficerId: number;
  usersId: number;
}

interface ProfileData {
  user: {
    id: number;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    nic: string;
    sludi: string;
    contactNo: string;
    address: string;
  };
  payments: Payment[];
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          toast.error("Authentication required");
          return;
        }

        const response = await fetch(
          `http://localhost:9050/authorize/profile/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData(data.content);
      } catch (error) {
        toast.error("Failed to fetch profile data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token || !profileData) return;

      const payload = {
        contact: profileData.user.contactNo,
        ...(profileData.user.address && { address: profileData.user.address }),
      };

      const response = await fetch(
        `http://localhost:9050/authorize/profile/update/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  const handlePasswordChange = async (
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) return;

      const response = await fetch(
        `http://localhost:9050/authorize/password/update/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          const data = await response.json();
          if(data.content.newPassword){
            toast.error(data.content.newPassword);
            return false;
          }
          if(data.content.oldPassword){
            toast.error(data.content.oldPassword);
            return false;
          }
        }
        throw new Error("Failed to update password");
      }

      toast.success("Password updated successfully");
      return true;
    } catch (error) {
      toast.error("Failed to update password");
      console.error(error);
      return false;
    }
  };

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="h-[500px] flex items-center justify-center">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      );
    }

    if (!profileData) {
      return <div>Error loading profile data</div>;
    }

    switch (activeTab) {
      case "personal":
        return (
          <PersonalInfoTab
            profileData={{
              firstName: profileData.user.firstName,
              lastName: profileData.user.lastName,
              email: profileData.user.email,
              phone: profileData.user.contactNo,
              address: profileData.user.address,
              nic: profileData.user.nic,
              slUdiId: profileData.user.sludi,
            }}
            isEditing={isEditing}
            onDataChange={(data) => {
              if (!profileData) return;
              setProfileData({
                ...profileData,
                user: {
                  ...profileData.user,
                  firstName: data.firstName,
                  lastName: data.lastName,
                  contactNo: data.phone,
                  address: data.address,
                },
              });
            }}
          />
        );
      case "security":
        return <SecurityTab onPasswordChange={handlePasswordChange} />;
      case "payments":
        return <PaymentHistoryTab payments={profileData.payments} />;
      default:
        return null;
    }
  };

  const user = {
    name: profileData
      ? `${profileData.user.firstName} ${profileData.user.lastName}`
      : "",
    email: profileData?.user.email || "",
    slUdiId: profileData?.user.sludi || "",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700 mb-6">
            <User className="w-4 h-4 mr-2" />
            පරිශීලක ප්‍රොෆයිල් කළමනාකරණය
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            මගේ ප්‍රොෆයිලය
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ඔබේ පුද්ගලික තොරතුරු, ලේඛන සහ ගිණුම් සැකසුම් කළමනාකරණය කරන්න
          </p>
        </motion.div>

        <ProfileHeader
          user={user}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(!isEditing)}
          onSave={handleSaveProfile}
        />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
