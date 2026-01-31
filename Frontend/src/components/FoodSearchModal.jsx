import React, { useState, useMemo, useEffect } from "react";

const FoodSearchModal = ({ isOpen, onClose, onSelect }) => {
  const [search, setSearch] = useState("");
  const [foodsData, setFoodsData] = useState([]);

  useEffect(() => {
    fetch('/alljson/foods.json')
    .then(res => res.json())
    .then(data => setFoodsData(data))
  }, [])

  const filteredFoods = useMemo(() => {
    if (!search) return [];
    return foodsData.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200"
        style={{ backgroundColor: `rgb(var(--card-depth-0))`, color: `rgb(var(--text-primary))` }}
      >
        {/* Header */}
        <div className="p-6 border-b border-[rgb(var(--card-depth-2))] flex justify-between items-center">
          <h2 className="text-xl font-bold">Add Nutrition</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[rgb(var(--card-depth-1))] rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6">
          <div className="relative">
            <input
              autoFocus
              type="text"
              placeholder="Search for a food (e.g. Paneer Tikka)..."
              className="w-full px-5 py-4 rounded-2xl outline-none border-2 transition-all"
              style={{ 
                backgroundColor: `rgb(var(--card-depth-1))`,
                borderColor: `rgb(var(--card-depth-2))`,
                color: `rgb(var(--text-primary))`
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Results List */}
          <div className="mt-4 max-h-[40vh] overflow-y-auto space-y-2 custom-scrollbar">
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
                <button
                  key={food.name}
                  onClick={() => {
                    onSelect(food);
                    setSearch("");
                    onClose();
                  }}
                  className="w-full flex justify-between items-center p-4 rounded-xl transition-all hover:translate-x-1 group"
                  style={{ backgroundColor: `rgb(var(--card-depth-1))` }}
                >
                  <div className="text-left">
                    <p className="font-semibold group-hover:text-[rgb(var(--primary))] transition-colors">{food.name}</p>
                    <p className="text-xs opacity-60">{food.medium.calories} kcal (Medium)</p>
                  </div>
                  <span className="text-[rgb(var(--primary))] font-bold">+</span>
                </button>
              ))
            ) : (
              <p className="text-center py-10 opacity-50">
                {search ? "No foods found. Try another search!" : "Start typing to find food..."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSearchModal;