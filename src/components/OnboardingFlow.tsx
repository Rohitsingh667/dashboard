import { useState } from 'react'
import { CheckCircle, ArrowRight, ArrowLeft, Truck, Users, Zap, Leaf, Target } from 'lucide-react'

interface OnboardingFlowProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

interface OnboardingData {
  role: 'farmer' | 'dealer' | 'administrator' | ''
  experience: 'beginner' | 'intermediate' | 'expert' | ''
  farmSize: string
  location: {
    state: string
    district: string
  }
  cropTypes: string[]
  goals: string[]
  preferences: {
    language: string
    notifications: boolean
    sustainabilityTracking: boolean
  }
}

const steps = [
  { id: 1, title: 'Welcome', subtitle: 'Join the electric farming revolution' },
  { id: 2, title: 'Your Role', subtitle: 'Tell us about yourself' },
  { id: 3, title: 'Experience', subtitle: 'Your farming background' },
  { id: 4, title: 'Farm Details', subtitle: 'About your agricultural operations' },
  { id: 5, title: 'Goals', subtitle: 'What you want to achieve' },
  { id: 6, title: 'Preferences', subtitle: 'Customize your experience' },
  { id: 7, title: 'Complete', subtitle: 'You\'re ready to go!' },
]

const roleOptions = [
  { 
    id: 'farmer', 
    title: 'Farmer', 
    description: 'I own or operate farmland',
    icon: Truck,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  { 
    id: 'dealer', 
    title: 'Dealer/Distributor', 
    description: 'I sell agricultural equipment',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  { 
    id: 'administrator', 
    title: 'Administrator', 
    description: 'I manage fleet operations',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
]

const goalOptions = [
  'Reduce carbon footprint',
  'Increase operational efficiency',
  'Lower fuel costs',
  'Modernize farming practices',
  'Improve crop yields',
  'Access government subsidies',
  'Join sustainable agriculture network',
  'Reduce maintenance costs'
]

const cropTypes = [
  'Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Soybean', 
  'Pulses', 'Vegetables', 'Fruits', 'Other cereals'
]

const indianStates = [
  'Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh',
  'Maharashtra', 'Gujarat', 'Karnataka', 'Andhra Pradesh', 'Telangana',
  'Tamil Nadu', 'Kerala', 'West Bengal', 'Bihar', 'Odisha'
]

export default function OnboardingFlow({ isOpen, onClose, onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    role: '',
    experience: '',
    farmSize: '',
    location: { state: '', district: '' },
    cropTypes: [],
    goals: [],
    preferences: {
      language: 'english',
      notifications: true,
      sustainabilityTracking: true
    }
  })

  if (!isOpen) return null

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleRoleSelect = (role: 'farmer' | 'dealer' | 'administrator') => {
    setOnboardingData(prev => ({ ...prev, role }))
  }

  const handleGoalToggle = (goal: string) => {
    setOnboardingData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const handleCropToggle = (crop: string) => {
    setOnboardingData(prev => ({
      ...prev,
      cropTypes: prev.cropTypes.includes(crop)
        ? prev.cropTypes.filter(c => c !== crop)
        : [...prev.cropTypes, crop]
    }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Zap className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Board!</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
              Join thousands of farmers revolutionizing agriculture with electric tractors. 
              Let's set up your personalized dashboard.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-gray-600">100% Electric</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-gray-600">AI-Powered</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-gray-600">Community</span>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="py-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What best describes your role?</h3>
            <div className="space-y-4">
              {roleOptions.map((role) => {
                const Icon = role.icon
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id as any)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                      onboardingData.role === role.id
                        ? `${role.borderColor} ${role.bgColor} shadow-md`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${role.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${role.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{role.title}</h4>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                      {onboardingData.role === role.id && (
                        <CheckCircle className="w-6 h-6 text-green-600 ml-auto" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="py-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What's your farming experience?</h3>
            <div className="space-y-3">
              {[
                { id: 'beginner', title: 'New to Farming', desc: 'Just getting started' },
                { id: 'intermediate', title: 'Some Experience', desc: '1-5 years of farming' },
                { id: 'expert', title: 'Experienced Farmer', desc: '5+ years of farming' }
              ].map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setOnboardingData(prev => ({ ...prev, experience: exp.id as any }))}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                    onboardingData.experience === exp.id
                      ? 'border-green-200 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{exp.title}</h4>
                      <p className="text-sm text-gray-600">{exp.desc}</p>
                    </div>
                    {onboardingData.experience === exp.id && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="py-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Tell us about your farm</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size (acres)</label>
              <input
                type="number"
                placeholder="e.g., 50"
                value={onboardingData.farmSize}
                onChange={(e) => setOnboardingData(prev => ({ ...prev, farmSize: e.target.value }))}
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  value={onboardingData.location.state}
                  onChange={(e) => setOnboardingData(prev => ({ 
                    ...prev, 
                    location: { ...prev.location, state: e.target.value }
                  }))}
                  className="input-field"
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                <input
                  type="text"
                  placeholder="Enter district"
                  value={onboardingData.location.district}
                  onChange={(e) => setOnboardingData(prev => ({ 
                    ...prev, 
                    location: { ...prev.location, district: e.target.value }
                  }))}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Primary Crops (select all that apply)</label>
              <div className="grid grid-cols-2 gap-2">
                {cropTypes.map(crop => (
                  <button
                    key={crop}
                    onClick={() => handleCropToggle(crop)}
                    className={`p-2 text-sm border rounded-lg transition-colors ${
                      onboardingData.cropTypes.includes(crop)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="py-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What are your main goals?</h3>
            <div className="grid grid-cols-1 gap-3">
              {goalOptions.map(goal => (
                <button
                  key={goal}
                  onClick={() => handleGoalToggle(goal)}
                  className={`p-3 text-left border rounded-lg transition-all hover:shadow-sm ${
                    onboardingData.goals.includes(goal)
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{goal}</span>
                    {onboardingData.goals.includes(goal) && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="py-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Customize your preferences</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
              <select
                value={onboardingData.preferences.language}
                onChange={(e) => setOnboardingData(prev => ({ 
                  ...prev, 
                  preferences: { ...prev.preferences, language: e.target.value }
                }))}
                className="input-field"
              >
                <option value="english">English</option>
                <option value="hindi">हिंदी (Hindi)</option>
                <option value="punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="gujarati">ગુજરાતી (Gujarati)</option>
                <option value="marathi">मराठी (Marathi)</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Push Notifications</h4>
                  <p className="text-sm text-gray-600">Get alerts about tractor status and operations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onboardingData.preferences.notifications}
                    onChange={(e) => setOnboardingData(prev => ({ 
                      ...prev, 
                      preferences: { ...prev.preferences, notifications: e.target.checked }
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Sustainability Tracking</h4>
                  <p className="text-sm text-gray-600">Monitor your environmental impact</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onboardingData.preferences.sustainabilityTracking}
                    onChange={(e) => setOnboardingData(prev => ({ 
                      ...prev, 
                      preferences: { ...prev.preferences, sustainabilityTracking: e.target.checked }
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        )

      case 7:
        return (
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">You're All Set! 🎉</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
              Welcome to the future of farming! Your personalized dashboard is ready with 
              features tailored to your needs.
            </p>
            <div className="bg-green-50 rounded-lg p-4 max-w-md mx-auto">
              <h4 className="font-medium text-green-900 mb-2">What's Next?</h4>
              <ul className="text-sm text-green-700 space-y-1 text-left">
                <li>• Explore your personalized dashboard</li>
                <li>• Connect with local dealers</li>
                <li>• Schedule your first e-tractor demo</li>
                <li>• Join the farming community</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const isStepComplete = () => {
    switch (currentStep) {
      case 1: return true
      case 2: return onboardingData.role !== ''
      case 3: return onboardingData.experience !== ''
      case 4: return onboardingData.farmSize && onboardingData.location.state && onboardingData.cropTypes.length > 0
      case 5: return onboardingData.goals.length > 0
      case 6: return true
      case 7: return true
      default: return false
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header with Progress */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Setup Your Dashboard</h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep > step.id 
                    ? 'bg-green-600 text-white' 
                    : currentStep === step.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-1 mx-2 rounded-full transition-colors ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-600">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.subtitle}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px]">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentStep === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={!isStepComplete()}
            className={`flex items-center px-6 py-2 text-sm font-medium rounded-lg transition-all ${
              isStepComplete()
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length ? 'Complete Setup' : 'Continue'}
            {currentStep < steps.length && <ArrowRight className="w-4 h-4 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  )
}
