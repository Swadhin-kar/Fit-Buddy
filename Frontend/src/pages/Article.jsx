import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Article = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [goal, setGoal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/alljson/${type}.json`)
            .then(res => res.json())
            .then(data => {
                const found = data.find(g => g.id === parseInt(id));
                setGoal(found);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [type, id]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 rounded-full animate-spin" 
                 style={{ borderTopColor: 'rgb(var(--primary))', borderRightColor: 'transparent' }}></div>
        </div>
    );

    if (!goal) return <div className="text-center py-20 text-[rgb(var(--text-muted))]">Article not found.</div>;

    return (
        <motion.main 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-6 py-12 mt-12"
        >
            {/* Breadcrumb Navigation */}
            <nav className="mb-8 flex items-center gap-2 text-sm font-medium">
                <button 
                    onClick={() => navigate(-1)}
                    className="hover:opacity-70 transition-opacity"
                    style={{ color: 'rgb(var(--primary))' }}
                >
                    {type === 'goals' ? 'Goals' : 'Methods'}
                </button>
                <span style={{ color: 'rgb(var(--text-dim))' }}>/</span>
                <span style={{ color: 'rgb(var(--text-muted))' }}>{goal.title}</span>
            </nav>

            {/* Header Section */}
            <header className="mb-10">
                <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
                    style={{ color: 'rgb(var(--text-primary))' }}
                >
                    {goal.title}
                </motion.h1>
                <p className="text-xl md:text-2xl italic font-medium" 
                   style={{ color: 'rgb(var(--secondary))' }}>
                    {goal.description}
                </p>
            </header>

            {/* Featured Image with Depth */}
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative group mb-12"
            >
                <div 
                    className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity rounded-3xl"
                    style={{ backgroundColor: 'rgb(var(--primary))' }}
                ></div>
                <img
                    src={goal.image}
                    alt={goal.title}
                    className="relative w-full aspect-video object-cover rounded-2xl shadow-2xl border"
                    style={{ borderColor: 'rgba(var(--text-dim), 0.1)' }}
                />
            </motion.div>

            {/* Article Content */}
            <article className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                    <section 
                        className="text-lg leading-relaxed space-y-6"
                        style={{ color: 'rgb(var(--text-muted))' }}
                    >
                        {goal.content.split('. ').map((paragraph, index) => (
                            <p key={index}>{paragraph}.</p>
                        ))}
                    </section>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-10 px-8 py-4 rounded-xl font-bold text-white transition-colors"
                        style={{ backgroundColor: 'rgb(var(--primary))' }}
                    >
                        Start Your {goal.title} Journey
                    </motion.button>
                </div>

                {/* Sidebar Info - Using the Card Depth System */}
                <aside className="space-y-6">
                    <div 
                        className="p-6 rounded-2xl border"
                        style={{ 
                            backgroundColor: 'rgb(var(--card-depth-1))',
                            borderColor: 'rgba(var(--text-dim), 0.1)'
                        }}
                    >
                        <h4 className="font-bold mb-3" style={{ color: 'rgb(var(--text-primary))' }}>Key Focus</h4>
                        <ul className="text-sm space-y-2" style={{ color: 'rgb(var(--text-muted))' }}>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgb(var(--secondary))' }}></span>
                                Scientific Approach
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgb(var(--secondary))' }}></span>
                                Sustainable Growth
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgb(var(--secondary))' }}></span>
                                Expert Guidance
                            </li>
                        </ul>
                    </div>
                </aside>
            </article>
        </motion.main>
    );
};

export default Article;