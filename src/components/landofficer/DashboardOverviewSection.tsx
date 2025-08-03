import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Card from "../ui/Card";

interface DashboardOverviewSectionProps {
  activeTab: string;
  selectedTimeRange: string;
  setSelectedTimeRange: (value: string) => void;
  timeRangeOptions: { value: string; label: string }[];
  statusData: any[];
  recentActivities: any[];
}

const DashboardOverviewSection: React.FC<DashboardOverviewSectionProps> = ({
  activeTab,
  statusData,
  recentActivities,
}) => {
  if (activeTab !== "overview") return null;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              ලියාපදිංචි තත්ත්ව
            </h3>
            <ResponsiveContainer width="100%" height={385}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              මෑත ක්‍රියාකාරකම්
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${activity.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {activity.description}
                      </p>
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
      </div>
    </>
  );
};

export default DashboardOverviewSection;
