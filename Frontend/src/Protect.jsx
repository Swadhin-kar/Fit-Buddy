import React, { useContext } from 'react'
import { AuthContext } from './components/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingFallback from './components/LoadingFallback'

const Protect = () => {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <LoadingFallback />
  }

  return user ? <Outlet /> : <Navigate to="/user/login" replace />
}

export default Protect
