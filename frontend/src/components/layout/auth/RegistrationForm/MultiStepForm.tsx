import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import StepBasicInfo from './StepBasicInfo'
import StepSecurity from './StepSecurity'
import StepIdentity from './StepIdentity'
import NavigationControls from './NavigationControls'

interface MultiStepFormProps {
  currentStep: number
  steps: any[]
  formData: any
  errors: Record<string, string>
  isLoading: boolean
  handleChange: (e: React.ChangeEvent<any>) => void
  handleNext: () => void
  handlePrevious: () => void
  handleSubmit: (e: React.FormEvent) => void
  setFormData: React.Dispatch<React.SetStateAction<any>>
}

export default function MultiStepForm({
  currentStep,
  steps,
  formData,
  errors,
  isLoading,
  handleChange,
  handleNext,
  handlePrevious,
  handleSubmit,
  setFormData,
}: MultiStepFormProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      {errors.submit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center"
        >
          <XCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="text-sm">{errors.submit}</span>
        </motion.div>
      )}
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <StepBasicInfo
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        )}
        {currentStep === 2 && (
          <StepSecurity
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
        )}
        {currentStep === 3 && (
          <StepIdentity
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
        )}
        <NavigationControls
          currentStep={currentStep}
          steps={steps}
          isLoading={isLoading}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </form>
    </div>
  )
}
