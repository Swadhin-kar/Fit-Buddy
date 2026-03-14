import React from 'react'
import { useNavigate }  from 'react-router-dom'
const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="py-12 border-t bg-[rgb(var(--card-depth-1))] text-center">
        <div className="font-black text-2xl tracking-tighter mb-4 text-[rgb(var(--primary))]">FitBuddy</div>
        <p className="text-[rgb(var(--text-muted))] text-sm tracking-wide uppercase">Built for Performance • © 2026</p>
      </footer>
  )
}

export default Footer
