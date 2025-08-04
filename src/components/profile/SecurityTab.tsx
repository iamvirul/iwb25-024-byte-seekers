import React from 'react';
import { Lock, Key, Save } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SecurityTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">මුරපද වෙනස් කිරීම</h3>
        
        <div className="space-y-6 max-w-md">
          <Input
            label="වර්තමාන මුරපදය"
            type="password"
            icon={Lock}
            placeholder="වර්තමාන මුරපදය ඇතුළත් කරන්න"
          />

          <Input
            label="නව මුරපදය"
            type="password"
            icon={Key}
            placeholder="නව මුරපදය ඇතුළත් කරන්න"
          />

          <Input
            label="නව මුරපදය නැවත ඇතුළත් කරන්න"
            type="password"
            icon={Key}
            placeholder="නව මුරපදය නැවත ඇතුළත් කරන්න"
          />

          <Button icon={Save}>
            මුරපදය යාවත්කාලීන කරන්න
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SecurityTab;