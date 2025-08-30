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
  BarChart3,
  Zap
} from 'lucide-react'

const nav = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: BarChart3 },
  { name: 'Schedules', href: '/schedules', icon: Calendar },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const bottomNav = [
  { name: 'Help', href: '/help', icon: HelpCircle },
  { name: 'Contact Us', href: '/contact', icon: Mail },
]

export default function Sidebar() {
  const location = useLocation()
  const { signOut } = useAuth()

  return (
    <div className="w-64 bg-blue-600 text-white flex flex-col hidden lg:flex">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Board.</h1>
            <p className="text-xs text-blue-200">Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.href
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                  {active && <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-white/10">
        <ul className="space-y-1">
          {bottomNav.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center px-3 py-3 text-sm font-medium text-blue-100 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </a>
              </li>
            )
          })}
          <li>
            <button
              onClick={signOut}
              className="w-full flex items-center px-3 py-3 text-sm font-medium text-blue-100 rounded-lg hover:bg-red-500/20 hover:text-white transition-all duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
