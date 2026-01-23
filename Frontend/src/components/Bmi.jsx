import { lazy, Suspense, useState } from "react";
import toast from "react-hot-toast";

const Navbar = lazy(() => import("./Navbar"));
const Footer = lazy(() => import("./Footer"));
import LoadingFallback from "./LoadingFallback";

export default function Bmi() {
    const [formData, setFormData] = useState({
        height: "",
        ft: "",
        in: "",
        weight: "",
        age: "",
        gender: "",
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

    return (
        <>
            <Suspense fallback={<LoadingFallback />}>
                <Navbar />
            </Suspense>

            {/* Page Wrapper */}
            <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[rgb(var(--page-bg))]">
                <div className="rounded-b-2xl bg-[rgb(var(--card-depth-1))] text-black shadow-xl space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-1 bg-[rgb(var(--secondary))] rounded-t-2xl p-4">
                        <h1 className="text-2xl font-bold">
                            BMI Calculator
                        </h1>
                        <p className="text-sm text-[rgb(var(--text-muted))]">
                            Check your Body Mass Index
                        </p>
                    </div>
                    <div className="rounded-2xl bg-[rgb(var(--card-depth-1))] text-[rgb(var(--text-primary))] shadow-xl p-8 space-y-6">


                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Height */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium">
                                        Height {isMeter ? "(cm)" : "(ft / in)"}
                                    </label>

                                    <div className="flex border rounded-lg overflow-hidden text-xs">
                                        <button
                                            type="button"
                                            onClick={() => setIsMeter(true)}
                                            className={`px-3 py-1 ${isMeter ? "bg-[rgb(var(--accent))]" : ""}`}
                                        >
                                            cm
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsMeter(false)}
                                            className={`px-3 py-1 ${!isMeter ? "bg-[rgb(var(--accent))]" : ""}`}
                                        >
                                            ft/in
                                        </button>
                                    </div>
                                </div>

                                {isMeter ? (
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder="Height in cm"
                                        className="w-full input bg-[rgb(var(--card-depth-2))]"
                                        required
                                    />
                                ) : (
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            name="ft"
                                            placeholder="Feet"
                                            value={formData.ft}
                                            onChange={handleChange}
                                            className="w-1/2 input bg-[rgb(var(--card-depth-2))]"
                                            required
                                        />
                                        <input
                                            type="number"
                                            name="in"
                                            placeholder="Inches"
                                            value={formData.in}
                                            onChange={handleChange}
                                            className="w-1/2 input bg-[rgb(var(--card-depth-2))]"
                                            required
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Weight */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium">
                                        Weight
                                    </label>

                                    <div className="flex border rounded-lg overflow-hidden text-xs">
                                        <button
                                            type="button"
                                            onClick={() => setIsKg(true)}
                                            className={`px-3 py-1 ${isKg ? "bg-[rgb(var(--accent))]" : ""}`}
                                        >
                                            kg
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsKg(false)}
                                            className={`px-3 py-1 ${!isKg ? "bg-[rgb(var(--accent))]" : ""}`}
                                        >
                                            lb
                                        </button>
                                    </div>
                                </div>

                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    placeholder="Weight"
                                    className="w-full input bg-[rgb(var(--card-depth-2))]"
                                    required
                                />
                            </div>

                            {/* Age */}
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full input bg-[rgb(var(--card-depth-2))]"
                                required
                            />

                            {/* Gender */}
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full input bg-[rgb(var(--card-depth-2))]"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg font-semibold bg-[rgb(var(--accent))] text-black hover:opacity-90 transition"
                            >
                                Calculate BMI
                            </button>
                        </form>

                        {/* Result */}
                        {bmiResult && (
                            <div className="text-center pt-4 border-t border-black/10">
                                <h2 className="text-xl font-bold">
                                    BMI: {bmiResult.toFixed(2)}
                                </h2>
                                <p className="text-sm text-[rgb(var(--text-muted))] mt-1">
                                    {bmiResult < 18.5 && "Underweight"}
                                    {bmiResult >= 18.5 && bmiResult < 24.9 && "Healthy"}
                                    {bmiResult >= 25 && bmiResult < 29.9 && "Overweight"}
                                    {bmiResult >= 30 && "Obese"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
