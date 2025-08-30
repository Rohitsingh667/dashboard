import { useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  Mail,
  LogOut,
  X,
  Menu,
  BarChart3,
  Zap
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: BarChart3 },
  { name: 'Schedules', href: '/schedules', icon: Calendar },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const bottomNavigation = [
  { name: 'Help', href: '/help', icon: HelpCircle },
  { name: 'Contact Us', href: '/contact', icon: Mail },
]

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const location = useLocation()
  const { signOut } = useAuth()

  const isActive = (href: string) => location.pathname === href

  if (!isOpen) return null

  return (
    <div className="lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-blue-600 text-white flex flex-col z-50">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Board.</h1>
              <p className="text-xs text-blue-200">Dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-blue-100 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 transition-colors ${
                      isActive(item.href) ? 'text-white' : 'text-blue-200 group-hover:text-white'
                    }`} />
                    {item.name}
                    {isActive(item.href) && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-3 border-t border-white/10">
          <ul className="space-y-1">
            {bottomNavigation.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center px-3 py-3 text-sm font-medium text-blue-100 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                  >
                    <Icon className="w-5 h-5 mr-3 text-blue-200" />
                    {item.name}
                  </a>
                </li>
              )
            })}
            <li>
              <button
                onClick={() => {
                  signOut()
                  onClose()
                }}
                className="w-full flex items-center px-3 py-3 text-sm font-medium text-blue-100 rounded-lg hover:bg-red-500/20 hover:text-white transition-all duration-200 group"
              >
                <LogOut className="w-5 h-5 mr-3 text-blue-200 group-hover:text-red-300" />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

interface MobileMenuButtonProps {
  onClick: () => void
}

export function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
    >
      <Menu className="w-6 h-6" />
    </button>
  )
}
