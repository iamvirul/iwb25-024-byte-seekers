import React, { useState } from 'react';
import { Lock, Key, Save } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import toast from 'react-hot-toast';


const SecurityTab: React.FC<any> = ({ onPasswordChange }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setIsSubmitting(true);
    const success = await onPasswordChange(oldPassword, newPassword);
    setIsSubmitting(false);

    if (success) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">මුරපද වෙනස් කිරීම</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          <Input
            label="වර්තමාන මුරපදය"
            type="password"
            icon={Lock}
            placeholder="වර්තමාන මුරපදය ඇතුළත් කරන්න"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <Input
            label="නව මුරපදය"
            type="password"
            icon={Key}
            placeholder="නව මුරපදය ඇතුළත් කරන්න"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            label="නව මුරපදය නැවත ඇතුළත් කරන්න"
            type="password"
            icon={Key}
            placeholder="නව මුරපදය නැවත ඇතුළත් කරන්න"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button icon={Save} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'මුරපදය යාවත්කාලීන කරන්න'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SecurityTab;