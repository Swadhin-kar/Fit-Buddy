import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

// Premium transition configuration
const smoothTransition = { duration: 1.2, ease: [0.22, 1, 0.36, 1] };
const springTransition = { type: "spring", stiffness: 50, damping: 15 };

const Bmi = () => {
  const [formData, setFormData] = useState({
    height: "", ft: "", in: "", weight: "", age: "", gender: "male",
  });

  const [bmiResult, setBmiResult] = useState(null);
  const [isMeter, setIsMeter] = useState(true);
  const [isKg, setIsKg] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let h = Number(formData.height);
    let w = Number(formData.weight);
    
    // Normalizing Height to cm
    if (!isMeter) {
      const feet = Number(formData.ft) || 0;
      const inches = Number(formData.in) || 0;
      h = ((feet * 12) + inches) * 2.54;
    }

    if (h <= 0 || !w || w <= 0) {
      toast.error("Please enter valid metrics.");
      return;
    }

    // Normalizing Weight to both units for display
    const weightInKg = isKg ? w : w * 0.453592;
    const weightInLbs = isKg ? w * 2.20462 : w;

    const bmiValue = weightInKg / ((h / 100) ** 2);

    setBmiResult({
      value: bmiValue,
      kg: weightInKg.toFixed(1),
      lbs: weightInLbs.toFixed(1)
    });
  };

  const getHealthMetadata = (bmi) => {
    if (!bmi) return null;
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500", barColor: "bg-blue-500", advice: "Focus on nutrient-dense meals." };
    if (bmi < 24.9) return { label: "Healthy", color: "text-emerald-500", barColor: "bg-emerald-500", advice: "Perfect balance maintained!" };
    if (bmi < 29.9) return { label: "Overweight", color: "text-orange-500", barColor: "bg-orange-500", advice: "Try increasing daily activity." };
    return { label: "Obese", color: "text-red-500", barColor: "bg-red-500", advice: "Consult a health professional." };
  };

  const health = getHealthMetadata(bmiResult?.value);

  return (
    <div className="min-h-screen w-full bg-[rgb(var(--body-color))] text-[rgb(var(--text-primary))] overflow-x-hidden transition-colors duration-1000 mt-12 pb-20">
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* LEFT: BRANDING & HEADLINE */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={smoothTransition}
          className="space-y-10"
        >
          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...smoothTransition, delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 font-bold text-xs tracking-widest border border-blue-500/20"
            >
              BODY ANALYTICS ENGINE
            </motion.span>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85]">
              Know Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                Vitals.
              </span>
            </h1>
            <p className="text-[rgb(var(--text-muted))] text-xl max-w-lg leading-relaxed opacity-70">
              Precision metrics meeting fluid design. Our engine provides immediate feedback based on WHO-standardized body composition logic.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            {[{ v: "WHO", l: "Standard" }, { v: "Real-time", l: "Logic" }].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...smoothTransition, delay: 0.4 + i * 0.1 }}
                className="p-6 rounded-[2rem] bg-[rgb(var(--card-depth-0))] border border-[rgb(var(--card-depth-1))] shadow-sm"
              >
                <div className="text-blue-600 text-2xl font-black">{item.v}</div>
                <div className="text-[rgb(var(--text-dim))] text-xs uppercase font-bold tracking-widest">{item.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: THE CALCULATOR */}
        <motion.div 
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={smoothTransition}
          className="relative w-full"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 blur-[100px] -z-10 rounded-full opacity-50" />

          <motion.div 
            layout
            className="bg-[rgb(var(--card-depth-0))] border border-[rgb(var(--card-depth-1))] rounded-[3.5rem] p-8 lg:p-14 shadow-2xl relative"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Unit Selectors */}
              <div className="flex flex-wrap gap-8 justify-between">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.25em] opacity-50">Height System</label>
                  <div className="flex bg-[rgb(var(--card-depth-1))] p-1.5 rounded-2xl">
                    {['Metric', 'Imperial'].map((u) => (
                      <button
                        key={u} type="button" onClick={() => setIsMeter(u === 'Metric')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-500 ${
                          (u === 'Metric' && isMeter) || (u === 'Imperial' && !isMeter)
                            ? 'bg-[rgb(var(--card-depth-0))] text-blue-600 shadow-md' : 'text-[rgb(var(--text-muted))]'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.25em] opacity-50">Weight System</label>
                  <div className="flex bg-[rgb(var(--card-depth-1))] p-1.5 rounded-2xl">
                    {['Kg', 'Lbs'].map((u) => (
                      <button
                        key={u} type="button" onClick={() => setIsKg(u === 'Kg')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-500 ${
                          (u === 'Kg' && isKg) || (u === 'Lbs' && !isKg)
                            ? 'bg-[rgb(var(--card-depth-0))] text-blue-600 shadow-md' : 'text-[rgb(var(--text-muted))]'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Inputs */}
              <div className="space-y-8">
                <AnimatePresence mode="wait">
                  {isMeter ? (
                    <motion.div key="m" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
                      <label className="block text-xs font-bold mb-4 uppercase tracking-widest opacity-80">Height (cm)</label>
                      <input 
                        type="number" name="height" value={formData.height} onChange={handleChange}
                        className="w-full bg-[rgb(var(--card-depth-1))] border-none rounded-2xl p-6 focus:ring-2 focus:ring-blue-500 outline-none text-xl font-medium transition-all" 
                        placeholder="175" required 
                      />
                    </motion.div>
                  ) : (
                    <motion.div key="i" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-4 uppercase opacity-80">Feet</label>
                        <input type="number" name="ft" value={formData.ft} onChange={handleChange} className="w-full bg-[rgb(var(--card-depth-1))] rounded-2xl p-6 outline-none text-xl font-medium" placeholder="5" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-4 uppercase opacity-80">Inches</label>
                        <input type="number" name="in" value={formData.in} onChange={handleChange} className="w-full bg-[rgb(var(--card-depth-1))] rounded-2xl p-6 outline-none text-xl font-medium" placeholder="9" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold mb-4 uppercase tracking-widest opacity-80">Weight ({isKg ? 'kg' : 'lbs'})</label>
                    <input 
                      type="number" name="weight" value={formData.weight} onChange={handleChange}
                      className="w-full bg-[rgb(var(--card-depth-1))] border-none rounded-2xl p-6 focus:ring-2 focus:ring-blue-500 outline-none text-xl font-medium transition-all" 
                      placeholder={isKg ? "70" : "154"} required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-4 uppercase tracking-widest opacity-80">Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-[rgb(var(--card-depth-1))] border-none rounded-2xl p-6 focus:ring-2 focus:ring-blue-500 outline-none text-xl font-medium" placeholder="24" />
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-7 bg-blue-600 text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-blue-500/30 transition-all active:bg-blue-700"
              >
                Calculate Now
              </motion.button>
            </form>

            <AnimatePresence>
              {bmiResult && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-12 pt-10 border-t border-[rgb(var(--card-depth-1))] overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
                    <div>
                      <motion.h3 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                        className={`text-5xl font-black ${health.color}`}
                      >
                        {health.label}
                      </motion.h3>
                      <p className="text-[rgb(var(--text-muted))] font-medium text-lg mt-2">{health.advice}</p>
                      
                      {/* Integrated Pound/KG display */}
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.9 }}
                        className="flex gap-4 mt-5 text-[10px] font-black uppercase tracking-[0.2em]"
                      >
                        <span>{bmiResult.kg} KG</span>
                        <span className="text-blue-500">/</span>
                        <span>{bmiResult.lbs} LBS</span>
                      </motion.div>
                    </div>

                    <div className="text-right">
                      <motion.span 
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, ...springTransition }}
                        className="text-8xl font-black tracking-tighter leading-none block"
                      >
                        {bmiResult.value.toFixed(1)}
                      </motion.span>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[rgb(var(--text-dim))] mt-3">BMI Index</p>
                    </div>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="relative h-3 w-full bg-[rgb(var(--card-depth-2))] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((bmiResult.value / 40) * 100, 100)}%` }}
                      transition={{ delay: 0.6, duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full ${health.barColor} relative shadow-[0_0_15px_rgba(0,0,0,0.1)]`}
                    />
                  </div>
                  <div className="flex justify-between mt-4 text-[9px] font-black text-[rgb(var(--text-dim))] uppercase tracking-widest opacity-50">
                    <span>Under</span>
                    <span>Healthy</span>
                    <span>Over</span>
                    <span>Obese</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Bmi;