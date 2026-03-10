import React, { memo, useRef, useState } from "react";

const StatPod = ({ label, value, unit, themeClass }) => {
  // Mapping themes to specific Tailwind classes that are high-contrast in both modes
  const themeMap = {
    primary: "text-[rgb(var(--primary))] border-[rgb(var(--primary)/0.2)] bg-[rgb(var(--primary)/0.05)]",
    secondary: "text-[rgb(var(--secondary))] border-[rgb(var(--secondary)/0.2)] bg-[rgb(var(--secondary)/0.05)]",
    accent: "text-[rgb(var(--accent))] border-[rgb(var(--accent)/0.2)] bg-[rgb(var(--accent)/0.05)]",
    fat: "text-rose-500 border-rose-500/20 bg-rose-500/05 dark:text-rose-400"
  };

  return (
    <div className={`relative p-5 rounded-[2rem] border transition-all duration-300 hover:shadow-lg ${themeMap[themeClass]}`}>
      <div className="text-center">
        <div className="text-2xl font-black tracking-tighter mb-1">
          {value.toFixed(1)}
          <span className="text-[10px] ml-1 opacity-60 font-bold">{unit}</span>
        </div>
        <div className="text-[9px] font-black uppercase tracking-[0.15em] opacity-60">
          {label}
        </div>
      </div>
    </div>
  );
};

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

  const changeSize = (s) => { setSize(s); updateNutrition(s, servings); };
  const changeServings = (c) => { 
    const next = Math.max(1, servings + c); 
    setServings(next); 
    updateNutrition(size, next); 
  };

  return (
    <div className="group relative mb-6">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[rgb(var(--card-depth-2))] bg-[rgb(var(--card-depth-0))] shadow-xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 pb-6 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--text-primary)/0.5)]">Nutritional Entry</span>
            <h2 className="text-3xl font-black tracking-tight text-[rgb(var(--text-primary))]">{food.name}</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black border ${
              currentData.calorieLevel === 'high' ? 'text-rose-500 border-rose-500/20 bg-rose-500/5' : 'text-[rgb(var(--secondary))] border-[rgb(var(--secondary)/0.2)] bg-[rgb(var(--secondary)/0.05)]'
            }`}>
              {currentData.calorieLevel.toUpperCase()} DENSITY
            </div>
            <button onClick={() => onRemove(item)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-[rgb(var(--card-depth-1))] hover:bg-rose-500 hover:text-white transition-all text-[rgb(var(--text-primary))]">✕</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 border-t border-[rgb(var(--card-depth-1))]">
          {/* Controls */}
          <div className="lg:col-span-4 p-8 space-y-6 bg-[rgb(var(--card-depth-0))] lg:border-r border-[rgb(var(--card-depth-1))]">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[rgb(var(--text-primary)/0.4)] uppercase tracking-widest">Portion</label>
              <div className="flex p-1 bg-[rgb(var(--card-depth-1))] rounded-2xl">
                {["small", "medium", "large"].map((s) => (
                  <button key={s} onClick={() => changeSize(s)}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-[10px] uppercase transition-all ${
                      size === s ? "bg-[rgb(var(--card-depth-0))] text-[rgb(var(--secondary))] shadow-sm" : "text-[rgb(var(--text-muted)/0.4)] hover:text-[rgb(var(--text-muted))]"
                    }`}>{s}</button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-[rgb(var(--text-primary)/0.4)] uppercase tracking-widest">Quantity</label>
              <div className="flex items-center justify-between p-1 bg-[rgb(var(--card-depth-1))] rounded-2xl">
                <button onClick={() => changeServings(-1)} className="w-10 h-10 rounded-xl bg-[rgb(var(--card-depth-0))] hover:bg-[rgb(var(--primary))] hover:text-white transition-all text-[rgb(var(--text-primary))] shadow-sm font-bold">−</button>
                <span className="text-xl font-black text-[rgb(var(--text-primary))]">{servings}</span>
                <button onClick={() => changeServings(1)} className="w-10 h-10 rounded-xl bg-[rgb(var(--card-depth-0))] hover:bg-[rgb(var(--primary))] hover:text-white transition-all text-[rgb(var(--text-primary))] shadow-sm font-bold">+</button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="lg:col-span-8 p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[rgb(var(--card-depth-1)/0.2)]">
            <StatPod label="Energy" value={currentData.calories * servings} unit="kcal" themeClass="primary" />
            <StatPod label="Protein" value={currentData.protein * servings} unit="g" themeClass="secondary" />
            <StatPod label="Carbs" value={currentData.carbs * servings} unit="g" themeClass="accent" />
            <StatPod label="Fat" value={currentData.fat * servings} unit="g" themeClass="fat" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default FoodCard;