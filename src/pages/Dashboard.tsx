import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBlockchain } from '../contexts/BlockchainContext';
import { motion } from 'framer-motion';
import { 
  MapPin, Activity, AlertCircle, TrendingUp, 
  BarChart3, Clock, CheckCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Dashboard = () => {
  const { user } = useAuth();
  const { properties, transactions, disputes } = useBlockchain();

  const userProperties = properties.filter(p => p.ownerId === user?.slUdiId);
  const userTransactions = transactions.filter(t => t.to === user?.slUdiId || t.from === user?.slUdiId);
  const userDisputes = disputes.filter(d => d.complainant === user?.name || d.defendant === user?.name);

  const stats = [
    {
      title: 'මගේ ඉඩම්',
      value: userProperties.length.toString(),
      icon: MapPin,
      color: 'from-blue-500 to-blue-600',
      change: '+2'
    },
    {
      title: 'ගනුදෙනු',
      value: userTransactions.length.toString(),
      icon: Activity,
      color: 'from-green-500 to-green-600',
      change: '+5'
    },
    {
      title: 'ගැටළු',
      value: userDisputes.length.toString(),
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600',
      change: '0'
    },
    {
      title: 'සම්පූර්ණ වටිනාකම',
      value: '₨ 2.5M',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      change: '+12%'
    }
  ];

  const monthlyData = [
    { name: 'ජන', registrations: 4, transactions: 2 },
    { name: 'පෙබ', registrations: 3, transactions: 4 },
    { name: 'මාර්', registrations: 6, transactions: 3 },
    { name: 'අප්‍රේ', registrations: 8, transactions: 5 },
    { name: 'මැයි', registrations: 5, transactions: 7 },
    { name: 'ජුනි', registrations: 7, transactions: 6 }
  ];

  const disputeStatusData = [
    { name: 'විමර්ශනය', value: 3, color: '#3B82F6' },
    { name: 'නිරාකරණය', value: 1, color: '#10B981' },
    { name: 'රැදී සිටින', value: 2, color: '#F59E0B' }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'property_registered',
      title: 'නව ඉඩමක් ලියාපදිංචි කරන ලදී',
      description: 'කොළොන්නාව ඉඩම සාර්ථකව ලියාපදිංචි වන ලදී',
      time: '2 පැය පෙර',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'transaction_completed',
      title: 'ගනුදෙනුව සම්පූර්ණයි',
      description: 'ගම්පහ වත්ත හිමිකම් මාරුව සම්පූර්ණ විය',
      time: '1 දිනකට පෙර',
      icon: CheckCircle,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'dispute_filed',
      title: 'ගැටළුවක් ගොනු කර ඇත',
      description: 'ඉඩම් සීමා සම්බන්ධයෙන් ගැටළුවක් ගොනු විය',
      time: '3 දිනකට පෙර',
      icon: AlertCircle,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title={`ආයුබෝවන්, ${user?.name}! 👋`}
          description="ඔබේ ඉඩම් ලේඛනාගාර ගිණුමේ සියල්ල මෙහි දැකිය හැකිය"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {stat.change} මෙම මාසයේ
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">මාසික ක්‍රියාකාරකම්</h3>
                  <p className="text-sm text-gray-600">ලියාපදිංචි කිරීම් සහ ගනුදෙනු</p>
                </div>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="registrations" fill="#3B82F6" name="ලියාපදිංචි කිරීම්" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="transactions" fill="#10B981" name="ගනුදෙනු" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Dispute Status Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">ගැටළු තත්ත්වය</h3>
                  <p className="text-sm text-gray-600">වර්තමාන ගැටළු වර්ගීකරණය</p>
                </div>
                <AlertCircle className="w-5 h-5 text-gray-400" />
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={disputeStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {disputeStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {disputeStatusData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activities and Properties */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">නවතම ක්‍රියාකාරකම්</h3>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${activity.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* My Properties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">මගේ ඉඩම්</h3>
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {userProperties.slice(0, 3).map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{property.title}</p>
                      <p className="text-xs text-gray-600 mt-1 truncate">{property.location}</p>
                      <p className="text-xs text-gray-500 mt-1">{property.area} අක්කර</p>
                    </div>
                    <div className="text-right ml-3">
                      <Badge variant="success">සක්‍රීය</Badge>
                    </div>
                  </div>
                ))}
                {userProperties.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">තවම ඉඩම් ලියාපදිංචි කර නැත</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;