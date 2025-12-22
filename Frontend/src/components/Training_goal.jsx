import React from 'react'
import { useState, useEffect } from 'react'
import Card from './Card';

const Training_goal = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('/alljson/goals.json')
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Error fetching goals:", err))
  }, [])

  return (
    <div className='mx-auto md:px-10 px-4'>
      <div className="text-center my-6">
        <h1 className="text-2xl md:text-3xl font-semibold">Fitness Goals</h1>
        <p className="text-sm md:text-base max-w-2xl mx-auto mt-2 ">Explore our collection of fitness goals to help you find your goal and achieve your desired results. Whether you're aiming to build muscle, lose weight, or improve endurance, we've got you covered.</p>
      </div>
      <div className="grid gap-5 items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card key={goal.id} data={goal} />
        ))}
      </div>
    </div>
  )
}

export default Training_goal
