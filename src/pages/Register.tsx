import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  UserPlus, 
  CreditCard,
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  Globe,
  XCircle
} from 'lucide-react';
import AuthLayout from '../components/layout/auth/AuthLayout';
import ProgressSteps from '../components/layout/auth/ProgressSteps';
import FormInput from '../components/layout/auth/FormInput';
import RoleSelector from '../components/layout/auth/RoleSelector';
import PasswordInput from '../components/layout/auth/PasswordInput';


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
    { 
      number: 1, 
      title: 'මූලික තොරතුරු', 
      icon: User,
      description: 'ඔබේ පුද්ගලික තොරතුරු',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      number: 2, 
      title: 'ආරක්ෂාව', 
      icon: Lock,
      description: 'ගිණුම් ආරක්ෂණය',
      color: 'from-green-500 to-green-600'
    },
    { 
      number: 3, 
      title: 'හැඳුනුම් සත්‍යාපනය', 
      icon: Shield,
      description: 'ඩිජිටල් හැඳුනුම්පත',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const benefits = [
    { icon: Shield, text: 'ආරක්ෂිත ගනුදෙනු', color: 'text-green-600' },
    { icon: CheckCircle, text: 'ක්ෂණික ප්‍රවේශය', color: 'text-blue-600' },
    { icon: Globe, text: '24/7 සේවාව', color: 'text-purple-600' },
    { icon: User, text: 'ඩිජිටල් ලේඛන', color: 'text-orange-600' }
  ];

  return (
    <AuthLayout backgroundVariant="purple">
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl w-full"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <UserPlus className="h-8 w-8" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-center mb-2">
                  නව ගිණුමක් සාදන්න
                </h2>
                <p className="text-center text-indigo-100 text-lg">
                  ශ්‍රී ලංකාවේ නවීනතම ඉඩම් ලේඛනාගාරයට සම්බන්ධ වන්න
                </p>
              </div>
            </div>

            {/* Progress Steps */}
            <ProgressSteps steps={steps} currentStep={currentStep} />

            {/* Form Content */}
            <div className="px-8 py-8">
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center"
                >
                  <XCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>{errors.submit}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">මූලික තොරතුරු</h3>
                      <p className="text-gray-600">ඔබේ පුද්ගලික තොරතුරු ඇතුළත් කරන්න</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        id="firstName"
                        name="firstName"
                        label="මුල් නම"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        placeholder="ඔබේ මුල් නම"
                        required
                      />

                      <FormInput
                        id="lastName"
                        name="lastName"
                        label="අග නම"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        placeholder="ඔබේ අග නම"
                        required
                      />
                    </div>

                    <FormInput
                      id="email"
                      name="email"
                      type="email"
                      label="ඊමේල් ලිපිනය"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      icon={Mail}
                      placeholder="example@email.com"
                      required
                    />

                    <RoleSelector
                      value={formData.role}
                      onChange={(value) => setFormData({...formData, role: value as any})}
                    />
                  </motion.div>
                )}

                {/* Step 2: Security */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">ගිණුම් ආරක්ෂණය</h3>
                      <p className="text-gray-600">ඔබේ ගිණුම සඳහා ආරක්ෂිත මුරපදයක් සාදන්න</p>
                    </div>

                    <PasswordInput
                      id="password"
                      name="password"
                      label="මුරපදය"
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.password}
                      placeholder="අවම වශයෙන් අක්ෂර 6ක්"
                      required
                    />

                    <PasswordInput
                      id="confirmPassword"
                      name="confirmPassword"
                      label="මුරපදය නැවත ඇතුළත් කරන්න"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={errors.confirmPassword}
                      placeholder="මුරපදය නැවත ඇතුළත් කරන්න"
                      required
                    />

                    {/* Password Strength Indicator */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        මුරපද ආරක්ෂණ උපදෙස්
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-700">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                          අවම වශයෙන් අක්ෂර 6ක්
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                          විශේෂ අක්ෂර භාවිතය
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                          සංඛ්‍යා ඇතුළත් කිරීම
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                          ලොකු සහ කුඩා අකුරු
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Identity Verification */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">හැඳුනුම් සත්‍යාපනය</h3>
                      <p className="text-gray-600">ඔබේ ඩිජිටල් හැඳුනුම්පත් තොරතුරු ඇතුළත් කරන්න</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        id="nic"
                        name="nic"
                        label="ජාතික හැඳුනුම්පත් අංකය"
                        value={formData.nic}
                        onChange={handleChange}
                        error={errors.nic}
                        icon={CreditCard}
                        placeholder="199512345678"
                        required
                      />

                      <FormInput
                        id="slUdiId"
                        name="slUdiId"
                        label="SL-UDI අංකය"
                        value={formData.slUdiId}
                        onChange={handleChange}
                        error={errors.slUdiId}
                        icon={Shield}
                        placeholder="SL-UDI-123456789"
                        required
                      />
                    </div>

                    <FormInput
                      id="phone"
                      name="phone"
                      type="tel"
                      label="දුරකථන අංකය"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      icon={Phone}
                      placeholder="0771234567"
                      required
                    />

                    <FormInput
                      id="address"
                      name="address"
                      label="ලිපිනය"
                      value={formData.address}
                      onChange={handleChange}
                      error={errors.address}
                      icon={MapPin}
                      placeholder="ඔබේ සම්පූර්ණ ලිපිනය"
                      required
                    />

                    {/* Verification Notice */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                      <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        ඩිජිටල් හැඳුනුම්පත් සත්‍යාපනය
                      </h4>
                      <p className="text-blue-700 text-sm leading-relaxed mb-4">
                        ඔබේ ගිණුම සාදන ලද පසු, අපගේ පද්ධතිය ඔබේ SL-UDI ඩිජිටල් හැඳුනුම්පත 
                        ස්වයංක්‍රීයව සත්‍යාපනය කරයි. මෙය ඔබේ ගිණුමේ ආරක්ෂාව සහතික කරයි.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                          ස්වයංක්‍රීය සත්‍යාපනය
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-blue-600" />
                          ක්ෂණික ප්‍රතිචාරය
                        </div>
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 mr-2 text-blue-600" />
                          සම්පූර්ණ ආරක්ෂාව
                        </div>
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2 text-blue-600" />
                          රජයේ සහාය
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                  <div>
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        පෙර
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Step Indicator */}
                    <span className="text-sm text-gray-500">
                      {currentStep} / {steps.length}
                    </span>
                    
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        ඊළඟ
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            ලියාපදිංචි වෙමින්...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5 mr-2" />
                            ගිණුම සාදන්න
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-indigo-50/30 border-t border-gray-200/50">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm text-gray-600 mb-4 md:mb-0">
                  දැනටමත් ගිණුමක් තිබේද?{' '}
                  <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                    ප්‍රවේශ වන්න
                  </Link>
                </p>
                
                {/* Benefits */}
                <div className="flex items-center space-x-6">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <Icon className={`w-4 h-4 mr-2 ${benefit.color}`} />
                        <span>{benefit.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default Register;