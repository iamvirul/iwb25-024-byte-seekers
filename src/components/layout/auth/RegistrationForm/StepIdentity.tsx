import { motion } from 'framer-motion'
import { Shield, CheckCircle, Clock, Globe, CreditCard, Phone, MapPin } from 'lucide-react'
import FormInput from '../FormInput'

interface Props {
  formData: any
  errors: Record<string, string>
  handleChange: (e: React.ChangeEvent<any>) => void
}

export default function StepIdentity({ formData, errors, handleChange }: Props) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">හැඳුනුම් සත්‍යාපනය</h3>
        <p className="text-gray-600 text-sm sm:text-base">ඔබේ ඩිජිටල් හැඳුනුම්පත් තොරතුරු ඇතුළත් කරන්න</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormInput id="nic" name="nic" label="ජාතික හැඳුනුම්පත් අංකය" value={formData.nic} onChange={handleChange} error={errors.nic} icon={CreditCard} placeholder="199512345678" required />
        <FormInput id="slUdiId" name="slUdiId" label="SL-UDI අංකය" value={formData.slUdiId} onChange={handleChange} error={errors.slUdiId} icon={Shield} placeholder="SL-UDI-123456789" required />
      </div>
      <FormInput id="phone" name="phone" type="tel" label="දුරකථන අංකය" value={formData.phone} onChange={handleChange} error={errors.phone} icon={Phone} placeholder="0771234567" required />
      <FormInput id="address" name="address" label="ලිපිනය" value={formData.address} onChange={handleChange} error={errors.address} icon={MapPin} placeholder="ඔබේ සම්පූර්ණ ලිපිනය" required />

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 sm:p-6">
        <h4 className="font-semibold text-blue-800 mb-3 flex items-center text-sm sm:text-base"><Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> ඩිජිටල් හැඳුනුම්පත් සත්‍යාපනය</h4>
        <p className="text-blue-700 text-xs sm:text-sm leading-relaxed mb-4">
          ඔබේ ගිණුම සාදන ලද පසු, අපගේ පද්ධතිය ඔබේ SL-UDI ඩිජිටල් හැඳුනුම්පත ස්වයංක්‍රීයව සත්‍යාපනය කරයි. මෙය ඔබේ ගිණුමේ ආරක්ෂාව සහතික කරයි.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-blue-700">
          <div className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600" />ස්වයංක්‍රීය සත්‍යාපනය</div>
          <div className="flex items-center"><Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600" />ක්ෂණික ප්‍රතිචාරය</div>
          <div className="flex items-center"><Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600" />සම්පූර්ණ ආරක්ෂාව</div>
          <div className="flex items-center"><Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600" />රජයේ සහාය</div>
        </div>
      </div>
    </motion.div>
  )
}
