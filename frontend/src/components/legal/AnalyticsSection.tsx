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
  Scale,
  Gavel,
  BookOpen,
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
  const [selectedMetric, setSelectedMetric] = useState('cases');

  if (activeTab !== 'analytics') return null;

  // Mock analytics data for legal officer
  const caseResolutionTrends = [
    { month: 'ජන', cases: 28, resolved: 25, pending: 3, avgDays: 32 },
    { month: 'පෙබ', cases: 32, resolved: 30, pending: 2, avgDays: 28 },
    { month: 'මාර්', cases: 25, resolved: 22, pending: 3, avgDays: 35 },
    { month: 'අප්‍රේ', cases: 38, resolved: 35, pending: 3, avgDays: 30 },
    { month: 'මැයි', cases: 29, resolved: 27, pending: 2, avgDays: 26 },
    { month: 'ජුනි', cases: 34, resolved: 32, pending: 2, avgDays: 24 }
  ];

  const caseTypes = [
    { name: 'ඉඩම් සීමා ගැටළු', value: 40, color: '#3B82F6' },
    { name: 'හිමිකම් ගැටළු', value: 30, color: '#10B981' },
    { name: 'කොන්ත්‍රාක්ටු උල්ලංඝනය', value: 20, color: '#F59E0B' },
    { name: 'උරුම ගැටළු', value: 10, color: '#EF4444' }
  ];

  const resolutionMethods = [
    { method: 'සාකච්ඡාව', cases: 45, successRate: 85, avgDays: 15 },
    { method: 'මැදිහත්වීම', cases: 32, successRate: 78, avgDays: 25 },
    { method: 'අධිකරණ තීරණය', cases: 18, successRate: 92, avgDays: 45 },
    { method: 'බලහත්කාර නිරාකරණය', cases: 8, successRate: 95, avgDays: 60 }
  ];

  const legalPrecedentsUsage = [
    { category: 'ඉඩම් නීතිය', used: 45, available: 120, effectiveness: 88 },
    { category: 'කොන්ත්‍රාක්ටු නීතිය', used: 32, available: 85, effectiveness: 92 },
    { category: 'උරුම නීතිය', used: 28, available: 95, effectiveness: 85 },
    { category: 'සාමාන්‍ය නීතිය', used: 15, available: 150, effectiveness: 90 }
  ];

  const performanceMetrics = [
    { 
      title: 'මාසික නිරාකරණ ඉලක්කය',
      current: 32,
      target: 30,
      percentage: 107,
      trend: '+6.7%',
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'සාමාන්‍ය නිරාකරණ කාලය',
      current: '24 දින',
      target: '30 දින',
      percentage: 125,
      trend: '-6 දින',
      icon: Clock,
      color: 'from-green-500 to-green-600'
    },
    { 
      title: 'නිරාකරණ සාර්ථකත්ව අනුපාතය',
      current: '89.2%',
      target: '85%',
      percentage: 105,
      trend: '+4.2%',
      icon: Award,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'පාර්ශ්ව සතුටු මට්ටම',
      current: '4.6/5',
      target: '4.0/5',
      percentage: 115,
      trend: '+0.3',
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
    { value: 'cases', label: 'නීතිමය සිද්ධි' },
    { value: 'resolutions', label: 'නිරාකරණ' },
    { value: 'precedents', label: 'පූර්වාදර්ශ' },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">නීතිමය විශ්ලේෂණ ඩෑෂ්බෝඩ්</h2>
          <p className="text-gray-600">නීතිමය සිද්ධි සහ නිරාකරණ කාර්ය සාධනය</p>
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
        {/* Case Resolution Trends */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">නිරාකරණ ප්‍රවණතා</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={caseResolutionTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cases" fill="#8B5CF6" name="සිද්ධි" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="#10B981" name="නිරාකරණය" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#F59E0B" name="රැදී සිටින" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Case Types Distribution */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">සිද්ධි වර්ග බෙදාහැරීම</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={caseTypes}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {caseTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Resolution Methods Analysis */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">නිරාකරණ ක්‍රම විශ්ලේෂණය</h3>
          <Scale className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {resolutionMethods.map((method, index) => (
            <div key={method.method} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{method.method}</span>
                  <div className="flex items-center space-x-6">
                    <span className="text-sm text-gray-600">සිද්ධි: {method.cases}</span>
                    <span className="text-sm text-gray-600">සාර්ථකත්වය: {method.successRate}%</span>
                    <span className="text-sm text-gray-600">සාමාන්‍ය කාලය: {method.avgDays} දින</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${method.successRate}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Legal Precedents Usage */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">නීතිමය පූර්වාදර්ශ භාවිතය</h3>
          <BookOpen className="w-5 h-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">නීති ක්ෂේත්‍රය</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">භාවිත කළ</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">ලබා ගත හැකි</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">ප්‍රයෝජනවත්කම</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">භාවිත අනුපාතය</th>
              </tr>
            </thead>
            <tbody>
              {legalPrecedentsUsage.map((category, index) => (
                <tr key={category.category} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{category.category}</td>
                  <td className="py-3 px-4 text-center">{category.used}</td>
                  <td className="py-3 px-4 text-center">{category.available}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      category.effectiveness >= 90 ? 'bg-green-100 text-green-800' :
                      category.effectiveness >= 85 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {category.effectiveness}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${(category.used / category.available) * 100}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Items and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">නිර්දේශිත ක්‍රියාමාර්ග</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">සාකච්ඡා ක්‍රමය වැඩි දියුණු කරන්න</p>
                <p className="text-xs text-blue-700">85% සාර්ථකත්ව අනුපාතය වැඩි කළ හැකිය</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <BookOpen className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-purple-800">නව පූර්වාදර්ශ එක් කරන්න</p>
                <p className="text-xs text-purple-700">සාමාන්‍ය නීතිය ක්ෂේත්‍රයේ පූර්වාදර්ශ අඩුයි</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">නිරාකරණ කාලය ඉලක්කයට වඩා අඩු</p>
                <p className="text-xs text-green-700">කාර්යක්ෂමතාව විශිෂ්ට මට්ටමේ පවතී</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ඉක්මන් ක්‍රියාමාර්ග</h3>
          <div className="space-y-3">
            <Button variant="outline" icon={Download} className="w-full justify-start">
              මාසික නිරාකරණ වාර්තාව
            </Button>
            <Button variant="outline" icon={FileText} className="w-full justify-start">
              පූර්වාදර්ශ භාවිත වාර්තාව
            </Button>
            <Button variant="outline" icon={BarChart3} className="w-full justify-start">
              කාර්යක්ෂමතා මැනුම් වාර්තාව
            </Button>
            <Button variant="outline" icon={Scale} className="w-full justify-start">
              නීතිමය ප්‍රවණතා විශ්ලේෂණය
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default AnalyticsSection;