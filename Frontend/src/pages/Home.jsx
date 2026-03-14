import React, { lazy, Suspense } from 'react'

import LoadingFallback from '../components/LoadingFallback'

import Hero from '../components/Hero';
import Stats from '../components/Stats';
import StaggerContainer from '../animation/StaggerContainer';
const Training_goal = lazy(() => import('../components/Training_goal'))
const Training_method = lazy(() => import('../components/Training_method'))
const Mission = lazy(() => import('../components/Mission'))
const Founder = lazy(() => import('../components/Founder'))
const CallToAction = lazy(() => import('../components/CallToAction'))

const Home = () => {
  return (
    <div className="min-h-screen bg-[rgb(var(--body-color))] text-[rgb(var(--text-primary))] selection:bg-[rgb(var(--primary)/0.3)]">

      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. STATISTICS (The "Why We Win" Section) */}
      <Stats />

      {/* 3. DYNAMIC SECTION: TRAINING GOALS */}
      <Training_goal />

      {/* 4. MISSION & VISION (Glassmorphism Layout) */}
      <Mission />

      {/* 5. DYNAMIC SECTION: TRAINING METHODS */}
      <Training_method />

      {/* 6. FOUNDER SECTION */}
      <Founder />

      {/* 7. CALL TO ACTION (CTA) */}
      <CallToAction />

      {/* FOOTER */}
      
    </div>
  );
}

export default Home
