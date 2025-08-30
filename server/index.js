import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Mock data for dashboard
const mockMetrics = {
  totalRevenues: {
    value: 2129430,
    change: 2.5,
    isPositive: true
  },
  totalTransactions: {
    value: 1520,
    change: 1.7,
    isPositive: true
  },
  totalLikes: {
    value: 9721,
    change: 1.4,
    isPositive: true
  },
  totalUsers: {
    value: 9721,
    change: 4.2,
    isPositive: true
  }
}

const mockActivities = [
  { name: 'Week 1', Guest: 400, User: 240 },
  { name: 'Week 2', Guest: 300, User: 139 },
  { name: 'Week 3', Guest: 200, User: 980 },
  { name: 'Week 4', Guest: 278, User: 390 }
]

const mockTopProducts = [
  { name: 'Basic Tees', value: 55, color: '#3b82f6' },
  { name: 'Custom Short Pants', value: 31, color: '#10b981' },
  { name: 'Super Hoodies', value: 14, color: '#f59e0b' }
]

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Get dashboard metrics
app.get('/api/metrics', (req, res) => {
  res.json(mockMetrics)
})

// Get activities data
app.get('/api/activities', (req, res) => {
  res.json(mockActivities)
})

// Get top products data
app.get('/api/products', (req, res) => {
  res.json(mockTopProducts)
})

// Authentication endpoints (mock implementation)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  
  // Mock authentication logic
  if (email && password) {
    const user = {
      id: '1',
      email,
      name: email.split('@')[0],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format'
    }
    
    // Generate a mock JWT token
    const token = 'mock_jwt_token_' + Date.now()
    
    res.json({
      success: true,
      user,
      token
    })
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    })
  }
})

app.post('/api/auth/google', (req, res) => {
  // Mock Google OAuth
  const user = {
    id: '1',
    email: 'johndoe@gmail.com',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format'
  }
  
  const token = 'google_jwt_token_' + Date.now()
  
  res.json({
    success: true,
    user,
    token
  })
})

// Profile management endpoints
let profiles = []

app.get('/api/profiles', (req, res) => {
  res.json(profiles)
})

app.post('/api/profiles', (req, res) => {
  const { name, email, phone, instagram, youtube } = req.body
  
  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and phone are required'
    })
  }
  
  const newProfile = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    instagram: instagram || '',
    youtube: youtube || '',
    createdAt: new Date().toISOString()
  }
  
  profiles.push(newProfile)
  
  res.status(201).json({
    success: true,
    profile: newProfile
  })
})

app.put('/api/profiles/:id', (req, res) => {
  const { id } = req.params
  const { name, email, phone, instagram, youtube } = req.body
  
  const profileIndex = profiles.findIndex(p => p.id === id)
  
  if (profileIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Profile not found'
    })
  }
  
  profiles[profileIndex] = {
    ...profiles[profileIndex],
    name: name || profiles[profileIndex].name,
    email: email || profiles[profileIndex].email,
    phone: phone || profiles[profileIndex].phone,
    instagram: instagram || profiles[profileIndex].instagram,
    youtube: youtube || profiles[profileIndex].youtube,
    updatedAt: new Date().toISOString()
  }
  
  res.json({
    success: true,
    profile: profiles[profileIndex]
  })
})

app.delete('/api/profiles/:id', (req, res) => {
  const { id } = req.params
  
  const profileIndex = profiles.findIndex(p => p.id === id)
  
  if (profileIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Profile not found'
    })
  }
  
  profiles.splice(profileIndex, 1)
  
  res.json({
    success: true,
    message: 'Profile deleted successfully'
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Dashboard API available at http://localhost:${PORT}/api`)
})
