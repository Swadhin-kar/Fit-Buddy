import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Card from './Card'

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
    <div>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 ">
        <div className="text-center my-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Training Methods</h1>
          <p className="text-sm md:text-base max-w-2xl mx-auto mt-2 ">Explore our collection of training methods to help you find your favorite style and achieve your desired results. Whether you're aiming to build muscle, lose weight, or improve endurance, we've got you covered.</p>
        </div>
        <div className="grid gap-10 items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {methods.map((method, index) => (
            <Card key={index} data={method} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Training_method
