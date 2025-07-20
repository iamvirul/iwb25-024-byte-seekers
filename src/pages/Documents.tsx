import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Download,
  Eye,
  Calendar,
  Hash,
  CheckCircle,
  AlertCircle,
  Zap,
  SlidersHorizontal,
  Grid3X3,
  List,
  TrendingUp,
  ArrowRight,
  BarChart3,
  Cpu,
  Database,
  Shield,
} from "lucide-react";
import Card from "../components/ui/Card";
import EmptyState from "../components/common/EmptyState";
import SearchInput from "../components/ui/SearchInput";

const Documents = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([
    {
      id: "DOC001",
      name: "කොළොන්නාව ඉඩම් ඔප්පුව",
      type: "deed",
      size: "2.4 MB",
      uploadDate: Date.now() - 86400000 * 30,
      propertyId: "PROP001",
      status: "verified",
      nlpAnalysis: {
        language: "sinhala",
        confidence: 0.95,
        entities: [
          { type: "PROPERTY", value: "කොළොන්නාව ඉඩම" },
          { type: "OWNERSHIP", value: "සුනිල් සිල්වා" },
          { type: "AREA", value: "2.5 අක්කර" },
        ],
        summary: "කොළොන්නාව ප්‍රදේශයේ 2.5 අක්කර ඉඩමක හිමිකම් ඔප්පුව",
        keywords: ["ඉඩම", "හිමිකම", "ඔප්පුව", "කොළොන්නාව"],
      },
    },
    {
      id: "DOC002",
      name: "සර්වේ වාර්තාව",
      type: "survey",
      size: "1.8 MB",
      uploadDate: Date.now() - 86400000 * 15,
      propertyId: "PROP001",
      status: "processing",
      nlpAnalysis: null,
    },
    {
      id: "DOC003",
      name: "ගම්පහ වත්ත ඔප්පුව",
      type: "deed",
      size: "3.2 MB",
      uploadDate: Date.now() - 86400000 * 45,
      propertyId: "PROP002",
      status: "verified",
      nlpAnalysis: {
        language: "sinhala",
        confidence: 0.92,
        entities: [
          { type: "PROPERTY", value: "ගම්පහ වත්ත" },
          { type: "OWNERSHIP", value: "මාලිනී ජයවර්ධන" },
          { type: "AREA", value: "1.8 අක්කර" },
        ],
        summary: "ගම්පහ ප්‍රදේශයේ 1.8 අක්කර වත්තක හිමිකම් ඔප්පුව",
        keywords: ["වත්ත", "හිමිකම", "ඔප්පුව", "ගම්පහ"],
      },
    },
    {
      id: "DOC004",
      name: "කුලී ගිණුම",
      type: "contract",
      size: "1.1 MB",
      uploadDate: Date.now() - 86400000 * 7,
      propertyId: "PROP002",
      status: "verified",
      nlpAnalysis: {
        language: "sinhala",
        confidence: 0.88,
        entities: [
          { type: "CONTRACT", value: "කුලී ගිණුම" },
          { type: "DURATION", value: "6 මාස" },
          { type: "AMOUNT", value: "25000 රුපියල්" },
        ],
        summary:
          "මාසික 25000 රුපියල් කුලියට 6 මාස කාලයක් සඳහා වලංගු කුලී ගිණුම",
        keywords: ["කුලිය", "ගිණුම", "මාසික", "කාලය"],
      },
    },
  ]);

  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    propertyId: "",
    type: "deed",
    file: null as File | null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDocuments = documents
    .filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.propertyId.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesFilter = true;
      if (filterType !== "all") matchesFilter = doc.type === filterType;
      if (statusFilter !== "all")
        matchesFilter = matchesFilter && doc.status === statusFilter;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.uploadDate - a.uploadDate;
        case "oldest":
          return a.uploadDate - b.uploadDate;
        case "name":
          return a.name.localeCompare(b.name);
        case "size":
          return parseFloat(b.size) - parseFloat(a.size);
        default:
          return 0;
      }
    });

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.file) return;

    // Simulate file upload and NLP processing
    const newDocument = {
      id: "DOC" + (documents.length + 1).toString().padStart(3, "0"),
      name: uploadData.file.name,
      type: uploadData.type,
      size: (uploadData.file.size / (1024 * 1024)).toFixed(1) + " MB",
      uploadDate: Date.now(),
      propertyId: uploadData.propertyId,
      status: "processing",
      nlpAnalysis: null,
    };

    setDocuments([...documents, newDocument]);
    setUploadData({ propertyId: "", type: "deed", file: null });
    setShowUpload(false);

    // Simulate NLP processing completion after 3 seconds
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === newDocument.id
            ? {
                ...doc,
                status: "verified",
                nlpAnalysis: {
                  language: "sinhala",
                  confidence: 0.92,
                  entities: [
                    { type: "PROPERTY", value: "ඉඩම" },
                    { type: "DOCUMENT", value: "ලේඛනය" },
                  ],
                  summary: "ලේඛනය සාර්ථකව විශ්ලේෂණය කර ඇත",
                  keywords: ["ඉඩම", "ලේඛනය", "සත්‍යාපනය"],
                },
              }
            : doc
        )
      );
    }, 3000);

    alert("ලේඛනය සාර්ථකව උඩුගත කරන ලදී");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            සත්‍යාපිතයි
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Zap className="w-3 h-3 mr-1" />
            NLP විශ්ලේෂණය
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            අසාර්ථකයි
          </span>
        );
      default:
        return null;
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case "deed":
        return "ඔප්පුව";
      case "survey":
        return "සර්වේ වාර්තාව";
      case "contract":
        return "කොන්ත්‍රාක්ටුව";
      case "other":
        return "වෙනත්";
      default:
        return type;
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "deed":
        return <Shield className="w-5 h-5 text-blue-600" />;
      case "survey":
        return <BarChart3 className="w-5 h-5 text-green-600" />;
      case "contract":
        return <FileText className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("si-LK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stats = [
    {
      label: "මුළු ලේඛන",
      value: documents.length,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      label: "සත්‍යාපිත",
      value: documents.filter((d) => d.status === "verified").length,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "AI විශ්ලේෂණය",
      value: documents.filter((d) => d.nlpAnalysis).length,
      icon: Cpu,
      color: "text-purple-600",
    },
    {
      label: "මෑත කාලීන",
      value: documents.filter((d) => Date.now() - d.uploadDate < 86400000 * 7)
        .length,
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const filterOptions = [
    { value: "all", label: "සියලු ලේඛන" },
    { value: "deed", label: "ඔප්පු" },
    { value: "survey", label: "සර්වේ වාර්තා" },
    { value: "contract", label: "කොන්ත්‍රාක්ටු" },
    { value: "other", label: "වෙනත්" },
  ];

  const sortOptions = [
    { value: "newest", label: "නවතම" },
    { value: "oldest", label: "පැරණිතම" },
    { value: "name", label: "නම අනුව" },
    { value: "size", label: "ප්‍රමාණය අනුව" },
  ];

  const statusOptions = [
    { value: "all", label: "සියලු තත්ත්වයන්" },
    { value: "verified", label: "සත්‍යාපිත" },
    { value: "processing", label: "විශ්ලේෂණය වෙමින්" },
    { value: "failed", label: "අසාර්ථක" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-full text-sm font-medium text-purple-700 mb-6">
            <Zap className="w-4 h-4 mr-2" />
            සිංහල NLP සහිත ස්මාර්ට් ලේඛන විශ්ලේෂණය
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ලේඛන කළමනාකරණය
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI තාක්ෂණයෙන් ශක්තිමත් කරන ලද ස්මාර්ට් ලේඛන විශ්ලේෂණය සහ කළමනාකරණය
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} hover className="text-center h-full">
                <div className="flex flex-col items-center h-full justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </Card>
            );
          })}
        </motion.div>

        {/* Upload Button */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-end mb-8"
          >
            <button
              onClick={() => setShowUpload(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Upload className="w-5 h-5 mr-2" />
              ලේඛනය උඩුගත කරන්න
            </button>
          </motion.div>
        )}

        {/* Upload Form */}
        {showUpload && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                නව ලේඛනයක් උඩුගත කරන්න
              </h2>

              <form onSubmit={handleFileUpload} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="propertyId"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      ඉඩම් ID
                    </label>
                    <input
                      type="text"
                      id="propertyId"
                      value={uploadData.propertyId}
                      onChange={(e) =>
                        setUploadData({
                          ...uploadData,
                          propertyId: e.target.value,
                        })
                      }
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="PROP001"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      ලේඛන වර්ගය
                    </label>
                    <select
                      id="type"
                      value={uploadData.type}
                      onChange={(e) =>
                        setUploadData({ ...uploadData, type: e.target.value })
                      }
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="deed">ඔප්පුව</option>
                      <option value="survey">සර්වේ වාර්තාව</option>
                      <option value="contract">කොන්ත්‍රාක්ටුව</option>
                      <option value="other">වෙනත්</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="file"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    ලේඛනය
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors bg-gradient-to-br from-gray-50 to-purple-50/30">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      id="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        setUploadData({
                          ...uploadData,
                          file: e.target.files?.[0] || null,
                        })
                      }
                      className="hidden"
                      required
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      <span className="text-lg font-medium text-purple-600 hover:text-purple-500">
                        ලේඛනය තෝරන්න
                      </span>
                      <span className="text-gray-500"> හෝ මෙහි ඇද දමන්න</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      PDF, DOC, DOCX, JPG, PNG (උපරිම 10MB)
                    </p>
                    {uploadData.file && (
                      <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                        <p className="text-sm text-gray-700 font-medium">
                          තෝරාගත් ලේඛනය: {uploadData.file.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <Zap className="w-6 h-6 text-purple-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-purple-800 mb-2">
                        සිංහල NLP විශ්ලේෂණය
                      </h4>
                      <p className="text-purple-700 leading-relaxed">
                        ඔබේ ලේඛනය උඩුගත කිරීමෙන් පසු, අපගේ AI පද්ධතිය සිංහල
                        භාෂාවේ අන්තර්ගතය විශ්ලේෂණය කර වැදගත් තොරතුරු නිස්සාරණය
                        කරයි.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        <div className="flex items-center text-sm text-purple-600">
                          <Database className="w-4 h-4 mr-2" />
                          <span>ආයතන හඳුනාගැනීම</span>
                        </div>
                        <div className="flex items-center text-sm text-purple-600">
                          <Cpu className="w-4 h-4 mr-2" />
                          <span>මූල පද නිස්සාරණය</span>
                        </div>
                        <div className="flex items-center text-sm text-purple-600">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          <span>සාරාංශ සෑදීම</span>
                        </div>
                        <div className="flex items-center text-sm text-purple-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>ස්වයංක්‍රීය සත්‍යාපනය</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowUpload(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    අවලංගු කරන්න
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-colors"
                  >
                    උඩුගත කරන්න
                  </button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Enhanced Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="mb-8">
            <div className="space-y-6">
              <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e)}
                placeholder="ලේඛන නම හෝ ඉඩම් ID ඇතුළත් කරන්න..."
                inputClassName="focus:ring-purple-500"
                className="w-full"
              />

              {/* Filter Controls */}
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <div className="min-w-[180px]">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {filterOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="min-w-[150px]">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className={`inline-flex items-center px-4 py-2 border rounded-lg transition-all duration-200 ${
                      showAdvancedFilters
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    උසස් ෆිල්ටර්
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {filteredDocuments.length} ප්‍රතිඵල
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "grid"
                          ? "bg-purple-500 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "list"
                          ? "bg-purple-500 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 pt-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        තත්ත්වය
                      </label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => {
                          setFilterType("all");
                          setStatusFilter("all");
                          setSearchTerm("");
                        }}
                        className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        ෆිල්ටර් ඉවත් කරන්න
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Results Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Documents List */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">ලේඛන</h2>
              {filteredDocuments.length > 0 && (
                <div className="text-sm text-gray-600">
                  {filteredDocuments.length} න් {documents.length}
                </div>
              )}
            </div>

            {filteredDocuments.length === 0 ? (
              <Card>
                <EmptyState
                  icon={FileText}
                  title="ලේඛන හමු නොවිය"
                  description="ඔබේ සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න"
                  action={{
                    label: "නව ලේඛනයක් උඩුගත කරන්න",
                    onClick: () => setShowUpload(true),
                  }}
                />
              </Card>
            ) : (
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-1 lg:grid-cols-2 gap-4"
                    : "space-y-4"
                }`}
              >
                {filteredDocuments.map((document, index) => (
                  <motion.div
                    key={document.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={viewMode === "grid" ? "h-full" : ""}
                  >
                    {viewMode === "grid" ? (
                      <div className="h-full">
                        <Card
                          hover
                          onClick={() => setSelectedDocument(document)}
                          className="cursor-pointer h-full flex flex-col"
                        >
                          <div className="flex items-start justify-between flex-1">
                            <div className="flex items-start space-x-3 flex-1 min-w-0">
                              <div className="flex-shrink-0">
                                {getDocumentIcon(document.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                                  {document.name}
                                </h3>
                                <div className="space-y-1 text-sm text-gray-600 mb-4">
                                  <div>
                                    වර්ගය: {getDocumentTypeLabel(document.type)}
                                  </div>
                                  <div>ඉඩම්: {document.propertyId}</div>
                                  <div>ප්‍රමාණය: {document.size}</div>
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {formatDate(document.uploadDate)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <div>{getStatusBadge(document.status)}</div>
                            <button className="inline-flex items-center px-3 py-1 border border-purple-300 text-purple-700 rounded-md hover:bg-purple-50 transition-colors">
                              <Eye className="w-4 h-4 mr-1" />
                              විස්තර
                            </button>
                          </div>
                        </Card>
                      </div>
                    ) : (
                      <Card
                        hover
                        onClick={() => setSelectedDocument(document)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                              {getDocumentIcon(document.type)}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {document.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-1">
                                {getDocumentTypeLabel(document.type)} •{" "}
                                {document.propertyId}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{document.size}</span>
                                <span>•</span>
                                <span>{formatDate(document.uploadDate)}</span>
                                <span>•</span>
                                {getStatusBadge(document.status)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="inline-flex items-center px-3 py-1 border border-purple-300 text-purple-700 rounded-md hover:bg-purple-50 transition-colors">
                              <Eye className="w-4 h-4 mr-1" />
                              විස්තර
                            </button>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Document Details Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              {selectedDocument ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      ලේඛන විස්තර
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {selectedDocument.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">ID:</span>
                            <span className="ml-2 font-medium">
                              {selectedDocument.id}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">ප්‍රමාණය:</span>
                            <span className="ml-2 font-medium">
                              {selectedDocument.size}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          ලේඛන තොරතුරු
                        </h4>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">වර්ගය:</span>
                            <span className="ml-2">
                              {getDocumentTypeLabel(selectedDocument.type)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">ඉඩම් ID:</span>
                            <span className="ml-2">
                              {selectedDocument.propertyId}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">උඩුගත දිනය:</span>
                            <span className="ml-2">
                              {formatDate(selectedDocument.uploadDate)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">තත්ත්වය:</span>
                            <span className="ml-2">
                              {getStatusBadge(selectedDocument.status)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {selectedDocument.nlpAnalysis && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-purple-600" />
                            NLP විශ්ලේෂණ ප්‍රතිඵල
                          </h4>
                          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4 space-y-3">
                            <div>
                              <span className="text-sm text-purple-700 font-medium">
                                සාරාංශය:
                              </span>
                              <p className="text-sm text-purple-600 mt-1">
                                {selectedDocument.nlpAnalysis.summary}
                              </p>
                            </div>

                            <div>
                              <span className="text-sm text-purple-700 font-medium">
                                හඳුනාගත් ආයතන:
                              </span>
                              <div className="mt-1 space-y-1">
                                {selectedDocument.nlpAnalysis.entities.map(
                                  (entity: any, index: number) => (
                                    <div
                                      key={index}
                                      className="text-sm text-purple-600"
                                    >
                                      <span className="font-medium">
                                        {entity.type}:
                                      </span>{" "}
                                      {entity.value}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            <div>
                              <span className="text-sm text-purple-700 font-medium">
                                මූල පද:
                              </span>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {selectedDocument.nlpAnalysis.keywords.map(
                                  (keyword: string, index: number) => (
                                    <span
                                      key={index}
                                      className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
                                    >
                                      {keyword}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>

                            <div>
                              <span className="text-sm text-purple-700 font-medium">
                                විශ්වසනීයත්වය:
                              </span>
                              <span className="ml-2 text-sm text-purple-600">
                                {(
                                  selectedDocument.nlpAnalysis.confidence * 100
                                ).toFixed(1)}
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors">
                          <Download className="w-4 h-4 mr-2" />
                          බාගන්න
                        </button>
                        <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          <Eye className="w-4 h-4 mr-2" />
                          පෙරදසුන
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <Card>
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-10 h-10 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      ලේඛනයක් තෝරන්න
                    </h3>
                    <p className="text-gray-600 mb-6">
                      විස්තර බැලීමට ලේඛනයක් මත ක්ලික් කරන්න
                    </p>
                    <div className="space-y-3 text-sm text-gray-500">
                      <div className="flex items-center justify-center">
                        <Zap className="w-4 h-4 mr-2" />
                        <span>AI විශ්ලේෂණ ප්‍රතිඵල</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Hash className="w-4 h-4 mr-2" />
                        <span>බ්ලොක්චේන් සත්‍යාපනය</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Database className="w-4 h-4 mr-2" />
                        <span>ලේඛන මෙටාඩේටා</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
