import React, { useContext } from 'react'
import { AuthContext } from './components/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const Protect = () => {

    const { user, loading } = useContext(AuthContext)

    if (loading) return null;
    
    return user ? <Outlet /> : <Navigate to="/user/login" replace />;
}

export default Protect
