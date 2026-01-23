import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from '../utils/axios';
import toast from 'react-hot-toast';
import { User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';


const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { user, loading, checkAuth, setUser } = useContext(AuthContext)


  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)


  useEffect(() => {
    if (user) setLoggedIn(true)
    else setLoggedIn(false)
  }, [user])

  const logoutme = async () => {
    setIsLoggingOut(true)
    try {
      await axios.post('/user/logout')
      setUser(null)
      toast.success('Logged out successfully')
      setTimeout(() => {

        navigate('/', {
          state: { from: location.pathname }
        })
        window.location.reload()
      }, 800)
    } catch (err) {
      toast.error('Failed to logout')
      setIsLoggingOut(false)
    }
  }

  const handleLogin = () => {
    navigate('/user/login', {
      state: { from: location.pathname }
    })
  }

  return (
    <div className={`navbar fixed top-0 left-0 w-full z-50 bg-[rgb(var(--navbar))] shadow-md duration-100  text-white`}>

      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className={`menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow text-white bg-[rgb(var(--navbar))]`}>
            <li><a href='/'>Home</a></li>
            <li><a href='/exercises'>Exercises</a></li>
            <li>
              <details>
                <summary>Tools</summary>
                <ul className="p-2 bg-[rgb(var(--navbar))] w-40 z-1 ">
                  <li><a href='/calorie-calculator'>Calorie calculator</a></li>
                  <li><a href='/bmi-calculator'>BMI calculator</a></li>
                  <li><a href='/exercise-selector'>Exercise Selector</a></li>
                  <li><a href='/daily-tracker'>Daily Tracker</a></li>
                </ul>
              </details>
            </li>
            <li><a>Contact Us</a></li>
          </ul>
        </div>
        <a className={`btn btn-ghost text-xl hover:bg-[rgb(var(--navbar-hover))] hover:border-none`} href='/'>FitBuddy</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className={`menu menu-horizontal px-1 `}>
          <li><a href='/'>Home</a></li>
          <li><a href='/exercises'>Exercises</a></li>
          <li>
            <details>
              <summary>Tools</summary>
              <ul className="p-2 bg-[rgb(var(--navbar))] w-40 z-1 ">
                <li><a href='/calorie-calculator'>Calorie calculator</a></li>
                <li><a href='/bmi-calculator'>BMI calculator</a></li>
                <li><a href='/exercise-selector'>Exercise Selector</a></li>
                <li><a href='/daily-tracker'>Daily Tracker</a></li>
              </ul>
            </details>
          </li>
          <li><a>Contact Us</a></li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="mr-2">
          <ThemeToggle className="text-white" />
        </div>

        {user ? (
          <>
            <button
              onClick={logoutme}
              disabled={isLoggingOut}
              className="btn bg-red-500 text-white ml-4 hover:bg-red-600 disabled:opacity-50"
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>

            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white ml-4">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover cursor-pointer"
                  onClick={() => navigate('/dashboard')}
                />
              ) : (
                <User size={20} className="cursor-pointer" />
              )}
            </div>
          </>
        ) : (
          <button
            className="btn bg-blue-700 text-white ml-4 hover:bg-blue-900"
            onClick={handleLogin}
          >
            Login / Signup
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
