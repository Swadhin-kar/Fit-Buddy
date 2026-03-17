import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const Bmi = () => {
  const [formData, setFormData] = useState({
    height: "", ft: "", in: "", weight: "", age: "", gender: "male",
  });

  const [bmiResult, setBmiResult] = useState(null);
  const [isMeter, setIsMeter] = useState(true);
  const [isKg, setIsKg] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    let height, weight;
    
    // Height Calculation
    if (!isMeter) {
      const ft = Number(formData.ft) || 0;
      const inches = Number(formData.in) || 0;
      height = ((ft * 12) + inches) * 2.54;
    } else {
      height = Number(formData.height);
    }

    if (height <= 0) {
      toast.error("Please enter a valid height.");
      return;
    }

    // Weight Calculation
    weight = Number(formData.weight);
    if (!weight || weight <= 0) {
      toast.error("Please enter a valid weight.");
      return;
    }

    if (!isKg) weight *= 0.453592; // Precise lb to kg conversion

    const bmi = weight / ((height / 100) ** 2);
    setBmiResult(bmi);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getHealthMetadata = (bmi) => {
    if (!bmi) return null;
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500", barColor: "bg-blue-500", advice: "Consider nutrient-dense meals.", icon: "🧬" };
    if (bmi < 24.9) return { label: "Healthy", color: "text-secondary", barColor: "bg-[rgb(var(--secondary))]", advice: "Perfect balance maintained!", icon: "✨" };
    if (bmi < 29.9) return { label: "Overweight", color: "text-orange-500", barColor: "bg-orange-500", advice: "Try increasing daily steps.", icon: "🏃" };
    return { label: "Obese", color: "text-red-500", barColor: "bg-red-500", advice: "Consult a health professional.", icon: "⚠️" };
  };

  const health = getHealthMetadata(bmiResult);

  return (
    <div className="min-h-screen w-full bg-[rgb(var(--body-color))] text-[rgb(var(--text-primary))] transition-colors duration-500">
      <main className="max-w-7xl mx-auto px-6 py-16 lg:py-32 grid lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT: CONTENT & BRANDING */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <span className="px-4 py-2 rounded-full bg-[rgb(var(--primary)/0.1)] text-[rgb(var(--primary))] font-bold text-xs tracking-widest border border-[rgb(var(--primary)/0.2)]">
              BODY ANALYTICS ENGINE
            </span>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85]">
              Know Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]">
                Vitals.
              </span>
            </h1>
            <p className="text-[rgb(var(--text-muted))] text-xl max-w-lg leading-relaxed">
              Our precision BMI engine utilizes advanced anthropometric logic to provide immediate feedback on your body composition.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "WHO-Standard", label: "Logic" },
              { val: "Real-time", label: "Analysis" }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-[rgb(var(--card-depth-0))] border border-[rgb(var(--card-depth-1))] shadow-sm">
                <div className="text-[rgb(var(--primary))] text-2xl font-black">{stat.val}</div>
                <div className="text-[rgb(var(--text-dim))] text-xs uppercase font-bold tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: THE CALCULATOR CARD */}
        <div className="relative">
          {/* Decorative Background Blur */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-[rgb(var(--primary)/0.1)] to-[rgb(var(--secondary)/0.1)] blur-3xl -z-10 rounded-full" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[rgb(var(--card-depth-0))] border border-[rgb(var(--card-depth-1))] rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Unit Toggles */}
              <div className="flex flex-wrap gap-4 justify-between items-end">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[rgb(var(--text-primary))]">Height System</label>
                  <div className="flex bg-[rgb(var(--card-depth-1))] p-1.5 rounded-2xl">
                    {['Metric', 'Imperial'].map((unit) => (
                      <button
                        key={unit}
                        type="button"
                        onClick={() => setIsMeter(unit === 'Metric')}
                        className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                          (unit === 'Metric' && isMeter) || (unit === 'Imperial' && !isMeter)
                            ? 'bg-[rgb(var(--card-depth-0))] text-[rgb(var(--primary))] shadow-sm'
                            : 'text-[rgb(var(--text-muted))]'
                        }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[rgb(var(--text-primary))]">Weight System</label>
                  <div className="flex bg-[rgb(var(--card-depth-1))] p-1.5 rounded-2xl">
                    {['Kg', 'Lbs'].map((unit) => (
                      <button
                        key={unit}
                        type="button"
                        onClick={() => setIsKg(unit === 'Kg')}
                        className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                          (unit === 'Kg' && isKg) || (unit === 'Lbs' && !isKg)
                            ? 'bg-[rgb(var(--card-depth-0))] text-[rgb(var(--primary))] shadow-sm'
                            : 'text-[rgb(var(--text-muted))]'
                        }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {isMeter ? (
                    <motion.div key="metric" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <label className="block text-xs font-bold mb-3">Height (cm)</label>
                      <input 
                        type="number" name="height" value={formData.height} onChange={handleChange}
                        className="w-full bg-[rgb(var(--card-depth-1))] border-none rounded-2xl p-5 focus:ring-2 focus:ring-[rgb(var(--primary))] transition-all outline-none" 
                        placeholder="175" required 
                      />
                    </motion.div>
                  ) : (
                    <motion.div key="imperial" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-3">Feet</label>
                        <input type="number" name="ft" value={formData.ft} onChange={handleChange} className="w-full bg-[rgb(var(--card-depth-1))] border-none rounded-2xl p-5 focus:ring-2 focus:ring-[rgb(var(--primary))] outline-none" placeholder="5" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-3">Inches</label>
                        <input type="number" name="in" value={formData.in} onChange={handleChange} className="w-full bg-[rgb(var(--card-depth-1))] border-none rounded-2xl p-5 focus:ring-2 focus:ring-[rgb(var(--primary))] outline-none" placeholder="9" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold mb-3">Weight ({isKg ? 'kg' : 'lbs'})</label>
                    <input 
                      type="number" name="weight" value={formData.weight} onChange={handleChange}
                      className="w-full bg-[rgb(var(--card-depth-1))] border-none rounded-2xl p-5 focus:ring-2 focus:ring-[rgb(var(--primary))] outline-none" 
                      placeholder={isKg ? "70" : "154"} required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-3">Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-[rgb(var(--card-depth-1))] border-none rounded-2xl p-5 focus:ring-2 focus:ring-[rgb(var(--primary))] outline-none" placeholder="24" />
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-6 bg-[rgb(var(--primary))] text-white font-black text-lg rounded-[2rem] shadow-xl shadow-blue-500/20 hover:bg-[rgb(var(--primary-hover))] transition-all"
              >
                Calculate Now
              </motion.button>
            </form>

            {/* RESULTS DISPLAY */}
            <AnimatePresence>
              {bmiResult && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mt-12 pt-8 border-t border-[rgb(var(--card-depth-1))]"
                >
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h3 className={`text-4xl font-black ${health.color}`}>{health.label}</h3>
                      <p className="text-[rgb(var(--text-muted))] font-medium">{health.advice}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-6xl font-black tracking-tighter">{bmiResult.toFixed(1)}</span>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--text-dim))]">Current BMI</p>
                    </div>
                  </div>

                  {/* BMI Visual Bar */}
                  <div className="relative h-4 w-full bg-[rgb(var(--card-depth-2))] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((bmiResult / 40) * 100, 100)}%` }}
                      className={`h-full ${health.barColor}`}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-[rgb(var(--text-dim))] uppercase">
                    <span>Underweight</span>
                    <span>Healthy</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Bmi;