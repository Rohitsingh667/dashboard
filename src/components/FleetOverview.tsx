import { Truck, Battery, MapPin, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

const fleetData = [
  {
    id: 'TR-001',
    name: 'Green Thunder',
    location: 'Punjab, India',
    status: 'active',
    battery: 87,
    farmer: 'Rajesh Kumar',
    hoursToday: 6.5,
    efficiency: 94,
  },
  {
    id: 'TR-002', 
    name: 'Eco Warrior',
    location: 'Haryana, India',
    status: 'charging',
    battery: 34,
    farmer: 'Priya Sharma',
    hoursToday: 4.2,
    efficiency: 89,
  },
  {
    id: 'TR-003',
    name: 'Field Master',
    location: 'Uttar Pradesh',
    status: 'maintenance',
    battery: 12,
    farmer: 'Amit Singh',
    hoursToday: 0,
    efficiency: 0,
  },
  {
    id: 'TR-004',
    name: 'Harvest Pro',
    location: 'Rajasthan, India',
    status: 'active',
    battery: 76,
    farmer: 'Sunita Devi',
    hoursToday: 5.8,
    efficiency: 96,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'charging':
      return 'bg-blue-100 text-blue-800'
    case 'maintenance':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4" />
    case 'charging':
      return <Battery className="w-4 h-4" />
    case 'maintenance':
      return <AlertTriangle className="w-4 h-4" />
    default:
      return <Clock className="w-4 h-4" />
  }
}

const getBatteryColor = (battery: number) => {
  if (battery > 60) return 'bg-green-500'
  if (battery > 30) return 'bg-yellow-500'
  return 'bg-red-500'
}

export default function FleetOverview() {
  const totalTractors = fleetData.length
  const activeTractors = fleetData.filter(t => t.status === 'active').length
  const avgBattery = Math.round(fleetData.reduce((sum, t) => sum + t.battery, 0) / totalTractors)
  const totalHours = fleetData.reduce((sum, t) => sum + t.hoursToday, 0)

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Fleet Overview</h3>
            <p className="text-sm text-gray-500">Real-time e-tractor monitoring</p>
          </div>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      {/* Fleet Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{activeTractors}/{totalTractors}</div>
              <div className="text-xs text-blue-700">Active Tractors</div>
            </div>
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{avgBattery}%</div>
              <div className="text-xs text-green-700">Avg Battery</div>
            </div>
            <Battery className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Individual Tractors */}
      <div className="space-y-3">
        {fleetData.map((tractor) => (
          <div key={tractor.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{tractor.name}</h4>
                  <p className="text-xs text-gray-500">{tractor.id}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tractor.status)}`}>
                {getStatusIcon(tractor.status)}
                <span className="capitalize">{tractor.status}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              {/* Battery */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Battery</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getBatteryColor(tractor.battery)} transition-all duration-300`}
                      style={{ width: `${tractor.battery}%` }}
                    ></div>
                  </div>
                  <span className="font-medium">{tractor.battery}%</span>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Location</span>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="font-medium">{tractor.location}</span>
                </div>
              </div>
              
              {/* Farmer */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Assigned to</span>
                <span className="font-medium">{tractor.farmer}</span>
              </div>
              
              {/* Performance */}
              <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-gray-600">Today: </span>
                    <span className="font-medium">{tractor.hoursToday}h</span>
                  </div>
                  {tractor.efficiency > 0 && (
                    <div>
                      <span className="text-gray-600">Efficiency: </span>
                      <span className="font-medium text-green-600">{tractor.efficiency}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-600">Total Hours Today: </span>
            <span className="font-semibold text-gray-900">{totalHours.toFixed(1)}h</span>
          </div>
          <div>
            <span className="text-gray-600">Avg Utilization: </span>
            <span className="font-semibold text-green-600">82%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
