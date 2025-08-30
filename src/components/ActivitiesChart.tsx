import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { TrendingUp, Truck } from 'lucide-react'

const data = [
  { name: 'Week 1', 'Guest': 85, 'User': 65 },
  { name: 'Week 2', 'Guest': 72, 'User': 89 },
  { name: 'Week 3', 'Guest': 95, 'User': 76 },
  { name: 'Week 4', 'Guest': 88, 'User': 94 },
]

export default function ActivitiesChart() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Activities</h3>
            <p className="text-sm text-gray-500">This month</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-sm text-green-600 font-medium mb-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+5.2%</span>
          </div>
          <div className="text-xs text-gray-500">vs last month</div>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Bar dataKey="Guest" fill="#10b981" radius={[2, 2, 0, 0]} />
            <Bar dataKey="User" fill="#3b82f6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
