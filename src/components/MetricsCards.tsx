import { TrendingUp, DollarSign, CreditCard, Users, Activity } from 'lucide-react'

const metrics = [
  {
    title: 'Total Revenue',
    value: '₹2,129,430',
    change: '+2.5%',
    icon: DollarSign,
    color: 'green'
  },
  {
    title: 'Total Transactions', 
    value: '1,520',
    change: '+1.7%',
    icon: CreditCard,
    color: 'blue'
  },
  {
    title: 'Total Likes',
    value: '9,721', 
    change: '+1.4%',
    icon: Activity,
    color: 'purple'
  },
  {
    title: 'Total Users',
    value: '9,721',
    change: '+4.2%',
    icon: Users,
    color: 'orange'
  },
]

const colors = {
  green: 'bg-green-50 text-green-600 border-green-200',
  blue: 'bg-blue-50 text-blue-600 border-blue-200', 
  purple: 'bg-purple-50 text-purple-600 border-purple-200',
  orange: 'bg-orange-50 text-orange-600 border-orange-200'
}

export default function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const colorClasses = colors[metric.color as keyof typeof colors]
        
        return (
          <div key={metric.title} className={`card hover:shadow-lg transition-all duration-300 border-l-4 ${colorClasses.split(' ')[2]} group cursor-pointer`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <div className={`p-3 rounded-xl ${colorClasses.split(' ')[0]} mr-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${colorClasses.split(' ')[1]}`} />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
                <div className="flex items-baseline space-x-2 mb-1">
                  <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                </div>
                <div className="flex items-center text-sm font-medium text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>{metric.change}</span>
                  <span className="text-gray-500 ml-1 text-xs">vs last month</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
