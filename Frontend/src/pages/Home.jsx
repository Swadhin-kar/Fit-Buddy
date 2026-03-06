import React, { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Card from '../components/Card'
const Training_goal = lazy(() => import('../components/Training_goal'))
const Training_method = lazy(() => import('../components/Training_method'))
import Footer from '../components/Footer'

import LoadingFallback from '../components/LoadingFallback'

const Home = () => {
  return (
    <>
      <Hero />
      {/* <Card /> */}
      <Suspense fallback={<LoadingFallback />}>
        <Training_goal />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Training_method />
      </Suspense>
    </>
  )
}

export default Home
