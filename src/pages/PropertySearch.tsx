import { useBlockchain } from '../contexts/BlockchainContext';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal,
  Grid3X3,
  List,
  Sparkles,
  TrendingUp,
  Users,
  Hash,
  AlertCircle,
  CheckCircle,
  Eye,
  ArrowRight,
  Map,
  BarChart3
} from 'lucide-react';
import Card from '../components/ui/Card';
import SearchInput from '../components/ui/SearchInput';
import Select from '../components/ui/Select';
import PropertyCard from '../components/property/PropertyCard';
import PropertyDetails from '../components/property/PropertyDetails';
import EmptyState from '../components/common/EmptyState';
import { useState } from 'react';

const PropertySearch = () => {
  const { properties } = useBlockchain();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [areaRange, setAreaRange] = useState({ min: '', max: '' });

  const filteredProperties = properties.filter(property => {
    const matchesSearch = 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.id.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (filterType === 'disputed') matchesFilter = property.disputes.length > 0;
    if (filterType === 'clean') matchesFilter = property.disputes.length === 0;
    if (filterType === 'recent') matchesFilter = Date.now() - property.registrationDate < 86400000 * 30;

    // Area filter
    if (areaRange.min && property.area < parseFloat(areaRange.min)) matchesFilter = false;
    if (areaRange.max && property.area > parseFloat(areaRange.max)) matchesFilter = false;

    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.registrationDate - a.registrationDate;
      case 'oldest':
        return a.registrationDate - b.registrationDate;
      case 'area-asc':
        return a.area - b.area;
      case 'area-desc':
        return b.area - a.area;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const filterOptions = [
    { value: 'all', label: 'සියලු ඉඩම්' },
    { value: 'clean', label: 'ගැටළු රහිත' },
    { value: 'disputed', label: 'ගැටළු සහිත' },
    { value: 'recent', label: 'මෑත කාලීන' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'නවතම' },
    { value: 'oldest', label: 'පැරණිතම' },
    { value: 'area-desc', label: 'ප්‍රමාණය (වැඩි)' },
    { value: 'area-asc', label: 'ප්‍රමාණය (අඩු)' },
    { value: 'name', label: 'නම අනුව' }
  ];

  const stats = [
    { label: 'මුළු ඉඩම්', value: properties.length, icon: Map, color: 'text-blue-600' },
    { label: 'ගැටළු රහිත', value: properties.filter(p => p.disputes.length === 0).length, icon: CheckCircle, color: 'text-green-600' },
    { label: 'ගැටළු සහිත', value: properties.filter(p => p.disputes.length > 0).length, icon: AlertCircle, color: 'text-red-600' },
    { label: 'මෑත කාලීන', value: properties.filter(p => Date.now() - p.registrationDate < 86400000 * 30).length, icon: TrendingUp, color: 'text-purple-600' }
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
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            බ්ලොක්චේන් ඉඩම් ගවේෂණය
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ඉඩම් සොයන්න
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ශ්‍රී ලංකාවේ සම්පූර්ණ බ්ලොක්චේන් ඉඩම් ලේඛනාගාරයේ ඉඩම් සොයන්න සහ සත්‍යාපනය කරන්න
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
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
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
                placeholder="ඉඩමේ නම, ස්ථානය, හිමිකරු හෝ ID අංකය ඇතුළත් කරන්න..."
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
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    උසස් ෆිල්ටර්
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {filteredProperties.length} ප්‍රතිඵල
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-blue-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-blue-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
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
                  animate={{ opacity: 1, height: 'auto' }}
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
                        onChange={(e) => setAreaRange({...areaRange, min: e.target.value})}
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
                        onChange={(e) => setAreaRange({...areaRange, max: e.target.value})}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="10.0"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => {
                          setAreaRange({ min: '', max: '' });
                          setPriceRange({ min: '', max: '' });
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
          {/* Property List */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                සෙවුම් ප්‍රතිඵල
              </h2>
              {filteredProperties.length > 0 && (
                <div className="text-sm text-gray-600">
                  {filteredProperties.length} න් {properties.length}
                </div>
              )}
            </div>
            
            {filteredProperties.length === 0 ? (
              <Card>
                <EmptyState
                  icon={Search}
                  title="ප්‍රතිඵල හමු නොවිය"
                  description="ඔබේ සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න"
                  action={{
                    label: "සියලු ඉඩම් බලන්න",
                    onClick: () => {
                      setSearchTerm('');
                      setFilterType('all');
                      setAreaRange({ min: '', max: '' });
                    }
                  }}
                />
              </Card>
            ) : (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-4'}`}>
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={viewMode === 'grid' ? 'h-full' : ''}
                  >
                    {viewMode === 'grid' ? (
                      <div className="h-full">
                        <PropertyCard
                          property={property}
                          onClick={() => setSelectedProperty(property)}
                        />
                      </div>
                    ) : (
                      <Card hover onClick={() => setSelectedProperty(property)} className="cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                              <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {property.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-1">{property.location}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{property.area} අක්කර</span>
                                <span>•</span>
                                <span>{property.owner}</span>
                                {property.disputes.length > 0 && (
                                  <>
                                    <span>•</span>
                                    <span className="text-red-600 flex items-center">
                                      <AlertCircle className="w-3 h-3 mr-1" />
                                      ගැටළු
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="inline-flex items-center px-3 py-1 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors">
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

          {/* Property Details Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              {selectedProperty ? (
                <PropertyDetails property={selectedProperty} />
              ) : (
                <Card>
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <MapPin className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">ඉඩමක් තෝරන්න</h3>
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
                      <div className="flex items-center justify-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>හිමිකරු තොරතුරු</span>
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