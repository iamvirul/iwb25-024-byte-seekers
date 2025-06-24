import React from 'react';
import { motion } from 'framer-motion';
import LegalPrecedents from './LegalPrecedents';

interface LegalPrecedentsSectionProps {
    precedents: any[];
    onAddPrecedent: (precedent: any) => void;
    onUpdatePrecedent: (id: string, updates: any) => void;
    onDeletePrecedent: (id: string) => void;
    activeTab: string;
}

const LegalPrecedentsSection: React.FC<LegalPrecedentsSectionProps> = ({
    precedents,
    onAddPrecedent,
    onUpdatePrecedent,
    onDeletePrecedent,
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
                onAddPrecedent={onAddPrecedent}
                onUpdatePrecedent={onUpdatePrecedent}
                onDeletePrecedent={onDeletePrecedent}
            />
        </motion.div>
    );
};

export default LegalPrecedentsSection;