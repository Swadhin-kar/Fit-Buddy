import React, { memo, useRef, useState } from "react";

const FoodCard = memo(({ item, applyDelta, onRemove }) => {
  const { food } = item;
  const [size, setSize] = useState(item.size);
  const [servings, setServings] = useState(item.servings);
  const prev = useRef({ size, servings });

  const currentData = food[size];

  const updateNutrition = (newSize, newServings) => {
    const oldBase = food[prev.current.size];
    const newBase = food[newSize];

    const delta = {
      calories: newBase.calories * newServings - oldBase.calories * prev.current.servings,
      protein: newBase.protein * newServings - oldBase.protein * prev.current.servings,
      carbs: newBase.carbs * newServings - oldBase.carbs * prev.current.servings,
      fat: newBase.fat * newServings - oldBase.fat * prev.current.servings
    };

    applyDelta(delta);
    prev.current = { size: newSize, servings: newServings };
  };

  const changeSize = (newSize) => {
    setSize(newSize);
    updateNutrition(newSize, servings);
  };

  const changeServings = (change) => {
    const next = servings + change;
    if (next < 1) return;
    setServings(next);
    updateNutrition(size, next);
  };

  const getLevelStyles = (level) => {
    switch (level) {
      case "low": return "from-emerald-400/20 to-emerald-500/5 text-emerald-500 border-emerald-500/20";
      case "high": return "from-rose-400/20 to-rose-500/5 text-rose-500 border-rose-500/20";
      default: return "from-amber-400/20 to-amber-500/5 text-amber-600 border-amber-500/20";
    }
  };

  return (
    <div 
      className="group relative p-1 rounded-[3rem] transition-all duration-500 hover:scale-[1.01] overflow-hidden"
      style={{ background: `linear-gradient(135deg, rgb(var(--primary) / 0.2), transparent)` }}
    >
      {/* Background Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[rgb(var(--primary))] opacity-10 blur-[80px] group-hover:opacity-20 transition-opacity" />
      
      <div 
        className="relative p-8 rounded-[2.8rem] backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
        style={{ backgroundColor: `rgb(var(--card-depth-0) / 0.8)` }}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-black tracking-tight bg-gradient-to-br from-[rgb(var(--text-primary))] to-[rgb(var(--text-primary)/0.6)] bg-clip-text text-transparent">
              {food.name}
            </h2>
            <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${getLevelStyles(currentData.calorieLevel)}`}>
              {currentData.calorieLevel} Intensity
            </div>
          </div>
          <button 
            onClick={() => onRemove(item)}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 transform hover:rotate-90"
          >
            ✕
          </button>
        </div>

        {/* Interaction Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Size Selector */}
          <div className="p-4 rounded-[2rem] bg-black/5 dark:bg-white/5 border border-white/5">
            <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest ml-2 mb-3 block">Portion Size</span>
            <div className="flex gap-2">
              {["small", "medium", "large"].map((s) => (
                <button
                  key={s}
                  onClick={() => changeSize(s)}
                  className={`flex-1 py-3 rounded-2xl font-bold text-xs transition-all duration-300 ${
                    size === s 
                      ? "bg-[rgb(var(--primary))] text-white shadow-[0_0_20px_rgba(var(--primary),0.4)] scale-105" 
                      : "hover:bg-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  {s.charAt(0).toUpperCase()} <span className="block text-[9px] opacity-60 font-medium">{food[s].grams}g</span>
                </button>
              ))}
            </div>
          </div>

          {/* Servings Counter */}
          <div className="p-4 rounded-[2rem] bg-black/5 dark:bg-white/5 border border-white/5 flex flex-col justify-center">
            <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest ml-2 mb-3 block">Quantity</span>
            <div className="flex items-center justify-between px-2">
              <button 
                onClick={() => changeServings(-1)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[rgb(var(--accent))] hover:text-white transition-colors flex items-center justify-center text-xl"
              >
                −
              </button>
              <div className="text-center">
                <span className="text-2xl font-black">{servings}</span>
                <span className="block text-[10px] opacity-40 font-bold uppercase">Servings</span>
              </div>
              <button 
                onClick={() => changeServings(1)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[rgb(var(--accent))] hover:text-white transition-colors flex items-center justify-center text-xl"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Nutrition Stats - The "Holographic" Pods */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatPod label="Calories" value={currentData.calories * servings} unit="kcal" theme="sky" />
          <StatPod label="Protein" value={currentData.protein * servings} unit="g" theme="emerald" />
          <StatPod label="Carbs" value={currentData.carbs * servings} unit="g" theme="indigo" />
          <StatPod label="Fat" value={currentData.fat * servings} unit="g" theme="amber" />
        </div>

        {/* Floating Detail Trigger */}
        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] opacity-30 hover:opacity-100 hover:text-[rgb(var(--primary))] transition-all">
            Full Nutrition Breakdown
            <span className="animate-bounce">↓</span>
          </button>
        </div>
      </div>
    </div>
  );
});

const StatPod = ({ label, value, unit, theme }) => {
  const themes = {
    sky: "text-sky-500 shadow-sky-500/10 bg-sky-500/5 border-sky-500/10",
    emerald: "text-emerald-500 shadow-emerald-500/10 bg-emerald-500/5 border-emerald-500/10",
    indigo: "text-indigo-500 shadow-indigo-500/10 bg-indigo-500/5 border-indigo-500/10",
    amber: "text-amber-500 shadow-amber-500/10 bg-amber-500/5 border-amber-500/10",
  };

  return (
    <div className={`p-5 rounded-[2.2rem] border transition-transform hover:-translate-y-1 duration-300 shadow-xl ${themes[theme]}`}>
      <div className="text-2xl font-black tracking-tighter mb-0.5">
        {value.toFixed(1)}
        <span className="text-[10px] ml-1 opacity-60">{unit}</span>
      </div>
      <div className="text-[9px] font-black uppercase tracking-widest opacity-60">
        {label}
      </div>
    </div>
  );
};

export default FoodCard;