import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import api from "../utils/axios.js";

const FoodSearchModal = ({ isOpen, onClose, onSelect }) => {
  const [search, setSearch] = useState("");
  const [foodsData, setFoodsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (!debouncedSearch) {
      setFoodsData([]);
      return;
    }

    const fetchFoods = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/food/search?q=${debouncedSearch}`);
        const data = res.data || [];
        setFoodsData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [debouncedSearch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgb(var(--body-color)/0.8)] backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] shadow-2xl border border-[rgb(var(--card-depth-2))] bg-[rgb(var(--card-depth-0))] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-[rgb(var(--card-depth-1))] flex justify-between items-center">
          <h2 className="text-xl font-black text-[rgb(var(--text-primary))]">
            Add Nutrition
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[rgb(var(--card-depth-1))] rounded-xl text-[rgb(var(--text-primary))]"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <input
            autoFocus
            type="text"
            placeholder="Search for a food..."
            className="w-full px-5 py-4 rounded-2xl outline-none border-2 border-[rgb(var(--card-depth-2))] bg-[rgb(var(--card-depth-1))] text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-primary)/0.5)] focus:border-[rgb(var(--primary))]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="mt-4 max-h-[45vh] overflow-y-auto space-y-2 pr-1 custom-scrollbar">

            {loading && (
              <p className="text-center text-[rgb(var(--text-primary))] opacity-70 text-sm font-medium animate-pulse">
                Searching...
              </p>
            )}

            {!loading && foodsData.length > 0 && (
              foodsData.map((food) => (
                <button
                  key={food.id}
                  onClick={() => {
                    onSelect(food);
                    setSearch("");
                    onClose();
                  }}
                  className="w-full flex justify-between items-center p-4 rounded-2xl border border-transparent hover:border-[rgb(var(--primary))] hover:bg-[rgb(var(--primary)/0.1)] transition-all group"
                >
                  <div className="text-left">
                    <p className="font-bold text-[rgb(var(--text-primary))] group-hover:text-[rgb(var(--primary))]">
                      {food.name}
                    </p>
                    <p className="text-xs font-medium text-[rgb(var(--text-primary))] opacity-60">
                      {food.macros?.calories ?? 0} kcal
                    </p>
                  </div>

                  <span className="font-bold text-lg text-[rgb(var(--text-primary))] group-hover:text-[rgb(var(--primary))]">
                    +
                  </span>
                </button>
              ))
            )}

            {!loading && foodsData.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm font-black uppercase tracking-widest text-[rgb(var(--text-primary))] opacity-30">
                  {search ? "No results found" : "Start typing to search"}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSearchModal;