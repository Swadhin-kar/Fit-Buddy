import React from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from './Card';

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
    <div className='mx-auto md:px-10 px-4'>
      <div className="text-center my-6">
        <h1 className="text-2xl md:text-3xl font-semibold">Fitness Goals</h1>
        <p className="text-sm md:text-base max-w-2xl mx-auto mt-2 ">Explore our collection of fitness goals to help you find your goal and achieve your desired results. Whether you're aiming to build muscle, lose weight, or improve endurance, we've got you covered.</p>
      </div>
      <motion.div 
        className="grid gap-5 items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {goals.map((goal, index) => (
          <Card key={goal.id} data={goal} index={index} />
        ))}
      </motion.div>
    </div>
  )
}

export default Training_goal
