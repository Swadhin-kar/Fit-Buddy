import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Bmi from './components/Bmi'
import { Toaster } from 'react-hot-toast';

const Home = lazy(() => import('./components/Home'))
const AuthPage = lazy(() => import('./components/AuthPage'))
const Blog = lazy(() => import('./components/Blog'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
)

function App() {

  return (
    <>
      <Toaster position="top-center" />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/user/login" element={<AuthPage />} />
          <Route path = '/exercises' element = {<Blog />} />
          <Route path = 'bmi-calculator' element = {<Bmi />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
