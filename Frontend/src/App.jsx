import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Bmi from './components/Bmi'
import { Toaster } from 'react-hot-toast';

const Home = lazy(() => import('./components/Home'))
const Login = lazy(() => import('./components/Login'))
const Signup = lazy(() => import('./components/Signup'))
const Blog = lazy(() => import('./components/Blog'))
const FitBee = lazy(() => import('./components/FitBee'))
const DashBoard = lazy(() => import('./components/DashBoard'))
const CalorieCalculator = lazy(() => import('./components/CalorieCalculator'))

import LoadingFallback from './components/LoadingFallback';
import FitBeeIcon from './components/FitBeeIcon';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Protect from './Protect';
import Alpha from './components/Alpha';
function App() {

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path='/exercises' element={<Blog />} />
          <Route path='/bmi-calculator' element={<Bmi />} />
          <Route path='/calorie-calculator' element={<CalorieCalculator />} />
          <Route path='/test' element={<Alpha />} />


          <Route element={<Protect />}>
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='/FitBee' element={<FitBee />} />
          </Route>
        </Routes>
      </Suspense>
      <Footer />
      <FitBeeIcon />
    </>
  )
}

export default App
