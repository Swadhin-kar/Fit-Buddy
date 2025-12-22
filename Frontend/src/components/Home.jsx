import React, { lazy, Suspense } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Card from './Card'
const Training_goal = lazy(() => import('./Training_goal'))
const Training_method = lazy(() => import('./Training_method'))
import Footer from './Footer'

import LoadingFallback from './LoadingFallback'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Card /> */}
      <Suspense fallback={<LoadingFallback />}>
        <Training_goal />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Training_method />
      </Suspense>
      <Footer />
    </>
  )
}

export default Home
