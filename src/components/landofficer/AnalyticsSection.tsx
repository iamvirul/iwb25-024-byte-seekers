import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface AnalyticsSectionProps {
    activeTab: string;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ activeTab }) => {
    if (activeTab !== 'analytics') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card>
                <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">විශ්ලේෂණ ඩෑෂ්බෝඩ්</h3>
                    <p className="text-gray-600 mb-6">
                        ඉඩම් ලියාපදිංචි කිරීම් සහ සත්‍යාපන පිළිබඳ සවිස්තරාත්මක විශ්ලේෂණ
                    </p>
                    <Button icon={BarChart3}>විශ්ලේෂණ බලන්න</Button>
                </div>
            </Card>
        </motion.div>
    );
};

export default AnalyticsSection;