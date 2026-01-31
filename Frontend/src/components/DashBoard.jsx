import React, { useState } from "react";
import {
  User,
  Mail,
  Dumbbell,
  Flame,
  Calculator,
  PlusCircle,
  Edit3,
  Trophy,
  CheckCircle,
  TrendingUp,
  Droplets,
  Moon,
  Activity
} from "lucide-react";
// Assuming Navbar is in the same directory
// import Navbar from "./Navbar"; 

/* ---------- Heatmap Logic ---------- */
const generateHeatmap = (weeks = 20) => {
  const days = weeks * 7;
  return Array.from({ length: days }, () => Math.floor(Math.random() * 5));
};

// Senior Logic: Dynamic opacity mapping based on brand secondary (green)
const getHeatmapColor = (level) => {
  const levels = [
    "bg-[rgb(var(--card-depth-2))]", // Level 0: Empty
    "bg-[rgb(var(--secondary))]/30", // Level 1: Low
    "bg-[rgb(var(--secondary))]/50", // Level 2: Med
    "bg-[rgb(var(--secondary))]/80", // Level 3: High
    "bg-[rgb(var(--secondary))]",    // Level 4: Max
  ];
  return levels[level];
};

export default function PersonalDashboard() {
  const [heatmap] = useState(generateHeatmap());

  const routine = [
    { name: "Push-ups", sets: "3×15", icon: <Activity size={14} /> },
    { name: "Squats", sets: "3×20", icon: <Activity size={14} /> },
    { name: "Plank", sets: "60s", icon: <Activity size={14} /> },
    { name: "Running", sets: "20 min", icon: <Activity size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--body-color))] text-[rgb(var(--text-primary))] px-4 pt-24 pb-12 md:px-10 transition-colors duration-300">
      {/* <Navbar /> */}

      {/* ================= HEADER SECTION ================= */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fitness Command Center</h1>
          <p className="opacity-60 text-sm">Welcome back, Chief. Your progress is looking sharp.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 rounded-xl bg-[rgb(var(--primary))] text-white hover:bg-[rgb(var(--primary-hover))] transition-all shadow-lg shadow-[rgb(var(--primary))]/20 flex items-center gap-2 text-sm font-medium">
             <PlusCircle size={18} /> Log Workout
           </button>
        </div>
      </header>

      {/* ================= TOP STATS (High Visual Impact) ================= */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Calories Burned" value="450" unit="kcal" trend="+12%" color="var(--primary)" />
        <StatCard title="Workout Streak" value="6" unit="days" trend="Stable" color="var(--secondary)" />
        <StatCard title="Current BMI" value="22.4" unit="Normal" trend="Optimal" color="var(--accent)" />
        <StatCard title="Goal Progress" value="68" unit="%" trend="+2%" color="var(--primary)" />
      </section>

      <div className="mt-8 grid lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Profile & Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Card */}
          <div className="group relative overflow-hidden rounded-[2rem] p-8 text-white shadow-2xl transition-transform hover:scale-[1.01] bg-gradient-to-br from-[rgb(var(--primary))] via-[rgb(var(--primary-hover))] to-[rgb(var(--secondary-hover))]">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl group-hover:bg-white/20 transition-all" />
            
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 h-24 w-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center ring-2 ring-white/30 shadow-inner">
                <User size={48} strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-bold tracking-wide">Swadhin Kumar Kar</h2>
              <p className="mt-1 text-sm opacity-80 flex items-center gap-2">
                <Mail size={14} /> swadhinkarjan26@gmail.com
              </p>
              
              <div className="mt-6 flex gap-3 w-full">
                 <div className="flex-1 rounded-2xl bg-black/10 backdrop-blur-sm p-3 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest opacity-70">Level</p>
                    <p className="font-bold">Pro Athlete</p>
                 </div>
                 <div className="flex-1 rounded-2xl bg-black/10 backdrop-blur-sm p-3 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest opacity-70">Points</p>
                    <p className="font-bold">2,450</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-2 gap-3">
            <ActionButton icon={<Calculator />} label="BMI Calc" sub="Check index" />
            <ActionButton icon={<Flame />} label="Nutrition" sub="Log meals" />
            <ActionButton icon={<Dumbbell />} label="Plan" sub="Edit routine" />
            <ActionButton icon={<Trophy />} label="Badges" sub="View all" />
          </div>
        </div>

        {/* RIGHT COLUMN: Performance (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Consistency Heatmap */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Activity Consistency</h3>
                <p className="text-xs opacity-50">Visualizing your dedication over the last 20 weeks</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] opacity-60">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map(l => <div key={l} className={`h-2 w-2 rounded-sm ${getHeatmapColor(l)}`} />)}
                </div>
                <span>More</span>
              </div>
            </div>
            <div className="overflow-x-auto pb-2 custom-scrollbar">
              <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-max">
                {heatmap.map((level, i) => (
                  <div
                    key={i}
                    className={`h-[14px] w-[14px] rounded-[3px] shadow-sm transition-all duration-300 hover:ring-2 hover:ring-[rgb(var(--primary))] hover:scale-125 cursor-pointer ${getHeatmapColor(level)}`}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Focus & Routine Grid */}
          <div className="grid md:grid-cols-2 gap-6">
             {/* Today's Focus */}
             <Card>
               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <TrendingUp size={20} className="text-[rgb(var(--primary))]" /> Today's Focus
               </h3>
               <div className="space-y-3">
                 <FocusItem label="Training" value="Chest & Triceps" icon={<Dumbbell size={16}/>} />
                 <FocusItem label="Hydration" value="2.5L / 4L" icon={<Droplets size={16}/>} color="var(--primary)" />
                 <FocusItem label="Recovery" value="7.5 hrs Sleep" icon={<Moon size={16}/>} color="var(--accent)" />
               </div>
             </Card>

             {/* Routine List */}
             <Card>
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-bold">Current Routine</h3>
                 <button className="text-[rgb(var(--primary))] hover:underline text-xs font-bold">Manage</button>
               </div>
               <div className="space-y-2">
                 {routine.map((item, i) => (
                   <div key={i} className="group flex items-center justify-between p-3 rounded-2xl bg-[rgb(var(--card-depth-1))] border border-[rgb(var(--card-depth-2))]/30 hover:border-[rgb(var(--primary))]/50 transition-colors">
                     <div className="flex items-center gap-3">
                       <div className="p-2 rounded-lg bg-[rgb(var(--card-depth-0))] text-[rgb(var(--primary))]">
                         {item.icon}
                       </div>
                       <span className="text-sm font-medium">{item.name}</span>
                     </div>
                     <span className="text-xs font-bold opacity-60 group-hover:opacity-100 group-hover:text-[rgb(var(--secondary))] transition-opacity">{item.sets}</span>
                   </div>
                 ))}
               </div>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= ENHANCED COMPONENTS ================= */

const Card = ({ children, className = "" }) => (
  <div className={`rounded-[2rem] p-6 
    bg-[rgb(var(--card-depth-0))] 
    border border-[rgb(var(--card-depth-1))]
    shadow-xl shadow-black/[0.02] dark:shadow-none transition-all ${className}`}>
    {children}
  </div>
);

const StatCard = ({ title, value, unit, trend, color }) => (
  <div className="group relative overflow-hidden rounded-3xl p-6 bg-[rgb(var(--card-depth-0))] border border-[rgb(var(--card-depth-1))] shadow-sm hover:shadow-lg transition-all duration-500">
    <div 
      className="absolute top-0 left-0 h-1 w-full opacity-40 group-hover:opacity-100 transition-opacity"
      style={{ backgroundColor: `rgb(${color})` }}
    />
    <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">{title}</p>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-black tracking-tight" style={{ color: `rgb(${color})` }}>{value}</span>
      <span className="text-xs font-bold opacity-40">{unit}</span>
    </div>
    <div className="mt-4 flex items-center justify-between">
       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trend.includes('+') ? 'bg-[rgb(var(--secondary))]/10 text-[rgb(var(--secondary))]' : 'bg-[rgb(var(--card-depth-2))] opacity-60'}`}>
         {trend}
       </span>
       <Activity size={16} className="opacity-10" />
    </div>
  </div>
);

const ActionButton = ({ icon, label, sub }) => (
  <button className="flex flex-col items-start p-4 w-full rounded-2xl bg-[rgb(var(--card-depth-0))] border border-[rgb(var(--card-depth-1))] hover:border-[rgb(var(--secondary))] hover:-translate-y-1 transition-all group">
    <div className="mb-3 p-2 rounded-xl bg-[rgb(var(--card-depth-1))] text-[rgb(var(--primary))] group-hover:bg-[rgb(var(--secondary))] group-hover:text-white transition-colors">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <span className="text-sm font-bold">{label}</span>
    <span className="text-[10px] opacity-50 font-medium">{sub}</span>
  </button>
);

const FocusItem = ({ label, value, icon, color = "var(--secondary)" }) => (
  <div className="flex items-center gap-4 p-3 rounded-2xl bg-[rgb(var(--card-depth-1))] border border-transparent hover:border-[rgb(var(--card-depth-2))] transition-all">
    <div className="p-2.5 rounded-xl bg-[rgb(var(--card-depth-0))] shadow-sm" style={{ color: `rgb(${color})` }}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] uppercase font-bold opacity-40 leading-none mb-1">{label}</p>
      <p className="text-sm font-bold tracking-tight">{value}</p>
    </div>
  </div>
);