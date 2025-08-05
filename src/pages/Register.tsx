import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  XCircle,
  Zap,
  Database,
  Users,
} from "lucide-react";

import AuthLayout from "../components/layout/auth/AuthLayout";
import ProgressSteps from "../components/layout/auth/ProgressSteps";
import FormInput from "../components/layout/auth/FormInput";
import RoleSelector from "../components/layout/auth/RoleSelector";
import PasswordInput from "../components/layout/auth/PasswordInput";
import RegistrationBranding from "../components/layout/auth/RegistrationBranding";
import MultiStepForm from "../components/layout/auth/RegistrationForm/MultiStepForm";

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    nic: "",
    slUdiId: "",
    phone: "",
    address: "",
    role: "citizen" as "citizen" | "land_officer" | "legal_officer",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "මුල් නම අවශ්‍යයි";
      if (!formData.lastName.trim()) newErrors.lastName = "අග නම අවශ්‍යයි";
      if (!formData.email.trim()) newErrors.email = "ඊමේල් ලිපිනය අවශ්‍යයි";
      if (!formData.email.includes("@"))
        newErrors.email = "වලංගු ඊමේල් ලිපිනයක් ඇතුළත් කරන්න";
    }

    if (step === 2) {
      if (!formData.password) newErrors.password = "මුරපදය අවශ්‍යයි";
      if (formData.password.length < 6)
        newErrors.password = "මුරපදය අවම වශයෙන් අක්ෂර 6ක් තිබිය යුතුයි";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "මුරපද නොගැලපේ";
      }
    }

    if (step === 3) {
      if (!formData.nic.trim())
        newErrors.nic = "ජාතික හැඳුනුම්පත් අංකය අවශ්‍යයි";
      if (!formData.slUdiId.trim()) newErrors.slUdiId = "SL-UDI අංකය අවශ්‍යයි";
      if (!formData.phone.trim()) newErrors.phone = "දුරකථන අංකය අවශ්‍යයි";
      if (!formData.address.trim()) newErrors.address = "ලිපිනය අවශ්‍යයි";
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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to login with success message
      navigate("/login", {
        state: { message: "ගිණුම සාර්ථකව සාදන ලදී. දැන් ප්‍රවේශ වන්න." },
      });
    } catch (error) {
      setErrors({ submit: "ලියාපදිංචි කිරීමේදී දෝෂයක් ඇතිවිය" });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    {
      number: 1,
      title: "මූලික තොරතුරු",
      icon: User,
      description: "ඔබේ පුද්ගලික තොරතුරු",
      color: "from-blue-500 to-blue-600",
    },
    {
      number: 2,
      title: "ආරක්ෂාව",
      icon: Lock,
      description: "ගිණුම් ආරක්ෂණය",
      color: "from-blue-500 to-blue-600",
    },
    {
      number: 3,
      title: "හැඳුනුම් සත්‍යාපනය",
      icon: Shield,
      description: "ඩිජිටල් හැඳුනුම්පත",
      color: "from-blue-500 to-blue-600",
    },
  ];

  const features = [
    { icon: Shield, text: "ආරක්ෂිත ගනුදෙනු", color: "text-green-600" },
    { icon: Zap, text: "ක්ෂණික ප්‍රවේශය", color: "text-blue-600" },
    { icon: Database, text: "ඩිජිටල් ලේඛන", color: "text-purple-600" },
    { icon: Users, text: "24/7 සේවාව", color: "text-orange-600" },
  ];

  return (
    <AuthLayout backgroundVariant="blue">
      <div className="min-h-screen flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <RegistrationBranding features={features} />
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-2xl mx-auto lg:mx-0"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                {/* Mobile Header - Only visible on mobile */}
                <div className="lg:hidden bg-white/90 px-4 sm:px-6 py-6 text-white text-center">
                  <div className="w-12 h-12 bg-blue-600 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl sm:text-2xl text-gray-900 font-bold mb-2">
                    නව ගිණුමක් සාදන්න
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    ඉඩම් ලේඛනාගාරයට සම්බන්ධ වන්න
                  </p>
                </div>

                {/* Desktop Header - Only visible on desktop */}
                <div className="hidden lg:block bg-white/90 px-8 py-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 bg-blue-600 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                        <UserPlus className="h-8 w-8" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                      නව ගිණුමක් සාදන්න
                    </h2>
                    <p className="text-center text-gray-600 text-lg">
                      ශ්‍රී ලංකාවේ නවීනතම ඉඩම් ලේඛනාගාරයට සම්බන්ධ වන්න
                    </p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="hidden sm:block">
                  <ProgressSteps steps={steps} currentStep={currentStep} />
                </div>

                {/* Mobile Progress Indicator */}
                <div className="sm:hidden px-4 py-4 bg-gray-50 border-b">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      පියවර {currentStep} / {steps.length}
                    </span>
                    <div className="flex space-x-1">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index + 1 <= currentStep
                              ? "bg-blue-600"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1 rounded-full transition-all duration-300"
                        style={{
                          width: `${(currentStep / steps.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <MultiStepForm
                  currentStep={currentStep}
                  steps={steps}
                  formData={formData}
                  errors={errors}
                  isLoading={isLoading}
                  handleChange={handleChange}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                  handleSubmit={handleSubmit}
                  setFormData={setFormData}
                />
                <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gradient-to-r from-gray-50 to-blue-50/30 border-t border-gray-200/50">
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-gray-600">
                      දැනටමත් ගිණුමක් තිබේද?{" "}
                      <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200"
                      >
                        ප්‍රවේශ වන්න
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
