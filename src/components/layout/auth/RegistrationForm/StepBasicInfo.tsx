import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import FormInput from '../FormInput'
import RoleSelector from '../RoleSelector'

interface Props {
  formData: any
  errors: Record<string, string>
  handleChange: (e: React.ChangeEvent<any>) => void
  setFormData: React.Dispatch<React.SetStateAction<any>>
}

export default function StepBasicInfo({ formData, errors, handleChange, setFormData }: Props) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">මූලික තොරතුරු</h3>
        <p className="text-gray-600 text-sm sm:text-base">ඔබේ පුද්ගලික තොරතුරු ඇතුළත් කරන්න</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormInput id="firstName" name="firstName" label="මුල් නම" value={formData.firstName} onChange={handleChange} error={errors.firstName} placeholder="ඔබේ මුල් නම" required />
        <FormInput id="lastName" name="lastName" label="අග නම" value={formData.lastName} onChange={handleChange} error={errors.lastName} placeholder="ඔබේ අග නම" required />
      </div>

      <FormInput id="email" name="email" type="email" label="ඊමේල් ලිපිනය" value={formData.email} onChange={handleChange} error={errors.email} icon={Mail} placeholder="example@email.com" required />

      <RoleSelector value={formData.role} onChange={(value) => setFormData({ ...formData, role: value as any })} />
    </motion.div>
  )
}
