import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Wheat Cultivation', value: 45, color: '#f59e0b' },
  { name: 'Rice Farming', value: 35, color: '#10b981' },
  { name: 'Cotton Fields', value: 20, color: '#3b82f6' },
]

const cropDetails = [
  {
    name: 'Wheat Cultivation',
    percentage: '45%',
    color: '#f59e0b',
    area: '1,250 acres',
    tractors: '12 units',
    efficiency: '94%',
    carbonSaved: '125 tons',
  },
  {
    name: 'Rice Farming', 
    percentage: '35%',
    color: '#10b981',
    area: '850 acres',
    tractors: '8 units',
    efficiency: '91%',
    carbonSaved: '98 tons',
  },
  {
    name: 'Cotton Fields',
    percentage: '20%',
    color: '#3b82f6',
    area: '450 acres',
    tractors: '5 units',
    efficiency: '89%',
    carbonSaved: '67 tons',
  },
]

export default function TopProducts() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Crop Distribution</h3>
          <p className="text-sm text-gray-500">Current season allocation</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">2,550 acres</div>
          <div className="text-xs text-gray-500">Total Coverage</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        {/* Enhanced Chart */}
        <div className="w-32 h-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={50}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">25</div>
              <div className="text-xs text-gray-500">Tractors</div>
            </div>
          </div>
        </div>
        
        {/* Legend with enhanced details */}
        <div className="flex-1 ml-6">
          <div className="space-y-4">
            {cropDetails.map((crop) => (
              <div key={crop.name} className="border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: crop.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-900">{crop.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{crop.percentage}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">Area: </span>
                    <span>{crop.area}</span>
                  </div>
                  <div>
                    <span className="font-medium">Tractors: </span>
                    <span>{crop.tractors}</span>
                  </div>
                  <div>
                    <span className="font-medium">Efficiency: </span>
                    <span className="text-green-600 font-medium">{crop.efficiency}</span>
                  </div>
                  <div>
                    <span className="font-medium">CO₂ Saved: </span>
                    <span className="text-green-600 font-medium">{crop.carbonSaved}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="border-t border-gray-100 pt-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">290</div>
            <div className="text-xs text-gray-500">Total CO₂ Saved (tons)</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">92%</div>
            <div className="text-xs text-gray-500">Avg Efficiency</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-600">₹18.7L</div>
            <div className="text-xs text-gray-500">Fuel Savings</div>
          </div>
        </div>
      </div>

      {/* Season Progress */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-green-900">Kharif Season Progress</span>
          <span className="text-sm font-medium text-green-600">68%</span>
        </div>
        <div className="w-full bg-green-200 rounded-full h-2">
          <div className="bg-green-600 h-2 rounded-full transition-all duration-300" style={{ width: '68%' }}></div>
        </div>
        <div className="flex justify-between text-xs text-green-700 mt-1">
          <span>Started: June 2024</span>
          <span>Est. Completion: Nov 2024</span>
        </div>
      </div>
    </div>
  )
}
