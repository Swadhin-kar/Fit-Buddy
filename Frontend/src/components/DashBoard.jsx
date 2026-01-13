import React, { useState } from "react";
import { User, Mail, Dumbbell, Flame, Calculator, PlusCircle, Edit3 } from "lucide-react";
import Navbar from "./Navbar";
import Footer from './Footer'

const generateHeatmap = () => {
  const days = 84; // 12 weeks
  return Array.from({ length: days }, () => Math.floor(Math.random() * 5));
};

const intensityColors = [
  "bg-gray-800",
  "bg-yellow-600",
  "bg-yellow-500",
  "bg-orange-500",
  "bg-red-600",
];

export default function PersonalDashboard() {
  const [heatmap] = useState(generateHeatmap());
  const [routine, setRoutine] = useState([
    "Push-ups – 3x15",
    "Squats – 3x20",
    "Plank – 60s",
    "Running – 20 min",
  ]);

  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-16">
        <Navbar />
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="rounded-2xl p-6 flex items-center bg-[#5F9598] text-white gap-4 w-full md:w-1/3">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              Swadhin Kumar Kar
            </h2>
            <p className="flex items-center gap-2 text-sm text-white/60">
              <Mail size={14} /> swadhinkarjan26@gmail.com
            </p>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-2/3">
          <ActionButton icon={<PlusCircle />} label="Update Today" />
          <ActionButton icon={<Calculator />} label="BMI Calculator" />
          <ActionButton icon={<Flame />} label="Calorie Calc" />
          <ActionButton icon={<Dumbbell />} label="Exercise Gen" />
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="mt-8 bg-[#5F9598] rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Exercise Consistency</h3>
        <div className="grid grid-cols-14 gap-1">
          {heatmap.map((level, i) => (
            <div
              key={i}
              className={`h-4 w-4 rounded-sm ${intensityColors[level]}`}
              title={`Intensity: ${level}`}
            />
          ))}
        </div>
        <p className="text-xs mt-3 text-white">Yellow → Red indicates higher workout intensity</p>
      </div>

      {/* Routine & Tools */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-base-900 dark:text-base-100">Current Exercise Routine</h3>
            <button className="flex items-center gap-2 text-sm text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300">
              <Edit3 size={16} /> Edit
            </button>
          </div>
          <ul className="space-y-2">
            {routine.map((item, i) => (
              <li key={i} className="bg-base-300 dark:bg-gray-900 rounded-lg px-4 py-2 text-base-900 dark:text-base-100">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-base-200 dark:bg-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-base-900 dark:text-base-100">Quick Insights</h3>
          <div className="grid grid-cols-2 gap-4">
            <InsightCard title="Streak" value="6 days" />
            <InsightCard title="Weekly Calories" value="3,200 kcal" />
            <InsightCard title="BMI" value="22.4" />
            <InsightCard title="Goal" value="Muscle Gain" />
          </div>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button className="bg-[#5F9598] hover:bg-[#3f6365] shadow-md hover:shadow-lg transition rounded-2xl p-4 flex flex-col items-center gap-2 text-white">
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

function InsightCard({ title, value }) {
  return (
    <div className="bg-base-300 dark:bg-gray-900 rounded-xl p-4">
      <p className="text-xs text-base-500 dark:text-gray-400">{title}</p>
      <p className="text-lg font-semibold text-base-900 dark:text-base-100">{value}</p>
    </div>
  );
}
