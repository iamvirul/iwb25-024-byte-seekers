import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

interface Stat {
    label: string;
    value: string;
    icon: React.ComponentType<any>;
    color: string;
    change?: string;
    changeType?: 'positive' | 'negative';
}

interface StatsSectionProps {
    stats: Stat[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card key={stat.label} hover className="relative overflow-hidden">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-600 mb-1">
                                    {stat.label}
                                </p>
                                <p className="text-2xl font-bold text-gray-900 mb-2">
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Card>
                );
            })}
        </motion.div>
    );
};

export default StatsSection;