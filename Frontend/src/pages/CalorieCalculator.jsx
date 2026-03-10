import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FoodCard from "../components/FoodCard";
import FoodSearchModal from "../components/FoodSearchModal";
import { v4 as uuid } from "uuid";

const CalorieCalculator = () => {
  const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const applyDelta = useCallback((delta) => {
    setTotals(prev => ({
      calories: Math.max(0, prev.calories + delta.calories),
      protein: Math.max(0, prev.protein + delta.protein),
      carbs: Math.max(0, prev.carbs + delta.carbs),
      fat: Math.max(0, prev.fat + delta.fat)
    }));
  }, []);

  const handleAddFood = (food) => {
    const size = "medium";
    applyDelta(food[size]);
    setSelectedFoods(prev => [{ id: uuid(), food, size, servings: 1 }, ...prev]);
    setIsModalOpen(false);
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
    <div className="max-w-6xl mx-auto p-6 md:p-16 space-y-16 min-h-screen pt-24 font-sans selection:bg-indigo-100">

      {/* --- HERO SECTION --- */}
      {/* <div className="grid lg:grid-cols-2 gap-12 items-start"> */}
      <div className="flex flex-row md:flex-col justify-center align-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          {/* Heading Section */}
          <div className="space-y-4">
            <h2 className="text-[rgb(var(--primary))] font-bold tracking-[0.2em] uppercase text-sm">
              Nutritional Intelligence
            </h2>

            <h1 className="text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight text-[rgb(var(--text-primary))]">
              Precision <br />
              <span className="bg-gradient-to-r from-[rgb(var(--primary))] to-indigo-600 bg-clip-text text-transparent">
                Metabolic Analytics.
              </span>
            </h1>

            <p className="text-[rgb(var(--text-primary))] text-lg max-w-md leading-relaxed font-medium opacity-80">
              Master your biology with our high-fidelity caloric engine.
              Quantify every gram, optimize every meal, and achieve peak performance.
            </p>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            <HeroStat
              label="Active Energy"
              value={totals.calories}
              unit="kcal"
              color="var(--primary)"
            />

            <HeroStat
              label="Protein Intake"
              value={totals.protein}
              unit="g"
              color="var(--secondary)"
            />

            {/* Carbs Card */}
            <div className="p-8 rounded-[2.5rem] bg-[rgb(var(--card-depth-1))] shadow-sm border border-slate-100 space-y-2 hover:border-[rgb(var(--primary)/0.3)] transition-colors">
              <div className="text-3xl font-black text-[rgb(var(--text-primary))]">
                {totals.carbs.toFixed(0)}g
              </div>
              <div className="text-[10px] uppercase font-black tracking-widest text-[rgb(var(--text-muted))]">
                Carbohydrates
              </div>
            </div>

            {/* Fat Card */}
            <div className="p-8 rounded-[2.5rem] bg-[rgb(var(--card-depth-1))] shadow-sm border border-slate-100 space-y-2 hover:border-[rgb(var(--primary)/0.3)] transition-colors">
              <div className="text-3xl font-black text-[rgb(var(--text-primary))]">
                {totals.fat.toFixed(0)}g
              </div>
              <div className="text-[10px] uppercase font-black tracking-widest text-[rgb(var(--text-muted))]">
                Total Lipids
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>


      {/* --- CONTENT SECTION --- */}
      <div className="space-y-8">
        <div className="flex justify-between items-center border-b border-[rgb(var(--text-muted))] pb-6">
          <h3 className="text-xl font-bold tracking-tight text-[rgb(var(--text-primary))]">Fuel Log</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-[rgb(var(--primary))] transition-all active:scale-95 shadow-lg "
          >
            + Add Source
          </button>
        </div>

        <AnimatePresence mode="popLayout">
          {selectedFoods.length > 0 ? (
            selectedFoods.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <FoodCard item={item} applyDelta={applyDelta} onRemove={removeFood} />
              </motion.div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="py-20 text-center italic text-slate-400">
              Waiting for data input...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FoodSearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={handleAddFood} />
    </div>
  );
};

const HeroStat = ({ label, value, unit, color }) => (
  <div className="p-8 rounded-[2.5rem] bg-[rgb(var(--card-depth-1))] shadow-sm border border-slate-200 hover:shadow-md transition-all">
    <div className="text-3xl mb-2 font-black tracking-tighter" style={{ color: `rgb(${color})` }}>
      {Math.round(value)}
      <span className="text-xs ml-1 opacity-50 font-bold uppercase">{unit}</span>
    </div>
    <div className="text-[rgb(var(--slate-400))] text-[10px] uppercase font-black tracking-widest">
      {label}
    </div>
  </div>
);

export default CalorieCalculator;