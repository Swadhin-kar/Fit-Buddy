import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

const ContactButton = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("idle");

    const handleAction = async (e) => {
        e.preventDefault();
        setStatus("loading");

        setTimeout(() => {
            setStatus("success");

            setTimeout(() => {
                navigate('/');
            }, 2000);
        }, 1500);
    };

    return (
        <motion.button
            onClick={handleAction}
            disabled={status === "loading"}
            whileHover={status === "idle" ? { scale: 1.02 } : {}}
            whileTap={status === "idle" ? { scale: 0.98 } : {}}
            className={`
        relative w-full py-6 rounded-[2rem] font-black text-lg transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden
        ${status === "success"
                    ? "bg-[rgb(var(--secondary))] shadow-[0_20px_40px_rgba(var(--secondary),0.3)]"
                    : "bg-[rgb(var(--primary))] shadow-[0_20px_40px_rgba(var(--primary),0.3)]"}
        text-white disabled:cursor-not-allowed
      `}
        >
            <AnimatePresence mode="wait">
                {status === "idle" && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="flex items-center gap-3"
                    >
                        <span>Send Message</span>
                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </motion.div>
                )}

                {status === "loading" && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-3"
                    >
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Processing...</span>
                    </motion.div>
                )}

                {status === "success" && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3"
                    >
                        <CheckCircle2 className="w-6 h-6" />
                        <span>Message Sent!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Subtle "Shine" Effect on Success */}
            {status === "success" && (
                <motion.div
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] pointer-events-none"
                />
            )}
        </motion.button>
    );
};

export default ContactButton;