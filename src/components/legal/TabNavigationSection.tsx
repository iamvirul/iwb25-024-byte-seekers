import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

interface TabNavigationSectionProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    tabs: { id: string; label: string; icon: React.ComponentType<any> }[];
}

const TabNavigationSection: React.FC<TabNavigationSectionProps> = ({
    activeTab,
    setActiveTab,
    tabs
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
        >
            <Card padding="none">
                <div className="flex flex-wrap border-b border-gray-200">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 border-b-2 ${activeTab === tab.id
                                        ? 'border-purple-500 text-purple-600 bg-purple-50'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className="w-4 h-4 mr-2" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </Card>
        </motion.div>
    );
};

export default TabNavigationSection;