import React from 'react';
import { motion } from 'framer-motion';
import VerificationPanel from './VerificationPanel';

interface VerificationPanelSectionProps {
    activeTab: string;
    verificationItems: any[];
    onVerifyDocument: (itemId: string, documentId: string, status: 'verified' | 'rejected', notes?: string) => void;
    onCompleteVerification: (itemId: string) => void;
}

const VerificationPanelSection: React.FC<VerificationPanelSectionProps> = ({
    activeTab,
    verificationItems,
    onVerifyDocument,
    onCompleteVerification
}) => {
    if (activeTab !== 'verification') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <VerificationPanel
                items={verificationItems}
                onVerifyDocument={onVerifyDocument}
                onCompleteVerification={onCompleteVerification}
            />
        </motion.div>
    );
};

export default VerificationPanelSection;