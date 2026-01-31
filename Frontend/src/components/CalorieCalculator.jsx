import React, { useCallback, useState } from "react";
import FoodCard from "./FoodCard";
import FoodSearchModal from "./FoodSearchModal";
import { v4 as uuid } from "uuid";

const CalorieCalculator = () => {
  const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const applyDelta = useCallback((delta) => {
    setTotals(prev => ({
      calories: prev.calories + delta.calories,
      protein: prev.protein + delta.protein,
      carbs: prev.carbs + delta.carbs,
      fat: prev.fat + delta.fat
    }));
  }, []);

  const handleAddFood = (food) => {
    const size = "medium";
    const base = food[size];
    applyDelta(base);

    setSelectedFoods(prev => [
      ...prev,
      { id: uuid(), food, size, servings: 1 }
    ]);
  };

  const removeFood = useCallback((item) => {
    const { food, size, servings } = item;
    const base = food[size];
    applyDelta({
      calories: -base.calories * servings,
      protein: -base.protein * servings,
      carbs: -base.carbs * servings,
      fat: -base.fat * servings
    });
    setSelectedFoods(prev => prev.filter(f => f.id !== item.id));
  }, [applyDelta]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 min-h-screen pt-20" style={{ color: `rgb(var(--text-primary))` }}>
      {/* Dynamic Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Calories" value={totals.calories} unit="kcal" />
        <Stat label="Protein" value={totals.protein} unit="g" />
        <Stat label="Carbs" value={totals.carbs} unit="g" />
        <Stat label="Fat" value={totals.fat} unit="g" />
      </div>

      <div className="space-y-4">
        {selectedFoods.map(item => (
          <FoodCard key={item.id} item={item} applyDelta={applyDelta} onRemove={removeFood} />
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full py-4 rounded-2xl font-bold shadow-lg transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:brightness-110"
        style={{ backgroundColor: `rgb(var(--primary))`, color: `rgb(var(--white))` }}
      >
        <span className="text-xl">+</span> Add Another Food
      </button>

      <FoodSearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelect={handleAddFood} 
      />
    </div>
  );
};

const Stat = ({ label, value, unit }) => (
  <div 
    className="rounded-2xl p-4 shadow-sm border border-[rgb(var(--card-depth-1))] text-center"
    style={{ backgroundColor: `rgb(var(--card-depth-0))` }}
  >
    <p className="text-2xl font-black">{Math.round(value)}<span className="text-xs ml-0.5 opacity-60">{unit}</span></p>
    <p className="text-xs uppercase tracking-widest font-bold opacity-50">{label}</p>
  </div>
);

export default CalorieCalculator;