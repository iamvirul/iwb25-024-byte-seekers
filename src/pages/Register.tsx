import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  CreditCard,
  Shield,
  CheckCircle
} from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    nic: '',
    slUdiId: '',
    phone: '',
    address: '',
    role: 'citizen' as 'citizen' | 'land_officer' | 'legal_official'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'මුල් නම අවශ්‍යයි';
      if (!formData.lastName.trim()) newErrors.lastName = 'අග නම අවශ්‍යයි';
      if (!formData.email.trim()) newErrors.email = 'ඊමේල් ලිපිනය අවශ්‍යයි';
      if (!formData.email.includes('@')) newErrors.email = 'වලංගු ඊමේල් ලිපිනයක් ඇතුළත් කරන්න';
    }

    if (step === 2) {
      if (!formData.password) newErrors.password = 'මුරපදය අවශ්‍යයි';
      if (formData.password.length < 6) newErrors.password = 'මුරපදය අවම වශයෙන් අක්ෂර 6ක් තිබිය යුතුයි';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'මුරපද නොගැලපේ';
      }
    }

    if (step === 3) {
      if (!formData.nic.trim()) newErrors.nic = 'ජාතික හැඳුනුම්පත් අංකය අවශ්‍යයි';
      if (!formData.slUdiId.trim()) newErrors.slUdiId = 'SL-UDI අංකය අවශ්‍යයි';
      if (!formData.phone.trim()) newErrors.phone = 'දුරකථන අංකය අවශ්‍යයි';
      if (!formData.address.trim()) newErrors.address = 'ලිපිනය අවශ්‍යයි';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to login with success message
      navigate('/login', { 
        state: { message: 'ගිණුම සාර්ථකව සාදන ලදී. දැන් ප්‍රවේශ වන්න.' }
      });
    } catch (error) {
      setErrors({ submit: 'ලියාපදිංචි කිරීමේදී දෝෂයක් ඇතිවිය' });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'මූලික තොරතුරු', icon: User },
    { number: 2, title: 'ආරක්ෂාව', icon: Lock },
    { number: 3, title: 'හැඳුනුම් සත්‍යාපනය', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
            <div className="flex items-center justify-center mb-4">
              <UserPlus className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-center">
              නව ගිණුමක් සාදන්න
            </h2>
            <p className="text-center text-blue-100 mt-2">
              ඉඩම් ලේඛනාගාරයට සම්බන්ධ වන්න
            </p>
          </div>

          {/* Progress Steps */}
          <div className="px-8 py-6 bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = step.number === currentStep;
                const isCompleted = step.number < currentStep;
                
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-300 text-gray-600'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className={`text-sm font-medium ${
                        isActive ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`mx-4 h-0.5 w-16 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="px-8 py-6">
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
              >
                {errors.submit}
              </motion.div>
            )}

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      මුල් නම
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.firstName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="ඔබේ මුල් නම"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      අග නම
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.lastName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="ඔබේ අග නම"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    ඊමේල් ලිපිනය
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="example@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    භූමිකාව
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="citizen">සාමාන්‍ය පුරවැසියා</option>
                    <option value="land_officer">ඉඩම් නිලධාරියා</option>
                    <option value="legal_official">නීති නිලධාරියා</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 2: Security */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    මුරපදය
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="අවම වශයෙන් අක්ෂර 6ක්"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    මුරපදය නැවත ඇතුළත් කරන්න
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="මුරපදය නැවත ඇතුළත් කරන්න"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Identity Verification */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nic" className="block text-sm font-medium text-gray-700 mb-2">
                      ජාතික හැඳුනුම්පත් අංකය
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="nic"
                        name="nic"
                        value={formData.nic}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.nic ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="199512345678"
                      />
                    </div>
                    {errors.nic && (
                      <p className="mt-1 text-sm text-red-600">{errors.nic}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="slUdiId" className="block text-sm font-medium text-gray-700 mb-2">
                      SL-UDI අංකය
                    </label>
                    <input
                      type="text"
                      id="slUdiId"
                      name="slUdiId"
                      value={formData.slUdiId}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.slUdiId ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="SL-UDI-123456789"
                    />
                    {errors.slUdiId && (
                      <p className="mt-1 text-sm text-red-600">{errors.slUdiId}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    දුරකථන අංකය
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0771234567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    ලිපිනය
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="ඔබේ සම්පූර්ණ ලිපිනය"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  පෙර
                </button>
              )}
              
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    ඊළඟ
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ලියාපදිංචි වෙමින්...
                      </div>
                    ) : (
                      'ගිණුම සාදන්න'
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t text-center">
            <p className="text-sm text-gray-600">
              දැනටමත් ගිණුමක් තිබේද?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                ප්‍රවේශ වන්න
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;