import React from 'react'
import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const checkAuth = async () => {
        try {
            const res = await axios.get('http://localhost:7000/user/verify', { withCredentials: true })
            setUser(res.data.user)
        } catch (err) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
