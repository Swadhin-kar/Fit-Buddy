import axios from 'axios'

const api = axios.create({
  // if VITE_API_BASE_URL is undefined (e.g. not set in production), fall back to ''
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  withCredentials: true,
})

// Request interceptor: Attach token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
