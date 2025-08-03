import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings } from 'lucide-react';
import Button from '../ui/Button';

interface DashboardHeaderProps {
    userName?: string;
    type: 'land_officer' | 'legal_officer';
    onNotificationsClick: () => void;
    onSettingsClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    userName,
    type,
    onNotificationsClick,
    onSettingsClick
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {type === 'land_officer' ? 'ඉඩම්' : 'නීති'} නිලධාරී ඩෑෂ්බෝඩ්
                    </h1>
                    <p className="text-gray-600">
                        ආයුබෝවන්, {userName}! ඔබේ නීතිමය කාර්ය සාරාංශය
                    </p>
                </div>
                {/* <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <Button
                        variant="outline"
                        icon={Bell}
                        size="sm"
                        onClick={onNotificationsClick}
                    >
                        දැනුම්දීම්
                    </Button>
                    <Button
                        variant="outline"
                        icon={Settings}
                        size="sm"
                        onClick={onSettingsClick}
                    >
                        සැකසුම්
                    </Button>
                </div> */}
            </div>
        </motion.div>
    );
};

export default DashboardHeader;