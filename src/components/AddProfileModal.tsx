import { useState } from 'react'
import { X } from 'lucide-react'

interface AddProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ProfileData {
  name: string
  email: string
  phone: string
  instagram: string
  youtube: string
}

export default function AddProfileModal({ isOpen, onClose }: AddProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'contact' | 'social'>('basic')
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    youtube: '',
  })

  if (!isOpen) return null

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (activeTab === 'basic') {
      setActiveTab('contact')
    } else if (activeTab === 'contact') {
      setActiveTab('social')
    }
  }

  const handleBack = () => {
    if (activeTab === 'social') {
      setActiveTab('contact')
    } else if (activeTab === 'contact') {
      setActiveTab('basic')
    }
  }

  const handleDone = () => {
    // Handle form submission here
    console.log('Profile data:', profileData)
    onClose()
    // Reset form
    setProfileData({
      name: '',
      email: '',
      phone: '',
      instagram: '',
      youtube: '',
    })
    setActiveTab('basic')
  }

  const isBasicComplete = profileData.name && profileData.email && profileData.phone

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('basic')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'basic'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Basic
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'contact'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'social'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Social
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Name*
                </label>
                <input
                  id="name"
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Eg. Rohit Singh"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Email*
                </label>
                <input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Eg. rohit@xyz.com"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Phone*
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Eg. 9123456789"
                  className="input-field"
                  required
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="text-center py-8">
              <p className="text-gray-500">Contact information will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">This tab is for demonstration purposes</p>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram Link (Optional)
                </label>
                <input
                  id="instagram"
                  type="url"
                  value={profileData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  placeholder="Eg. instagram.com/username"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 mb-1">
                  Youtube Link (Optional)
                </label>
                <input
                  id="youtube"
                  type="url"
                  value={profileData.youtube}
                  onChange={(e) => handleInputChange('youtube', e.target.value)}
                  placeholder="Eg. youtube.com/username"
                  className="input-field"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          {activeTab !== 'basic' ? (
            <button
              onClick={handleBack}
              className="btn-secondary"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          {activeTab === 'social' ? (
            <button
              onClick={handleDone}
              className="btn-primary"
            >
              Done
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={activeTab === 'basic' && !isBasicComplete}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
