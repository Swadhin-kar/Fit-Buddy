// import { useState, useEffect } from 'react';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const DashBoard = () => {
//   const [userData, setUserData] = useState({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     profilePic: 'https://via.placeholder.com/150', // Placeholder image
//     exerciseData: [
//       { date: '2023-01-01', workouts: 5 },
//       { date: '2023-01-02', workouts: 8 },
//       { date: '2023-01-03', workouts: 3 },
//       { date: '2023-01-04', workouts: 10 },
//       { date: '2023-01-05', workouts: 6 },
//       { date: '2023-01-06', workouts: 7 },
//       { date: '2023-01-07', workouts: 9 },
//     ],
//     currentRoutine: 'Morning Cardio & Evening Strength',
//     todayUpdates: 'Completed 30 mins run. Feeling energized!',
//     caloriesBurned: 1500,
//     bmi: 22.5,
//   });

//   const [showExercisePlanner, setShowExercisePlanner] = useState(false);
//   const [showReportGenerator, setShowReportGenerator] = useState(false);

//   const handleCalorieCalculator = () => {
//     alert('Calorie Calculator functionality coming soon!');
//   };

//   const handleBMICalculator = () => {
//     alert('BMI Calculator functionality coming soon!');
//   };

//   const handleExercisePlanner = () => {
//     setShowExercisePlanner(!showExercisePlanner);
//   };

//   const handleGenerateReport = () => {
//     setShowReportGenerator(!showReportGenerator);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col
// export default DashBoard


import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Flame, User, Activity, Calculator, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function DashBoard() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="col-span-1 rounded-2xl shadow-lg">
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <img
              src="https://i.pravatar.cc/150"
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-slate-300"
            />
            <h2 className="text-xl font-semibold">Swadhin Kumar Kar</h2>
            <p className="text-sm text-slate-500">swadhinkarjan26@gmail.com</p>
            <Button className="rounded-xl">Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Activity Heatmap */}
        <Card className="col-span-2 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar />
              <h3 className="text-lg font-semibold">Coding Activity</h3>
            </div>
            <div className="grid grid-cols-14 gap-1">
              {Array.from({ length: 98 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-sm ${
                    i % 5 === 0
                      ? "bg-green-500"
                      : i % 3 === 0
                      ? "bg-green-300"
                      : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* BMI Calculator */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator />
              <h3 className="text-lg font-semibold">BMI Calculator</h3>
            </div>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full mb-2 p-2 rounded border"
              placeholder="Weight (kg)"
            />
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full mb-4 p-2 rounded border"
              placeholder="Height (cm)"
            />
            <p className="text-center text-xl font-bold">BMI: {bmi}</p>
          </CardContent>
        </Card>

        {/* Calories */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Flame />
              <h3 className="text-lg font-semibold">Daily Calories</h3>
            </div>
            <Progress value={65} className="mb-2" />
            <p className="text-sm text-slate-600">1300 / 2000 kcal</p>
          </CardContent>
        </Card>

        {/* Fitness Stats */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity />
              <h3 className="text-lg font-semibold">Fitness Stats</h3>
            </div>
            <ul className="text-sm space-y-2">
              <li>🏃 Steps: 8,432</li>
              <li>💧 Water: 2.3L</li>
              <li>😴 Sleep: 7h 20m</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-sm text-slate-500 mt-8"
      >
        Built for FitBuddy • Personal Dashboard
      </motion.p>
    </div>
  );
}
