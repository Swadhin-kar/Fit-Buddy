import React from 'react'
import { motion,useInView, animate } from 'framer-motion'
import FadeInUp from '../animation/fadeInUp'
import StatCounter from './StatCounter';

const Stats = () => {


    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Active Users", val: "50,000", s: "+" },
                    { label: "Workouts Logged", val: "1,200", s: "" },
                    { label: "Success Rate", val: "98", s: "%" },
                    { label: "Global Reach", val: "120", s: " Countries" }
                ].map((s, i) => (
                    <motion.div
                        key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FadeInUp}
                        className="p-8 rounded-[2.5rem] bg-[rgb(var(--card-depth-0))] border border-[rgb(var(--card-depth-1))] text-center shadow-lg"
                    >
                        <h3 className="text-4xl font-black text-[rgb(var(--primary))] mb-2">
                            <StatCounter value={s.val} suffix={s.s} />
                        </h3>
                        <p className="text-[rgb(var(--text-muted))] font-bold uppercase text-xs tracking-widest">{s.label}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Stats
