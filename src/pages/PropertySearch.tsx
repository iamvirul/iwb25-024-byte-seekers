import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Grid3X3,
  List,
  Sparkles,
  TrendingUp,
  Hash,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Map,
  BarChart3,
  Link,
} from "lucide-react";
import Card from "../components/ui/Card";
import SearchInput from "../components/ui/SearchInput";
import Select from "../components/ui/Select";
import EmptyState from "../components/common/EmptyState";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PropertySearch = () => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedLand, setSelectedLand] = useState<any>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [areaRange, setAreaRange] = useState({ min: "", max: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await fetch("/api/lands/all");
        const data = await response.json();
        if (data.success) {
          setLands(data.content.lands);
        } else {
          setError("Failed to fetch lands data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLands();
  }, []);

  const filteredLands = lands
    .filter((land) => {
      const matchesSearch =
        land.landName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        land.landPlace.toLowerCase().includes(searchTerm.toLowerCase()) ||
        land.landId.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesFilter = true;
      if (filterType === "disputed") matchesFilter = land.disputes.length > 0;
      if (filterType === "clean") matchesFilter = land.disputes.length === 0;
      if (filterType === "recent") {
        const registerDate = new Date(
          land.registerDate.year,
          land.registerDate.month - 1,
          land.registerDate.day
        );
        matchesFilter = Date.now() - registerDate.getTime() < 86400000 * 30;
      }

      // Area filter
      if (areaRange.min && land.landSize < parseFloat(areaRange.min))
        matchesFilter = false;
      if (areaRange.max && land.landSize > parseFloat(areaRange.max))
        matchesFilter = false;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(
        a.registerDate.year,
        a.registerDate.month - 1,
        a.registerDate.day
      );
      const dateB = new Date(
        b.registerDate.year,
        b.registerDate.month - 1,
        b.registerDate.day
      );

      switch (sortBy) {
        case "newest":
          return dateB.getTime() - dateA.getTime();
        case "oldest":
          return dateA.getTime() - dateB.getTime();
        case "area-asc":
          return a.landSize - b.landSize;
        case "area-desc":
          return b.landSize - a.landSize;
        case "name":
          return a.landName.localeCompare(b.landName);
        default:
          return 0;
      }
    });

  const filterOptions = [
    { value: "all", label: "සියලු ඉඩම්" },
    { value: "clean", label: "ගැටළු රහිත" },
    { value: "disputed", label: "ගැටළු සහිත" },
    { value: "recent", label: "මෑත කාලීන" },
  ];

  const sortOptions = [
    { value: "newest", label: "නවතම" },
    { value: "oldest", label: "පැරණිතම" },
    { value: "area-desc", label: "ප්‍රමාණය (වැඩි)" },
    { value: "area-asc", label: "ප්‍රමාණය (අඩු)" },
    { value: "name", label: "නම අනුව" },
  ];

  const stats = [
    {
      label: "මුළු ඉඩම්",
      value: lands.length,
      icon: Map,
      color: "text-blue-600",
    },
    {
      label: "ගැටළු රහිත",
      value: lands.filter((l) => l.disputes.length === 0).length,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "ගැටළු සහිත",
      value: lands.filter((l) => l.disputes.length > 0).length,
      icon: AlertCircle,
      color: "text-red-600",
    },
    {
      label: "මෑත කාලීන",
      value: lands.filter((l) => {
        const registerDate = new Date(
          l.registerDate.year,
          l.registerDate.month - 1,
          l.registerDate.day
        );
        return Date.now() - registerDate.getTime() < 86400000 * 30;
      }).length,
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const handleViewBlockchain = (landId) => {
    navigate(`/land/${landId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">ඉඩම් දත්ත ලබා ගැනීම...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            දත්ත ලබා ගැනීමේ දෝෂයක්
          </h3>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            නැවත උත්සාහ කරන්න
          </button>
        </div>
      </div>
    );
  }

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
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            බ්ලොක්චේන් ඉඩම් ගවේෂණය
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ඉඩම් සොයන්න
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ශ්‍රී ලංකාවේ සම්පූර්ණ බ්ලොක්චේන් ඉඩම් ලේඛනාගාරයේ ඉඩම් සොයන්න සහ
            සත්‍යාපනය කරන්න
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
              <Card key={stat.label} hover className="text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
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

        {/* Enhanced Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="mb-8">
            <div className="space-y-6">
              <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e)}
                placeholder="ඉඩමේ නම, ස්ථානය, හෝ ID අංකය ඇතුළත් කරන්න..."
                className="w-full"
                inputClassName="focus:ring-blue-500"
                icon={<Search className="h-6 w-6 text-gray-400" />}
              />

              {/* Filter Controls */}
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <div className="min-w-[200px]">
                    <Select
                      value={filterType}
                      onChange={setFilterType}
                      options={filterOptions}
                      placeholder="ෆිල්ටරය තෝරන්න"
                    />
                  </div>
                  <div className="min-w-[180px]">
                    <Select
                      value={sortBy}
                      onChange={setSortBy}
                      options={sortOptions}
                      placeholder="අනුපිළිවෙල"
                    />
                  </div>
                  <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className={`inline-flex items-center px-4 py-2 border rounded-lg transition-all duration-200 ${
                      showAdvancedFilters
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    උසස් ෆිල්ටර්
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {filteredLands.length} ප්‍රතිඵල
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "grid"
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "list"
                          ? "bg-blue-500 text-white"
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
                        අවම ප්‍රමාණය (අක්කර)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={areaRange.min}
                        onChange={(e) =>
                          setAreaRange({ ...areaRange, min: e.target.value })
                        }
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        උපරිම ප්‍රමාණය (අක්කර)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={areaRange.max}
                        onChange={(e) =>
                          setAreaRange({ ...areaRange, max: e.target.value })
                        }
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="10.0"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => {
                          setAreaRange({ min: "", max: "" });
                          setPriceRange({ min: "", max: "" });
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
          {/* Land List */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                සෙවුම් ප්‍රතිඵල
              </h2>
              {filteredLands.length > 0 && (
                <div className="text-sm text-gray-600">
                  {filteredLands.length} න් {lands.length}
                </div>
              )}
            </div>

            {filteredLands.length === 0 ? (
              <Card>
                <EmptyState
                  icon={Search}
                  title="ප්‍රතිඵල හමු නොවිය"
                  description="ඔබේ සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න"
                  action={{
                    label: "සියලු ඉඩම් බලන්න",
                    onClick: () => {
                      setSearchTerm("");
                      setFilterType("all");
                      setAreaRange({ min: "", max: "" });
                    },
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
                {filteredLands.map((land, index) => (
                  <motion.div
                    key={land.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={viewMode === "grid" ? "h-full" : ""}
                  >
                    {viewMode === "grid" ? (
                      <div className="h-full">
                        <Card
                          hover
                          onClick={() => setSelectedLand(land)}
                          className="cursor-pointer h-full group transition-all duration-200 hover:shadow-lg"
                        >
                          <div className="p-4 h-full flex flex-col">
                            <div className="w-full h-40 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 overflow-hidden relative">
                              <MapPin className="w-10 h-10 text-white z-10" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                              {land.landName}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                              {land.landPlace}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3 flex-wrap gap-2">
                              <span className="bg-gray-100 px-2 py-1 rounded-md">
                                {land.landSize} අක්කර
                              </span>
                              <span className="bg-gray-100 px-2 py-1 rounded-md">
                                රු. {land.landValue.toLocaleString()}
                              </span>
                              {land.disputes.length > 0 && (
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md flex items-center">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  ගැටළු
                                </span>
                              )}
                            </div>
                            <div className="mt-auto flex justify-between items-center pt-2 border-t border-gray-100">
                              <span className="text-xs text-gray-500 font-mono">
                                ID: {land.landId.substring(0, 8)}...
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewBlockchain(land.id);
                                }}
                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center transition-colors"
                              >
                                <Link className="w-4 h-4 mr-1" />
                                බ්ලොක්චේන්
                              </button>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ) : (
                      <Card
                        hover
                        onClick={() => setSelectedLand(land)}
                        className="cursor-pointer group transition-all duration-200 hover:shadow-lg"
                      >
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden">
                              <MapPin className="w-8 h-8 text-white z-10" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                                {land.landName}
                              </h3>
                              <p className="text-gray-600 text-sm mb-1 truncate">
                                {land.landPlace}
                              </p>
                              <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500">
                                <span className="bg-gray-100 px-2 py-1 rounded-md">
                                  {land.landSize} අක්කර
                                </span>
                                <span className="bg-gray-100 px-2 py-1 rounded-md">
                                  රු. {land.landValue.toLocaleString()}
                                </span>
                                {land.disputes.length > 0 && (
                                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    ගැටළු
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewBlockchain(land.id);
                              }}
                              className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors hover:border-blue-400"
                            >
                              <Link className="w-4 h-4 mr-1.5" />
                              බ්ලොක්චේන්
                            </button>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                          </div>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Land Details Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              {selectedLand ? (
                <Card>
                  <div className="p-6">
                    <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                      <MapPin className="w-12 h-12 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedLand.landName}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {selectedLand.landPlace}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">ප්‍රමාණය</p>
                        <p className="font-medium">
                          {selectedLand.landSize} අක්කර
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">වටිනාකම</p>
                        <p className="font-medium">
                          රු. {selectedLand.landValue.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">වර්ගය</p>
                        <p className="font-medium">{selectedLand.landType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">තත්වය</p>
                        <p
                          className={`font-medium ${
                            selectedLand.landStatus === "VERIFIED"
                              ? "text-green-600"
                              : selectedLand.landStatus === "PENDING"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {selectedLand.landStatus}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        ලියාපදිංචි දිනය
                      </h4>
                      <p className="font-medium">
                        {selectedLand.registerDate.year}-
                        {selectedLand.registerDate.month}-
                        {selectedLand.registerDate.day}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        භූගෝලීය ඛණ්ඩාංක
                      </h4>
                      <p className="font-medium">
                        {selectedLand.landLat}, {selectedLand.landLang}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => handleViewBlockchain(selectedLand.id)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Link className="w-4 h-4 mr-2" />
                        බ්ලොක්චේන් බැලීම
                      </button>

                      {selectedLand.disputes.length > 0 && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center text-red-600">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            <span className="font-medium">
                              මෙම ඉඩම සම්බන්ධ ගැටළු{" "}
                              {selectedLand.disputes.length}ක් පවතී
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ) : (
                <Card>
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <MapPin className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      ඉඩමක් තෝරන්න
                    </h3>
                    <p className="text-gray-600 mb-6">
                      විස්තර බැලීමට ඉඩමක් මත ක්ලික් කරන්න
                    </p>
                    <div className="space-y-3 text-sm text-gray-500">
                      <div className="flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        <span>සම්පූර්ණ ඉඩම් විස්තර</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Hash className="w-4 h-4 mr-2" />
                        <span>බ්ලොක්චේන් සත්‍යාපනය</span>
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

export default PropertySearch;
