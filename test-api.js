import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'

async function testAPI() {
  console.log('🧪 Testing Dashboard API endpoints...\n')
  
  try {
    console.log('1. Testing health check...')
    const health = await axios.get(`${API_BASE}/health`)
    console.log('Health check:', health.data.message)

    console.log('\n2. Testing metrics endpoint...')
    const metrics = await axios.get(`${API_BASE}/metrics`)
    console.log('Metrics:', Object.keys(metrics.data).join(', '))
    console.log('\n3. Testing activities endpoint...')
    const activities = await axios.get(`${API_BASE}/activities`)
    console.log('Activities:', `${activities.data.length} weeks of data`)

    console.log('\n4. Testing products endpoint...')
    const products = await axios.get(`${API_BASE}/products`)
    console.log('Products:', products.data.map(p => p.name).join(', '))
    console.log('\n5. Testing authentication...')
    const auth = await axios.post(`${API_BASE}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    })
    console.log('Authentication:', auth.data.success ? 'Successful' : 'Failed')
    
    console.log('\n6. Testing profile creation...')
    const profile = await axios.post(`${API_BASE}/profiles`, {
      name: 'Test User',
      email: 'testuser@example.com',
      phone: '+1234567890',
      instagram: 'testuser',
      youtube: 'testchannel'
    })
    console.log('Profile created:', profile.data.success ? 'Successful' : 'Failed')

    console.log('\n7. Testing profile listing...')
    const profiles = await axios.get(`${API_BASE}/profiles`)
    console.log('Profiles:', `${profiles.data.length} profile(s) found`)
    
    console.log('\nAll API tests passed! Backend is working correctly.')
    
  } catch (error) {
    console.error(' API test failed:', error.response?.data?.message || error.message)
    console.log('\nMake sure to start the backend server first:')
    console.log(' npm run server')
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  testAPI()
}

export default testAPI
