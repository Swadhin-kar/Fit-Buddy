import { lazy, Suspense, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
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
    const [isMeter, setIsMeter] = useState(true)
    const [isKg, setIsKg] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        // these height and weight will be in cm and kg respectively
        let height, weight;
        let ft = Number(formData.ft);
        let inches = Number(formData.in);
        if (!isMeter) {
            height = ((ft * 12) + inches) * 2.54;
        } else {
            height = Number(formData.height);
        }
        if((isMeter && height <= 0)
        || (!isMeter && (ft < 0 || inches < 0 || (ft === 0 && inches === 0)))){
            toast.error("Please enter a valid height.");
            setBmiResult(NaN)
            return;
        }

        weight = Number(formData.weight)
        if (!weight || weight <= 0) {
            toast.error('Please enter a valid weight.');
            setBmiResult(NaN)
            return;
        }
        if (!isKg) {
            weight *= 0.4535
        }

        ///// formula BMI = weight(kg) / height(sq.m);

        setBmiResult(weight / ((height / 100) * (height / 100)));
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <div className="">
                <Suspense fallback={<LoadingFallback />}>
                    <Navbar />
                </Suspense>
            </div>
            <div className="min-h-screen flex items-center justify-center mt-15 p-4">
                {/* Card Container */}
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-2xl p-8 space-y-6">

                        {/* Header */}
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">
                                Body Mass Index (BMI) Calculator
                            </h1>
                            <p className="text-slate-600 text-sm">
                                Check your Body Mass Index (BMI) and track your fitness journey with FitBuddy.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Height Field */}
                            <div className="">
                                <div className="flex flex-col md:flex-row justify-between mb-2 ">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Height {isMeter ? "(in cm)" : "(in ft'in'')"}
                                    </label>
                                    <div className="flex rounded-lg border border-slate-300 overflow-hidden text-sm font-medium w-33">
                                        <div
                                            onClick={() => setIsMeter(true)}
                                            className={`px-3 py-1.5 cursor-pointer transition-all duration-200
                                                    ${isMeter
                                                    ? "bg-[#68cbc7] text-slate-900 shadow-sm"
                                                    : "text-slate-600 hover:bg-slate-100"
                                                }`}
                                        >
                                            in cm
                                        </div>

                                        <div
                                            onClick={() => setIsMeter(false)}
                                            className={`px-3 py-1.5 cursor-pointer transition-all duration-200
                                                    ${!isMeter
                                                    ? "bg-[#68cbc7] text-slate-900 shadow-sm"
                                                    : "text-slate-600 hover:bg-slate-100"
                                                }`}
                                        >
                                            in ft'in''
                                        </div>
                                    </div>

                                </div>
                                {isMeter ? (
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder="Enter your height"
                                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1d232a] focus:outline-none transition text-slate-900 placeholder-slate-400"
                                        required
                                    />
                                ) : (
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <input
                                                type="number"
                                                name="ft"
                                                value={formData.ft}
                                                onChange={handleChange}
                                                placeholder="Feet"
                                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1d232a] focus:outline-none transition text-slate-900 placeholder-slate-400"
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="number"
                                                name="in"
                                                value={formData.in}
                                                onChange={handleChange}
                                                placeholder="Inches"
                                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1d232a] focus:outline-none transition text-slate-900 placeholder-slate-400"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Weight Field */}
                            <div>
                                <div className="flex flex-col md:flex-row justify-between mb-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Weight (in kg)
                                    </label>
                                    <div className="flex rounded-lg border border-slate-300 overflow-hidden text-sm font-medium w-33">
                                        <div
                                            onClick={() => setIsKg(true)}
                                            className={`px-3 py-1.5 cursor-pointer transition-all duration-200 w-1/2 text-center
                                                    ${isKg
                                                    ? "bg-[#68cbc7] text-slate-900 shadow-sm"
                                                    : "text-slate-600 hover:bg-slate-100"
                                                }`}
                                        >
                                            in kg
                                        </div>

                                        <div
                                            onClick={() => setIsKg(false)}
                                            className={`px-3 py-1.5 cursor-pointer transition-all duration-200 w-1/2 text-center
                                                    ${!isKg
                                                    ? "bg-[#68cbc7] text-slate-900 shadow-sm"
                                                    : "text-slate-600 hover:bg-slate-100"
                                                }`}
                                        >
                                            in lb
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    placeholder="Enter your weight"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1d232a] focus:outline-none transition text-slate-900 placeholder-slate-400"
                                    required
                                />
                            </div>

                            {/* Age Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="Enter your age"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1d232a] focus:outline-none transition text-slate-900 placeholder-slate-400"
                                    required
                                />
                            </div>

                            {/* Gender Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1d232a] focus:outline-none transition text-slate-900"
                                    required
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#1d232a] to-[#5eddd4] text-slate-900 font-bold py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 text-white"
                            >
                                Calculate BMI
                            </button>
                        </form>
                        {bmiResult ? (
                            <div className="text-center mt-6">
                                <h2 className="text-2xl font-bold text-slate-900">Your BMI: {bmiResult}</h2>
                                <p className="text-slate-600 text-sm mt-2">
                                    {bmiResult < 18.5 && "You are underweight."}
                                    {bmiResult >= 18.5 && bmiResult < 24.9 && "You have a healthy weight."}
                                    {bmiResult >= 25 && bmiResult < 29.9 && "You are overweight."}
                                    {bmiResult >= 30 && "You are obese."}
                                </p>
                            </div>
                        ) :
                            <div>
                                
                            </div>
                        }

                    </div>
                </div>
            </div>

            <div className="mt-4">
                <Suspense fallback={<LoadingFallback />}>
                    <Footer />
                </Suspense>
            </div>
        </>
    );
}
