import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

interface Props {
  currentStep: number
  steps: number[]
  isLoading: boolean
  onNext: () => void
  onPrevious: () => void
}

export default function NavigationControls({ currentStep, steps, isLoading, onNext, onPrevious }: Props) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-gray-200 space-y-4 sm:space-y-0">
      <div>
        {currentStep > 1 && (
          <button type="button" onClick={onPrevious} className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> පෙර
          </button>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <span className="text-xs sm:text-sm text-gray-500">{currentStep} / {steps.length}</span>
        {currentStep < steps.length ? (
          <button type="button" onClick={onNext} className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base">
            ඊළඟ <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </button>
        ) : (
          <button type="submit" disabled={isLoading} className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-3" />
                ලියාපදිංචි වෙමින්...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> ගිණුම සාදන්න
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
