import React from 'react';
import { Bell, Smartphone } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const SettingsTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">දැනුම්දීම් සැකසුම්</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">ඊමේල් දැනුම්දීම්</p>
                <p className="text-sm text-gray-600">ගනුදෙනු සහ ගැටළු පිළිබඳ දැනුම්දීම්</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">SMS දැනුම්දීම්</p>
                <p className="text-sm text-gray-600">වැදගත් ගනුදෙනු සඳහා SMS</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">භාෂා සහ ප්‍රදේශය</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              භාෂාව
            </label>
            <select className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="si">සිංහල</option>
              <option value="ta">தமிழ்</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              කාල කලාපය
            </label>
            <select className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Asia/Colombo">ශ්‍රී ලංකා (UTC+5:30)</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-red-600">අනතුරු කලාපය</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <h4 className="font-medium text-red-900 mb-2">ගිණුම අක්‍රීය කිරීම</h4>
            <p className="text-sm text-red-700 mb-4">
              ඔබේ ගිණුම තාවකාලිකව අක්‍රීය කරන්න. ඔබට ඕනෑම වේලාවක නැවත සක්‍රීය කළ හැක.
            </p>
            <Button variant="danger" size="sm">
              ගිණුම අක්‍රීය කරන්න
            </Button>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <h4 className="font-medium text-red-900 mb-2">ගිණුම මකා දැමීම</h4>
            <p className="text-sm text-red-700 mb-4">
              ඔබේ ගිණුම සහ සියලු දත්ත ස්ථිරවම මකා දමන්න. මෙම ක්‍රියාව ආපසු හැරවිය නොහැක.
            </p>
            <Button variant="danger" size="sm">
              ගිණුම මකා දමන්න
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsTab;