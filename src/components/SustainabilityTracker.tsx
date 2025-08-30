import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Leaf, TrendingDown, Award, Target } from 'lucide-react'

const carbonData = [
  { month: 'Jan', saved: 85, target: 100, traditional: 450 },
  { month: 'Feb', saved: 120, target: 120, traditional: 480 },
  { month: 'Mar', saved: 165, target: 140, traditional: 520 },
  { month: 'Apr', saved: 210, target: 160, traditional: 580 },
  { month: 'May', saved: 280, target: 180, traditional: 640 },
  { month: 'Jun', saved: 350, target: 200, traditional: 720 },
]

const sustainabilityMetrics = [
  {
    title: 'Carbon Credits Earned',
    value: '1,247',
    unit: 'CO₂ tons',
    change: '+18.2%',
    icon: Award,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Fuel Savings',
    value: '₹24.8L',
    unit: 'this month',
    change: '+12.5%',
    icon: TrendingDown,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Green Score',
    value: '94.2',
    unit: '/100',
    change: '+5.1%',
    icon: Target,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
]

export default function SustainabilityTracker() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Sustainability Impact</h3>
            <p className="text-sm text-gray-500">Environmental benefits vs traditional farming</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">-67%</div>
          <div className="text-xs text-gray-500">Carbon Reduction</div>
        </div>
      </div>

      {/* Carbon Footprint Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={carbonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
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
            <Line 
              type="monotone" 
              dataKey="saved" 
              stroke="#10b981" 
              strokeWidth={3}
              name="CO₂ Saved (tons)"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#3b82f6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="traditional" 
              stroke="#ef4444" 
              strokeWidth={2}
              strokeDasharray="3 3"
              name="Traditional Emissions"
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sustainability Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sustainabilityMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.title} className={`${metric.bgColor} rounded-lg p-4 hover:shadow-md transition-shadow duration-300`}>
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${metric.color}`} />
                <span className="text-sm font-medium text-green-600">{metric.change}</span>
              </div>
              <div className="mb-1">
                <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
              </div>
              <h4 className="text-sm font-medium text-gray-700">{metric.title}</h4>
            </div>
          )
        })}
      </div>

      {/* Environmental Impact Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Monthly Impact Summary</h4>
            <p className="text-sm text-gray-600">
              Your fleet prevented <span className="font-semibold text-green-600">350 tons of CO₂</span> emissions, 
              equivalent to planting <span className="font-semibold text-green-600">8,750 trees</span> this month.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-3xl">🌱</div>
          </div>
        </div>
      </div>
    </div>
  )
}
