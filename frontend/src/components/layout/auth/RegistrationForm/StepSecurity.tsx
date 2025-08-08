import { motion } from 'framer-motion'
import { Shield, CheckCircle } from 'lucide-react'
import PasswordInput from '../PasswordInput'

interface Props {
  formData: any
  errors: Record<string, string>
  handleChange: (e: React.ChangeEvent<any>) => void
}

export default function StepSecurity({ formData, errors, handleChange }: Props) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">ගිණුම් ආරක්ෂණය</h3>
        <p className="text-gray-600 text-sm sm:text-base">ඔබේ ගිණුම සඳහා ආරක්ෂිත මුරපදයක් සාදන්න</p>
      </div>

      <PasswordInput id="password" name="password" label="මුරපදය" value={formData.password} onChange={handleChange} error={errors.password} placeholder="අවම වශයෙන් අක්ෂර 6ක්" required />
      <PasswordInput id="confirmPassword" name="confirmPassword" label="මුරපදය නැවත ඇතුළත් කරන්න" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="මුරපදය නැවත ඇතුළත් කරන්න" required />

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 sm:p-6">
        <h4 className="font-semibold text-blue-800 mb-3 flex items-center text-sm sm:text-base">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> මුරපද ආරක්ෂණ උපදෙස්
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-blue-700">
          <div className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600" />අවම වශයෙන් අක්ෂර 6ක්</div>
          <div className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600" />විශේෂ අක්ෂර භාවිතය</div>
          <div className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600" />සංඛ්‍යා ඇතුළත් කිරීම</div>
          <div className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600" />ලොකු සහ කුඩා අකුරු</div>
        </div>
      </div>
    </motion.div>
  )
}
