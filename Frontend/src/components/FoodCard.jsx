import React, { memo, useRef, useState, useMemo } from "react";

const StatPod = ({ label, value, unit, themeClass }) => {
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
  // State now tracks the selected size name (e.g., "medium") and multiplier
  const [selectedSize, setSelectedSize] = useState(item.selectedSizeName || "small");
  const [quantityMultiplier, setQuantityMultiplier] = useState(1);

  // Find the serving object from the array based on selectedSize
  const currentServing = useMemo(() => {
    return food.servings.find(s => s.size === selectedSize) || food.servings[0];
  }, [food.servings, selectedSize]);

  // Calculate current display macros based on (Current Quantity / Base Quantity) * Multiplier
  const getMacrosForDisplay = () => {
    const ratio = (currentServing.quantity / food.baseQuantity) * quantityMultiplier;
    return {
      calories: food.macros.calories * ratio,
      protein: food.macros.protein * ratio,
      carbs: food.macros.carbs * ratio,
      fat: food.macros.fats * ratio // mapped from 'fats'
    };
  };

  const displayMacros = getMacrosForDisplay();

  const handleSizeChange = (newSizeName) => {
    const newServing = food.servings.find(s => s.size === newSizeName);
    
    // Calculate Delta for the global tracker
    const oldRatio = (currentServing.quantity / food.baseQuantity) * quantityMultiplier;
    const newRatio = (newServing.quantity / food.baseQuantity) * quantityMultiplier;

    applyDelta({
      calories: food.macros.calories * (newRatio - oldRatio),
      protein: food.macros.protein * (newRatio - oldRatio),
      carbs: food.macros.carbs * (newRatio - oldRatio),
      fat: food.macros.fats * (newRatio - oldRatio),
    });

    setSelectedSize(newSizeName);
  };

  const handleMultiplierChange = (change) => {
    const nextMultiplier = Math.max(1, quantityMultiplier + change);
    if (nextMultiplier === quantityMultiplier) return;

    const servingRatio = currentServing.quantity / food.baseQuantity;
    
    // Apply only the difference to the global state
    applyDelta({
      calories: food.macros.calories * servingRatio * change,
      protein: food.macros.protein * servingRatio * change,
      carbs: food.macros.carbs * servingRatio * change,
      fat: food.macros.fats * servingRatio * change,
    });

    setQuantityMultiplier(nextMultiplier);
  };

  return (
    <div className="group relative mb-6 ">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[rgb(var(--card-depth-2))] bg-[rgb(var(--card-depth-0))] shadow-xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 pb-6 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--text-primary)/0.5)]">
              {food.category}
            </span>
            <h2 className="text-3xl font-black tracking-tight text-[rgb(var(--text-primary))]">{food.name}</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-4 py-1.5 rounded-full text-[10px] font-black border text-[rgb(var(--secondary))] border-[rgb(var(--secondary)/0.2)] bg-[rgb(var(--secondary)/0.05)]">
              {currentServing.quantity * quantityMultiplier}{food.unit} TOTAL
            </div>
            <button 
              onClick={() => onRemove(item)} 
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[rgb(var(--card-depth-1))] hover:bg-rose-500 hover:text-white transition-all text-[rgb(var(--text-primary))]"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 border-t border-[rgb(var(--card-depth-1))]">
          {/* Controls */}
          <div className="lg:col-span-4 p-8 space-y-6 bg-[rgb(var(--card-depth-0))] lg:border-r border-[rgb(var(--card-depth-1))]">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[rgb(var(--text-primary)/0.4)] uppercase tracking-widest">Portion Size</label>
              <div className="flex p-1 bg-[rgb(var(--card-depth-1))] rounded-2xl">
                {food.servings.map((s) => (
                  <button 
                    key={s.size} 
                    onClick={() => handleSizeChange(s.size)}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-[10px] uppercase transition-all ${
                      selectedSize === s.size 
                        ? "bg-[rgb(var(--card-depth-0))] text-[rgb(var(--primary))] shadow-sm" 
                        : "text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))]"
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-[rgb(var(--text-primary)/0.4)] uppercase tracking-widest">Quantity (x)</label>
              <div className="flex items-center justify-between p-1 bg-[rgb(var(--card-depth-1))] rounded-2xl">
                <button onClick={() => handleMultiplierChange(-1)} className="w-10 h-10 rounded-xl bg-[rgb(var(--card-depth-0))] hover:bg-[rgb(var(--primary))] text-[rgb(var(--text-primary))] transition-all shadow-sm font-bold">−</button>

                <span className="text-xl font-black text-[rgb(var(--text-primary))]">{quantityMultiplier}</span>
                <button onClick={() => handleMultiplierChange(1)} className="w-10 h-10 rounded-xl bg-[rgb(var(--card-depth-0))] hover:bg-[rgb(var(--primary))] text-[rgb(var(--text-primary))] transition-all shadow-sm font-bold">+</button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="lg:col-span-8 p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[rgb(var(--card-depth-1)/0.2)]">
            <StatPod label="Energy" value={displayMacros.calories} unit="kcal" themeClass="primary" />
            <StatPod label="Protein" value={displayMacros.protein} unit="g" themeClass="secondary" />
            <StatPod label="Carbs" value={displayMacros.carbs} unit="g" themeClass="accent" />
            <StatPod label="Fat" value={displayMacros.fat} unit="g" themeClass="fat" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default FoodCard;