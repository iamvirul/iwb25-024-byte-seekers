import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBlockchain } from '../contexts/BlockchainContext';
import { motion } from 'framer-motion';
import { MapPin, Save, AlertCircle } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import FileUpload from '../components/ui/FileUpload';

const LandRegistry = () => {
  const { user } = useAuth();
  const { registerProperty } = useBlockchain();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    latitude: '',
    longitude: '',
    area: '',
    documents: [] as File[]
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.title.trim()) newErrors.title = 'ඉඩමේ නම අවශ්‍යයි';
    if (!formData.location.trim()) newErrors.location = 'ස්ථානය අවශ්‍යයි';
    if (!formData.area.trim()) newErrors.area = 'ප්‍රමාණය අවශ්‍යයි';
    if (!formData.latitude.trim()) newErrors.latitude = 'අක්ෂාංශය අවශ්‍යයි';
    if (!formData.longitude.trim()) newErrors.longitude = 'දේශාංශය අවශ්‍යයි';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsRegistering(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      registerProperty({
        title: formData.title,
        location: formData.location,
        coordinates: {
          lat: parseFloat(formData.latitude),
          lng: parseFloat(formData.longitude)
        },
        area: parseFloat(formData.area),
        owner: user?.name || '',
        ownerId: user?.slUdiId || '',
        documents: formData.documents.map(file => file.name),
        disputes: []
      });

      setFormData({
        title: '',
        location: '',
        latitude: '',
        longitude: '',
        area: '',
        documents: []
      });

      alert('ඉඩම සාර්ථකව ලියාපදිංචි කරන ලදී!');
    } catch (error) {
      alert('ලියාපදිංචි කිරීමේදී දෝෂයක් ඇතිවිය');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="ඉඩම් ලියාපදිංචිය"
          description="නව ඉඩමක් බ්ලොක්චේන් ලේඛනාගාරයට ලියාපදිංචි කරන්න"
          icon={MapPin}
        />

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="ඉඩමේ නම"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="උදා: කොළොන්නාව ඉඩම"
                error={errors.title}
              />

              <Input
                label="ප්‍රමාණය (අක්කර)"
                type="number"
                step="0.01"
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                placeholder="2.5"
                error={errors.area}
              />
            </div>

            <Input
              label="ස්ථානය"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="උදා: කොළොන්නාව, කොළඹ"
              error={errors.location}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="අක්ෂාංශය (Latitude)"
                type="number"
                step="0.000001"
                value={formData.latitude}
                onChange={(e) => handleChange('latitude', e.target.value)}
                placeholder="6.9271"
                error={errors.latitude}
              />

              <Input
                label="දේශාංශය (Longitude)"
                type="number"
                step="0.000001"
                value={formData.longitude}
                onChange={(e) => handleChange('longitude', e.target.value)}
                placeholder="79.8612"
                error={errors.longitude}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="හිමිකරු"
                value={user?.name || ''}
                readOnly
                className="bg-gray-50"
              />

              <Input
                label="SL-UDI අංකය"
                value={user?.slUdiId || ''}
                readOnly
                className="bg-gray-50"
              />
            </div>

            <FileUpload
              label="ලේඛන උඩුගත කරන්න"
              files={formData.documents}
              onChange={(files) => setFormData(prev => ({ ...prev, documents: files }))}
              helper="PDF, DOC, DOCX, JPG, PNG (උපරිම 10MB)"
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">වැදගත් සටහන</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    ඉඩම ලියාපදිංචි කිරීමෙන් පසු, එය බ්ලොක්චේන් ලේඛනාගාරයට ස්ථිරව සටහන් වේ. 
                    සියලු තොරතුරු නිවැරදි බව සහතික කර ගන්න.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <Button variant="secondary" type="button" className="sm:order-1">
                අවලංගු කරන්න
              </Button>
              <Button
                type="submit"
                loading={isRegistering}
                icon={Save}
                className="sm:order-2"
              >
                {isRegistering ? 'ලියාපදිංචි වෙමින්...' : 'ලියාපදිංචි කරන්න'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LandRegistry;