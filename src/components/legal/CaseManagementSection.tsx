import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Gavel,
    Calendar,
    FileText,
    Users,
    Clock,
    CheckCircle,
    AlertTriangle,
    Search,
    Filter,
    Eye,
    Edit,
    Download,
    MessageSquare,
    BookOpen,
    Scale,
    Send,
    Plus,
    X
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Select from '../ui/Select';
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