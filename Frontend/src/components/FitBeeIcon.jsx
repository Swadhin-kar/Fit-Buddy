import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const FitBeeIcon = () => {
  const location = useLocation()

  if (location.pathname === '/FitBee') {
    return null
  }
  const Navigate = useNavigate()
  const handleclick = () => {
    Navigate('/FitBee')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <div onClick={handleclick} className='fixed bottom-6 right-6 z-50 cursor-pointer rounded-full shadow-lg shadow-gray-400 tooltip' data-tip="Your AI assistant">
      <img src="./FitBee.jpg" alt="fitbee-icon" width={60} height={60} className='rounded-full' />
    </div>
  )
}

export default FitBeeIcon
