import React from 'react';
import { motion } from 'framer-motion';
import RegistrationQueue from './RegistrationQueue';

interface RegistrationQueueSectionProps {
    activeTab: string;
    registrations: any[];
    onViewDetails: (registration: any) => void;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
}

const RegistrationQueueSection: React.FC<RegistrationQueueSectionProps> = ({
    activeTab,
    registrations,
    onViewDetails,
    onApprove,
    onReject
}) => {
    if (activeTab !== 'registrations') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <RegistrationQueue
                registrations={registrations}
                onViewDetails={onViewDetails}
                onApprove={onApprove}
                onReject={onReject}
            />
        </motion.div>
    );
};

export default RegistrationQueueSection;