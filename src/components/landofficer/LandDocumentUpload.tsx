import React, { useState } from "react";
import { FileText, X, Search, MapPin } from "lucide-react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import PageHeader from "../common/PageHeader";

interface Land {
  id: number;
  landId: string;
  landName: string;
  landPlace: string;
}

interface LandDocumentUploadProps {
  lands: Land[];
  activeTab: string;
}

const LandDocumentUpload: React.FC<LandDocumentUploadProps> = ({
  activeTab,
  lands,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLands, setFilteredLands] = useState<Land[]>([]);
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);
  const [formData, setFormData] = useState({
    documents: [] as File[],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  React.useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = lands.filter(
        (land) =>
          land.landId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          land.landName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          land.landPlace.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLands(filtered);
    } else {
      setFilteredLands([]);
    }
  }, [searchTerm, lands]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    // Validate file types and size
    const validFiles = newFiles.filter((file) => {
      const validTypes = [
        "image/png",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

      if (!isValidType) {
        setError(`File type not allowed: ${file.name}`);
        return false;
      }
      if (!isValidSize) {
        setError(`File too large (max 10MB): ${file.name}`);
        return false;
      }
      return true;
    });

    setFormData({
      ...formData,
      documents: [...formData.documents, ...validFiles],
    });
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...formData.documents];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData, documents: updatedFiles });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedLand) {
      setError("Please select a land");
      return;
    }

    if (formData.documents.length === 0) {
      setError("Please select at least one document");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      formData.documents.forEach((file) => {
        formDataToSend.append("documents", file);
      });

      const response = await fetch(
        `/api/land_officer/land/documents/add/${selectedLand.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload documents");
      }

      setSuccess("Documents uploaded successfully!");
      setFormData({ documents: [] });
      setSelectedLand(null);
      setSearchTerm("");
    } catch (err) {
      setError((err as Error).message);
    }
  };
  if (activeTab !== "documents") return null;
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div>
        <PageHeader
          title="ඉඩම් ලියාපදිංචි ලේඛන අප්ලෝඩ් කිරීම"
          description="පද්ධතිය තුළ නව ඉඩම් ලේඛන අප්ලෝඩ් කිරීම."
          icon={MapPin}
        />

        <Card>
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-medium text-blue-600 mb-4">
                ඉඩම් සොයන්න
              </h2>
              <div className="relative">
                <div className="">
                  <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ඉඩම් හැඳුනුම්පත හෝ නම ඇතුළත් කරන්න"
                    className="w-full"
                  />
                </div>
                {filteredLands.length > 0 && (
                  <div className="mt-2 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredLands.map((land) => (
                      <div
                        key={land.id}
                        className={`p-3 hover:bg-blue-50 cursor-pointer ${
                          selectedLand?.id === land.id
                            ? "bg-blue-100"
                            : "bg-white"
                        }`}
                        onClick={() => {
                          setSelectedLand(land);
                          setFilteredLands([]);
                          setSearchTerm(`${land.landName} - ${land.landId}`);
                        }}
                      >
                        <p className="font-medium text-blue-800">
                          {land.landName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {land.landPlace} - {land.landId}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedLand && (
                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                  <p className="font-medium text-blue-800">
                    තෝරාගත් ඉඩම: {selectedLand.landName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedLand.landPlace} - {selectedLand.landId}
                  </p>
                </div>
              )}
            </div>

            {selectedLand && (
              <div>
                <label
                  htmlFor="documents"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  සහාය ලේඛන (බහු තේරීම්)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors bg-gradient-to-br from-gray-50 to-blue-50/30">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    id="documents"
                    multiple
                    accept=".pdf,.docx,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="documents" className="cursor-pointer">
                    <span className="text-lg font-medium text-blue-600 hover:text-blue-500">
                      ලේඛන තෝරන්න
                    </span>
                    <span className="text-gray-500"> හෝ මෙහි ඇද දමන්න</span>
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    PDF, DOCX, PNG (උපරිම 10MB එක් එක් ගොනුව සඳහා)
                  </p>
                  {formData.documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.documents.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200"
                        >
                          <p className="text-sm text-gray-700 font-medium">
                            {file.name}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

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

            {selectedLand && (
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={formData.documents.length === 0}
                >
                  ලේඛන අප්ලෝඩ් කරන්න
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LandDocumentUpload;
