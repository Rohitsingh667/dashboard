import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth token and redirect to login
      localStorage.removeItem('auth_token')
      window.location.href = '/signin'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },
  
  googleLogin: async () => {
    const response = await api.post('/auth/google')
    return response.data
  },
}

// Dashboard API
export const dashboardAPI = {
  getMetrics: async () => {
    const response = await api.get('/metrics')
    return response.data
  },
  
  getActivities: async () => {
    const response = await api.get('/activities')
    return response.data
  },
  
  getTopProducts: async () => {
    const response = await api.get('/products')
    return response.data
  },
}

// Profile API
export const profileAPI = {
  getProfiles: async () => {
    const response = await api.get('/profiles')
    return response.data
  },
  
  createProfile: async (profileData: {
    name: string
    email: string
    phone: string
    instagram?: string
    youtube?: string
  }) => {
    const response = await api.post('/profiles', profileData)
    return response.data
  },
  
  updateProfile: async (id: string, profileData: Partial<{
    name: string
    email: string
    phone: string
    instagram: string
    youtube: string
  }>) => {
    const response = await api.put(`/profiles/${id}`, profileData)
    return response.data
  },
  
  deleteProfile: async (id: string) => {
    const response = await api.delete(`/profiles/${id}`)
    return response.data
  },
}

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health')
  return response.data
}

export default api
