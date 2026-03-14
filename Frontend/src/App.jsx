import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Bmi from './components/Bmi'
import { Toaster } from 'react-hot-toast';

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Blog = lazy(() => import('./pages/Blog'))
const FitBee = lazy(() => import('./pages/FitBee'))
const DashBoard = lazy(() => import('./pages/DashBoard'))
const CalorieCalculator = lazy(() => import('./pages/CalorieCalculator'))
const Article = lazy(() => import('./pages/Article'))
import ScrollToTop from './utils/ScrollToTop';

import LoadingFallback from './components/LoadingFallback';
import FitBeeIcon from './components/FitBeeIcon';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Protect from './Protect';
import Alpha from './components/Alpha';
import PageNotFound from './pages/PageNotFound';
function App() {

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          
          <Route path="/scroll-to-top" element={<ScrollToTop />} />
          <Route path="/" element={<Home />} />

          <Route path='/exercises' element={<Blog />} />
          <Route path="/article/:type/:id" element={<Article />} />

          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />

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
