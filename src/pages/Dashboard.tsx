import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from '../components/Sidebar'
import MobileSidebar, { MobileMenuButton } from '../components/MobileSidebar'
import MetricsCards from '../components/MetricsCards'
import ActivitiesChart from '../components/ActivitiesChart'
import TopProducts from '../components/TopProducts'
import AddProfileModal from '../components/AddProfileModal'
import SustainabilityTracker from '../components/SustainabilityTracker'
import FleetOverview from '../components/FleetOverview'
import { Search, Bell, Plus } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [isAddProfileModalOpen, setIsAddProfileModalOpen] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <MobileSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* header stuff */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <MobileMenuButton onClick={() => setIsMobileSidebarOpen(true)} />
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Dashboard</h1>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* search bar */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              {/* bell icon */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-400"></span>
              </button>
              
              {/* user name */}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{user?.name || 'Admin'}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <MetricsCards />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            <div className="xl:col-span-2 space-y-6">
              <ActivitiesChart />
              <SustainabilityTracker />
            </div>
            
            <div className="space-y-6">
              <TopProducts />
              <FleetOverview />
              
              {/* add profile button */}
              <div className="card">
                <div className="flex flex-col items-center justify-center py-8">
                  <button
                    onClick={() => setIsAddProfileModalOpen(true)}
                    className="w-16 h-16 border-2 border-dashed border-blue-300 rounded-full flex items-center justify-center text-blue-400 hover:border-blue-500 hover:text-blue-500 transition-colors mb-4 hover:bg-blue-50"
                  >
                    <Plus className="w-8 h-8" />
                  </button>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Add Profile</h3>
                  <p className="text-sm text-gray-500 text-center">
                    Add new user profiles to your dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AddProfileModal
        isOpen={isAddProfileModalOpen}
        onClose={() => setIsAddProfileModalOpen(false)}
      />
    </div>
  )
}
