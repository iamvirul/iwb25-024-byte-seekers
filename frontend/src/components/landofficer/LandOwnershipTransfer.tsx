import React, { useState, useEffect } from "react";
import { RefreshCw, Search, UserCheck, UserPlus } from "lucide-react";
import PageHeader from "../common/PageHeader";
import Card from "../ui/Card";
import Select from "../ui/Select";
import Input from "../ui/Input";
import Button from "../ui/Button";
import toast from "react-hot-toast";

interface Land {
  id: number;
  landId: string;
  landName: string;
  landPlace: string;
  landtransferchains: any[];
}

interface LandOwner {
  id: number;
  ownerId: string;
  firstName: string;
  lastName: string;
  nic: string;
  address: string;
  contactNo: string;
}

interface LandOwnershipTransferProps {
  lands: Land[];
  activeTab: string;
}

const LandOwnershipTransfer: React.FC<LandOwnershipTransferProps> = ({
  lands,
  activeTab,
}) => {
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);
  const [landOwners, setLandOwners] = useState<LandOwner[]>([]);
  const [filteredOwners, setFilteredOwners] = useState<LandOwner[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentOwner, setCurrentOwner] = useState<LandOwner | null>(null);
  const [newOwner, setNewOwner] = useState<LandOwner | null>(null);
  const [transferDate, setTransferDate] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (selectedLand) {
      const fetchLandOwners = async () => {
        setIsLoading(true);
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `/api/land_officer/user/land/details?landId=${selectedLand.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          if (data.success) {
            setLandOwners(data.content.landOwners);
            const chains = data.content.landTransferChains;
            if (chains.length > 0) {
              const lastChain = chains[chains.length - 1];
              const owner = data.content.landOwners.find(
                (o: LandOwner) => o.id === lastChain.toLandOwnersId
              );
              setCurrentOwner(owner || null);
            }
          }
        } catch (err) {
          setError("Failed to fetch land owners");
        } finally {
          setIsLoading(false);
        }
      };

      fetchLandOwners();
    }
  }, [selectedLand]);

  // Filter owners based on search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = landOwners.filter(
        (owner) =>
          owner.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          owner.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          owner.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
          owner.ownerId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOwners(filtered);
    } else {
      setFilteredOwners([]);
    }
  }, [searchTerm, landOwners]);

  const handleTransfer = async () => {
    if (!selectedLand || !newOwner) {
      setError("Please select land, current owner, and new owner");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const payload = {
        LandID: selectedLand.id,
        FromOwnerID: currentOwner?.id ?? null,
        ToOwnerID: newOwner.id,
        TransferDate: new Date(transferDate).toISOString(),
        VerifiedBy: token ? localStorage.getItem("name") : "land_officer",
      };

      const response = await fetch("/api/v1/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": import.meta.env.VITE_BLOCKCHAIN_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Transfer failed");
      }

      setSuccess("Ownership transferred successfully!");
      toast.success("Ownership transferred successfully!");
      // Reset form
      setSelectedLand(null);
      setCurrentOwner(null);
      setNewOwner(null);
      setSearchTerm("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  if (activeTab !== "transfer") return null;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div>
        <PageHeader
          title="ඉඩම් හිමිකාරිත්‍ය ගෙනයාම"
          description="ඉඩමක හිමිකාරිත්‍ය නව අයෙකුට ගෙනයන්න"
          icon={RefreshCw}
        />

        <Card>
          <div className="p-6 space-y-6">
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

            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                ඉඩම තෝරන්න
              </h2>
              <Select
                label="ඉඩම තෝරන්න"
                value={selectedLand?.id.toString() || ""}
                onChange={(value) => {
                  const land = lands.find((l) => l.id.toString() === value);
                  setSelectedLand(land || null);
                  setCurrentOwner(null);
                  setNewOwner(null);
                }}
                options={lands.map((land) => ({
                  value: land.id.toString(),
                  label: `${land.landName} - ${land.landId}`,
                }))}
                placeholder="ඉඩම තෝරන්න..."
              />
            </div>

            {selectedLand && (
              <>
                <div className="border-t border-gray-200 pt-4">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2" />
                    වත්මන් හිමිකරු
                  </h2>
                  {currentOwner ? (
                    <div className="p-4 bg-blue-50 rounded-md">
                      <p className="font-medium">
                        {currentOwner.firstName} {currentOwner.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {currentOwner.nic} | {currentOwner.ownerId}
                      </p>
                      <p className="text-sm text-gray-600">
                        {currentOwner.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        {currentOwner.contactNo}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      මෙම ඉඩම සඳහා හිමිකරුවන් නැත (නව ලියාපදිංචි ඉඩමකි)
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <UserPlus className="w-5 h-5 mr-2" />
                    නව හිමිකරු
                  </h2>
                  <div className="relative">
                    <div className="items-center">
                      <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="නව හිමිකරු සොයන්න (නම, NIC, හැඳුනුම්පත)"
                        className="w-full"
                      />
                    </div>
                    {filteredOwners.length > 0 && (
                      <div className="mt-2 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredOwners.map((owner) => (
                          <div
                            key={owner.id}
                            className={`p-3 hover:bg-blue-50 cursor-pointer ${
                              newOwner?.id === owner.id
                                ? "bg-blue-100"
                                : "bg-white"
                            }`}
                            onClick={() => {
                              setNewOwner(owner);
                              setSearchTerm(
                                `${owner.firstName} ${owner.lastName} (${owner.ownerId})`
                              );
                              setFilteredOwners([]);
                            }}
                          >
                            <p className="font-medium">
                              {owner.firstName} {owner.lastName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {owner.nic} | {owner.ownerId}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {newOwner && (
                    <div className="mt-4 p-4 bg-green-50 rounded-md">
                      <p className="font-medium">
                        {newOwner.firstName} {newOwner.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {newOwner.nic} | {newOwner.ownerId}
                      </p>
                      <p className="text-sm text-gray-600">
                        {newOwner.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        {newOwner.contactNo}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h2 className="text-lg font-medium text-gray-800 mb-2">
                    හුවමාරු දිනය
                  </h2>
                  <Input
                    type="datetime-local"
                    value={transferDate}
                    onChange={(e) => setTransferDate(e.target.value)}
                  />
                </div>

                <div className="flex justify-end pt-6">
                  <Button
                    onClick={handleTransfer}
                    loading={isLoading}
                    disabled={!newOwner}
                  >
                    {isLoading ? "සුරැකෙමින්..." : "හිමිකාරිත්‍ය ගෙනයන්න"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LandOwnershipTransfer;
