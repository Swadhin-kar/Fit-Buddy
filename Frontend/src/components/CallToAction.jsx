import React from 'react'
import { motion } from 'framer-motion'

const CallToAction = () => {
    return (
        <section className="py-24 px-6">
            <motion.div
                whileInView={{ scale: [0.95, 1] }} viewport={{ once: true }}
                className="max-w-7xl mx-auto rounded-[4rem] bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--primary-hover))] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-[0_30px_60px_rgba(var(--primary),0.3)]"
            >
                <div className="relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Start Your Transformation <br /> Today.</h2>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                        Join the community that’s redefining what it means to be fit in the digital age.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05, shadow: "0 20px 40px rgba(0,0,0,0.2)" }} whileTap={{ scale: 0.95 }}
                        className="px-12 py-5 bg-white text-[rgb(var(--primary))] font-black text-xl rounded-2xl shadow-xl transition-all"
                    >
                        Get Started for Free
                    </motion.button>
                </div>
                {/* Abstract Decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
            </motion.div>
        </section>
    )
}

export default CallToAction
