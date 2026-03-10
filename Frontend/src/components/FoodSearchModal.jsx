import React, { useState, useMemo, useEffect } from "react";

const FoodSearchModal = ({ isOpen, onClose, onSelect }) => {
  const [search, setSearch] = useState("");
  const [foodsData, setFoodsData] = useState([]);

  useEffect(() => {
    fetch('/alljson/foods.json')
      .then(res => res.json())
      .then(data => setFoodsData(data))
      .catch(err => console.error(err));
  }, []);

  const filteredFoods = useMemo(() => {
    if (!search) return [];
    return foodsData.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, foodsData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[rgb(var(--body-color)/0.8)] backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] shadow-2xl border border-[rgb(var(--card-depth-2))] bg-[rgb(var(--card-depth-0))] animate-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-[rgb(var(--card-depth-1))] flex justify-between items-center">
          <h2 className="text-xl font-black text-[rgb(var(--text-primary))]">Add Nutrition</h2>
          <button onClick={onClose} className="p-2 hover:bg-[rgb(var(--card-depth-1))] text-[rgb(var(--text-primary))] rounded-xl transition-colors">✕</button>
        </div>

        <div className="p-6">
          <input
            autoFocus
            type="text"
            placeholder="Search for a food..."
            className="w-full px-5 py-4 rounded-2xl outline-none border-2 border-[rgb(var(--card-depth-2))] bg-[rgb(var(--card-depth-1))] text-[rgb(var(--text-primary))] focus:border-[rgb(var(--primary)/0.5)] transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="mt-4 max-h-[45vh] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
                <button
                  key={food.name}
                  onClick={() => { onSelect(food); setSearch(""); onClose(); }}
                  className="w-full flex justify-between items-center p-4 rounded-2xl transition-all bg-[rgb(var(--card-depth-1)/0.5)] hover:bg-[rgb(var(--primary))] text-[rgb(var(--text-primary))] hover:text-white group"
                >
                  <div className="text-left">
                    <p className="font-bold">{food.name}</p>
                    <p className="text-[10px] opacity-60 group-hover:text-[rgb(var(--text-muted))]">{food.medium.calories} kcal · Medium</p>
                  </div>
                  <span className="font-bold text-[rgb(var(--primary))] group-hover:text-[rgb(var(--text-primary))]">+</span>
                </button>
              ))
            ) : (
              <div className="py-12 text-center opacity-40">
                <p className="text-sm font-bold uppercase tracking-widest">{search ? "No results" : "Type to search"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSearchModal;