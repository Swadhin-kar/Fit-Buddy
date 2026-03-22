import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuid } from "uuid";
import FoodCard from "../components/FoodCard"; 
import FoodSearchModal from "../components/FoodSearchModal";

const CalorieCalculator = () => {
  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  const [selectedFoods, setSelectedFoods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateMacros = (food, targetQuantity) => {
    if (!food || !food.macros) {
      return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    }

    const ratio = targetQuantity / (food.baseQuantity || 100);
    return {
      calories: (food.macros.calories || 0) * ratio,
      protein: (food.macros.protein || 0) * ratio,
      carbs: (food.macros.carbs || 0) * ratio,
      fat: (food.macros.fats || 0) * ratio 
    };
  };

  const applyDelta = useCallback((delta) => {
    setTotals((prev) => ({
      calories: Math.max(0, prev.calories + (delta.calories || 0)),
      protein: Math.max(0, prev.protein + (delta.protein || 0)),
      carbs: Math.max(0, prev.carbs + (delta.carbs || 0)),
      fat: Math.max(0, prev.fat + (delta.fat || 0))
    }));
  }, []);

  const handleAddFood = (food) => {
    if (!food) return;

    const defaultServing = food.servings?.[0] || { quantity: food.baseQuantity || 100 };
    const initialMacros = calculateMacros(food, defaultServing.quantity);

    applyDelta(initialMacros);

    setSelectedFoods((prev) => [
      { 
        id: uuid(), 
        food, 
        selectedQuantity: defaultServing.quantity,
        selectedSizeName: defaultServing.size || "custom"
      },
      ...prev
    ]);

    setIsModalOpen(false);
  };

  const removeFood = useCallback((item) => {
    if (!item || !item.food) return;

    const macrosToRemove = calculateMacros(item.food, item.selectedQuantity);
    
    applyDelta({
      calories: -macrosToRemove.calories,
      protein: -macrosToRemove.protein,
      carbs: -macrosToRemove.carbs,
      fat: -macrosToRemove.fat
    });

    setSelectedFoods((prev) => prev.filter((f) => f.id !== item.id));
  }, [applyDelta]);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-16 space-y-12 min-h-screen pt-24 font-sans selection:bg-blue-200 mt-12">
      
      {/* HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight" style={{ color: "rgb(var(--text-primary))" }}>
            Fuel your <span style={{ color: "rgb(var(--primary))" }}>Performance</span>
          </h1>
          <p style={{ color: "rgb(var(--text-muted))" }} className="text-lg">
            Track your daily macros with precision.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <HeroStat label="Calories" value={totals.calories} unit="kcal" color="var(--primary)" />
          <HeroStat label="Protein" value={totals.protein} unit="g" color="var(--secondary)" />
          <HeroStat label="Carbs" value={totals.carbs} unit="g" color="var(--accent)" />
          <HeroStat label="Fat" value={totals.fat} unit="g" color="var(--primary-hover)" />
        </div>
      </motion.div>

      {/* FOOD LOG SECTION */}
      <div className="space-y-6 pt-10">
        <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "rgb(var(--border-subtle))" }}>
          <h3 className="text-2xl font-bold" style={{ color: "rgb(var(--text-primary))" }}>Food Log</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
            style={{ 
                backgroundColor: "rgb(var(--primary))", 
                color: "white" 
            }}
          >
            + Add Entry
          </button>
        </div>

        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {selectedFoods.length > 0 ? (
              selectedFoods.map((item) => (
                <motion.div 
                  key={item.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <FoodCard 
                    item={item} 
                    applyDelta={applyDelta} 
                    onRemove={() => removeFood(item)}
                    calculateMacros={calculateMacros} 
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 0.5 }} 
                className="text-center py-20 border-2 border-dashed rounded-3xl"
                style={{ borderColor: "rgb(var(--card-depth-1))", color: "rgb(var(--text-muted))" }}
              >
                <p className="text-lg">Your plate is empty. Start adding some food!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <FoodSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleAddFood}
      />
    </div>
  );
};

const HeroStat = ({ label, value, unit, color }) => (
  <div 
    className="p-6 rounded-3xl transition-all border border-transparent hover:border-current"
    style={{ 
      backgroundColor: "rgb(var(--card-depth-0))", 
      color: `rgb(${color})`,
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
    }}
  >
    <div className="text-3xl font-black mb-1">
      {Math.round(value)}
      <span className="text-sm ml-1 opacity-70 font-medium">{unit}</span>
    </div>
    <div className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: "rgb(var(--text-muted))" }}>
        {label}
    </div>
  </div>
);

export default CalorieCalculator;