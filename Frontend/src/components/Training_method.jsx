import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Card from './Card'
import StaggerContainer from '../animation/StaggerContainer'
import PremiumCard from './PremiumCard'

const Training_method = () => {
  const [methods, setMethods] = useState([])
  useEffect(() => {
    fetch('/alljson/method.json')
      .then((res) => res.json())
      .then((data) => setMethods(data))
      .catch((err) => console.error("Error fetching methods: ", err))
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Proven Methodologies</h2>
          <p className="text-[rgb(var(--text-muted))] max-w-2xl mx-auto">Scientifically backed training styles curated to deliver maximum efficiency for your time.</p>
        </div>
        <motion.div
          variants={StaggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {methods.map((method, idx) => (
            <PremiumCard key={idx} data={method} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Training_method
