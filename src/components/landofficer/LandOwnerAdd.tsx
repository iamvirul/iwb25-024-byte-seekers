import React, { useState, useEffect } from "react";
import { UserPlus, Check, X } from "lucide-react";
import PageHeader from "../common/PageHeader";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface LandOwner {
  id?: number;
  ownerId?: string;
  firstName: string;
  lastName: string;
  nic: string;
  address: string;
  contactNo: string;
}

interface SystemUser {
  id: number;
  firstName: string;
  lastName: string;
  nic: string;
  address: string;
  contactNo: string;
}
interface LandOwnerAddProps {
  activeTab: string;
}

const LandOwnerAdd: React.FC<LandOwnerAddProps> = ({activeTab}) => {
  const [formData, setFormData] = useState<LandOwner>({
    firstName: "",
    lastName: "",
    nic: "",
    address: "",
    contactNo: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([]);
  const [nicExists, setNicExists] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch system users on component mount
  useEffect(() => {
    const fetchSystemUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/land_officer/user/landowners", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setSystemUsers(data.content);
        }
      } catch (err) {
        console.error("Error fetching system users:", err);
      }
    };

    fetchSystemUsers();
  }, []);

  // Check if NIC exists in system
  useEffect(() => {
    if (formData.nic.length >= 10) {
      const userExists = systemUsers.some(
        (user) => user.nic === formData.nic
      );
      setNicExists(userExists);

      if (userExists) {
        const existingUser = systemUsers.find(
          (user) => user.nic === formData.nic
        );
        if (existingUser) {
          setFormData({
            ...formData,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            address: existingUser.address,
            contactNo: existingUser.contactNo,
          });
        }
      }
    } else {
      setNicExists(false);
    }
  }, [formData.nic, systemUsers]);

  const handleChange = (field: keyof LandOwner, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.nic.trim()) {
      newErrors.nic = "NIC is required";
    } else if (formData.nic.length < 10) {
      newErrors.nic = "NIC must be at least 10 characters";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.contactNo.trim()) {
      newErrors.contactNo = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNo)) {
      newErrors.contactNo = "Invalid contact number (10 digits required)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...formData,
        ownerId: `LCLO-${Math.floor(10000 + Math.random() * 90000)}`,
      };

      const response = await fetch(
        "/api/land_officer/land/landowner/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.content);
      }

      setSuccess("Land owner added successfully!");
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        nic: "",
        address: "",
        contactNo: "",
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  if (activeTab !== "addLandOwner") return null;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div >
        <PageHeader
          title="ඉඩම් හිමිකරු එකතු කිරීම"
          description="නව ඉඩම් හිමිකරුවෙකු පද්ධතියට එක් කරන්න"
          icon={UserPlus}
        />

        <Card>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 text-green-700 rounded-md">
                {success}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="මුල් නම"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                error={errors.firstName}
                disabled={nicExists}
              />

              <Input
                label="අවසන් නම"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                error={errors.lastName}
                disabled={nicExists}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="ජාතික හැඳුනුම්පත"
                  value={formData.nic}
                  onChange={(e) => handleChange("nic", e.target.value)}
                  error={errors.nic}
                />
                {formData.nic.length >= 10 && (
                  <div className="mt-1 flex items-center">
                    {nicExists ? (
                      <>
                        <Check className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">
                          පද්ධතියේ පවතින පරිශීලකයෙකි
                        </span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">
                          පද්ධතියේ නොමැති පරිශීලකයෙකි
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <Input
                label="සබඳතා අංකය"
                value={formData.contactNo}
                onChange={(e) => handleChange("contactNo", e.target.value)}
                error={errors.contactNo}
                disabled={nicExists}
              />
            </div>

            <Input
              label="ලිපිනය"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              error={errors.address}
              disabled={nicExists}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" loading={isLoading} icon={UserPlus}>
                {isLoading ? "සුරැකෙමින්..." : "හිමිකරු එක් කරන්න"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LandOwnerAdd;