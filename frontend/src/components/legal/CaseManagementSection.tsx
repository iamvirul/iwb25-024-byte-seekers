import React from 'react';
import { motion } from 'framer-motion';
import CaseManagement from './CaseManagement';

interface CaseManagementSectionProps {
    cases: any[];
    onCaseUpdate: (caseId: string, updates: any) => void;
    activeTab: string;
}

const CaseManagementSection: React.FC<CaseManagementSectionProps> = ({
    cases,
    onCaseUpdate,
    activeTab
}) => {
    if (activeTab !== 'cases') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <CaseManagement
                cases={cases}
                onCaseUpdate={onCaseUpdate}
            />
        </motion.div>
    );
};

export default CaseManagementSection;