import React from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StaggerContainer from '../animation/StaggerContainer';
import PremiumCard from './PremiumCard';


const Training_goal = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('/alljson/goals.json')
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Error fetching goals:", err))
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
    <section className="py-24 px-6 bg-[rgb(var(--card-depth-1)/0.2)] ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Targeted Fitness Goals</h2>
            <p className="text-[rgb(var(--text-muted))] text-lg">Explore specialized pathways designed to transform your physique and mindset.</p>
          </div>
        </div>
        <motion.div
          variants={StaggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {goals.map((goal, idx) => (
            // console.log(goal),

            <PremiumCard key={goal.id || idx} data={goal} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Training_goal
