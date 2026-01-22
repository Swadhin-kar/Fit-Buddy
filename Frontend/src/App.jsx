import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Bmi from './components/Bmi'
import { Toaster } from 'react-hot-toast';

const Home = lazy(() => import('./components/Home'))
const Login = lazy(() => import('./components/Login'))
const Signup = lazy(() => import('./components/Signup'))
const Blog = lazy(() => import('./components/Blog'))
const FitBee = lazy(() => import('./components/FitBee'))

import LoadingFallback from './components/LoadingFallback';
import FitBeeIcon from './components/FitBeeIcon';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Protect from './Protect';
import DashBoard from './components/DashBoard';
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
          <Route path='/test' element={<Alpha />} />

          <Route path='/dashboard' element={<DashBoard />} />
          
          <Route element={<Protect />}>
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
