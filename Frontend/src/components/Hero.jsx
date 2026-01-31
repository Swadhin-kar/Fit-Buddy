import React from "react";

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url(/hero_bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90"></div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/30 blur-[160px] rounded-full"></div>

      <div className="relative z-10 px-6">
        <div className="max-w-xl mx-auto backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl text-center">
          
          <span className="inline-block mb-4 px-4 py-1 text-sm tracking-wide rounded-full bg-primary/20 text-white font-semibold">
            Train • Move • Transform
          </span>

          <h1 className="mb-5 text-4xl md:text-5xl font-extrabold text-white leading-tight">
            A complete fitness  
            <span className="text-blue-300"> for every body</span>
          </h1>

          <p className="mb-8 text-gray-300 text-base md:text-lg">
            From calisthenics and strength training to yoga and mobility work —
            we guide you through it all.  
            <span className="text-white font-medium">
              Train smarter. Move better. Live stronger.
            </span>
          </p>

          <div className="flex gap-4 justify-center">
            <button className="btn btn-primary px-8 hover:scale-105 transition-transform">
              Get Started
            </button>

            <button className="btn btn-outline text-white border-white/30 hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm animate-bounce">
        ↓ Scroll
      </div>
    </section>
  );
};

export default Hero;
