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

function App() {

  return (
    <>
      <Toaster position="top-center" />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/user/login" element={<Login />} />
          <Route path = "/user/signup" element={<Signup />} />
          <Route path = '/exercises' element = {<Blog />} />
          <Route path = 'bmi-calculator' element = {<Bmi />} />
          <Route path = '/FitBee' element = {<FitBee />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
