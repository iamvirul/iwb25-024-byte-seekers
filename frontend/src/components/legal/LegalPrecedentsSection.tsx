import React from 'react';
import { motion } from 'framer-motion';
import LegalPrecedents from './LegalPrecedents';

interface LegalPrecedentsSectionProps {
    precedents: any[];
    activeTab: string;
}

const LegalPrecedentsSection: React.FC<LegalPrecedentsSectionProps> = ({
    precedents,
    activeTab
}) => {
    if (activeTab !== 'precedents') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <LegalPrecedents
                precedents={precedents}
            />
        </motion.div>
    );
};

export default LegalPrecedentsSection;