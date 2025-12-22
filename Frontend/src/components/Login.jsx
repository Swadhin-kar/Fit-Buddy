import React, {useState, useEffect} from 'react'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    // Add login logic here
    alert("Welcome to FitBuddy!");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100">
      {/* Left side: motivational image or illustration */}
      <div className="hidden md:flex flex-1 items-center justify-center p-8">
        <img
          src="/hero_bg.jpg"
          alt="Fitness Motivation"
          className="rounded-3xl shadow-2xl w-full max-w-md object-cover"
        />
      </div>

      {/* Right side: login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-90 rounded-3xl shadow-xl p-8 w-full max-w-md flex flex-col gap-6"
        >
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">Welcome Back!</h2>
          <p className="text-center text-gray-600 mb-4">Log in to continue your fitness journey with <span className="font-semibold text-green-600">FitBuddy</span></p>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="input input-bordered w-full rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="input input-bordered w-full rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary w-full rounded-lg font-semibold text-lg tracking-wide shadow-md hover:scale-105 transition-transform"
          >
            Log In
          </button>
          <div className="text-center text-sm mt-2">
            <span className="text-gray-600">Don't have an account?</span>
            <a href="#" className="text-green-600 font-semibold ml-1 hover:underline">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login
