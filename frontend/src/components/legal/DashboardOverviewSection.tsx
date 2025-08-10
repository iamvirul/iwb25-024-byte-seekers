import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    CheckCircle,
    Clock,
    Calendar,
    TrendingUp,
    Activity,
    FileText,
    User,
    AlertCircle,
    MessageSquare
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import Card from '../ui/Card';
import Select from '../ui/Select';

interface DashboardOverviewSectionProps {
    activeTab: string;
    selectedTimeRange: string;
    setSelectedTimeRange: (value: string) => void;
    timeRangeOptions: { value: string; label: string }[];
    monthlyStats: any[];
    caseStatusData: any[];
    resolutionTimeData: any[];
    recentActivities: {
      id: string;
      type: string;
      title: string;
      description: string;
      time: string;
      icon: React.ComponentType<any>;
      color: string;
    }[];
    statsData: {
        pending: number;
        resolved: number;
        all: number;
        legalPrecedents: number;
    };
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'case_resolved':
      return CheckCircle;
    case 'precedent_added':
      return BookOpen;
    case 'case_created':
      return FileText;
    case 'estimate_updated':
      return Clock;
    case 'comment_added':
      return MessageSquare;
    case 'document_added':
      return FileText;
    case 'error_occurred':
    case 'connection_error':
    case 'connection_closed':
      return AlertCircle;
    default:
      return Activity;
  }
};

const DashboardOverviewSection: React.FC<DashboardOverviewSectionProps> = ({
    activeTab,
    selectedTimeRange,
    setSelectedTimeRange,
    timeRangeOptions,
    monthlyStats,
    caseStatusData,
    resolutionTimeData,
    recentActivities,
    statsData,
}) => {
    if (activeTab !== 'overview') return null;

    return (
        <>
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <Card>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">මෑත ක්‍රියාකාරකම්</h3>
                            <span className="text-sm text-gray-500">
                                {recentActivities.length} ක්‍රියාකාරකම්
                            </span>
                        </div>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                            {recentActivities.length > 0 ? (
                                recentActivities.map((activity) => {
                                    const Icon = activity.icon || getActivityIcon(activity.type);
                                    return (
                                        <div 
                                            key={activity.id} 
                                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${activity.color}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                                                <p className="text-xs text-gray-600 mt-1 truncate">{activity.description}</p>
                                                <p className="text-xs text-gray-400 mt-1 flex items-center">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {activity.time}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    කිසිදු ක්‍රියාකාරකමක් නොමැත
                                </div>
                            )}
                        </div>
                    </Card>
                </motion.div>

                {/* Case Status Distribution */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">සිද්ධි සහ පූර්වාදර්ශ දත්ත</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={[
                                        {
                                            name: 'පොරොත්තුවෙන් සිටින',
                                            value: statsData.pending,
                                            color: '#3B82F6'
                                        },
                                        {
                                            name: 'නිරාකරණය කළ',
                                            value: statsData.resolved,
                                            color: '#10B981'
                                        },
                                        {
                                            name: 'සියලු ගැටලු',
                                            value: statsData.all,
                                            color: '#F59E0B'
                                        },
                                        {
                                            name: 'නීතිමය පූර්වාදර්ශ',
                                            value: statsData.legalPrecedents,
                                            color: '#8B5CF6'
                                        }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    innerRadius={40}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {[
                                        '#3B82F6', // pending - blue
                                        '#10B981', // resolved - green
                                        '#F59E0B', // all - orange
                                        '#8B5CF6'  // precedents - purple
                                    ].map((color, index) => (
                                        <Cell key={`cell-${index}`} fill={color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name, props) => [
                                        value,
                                        `${name} (${((props.payload.percent || 0) * 100).toFixed(1)}%)`
                                    ]}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </motion.div>
            </div>
        </>
    );
};

export default DashboardOverviewSection;