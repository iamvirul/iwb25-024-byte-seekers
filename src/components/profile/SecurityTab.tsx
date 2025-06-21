import React from 'react';
import { Lock, Key, Save, Smartphone, Globe } from 'lucide-react';
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

      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">ද්විමාන සත්‍යාපනය</h3>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-medium text-gray-900">SMS සත්‍යාපනය</h4>
              <p className="text-sm text-gray-600">ඔබේ දුරකථනයට SMS කේතයක් යවනු ලැබේ</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            සක්‍රීය කරන්න
          </button>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">ගිණුම් ක්‍රියාකාරකම්</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">අවසන් ප්‍රවේශය</p>
                <p className="text-sm text-gray-600">අද 2:30 PM - Chrome, Windows</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">වර්තමාන සැසිය</span>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">මොබයිල් ප්‍රවේශය</p>
                <p className="text-sm text-gray-600">ඊයේ 8:45 AM - Safari, iOS</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">සාර්ථකයි</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SecurityTab;