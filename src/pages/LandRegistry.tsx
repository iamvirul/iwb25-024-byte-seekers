import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { MapPin, Save, Eye, User, UserPlus } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Checkbox from "../components/ui/Checkbox";
import Select from "../components/ui/Select";

interface Owner {
  ownerId: string;
  firstName: string;
  lastName: string;
  nic: string;
  address: string;
  contactNo: string;
}

interface LandRegisterPayload {
  landId: string;
  landName: string;
  landPlace: string;
  landLat: number;
  landLang: number;
  landSize: number;
  landValue: number;
  landType: string;
  registerDate: {
    year: number;
    month: number;
    day: number;
  };
  landStatus: string;
  priority: number;
  from_owner: Owner | null;
  to_owner: Owner;
  verified_by: string;
  transferDate: string;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 7.8731,
  lng: 80.7718,
};

const LandRegistry: React.FC = ({activeTab}) => {

  const { user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [hasFromOwner, setHasFromOwner] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [previewData, setPreviewData] =
    useState<Partial<LandRegisterPayload> | null>(null);

  const [formData, setFormData] = useState({
    landName: "",
    landPlace: "",
    landSize: "",
    landValue: "",
    landType: "Home Land",
    registerDate: new Date().toISOString().split("T")[0],
    landStatus: "VERIFIED",
    priority: "1",
    from_owner: {
      ownerId: "",
      firstName: "",
      lastName: "",
      nic: "",
      address: "",
      contactNo: "",
    },
    to_owner: {
      ownerId: "",
      firstName: "",
      lastName: "",
      nic: "",
      address: "",
      contactNo: "",
    },
    transferDate: new Date().toISOString(),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCyvFLiqccbWJIzBB4rUMkK5-tUP-dHsfA",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleOwnerChange = (
    ownerType: "from_owner" | "to_owner",
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [ownerType]: {
        ...prev[ownerType],
        [field]: value,
      },
    }));
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarkerPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.landName.trim()) newErrors.landName = "Land name is required";
    if (!formData.landPlace.trim())
      newErrors.landPlace = "Land place is required";
    if (!formData.landSize.trim()) newErrors.landSize = "Land size is required";
    if (!formData.landValue.trim())
      newErrors.landValue = "Land value is required";
    if (!markerPosition)
      newErrors.location = "Please select a location on the map";

    // Validate to_owner
    if (!formData.to_owner.firstName.trim())
      newErrors["to_owner.firstName"] = "First name is required";
    if (!formData.to_owner.lastName.trim())
      newErrors["to_owner.lastName"] = "Last name is required";
    if (!formData.to_owner.nic.trim())
      newErrors["to_owner.nic"] = "NIC is required";
    if (!formData.to_owner.address.trim())
      newErrors["to_owner.address"] = "Address is required";
    if (!formData.to_owner.contactNo.trim())
      newErrors["to_owner.contactNo"] = "Contact number is required";

    // Validate from_owner if hasFromOwner is true
    if (hasFromOwner) {
      if (!formData.from_owner.firstName.trim())
        newErrors["from_owner.firstName"] = "First name is required";
      if (!formData.from_owner.lastName.trim())
        newErrors["from_owner.lastName"] = "Last name is required";
      if (!formData.from_owner.nic.trim())
        newErrors["from_owner.nic"] = "NIC is required";
      if (!formData.from_owner.address.trim())
        newErrors["from_owner.address"] = "Address is required";
      if (!formData.from_owner.contactNo.trim())
        newErrors["from_owner.contactNo"] = "Contact number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePreview = () => {
    if (!validateForm()) return;

    const preview: Partial<LandRegisterPayload> = {
      landName: formData.landName,
      landPlace: formData.landPlace,
      landLat: markerPosition?.lat || 0,
      landLang: markerPosition?.lng || 0,
      landSize: parseFloat(formData.landSize),
      landValue: parseFloat(formData.landValue),
      landType: formData.landType,
      registerDate: {
        year: new Date(formData.registerDate).getFullYear(),
        month: new Date(formData.registerDate).getMonth() + 1,
        day: new Date(formData.registerDate).getDate(),
      },
      landStatus: formData.landStatus as "VERIFIED",
      priority: parseInt(formData.priority),
      from_owner: hasFromOwner ? formData.from_owner : null,
      to_owner: formData.to_owner,
      verified_by: user?.username || "REGISTRAR-01",
      transferDate: formData.transferDate,
    };

    setPreviewData(preview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !markerPosition) return;

    setIsRegistering(true);
    try {
      const payload: LandRegisterPayload = {
        landId: `LAND-${Math.floor(1000 + Math.random() * 9000)}`,
        landName: formData.landName,
        landPlace: formData.landPlace,
        landLat: markerPosition.lat,
        landLang: markerPosition.lng,
        landSize: parseFloat(formData.landSize),
        landValue: parseFloat(formData.landValue),
        landType: formData.landType,
        registerDate: {
          year: new Date(formData.registerDate).getFullYear(),
          month: new Date(formData.registerDate).getMonth() + 1,
          day: new Date(formData.registerDate).getDate(),
        },
        landStatus: "VERIFIED",
        priority: parseInt(formData.priority),
        from_owner: hasFromOwner ? formData.from_owner : null,
        to_owner: formData.to_owner,
        verified_by: user?.username || "REGISTRAR-01",
        transferDate: formData.transferDate
          ? new Date(formData.transferDate).toISOString()
          : new Date().toISOString(), // fallback
      };

      const token = localStorage.getItem("token");

      const response = await fetch("/api/land_officer/land/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("Land registered successfully!");
      // Reset form
      setFormData({
        landName: "",
        landPlace: "",
        landSize: "",
        landValue: "",
        landType: "Home Land",
        registerDate: new Date().toISOString().split("T")[0],
        landStatus: "VERIFIED",
        priority: "1",
        from_owner: {
          ownerId: "",
          firstName: "",
          lastName: "",
          nic: "",
          address: "",
          contactNo: "",
        },
        to_owner: {
          ownerId: "",
          firstName: "",
          lastName: "",
          nic: "",
          address: "",
          contactNo: "",
        },
        transferDate: new Date().toISOString(),
      });
      setMarkerPosition(null);
      setPreviewData(null);
      setHasFromOwner(false);
    } catch (error) {
      alert("Error registering land: " + (error as Error).message);
    } finally {
      setIsRegistering(false);
    }
  };
if (activeTab !== "landRegistry") return null;
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div>
        <PageHeader
          title="ඉඩම් ලියාපදිංචිය"
          description="Register a new land property in the system"
          icon={MapPin}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="ඉඩම් නාමය"
                  value={formData.landName}
                  onChange={(e) => handleChange("landName", e.target.value)}
                  placeholder="e.g. Maharagama Niwasa"
                  error={errors.landName}
                />

                <Input
                  label="ඉඩම් ස්ථානය"
                  value={formData.landPlace}
                  onChange={(e) => handleChange("landPlace", e.target.value)}
                  placeholder="e.g. Maharagama"
                  error={errors.landPlace}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="භූමි ප්‍රමාණය (වර්ග අඩි)"
                  type="number"
                  step="0.01"
                  value={formData.landSize}
                  onChange={(e) => handleChange("landSize", e.target.value)}
                  placeholder="900"
                  error={errors.landSize}
                />

                <Input
                  label="ඉඩම් වටිනාකම (LKR)"
                  type="number"
                  step="0.01"
                  value={formData.landValue}
                  onChange={(e) => handleChange("landValue", e.target.value)}
                  placeholder="2000000"
                  error={errors.landValue}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="ඉඩම් වර්ගය"
                  value={formData.landType}
                  onChange={(e) => handleChange("landType", e.target.value)}
                  options={[
                    { label: "Home Land", value: "Home Land" },
                    { label: "Commercial Land", value: "Commercial Land" },
                    { label: "Industrial Land", value: "Industrial Land" },
                    { label: "Agricultural Land", value: "Agricultural Land" },
                    { label: "Other", value: "Other" },
                  ]}
                />

                <Input
                  label="ප්‍රමුඛතාවය"
                  type="number"
                  value={formData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                  placeholder="1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="ලියාපදිංචි දිනය"
                  type="date"
                  value={formData.registerDate}
                  onChange={(e) => handleChange("registerDate", e.target.value)}
                />

                <Input
                  label="හුවමාරු දිනය"
                  type="datetime-local"
                  value={formData.transferDate}
                  onChange={(e) => handleChange("transferDate", e.target.value)}
                />
              </div>

              <div className="pt-2">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  හිමිකරුට (නව හිමිකරු)
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="මුල් නම"
                      value={formData.to_owner.firstName}
                      onChange={(e) =>
                        handleOwnerChange(
                          "to_owner",
                          "firstName",
                          e.target.value
                        )
                      }
                      error={errors["to_owner.firstName"]}
                    />
                    <Input
                      label="අවසන් නම"
                      value={formData.to_owner.lastName}
                      onChange={(e) =>
                        handleOwnerChange(
                          "to_owner",
                          "lastName",
                          e.target.value
                        )
                      }
                      error={errors["to_owner.lastName"]}
                    />
                  </div>
                  <Input
                    label="ජාතික හැඳුනුම්පත"
                    value={formData.to_owner.nic}
                    onChange={(e) =>
                      handleOwnerChange("to_owner", "nic", e.target.value)
                    }
                    error={errors["to_owner.nic"]}
                  />
                  <Input
                    label="ලිපිනය"
                    value={formData.to_owner.address}
                    onChange={(e) =>
                      handleOwnerChange("to_owner", "address", e.target.value)
                    }
                    error={errors["to_owner.address"]}
                  />
                  <Input
                    label="සබඳතා අංකය"
                    value={formData.to_owner.contactNo}
                    onChange={(e) =>
                      handleOwnerChange("to_owner", "contactNo", e.target.value)
                    }
                    error={errors["to_owner.contactNo"]}
                  />
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center mb-4">
                  <Checkbox
                    id="hasFromOwner"
                    checked={hasFromOwner}
                    onChange={() => setHasFromOwner(!hasFromOwner)}
                  />
                  <label
                    htmlFor="hasFromOwner"
                    className="ml-2 block text-sm font-medium text-gray-700"
                  >
                    හිමිකරුගෙන් (පෙර හිමිකරු) ඇත
                  </label>
                </div>

                {hasFromOwner && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      හිමිකරුගෙන් (පෙර හිමිකරු)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="මුල් නම"
                        value={formData.from_owner.firstName}
                        onChange={(e) =>
                          handleOwnerChange(
                            "from_owner",
                            "firstName",
                            e.target.value
                          )
                        }
                        error={errors["from_owner.firstName"]}
                      />
                      <Input
                        label="අවසන් නම"
                        value={formData.from_owner.lastName}
                        onChange={(e) =>
                          handleOwnerChange(
                            "from_owner",
                            "lastName",
                            e.target.value
                          )
                        }
                        error={errors["from_owner.lastName"]}
                      />
                    </div>
                    <Input
                      label="ජාතික හැඳුනුම්පත"
                      value={formData.from_owner.nic}
                      onChange={(e) =>
                        handleOwnerChange("from_owner", "nic", e.target.value)
                      }
                      error={errors["from_owner.nic"]}
                    />
                    <Input
                      label="ලිපිනය"
                      value={formData.from_owner.address}
                      onChange={(e) =>
                        handleOwnerChange(
                          "from_owner",
                          "address",
                          e.target.value
                        )
                      }
                      error={errors["from_owner.address"]}
                    />
                    <Input
                      label="සබඳතා අංකය"
                      value={formData.from_owner.contactNo}
                      onChange={(e) =>
                        handleOwnerChange(
                          "from_owner",
                          "contactNo",
                          e.target.value
                        )
                      }
                      error={errors["from_owner.contactNo"]}
                    />
                  </div>
                )}
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ඉඩම් ස්ථානය තෝරන්න
                </h3>
                {isLoaded ? (
                  <div className="border border-gray-300 rounded-md overflow-hidden">
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={center}
                      zoom={8}
                      onClick={handleMapClick}
                      onLoad={(map) => setMap(map)}
                    >
                      {markerPosition && <Marker position={markerPosition} />}
                    </GoogleMap>
                  </div>
                ) : (
                  <div className="h-64 bg-gray-100 flex items-center justify-center">
                    <p>Loading map...</p>
                  </div>
                )}
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
                {markerPosition && (
                  <div className="mt-2 text-sm text-gray-600">
                    තෝරාගත් ඛණ්ඩාංක: {markerPosition.lat.toFixed(6)},{" "}
                    {markerPosition.lng.toFixed(6)}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={generatePreview}
                  icon={Eye}
                >
                  පෙරදසුන
                </Button>
                <Button type="submit" loading={isRegistering} icon={Save}>
                  {isRegistering ? "Registering..." : "Register Land"}
                </Button>
              </div>
            </form>
          </Card>

          <div className="sticky top-6">
            <Card>
              <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                <Eye className="w-5 h-5 mr-2" />
                ලියාපදිංචි කිරීමේ පෙරදසුන
              </h3>

              {previewData ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-800">ඉඩම් තොරතුරු</h4>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">නම:</span>{" "}
                        {previewData.landName}
                      </p>
                      <p>
                        <span className="font-medium">ස්ථානය:</span>{" "}
                        {previewData.landPlace}
                      </p>
                      <p>
                        <span className="font-medium">ප්‍රමාණය:</span>{" "}
                        {previewData.landSize} වර්ග අඩි
                      </p>
                      <p>
                        <span className="font-medium">වටිනාකම:</span> LKR{" "}
                        {previewData.landValue?.toLocaleString()}
                      </p>
                      <p>
                        <span className="font-medium">වර්ගය:</span>{" "}
                        {previewData.landType}
                      </p>
                      <p>
                        <span className="font-medium">ඛණ්ඩාංක:</span>{" "}
                        {previewData.landLat?.toFixed(6)},{" "}
                        {previewData.landLang?.toFixed(6)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-800">
                      හිමිකරුට (නව හිමිකරු)
                    </h4>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">නම:</span>{" "}
                        {previewData.to_owner?.firstName}{" "}
                        {previewData.to_owner?.lastName}
                      </p>
                      <p>
                        <span className="font-medium">ජාතික හැඳුනුම්පත:</span>{" "}
                        {previewData.to_owner?.nic}
                      </p>
                      <p>
                        <span className="font-medium">ලිපිනය:</span>{" "}
                        {previewData.to_owner?.address}
                      </p>
                      <p>
                        <span className="font-medium">අමතන්න:</span>{" "}
                        {previewData.to_owner?.contactNo}
                      </p>
                    </div>
                  </div>

                  {previewData.from_owner && (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-gray-800">
                        හිමිකරුගෙන් (පෙර හිමිකරු)
                      </h4>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">නම:</span>{" "}
                          {previewData.from_owner.firstName}{" "}
                          {previewData.from_owner.lastName}
                        </p>
                        <p>
                          <span className="font-medium">ජාතික හැඳුනුම්පත:</span>{" "}
                          {previewData.from_owner.nic}
                        </p>
                        <p>
                          <span className="font-medium">ලිපිනය:</span>{" "}
                          {previewData.from_owner.address}
                        </p>
                        <p>
                          <span className="font-medium">අමතන්න:</span>{" "}
                          {previewData.from_owner.contactNo}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-800">
                      ලියාපදිංචි විස්තර
                    </h4>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">ලියාපදිංචි දිනය:</span>{" "}
                        {previewData.registerDate?.year}-
                        {previewData.registerDate?.month}-
                        {previewData.registerDate?.day}
                      </p>
                      <p>
                        <span className="font-medium">හුවමාරු දිනය:</span>{" "}
                        {new Date(
                          previewData.transferDate || ""
                        ).toLocaleString()}
                      </p>
                      <p>
                        <span className="font-medium">තත්වය:</span>{" "}
                        {previewData.landStatus}
                      </p>
                      <p>
                        <span className="font-medium">ප්‍රමුඛතාවය:</span>{" "}
                        {previewData.priority}
                      </p>
                      <p>
                        <span className="font-medium">සත්‍යාපනය කළේ:</span>{" "}
                        {previewData.verified_by}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-md text-center">
                  <p className="text-gray-500">
                    ලියාපදිංචි විස්තර බැලීමට පෝරමය පුරවා "පෙරදසුන" ක්ලික් කරන්න.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandRegistry;
