import React from 'react'

const Hero = () => {
  return (
    <div
      className="hero w-full h-screen min-h-screen"
      style={{
        backgroundImage: "url(/hero_bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md bg-base-800 p-6 rounded-lg"> 
          <h1 className="mb-5 text-4xl font-bold text-white ">A complete fitness for every body.</h1>
          <p className="mb-5">
            From calisthenics and strength training to yoga and mobility work — we guide you through it all.
Train smarter, move better, live stronger.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Hero
