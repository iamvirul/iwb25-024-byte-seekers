import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  PieChart,
  LineChart,
  Users,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Target,
  Award,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  LineChart as RechartsLineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Select from '../ui/Select';

interface AnalyticsSectionProps {
  activeTab: string;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ activeTab }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('registrations');

  if (activeTab !== 'analytics') return null;

  // Mock analytics data
  const registrationTrends = [
    { month: 'ජන', registrations: 45, verifications: 42, rejections: 3 },
    { month: 'පෙබ', registrations: 52, verifications: 48, rejections: 4 },
    { month: 'මාර්', registrations: 38, verifications: 35, rejections: 3 },
    { month: 'අප්‍රේ', registrations: 61, verifications: 58, rejections: 3 },
    { month: 'මැයි', registrations: 49, verifications: 46, rejections: 3 },
    { month: 'ජුනි', registrations: 55, verifications: 52, rejections: 3 }
  ];

  const propertyTypes = [
    { name: 'නේවාසික', value: 45, color: '#3B82F6' },
    { name: 'වාණිජ', value: 25, color: '#10B981' },
    { name: 'කෘෂිකාර්මික', value: 20, color: '#F59E0B' },
    { name: 'කාර්මික', value: 10, color: '#EF4444' }
  ];

  const processingTimes = [
    { stage: 'ලේඛන පරීක්ෂණය', avgDays: 3.2, target: 3 },
    { stage: 'සත්‍යාපනය', avgDays: 5.1, target: 5 },
    { stage: 'සර්වේ', avgDays: 7.8, target: 7 },
    { stage: 'අනුමතිය', avgDays: 2.1, target: 2 },
    { stage: 'ලියාපදිංචිය', avgDays: 1.5, target: 1 }
  ];

  const locationStats = [
    { district: 'කොළඹ', registrations: 125, disputes: 8, efficiency: 94 },
    { district: 'ගම්පහ', registrations: 98, disputes: 5, efficiency: 96 },
    { district: 'කළුතර', registrations: 87, disputes: 12, efficiency: 88 },
    { district: 'කුරුණෑගල', registrations: 76, disputes: 6, efficiency: 92 },
    { district: 'අනුරාධපුර', registrations: 65, disputes: 4, efficiency: 95 }
  ];

  const performanceMetrics = [
    { 
      title: 'මාසික ලියාපදිංචි ඉලක්කය',
      current: 55,
      target: 60,
      percentage: 92,
      trend: '+8%',
      icon: Target,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'සාමාන්‍ය සැකසුම් කාලය',
      current: '12.5 දින',
      target: '15 දින',
      percentage: 83,
      trend: '-2.3 දින',
      icon: Clock,
      color: 'from-green-500 to-green-600'
    },
    { 
      title: 'ගුණාත්මක ලකුණු',
      current: '94.2%',
      target: '90%',
      percentage: 105,
      trend: '+2.1%',
      icon: Award,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'පාරිභෝගික සතුටු',
      current: '4.7/5',
      target: '4.5/5',
      percentage: 104,
      trend: '+0.2',
      icon: Users,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const periodOptions = [
    { value: '3months', label: 'පසුගිය 3 මාස' },
    { value: '6months', label: 'පසුගිය 6 මාස' },
    { value: '1year', label: 'පසුගිය වර්ෂය' },
    { value: '2years', label: 'පසුගිය 2 වර්ෂ' }
  ];

  const metricOptions = [
    { value: 'registrations', label: 'ලියාපදිංචි කිරීම්' },
    { value: 'verifications', label: 'සත්‍යාපන' },
    { value: 'disputes', label: 'ගැටළු' },
    { value: 'efficiency', label: 'කාර්යක්ෂමතාව' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">විශ්ලේෂණ ඩෑෂ්බෝඩ්</h2>
          <p className="text-gray-600">ඉඩම් ලියාපදිංචි කිරීම් සහ සත්‍යාපන කාර්ය සාධනය</p>
        </div>
        <div className="flex gap-3">
          <Select
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            options={periodOptions}
          />
          <Select
            value={selectedMetric}
            onChange={setSelectedMetric}
            options={metricOptions}
          />
          <Button variant="outline" icon={Download}>
            වාර්තාව
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{metric.current}</div>
                    <div className="text-sm text-gray-500">ඉලක්කය: {metric.target}</div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{metric.title}</span>
                    <span className="font-medium">{metric.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${metric.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${Math.min(metric.percentage, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ප්‍රගතිය</span>
                  <span className="text-sm font-medium text-green-600">{metric.trend}</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registration Trends */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">ලියාපදිංචි ප්‍රවණතා</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={registrationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="registrations" fill="#3B82F6" name="ලියාපදිංචි" radius={[4, 4, 0, 0]} />
              <Bar dataKey="verifications" fill="#10B981" name="සත්‍යාපන" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rejections" fill="#EF4444" name="ප්‍රතික්ෂේප" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Property Types Distribution */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">ඉඩම් වර්ග බෙදාහැරීම</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={propertyTypes}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {propertyTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Processing Times Analysis */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">සැකසුම් කාල විශ්ලේෂණය</h3>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {processingTimes.map((stage, index) => (
            <div key={stage.stage} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{stage.stage}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">සාමාන්‍ය: {stage.avgDays} දින</span>
                    <span className="text-sm text-gray-600">ඉලක්කය: {stage.target} දින</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      stage.avgDays <= stage.target ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((stage.avgDays / stage.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Location-wise Statistics */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">දිස්ත්‍රික්කය අනුව සංඛ්‍යාලේඛන</h3>
          <MapPin className="w-5 h-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">දිස්ත්‍රික්කය</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">ලියාපදිංචි</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">ගැටළු</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">කාර්යක්ෂමතාව</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">ප්‍රගතිය</th>
              </tr>
            </thead>
            <tbody>
              {locationStats.map((location, index) => (
                <tr key={location.district} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{location.district}</td>
                  <td className="py-3 px-4 text-center">{location.registrations}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      location.disputes <= 5 ? 'bg-green-100 text-green-800' :
                      location.disputes <= 10 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {location.disputes}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">{location.efficiency}%</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${location.efficiency}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">නිර්දේශිත ක්‍රියාමාර්ග</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">කළුතර දිස්ත්‍රික්කයේ ගැටළු වැඩි</p>
                <p className="text-xs text-yellow-700">අමතර සම්පත් ලබා දීම සලකා බලන්න</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">සර්වේ කාලය වැඩි කිරීම</p>
                <p className="text-xs text-blue-700">සර්වේ කණ්ඩායම් වැඩි කිරීම අවශ්‍යයි</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">ගම්පහ දිස්ත්‍රික්කයේ කාර්ය සාධනය විශිෂ්ට</p>
                <p className="text-xs text-green-700">මෙම ක්‍රමවේදය අනෙකුත් ප්‍රදේශවලට ව්‍යාප්ත කරන්න</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ඉක්මන් ක්‍රියාමාර්ග</h3>
          <div className="space-y-3">
            <Button variant="outline" icon={Download} className="w-full justify-start">
              මාසික කාර්ය සාධන වාර්තාව
            </Button>
            <Button variant="outline" icon={FileText} className="w-full justify-start">
              ගැටළු විශ්ලේෂණ වාර්තාව
            </Button>
            <Button variant="outline" icon={BarChart3} className="w-full justify-start">
              කාර්යක්ෂමතා මැනුම් වාර්තාව
            </Button>
            <Button variant="outline" icon={Users} className="w-full justify-start">
              කාර්ය මණ්ඩල කාර්ය සාධන වාර්තාව
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default AnalyticsSection;