import { createContext, useState, useEffect, useRef } from "react"
import axios from "../utils/axios"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const mounted = useRef(false)

  const checkAuth = async () => {
    try {
      const res = await axios.get("/user/verify")
      setUser(res.data.user)
    } catch (err) {
      if (err?.response?.status === 401) {
        setUser(null)
      } else {
        console.error("Auth check error:", err)
        setUser(null)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    mounted.current = true
    checkAuth()

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          if (mounted.current) setUser(null)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      mounted.current = false
      axios.interceptors.response.eject(interceptor)
    }
  }, [])

  const isAuthenticated = Boolean(user)

  return (
    <AuthContext.Provider value={{ user, setUser, loading, isAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
