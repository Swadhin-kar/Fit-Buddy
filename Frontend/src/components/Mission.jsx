import React from 'react'
import { motion } from 'framer-motion'
import StaggerContainer from '../animation/StaggerContainer';
import FadeInUp from '../animation/FadeInUp';

const Mission = () => {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FadeInUp} className="space-y-8">
                    <div className="p-10 rounded-[3rem] bg-[rgb(var(--card-depth-0))] border border-[rgb(var(--card-depth-1))] shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[rgb(var(--primary)/0.05)] rounded-full group-hover:scale-150 transition-transform duration-700" />
                        <h2 className="text-3xl font-black mb-4 flex items-center gap-4">
                            <span className="w-12 h-12 rounded-2xl bg-[rgb(var(--primary))] text-white flex items-center justify-center">🎯</span>
                            Our Mission
                        </h2>
                        <p className="text-[rgb(var(--text-muted))] text-lg leading-relaxed">
                            To democratize elite fitness tracking. We simplify the complex data of health into actionable insights,
                            ensuring that every drop of sweat counts toward a better version of you.
                        </p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-[rgb(var(--card-depth-0))] border border-[rgb(var(--card-depth-1))] shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[rgb(var(--secondary)/0.05)] rounded-full group-hover:scale-150 transition-transform duration-700" />
                        <h2 className="text-3xl font-black mb-4 flex items-center gap-4">
                            <span className="w-12 h-12 rounded-2xl bg-[rgb(var(--secondary))] text-white flex items-center justify-center">🚀</span>
                            Our Vision
                        </h2>
                        <p className="text-[rgb(var(--text-muted))] text-lg leading-relaxed">
                            Building the world's most supportive digital training ground where technology acts as the bridge
                            between your current self and your peak potential.
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    className="hidden lg:block relative"
                >
                    <div className="aspect-square rounded-[4rem] bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--secondary))] opacity-20 absolute inset-0 blur-3xl animate-pulse" />
                    <div className="relative z-10 bg-[rgb(var(--card-depth-0))] p-4 rounded-[4rem] border border-[rgb(var(--card-depth-2))] shadow-inner">
                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80" alt="Fitness" className="rounded-[3.5rem] w-full h-full object-cover" />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Mission
