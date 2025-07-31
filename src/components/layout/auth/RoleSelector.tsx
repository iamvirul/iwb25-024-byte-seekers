import React from 'react';
import { CheckCircle, Users, Award, Shield } from 'lucide-react';

interface RoleOption {
  value: number;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface RoleSelectorProps {
  value: number;
  onChange: (value: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onChange }) => {
  const roleOptions: RoleOption[] = [
    { 
      value: 1, 
      label: 'සාමාන්‍ය පුරවැසියා',
      description: 'ඉඩම් හිමියන් සහ සාමාන්‍ය පරිශීලකයන්',
      icon: Users
    },
    { 
      value: 2, 
      label: 'ඉඩම් නිලධාරියා',
      description: 'ඉඩම් ලියාපදිංචි කිරීම් සහ සත්‍යාපන',
      icon: Award
    },
    { 
      value: 3, 
      label: 'නීති නිලධාරියා',
      description: 'ගැටළු නිරාකරණය සහ නීතිමය කටයුතු',
      icon: Shield
    }
  ];

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        භූමිකාව <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roleOptions.map((role) => {
          const Icon = role.icon;
          return (
            <label
              key={role.value}
              className={`relative flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                value === role.value
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
              }`}
            >
              <input
                type="radio"
                name="role"
                value={role.value}
                checked={value === role.value}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center mb-2">
                <Icon className={`w-5 h-5 mr-2 ${
                  value === role.value ? 'text-indigo-600' : 'text-gray-400'
                }`} />
                <span className={`font-medium ${
                  value === role.value ? 'text-indigo-900' : 'text-gray-700'
                }`}>
                  {role.label}
                </span>
              </div>
              <span className="text-xs text-gray-500">{role.description}</span>
              {value === role.value && (
                <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-indigo-600" />
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelector;