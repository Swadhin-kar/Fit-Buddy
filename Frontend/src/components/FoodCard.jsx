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
    const next = Math.max(1, servings + change);
    setServings(next);
    updateNutrition(size, next);
  };

  return (
    <div className="group relative p-[1px] rounded-[3.5rem] transition-all duration-700 bg-gradient-to-br from-white/20 to-transparent hover:from-[rgb(var(--primary)/0.4)]">
      <div className="relative p-10 rounded-[3.4rem] backdrop-blur-3xl shadow-2xl overflow-hidden bg-[rgb(var(--card-depth-0)/0.9)]">
        
        {/* Top Section: Identity & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Ingredient Source</span>
            <h2 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-[rgb(var(--text-primary))] to-[rgb(var(--text-primary)/0.5)] bg-clip-text text-transparent">
              {food.name}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-colors ${
              currentData.calorieLevel === 'high' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
            }`}>
              {currentData.calorieLevel} Density
            </div>
            <button 
              onClick={() => onRemove(item)}
              className="w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-500"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          
          {/* Column 1: Configuration */}
          <div className="space-y-6 lg:border-r border-white/5 lg:pr-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold opacity-30 uppercase tracking-widest ml-1">Portion Control</label>
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-black/20 rounded-[1.8rem]">
                {["small", "medium", "large"].map((s) => (
                  <button
                    key={s}
                    onClick={() => changeSize(s)}
                    className={`py-3 rounded-2xl font-bold text-[10px] uppercase transition-all ${
                      size === s ? "bg-[rgb(var(--primary))] text-white shadow-lg shadow-[rgb(var(--primary)/0.3)]" : "opacity-40 hover:opacity-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold opacity-30 uppercase tracking-widest ml-1">Quantity</label>
              <div className="flex items-center justify-between p-2 bg-black/20 rounded-[1.8rem]">
                <button onClick={() => changeServings(-1)} className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xl font-light">−</button>
                <div className="text-center">
                  <span className="text-2xl font-black">{servings}</span>
                  <span className="block text-[8px] opacity-40 font-bold uppercase">Units</span>
                </div>
                <button onClick={() => changeServings(1)} className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xl font-light">+</button>
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Results (Wide) */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatPod label="Energy" value={currentData.calories * servings} unit="kcal" theme="sky" />
            <StatPod label="Protein" value={currentData.protein * servings} unit="g" theme="emerald" />
            <StatPod label="Carbs" value={currentData.carbs * servings} unit="g" theme="indigo" />
            <StatPod label="Fat" value={currentData.fat * servings} unit="g" theme="amber" />
            
            <div className="col-span-full mt-4 p-5 rounded-[2rem] bg-white/5 border border-white/5">
              <p className="text-[11px] leading-relaxed opacity-50 italic">
                * Nutritional values are based on standard biological estimates. This specific serving contains 
                <span className="text-[rgb(var(--text-primary))] font-bold"> {currentData.grams * servings}g </span> of net weight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const StatPod = ({ label, value, unit, theme }) => {
  const themes = {
    sky: "text-sky-400 border-sky-400/10 bg-sky-400/5",
    emerald: "text-emerald-400 border-emerald-400/10 bg-emerald-400/5",
    indigo: "text-indigo-400 border-indigo-400/10 bg-indigo-400/5",
    amber: "text-amber-400 border-amber-400/10 bg-amber-400/5",
  };

  return (
    <div className={`p-6 rounded-[2.5rem] border transition-all hover:scale-[1.05] ${themes[theme]}`}>
      <div className="text-2xl font-black tracking-tighter mb-1">
        {value.toFixed(1)}
        <span className="text-[10px] ml-1 opacity-50">{unit}</span>
      </div>
      <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
        {label}
      </div>
    </div>
  );
};

export default FoodCard;