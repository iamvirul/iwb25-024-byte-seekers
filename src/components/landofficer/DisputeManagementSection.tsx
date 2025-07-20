import React from 'react';
import { motion } from 'framer-motion';
import DisputeManagement from './DisputeManagement';

interface DisputeManagementSectionProps {
    activeTab: string;
    disputes: any[];
    onAssignDispute: (disputeId: string, officerId: string) => void;
    onUpdateStatus: (disputeId: string, status: string) => void;
    onViewDetails: (dispute: any) => void;
}

const DisputeManagementSection: React.FC<DisputeManagementSectionProps> = ({
    activeTab,
    disputes,
    onAssignDispute,
    onUpdateStatus,
    onViewDetails
}) => {
    if (activeTab !== 'disputes') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <DisputeManagement
                disputes={disputes}
                onAssignDispute={onAssignDispute}
                onUpdateStatus={onUpdateStatus}
                onViewDetails={onViewDetails}
            />
        </motion.div>
    );
};

export default DisputeManagementSection;