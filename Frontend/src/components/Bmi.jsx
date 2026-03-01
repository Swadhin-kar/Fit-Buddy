import { lazy, Suspense, useState } from "react";
import toast from "react-hot-toast";
import LoadingFallback from "./LoadingFallback";

export default function Bmi() {
    const [formData, setFormData] = useState({
        height: "", ft: "", in: "", weight: "", age: "", gender: "",
    });

    const [bmiResult, setBmiResult] = useState(null);
    const [isMeter, setIsMeter] = useState(true);
    const [isKg, setIsKg] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        let height, weight;
        const ft = Number(formData.ft);
        const inches = Number(formData.in);

        if (!isMeter) {
            height = ((ft * 12) + inches) * 2.54;
        } else {
            height = Number(formData.height);
        }

        if ((isMeter && height <= 0) || (!isMeter && ft <= 0 && inches <= 0)) {
            toast.error("Please enter a valid height.");
            return;
        }

        weight = Number(formData.weight);
        if (!weight || weight <= 0) {
            toast.error("Please enter a valid weight.");
            return;
        }

        if (!isKg) weight *= 0.4535;
        setBmiResult(weight / ((height / 100) ** 2));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Mesmerizing Dynamic UI Content
    const getHealthMetadata = (bmi) => {
        if (!bmi) return null;
        if (bmi < 18.5) return { 
            label: "Underweight", 
            colorVar: "--blue-500", 
            bgVar: "--blue-50",
            advice: "Consider nutrient-dense meals and strength training.",
            icon: "🧬" 
        };
        if (bmi < 24.9) return { 
            label: "Healthy Weight", 
            colorVar: "--green-500", 
            bgVar: "--green-50",
            advice: "Perfect balance! Keep maintaining your active lifestyle.",
            icon: "✨" 
        };
        if (bmi < 29.9) return { 
            label: "Overweight", 
            colorVar: "--yellow-600", 
            bgVar: "--yellow-50",
            advice: "Small changes in daily activity can make a huge impact.",
            icon: "🏃" 
        };
        return { 
            label: "Obese", 
            colorVar: "--red-600", 
            bgVar: "--red-50",
            advice: "Prioritize health. Consult with a professional for a plan.",
            icon: "⚠️" 
        };
    };

    const health = getHealthMetadata(bmiResult);

    return (
        <div className="min-h-screen bg-[rgb(var(--body-color))] text-[rgb(var(--text-primary))]">
            

            <main className="max-w-7xl mx-auto px-4 py-12 lg:py-24 grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Left Side: Mesmerizing Brand Story */}
                <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                    <div className="space-y-4">
                        <h2 className="text-[rgb(var(--primary))] font-bold tracking-[0.2em] uppercase text-sm">
                            Fitness Intelligence
                        </h2>
                        <h1 className="text-6xl xl:text-7xl font-black leading-[1.1]">
                            Precision <br />
                            <span className="gradient-text">Body Analytics.</span>
                        </h1>
                        <p className="text-[rgb(var(--slate-500))] text-lg max-w-md leading-relaxed">
                            Unlock the secrets of your biology with our professional-grade BMI engine. Simple, accurate, and essential.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="p-6 rounded-3xl bg-[rgb(var(--white))] shadow-sm border border-[rgb(var(--slate-200))]">
                            <div className="text-[rgb(var(--primary))] text-2xl mb-2 font-bold">100%</div>
                            <div className="text-[rgb(var(--slate-400))] text-xs uppercase font-black">Accuracy</div>
                        </div>
                        <div className="p-6 rounded-3xl bg-[rgb(var(--white))] shadow-sm border border-[rgb(var(--slate-200))]">
                            <div className="text-[rgb(var(--secondary))] text-2xl mb-2 font-bold">Instantly</div>
                            <div className="text-[rgb(var(--slate-400))] text-xs uppercase font-black">Processed</div>
                        </div>
                    </div>
                </div>

                {/* Right Side: The Glass Calculator */}
                <div className="relative">
                    {/* Background decorative glows */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[rgb(var(--blue-200))] rounded-full blur-[120px] opacity-40"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[rgb(var(--purple-200))] rounded-full blur-[120px] opacity-40"></div>

                    <div className="glass-panel rounded-[3rem] p-8 lg:p-12 relative z-10 animate-float">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            
                            {/* Height Section */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-black uppercase tracking-widest text-[rgb(var(--slate-500))]">Measurement System</label>
                                    <div className="flex bg-[rgb(var(--slate-100))] p-1 rounded-xl">
                                        <button type="button" onClick={() => setIsMeter(true)} className={`px-4 py-1 rounded-lg text-xs font-bold transition-all ${isMeter ? 'bg-[rgb(var(--white))] text-[rgb(var(--primary))] shadow-sm' : 'text-[rgb(var(--slate-400))]'}`}>Metric</button>
                                        <button type="button" onClick={() => setIsMeter(false)} className={`px-4 py-1 rounded-lg text-xs font-bold transition-all ${!isMeter ? 'bg-[rgb(var(--white))] text-[rgb(var(--primary))] shadow-sm' : 'text-[rgb(var(--slate-400))]'}`}>Imperial</button>
                                    </div>
                                </div>

                                {isMeter ? (
                                    <div className="group">
                                        <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (cm)" className="glass-input !bg-[rgb(var(--white))] dark:!bg-[rgb(var(--black))]/20" required />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="number" name="ft" value={formData.ft} onChange={handleChange} placeholder="Feet" className="glass-input !bg-[rgb(var(--white))] dark:!bg-[rgb(var(--black))]/20" required />
                                        <input type="number" name="in" value={formData.in} onChange={handleChange} placeholder="Inches" className="glass-input !bg-[rgb(var(--white))] dark:!bg-[rgb(var(--black))]/20" required />
                                    </div>
                                )}
                            </div>

                            {/* Weight & Age Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-[rgb(var(--slate-400))] ml-2">Weight ({isKg ? 'kg' : 'lb'})</label>
                                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="00" className="glass-input !bg-[rgb(var(--white))] dark:!bg-[rgb(var(--black))]/20" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-[rgb(var(--slate-400))] ml-2">Age</label>
                                    <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="00" className="glass-input !bg-[rgb(var(--white))] dark:!bg-[rgb(var(--black))]/20" required />
                                </div>
                            </div>

                            <button type="submit" className="w-full py-5 rounded-[2rem] bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-hover))] text-white font-bold text-lg shadow-2xl shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95">
                                Calculate My BMI
                            </button>
                        </form>

                        {/* mesmerizing Result Card */}
                        {bmiResult && (
                            <div className="mt-8 p-8 rounded-[2rem] border animate-in zoom-in duration-500" 
                                 style={{ backgroundColor: `rgb(var(${health.bgVar}))`, borderColor: `rgb(var(${health.colorVar}) / 0.2)` }}>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-4xl">{health.icon}</span>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase tracking-tighter text-[rgb(var(--slate-500))]">Calculated BMI</p>
                                        <h2 className="text-5xl font-black" style={{ color: `rgb(var(${health.colorVar}))` }}>
                                            {bmiResult.toFixed(1)}
                                        </h2>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-[rgb(var(--white))] rounded-full overflow-hidden flex">
                                        <div className="h-full bg-[rgb(var(--blue-400))]" style={{ width: '18%' }}></div>
                                        <div className="h-full bg-[rgb(var(--green-400))]" style={{ width: '25%' }}></div>
                                        <div className="h-full bg-[rgb(var(--yellow-400))]" style={{ width: '25%' }}></div>
                                        <div className="h-full bg-[rgb(var(--red-400))]" style={{ width: '32%' }}></div>
                                    </div>
                                    <p className="text-sm font-bold text-[rgb(var(--slate-700))]">
                                        {health.label}: <span className="font-medium opacity-80">{health.advice}</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}