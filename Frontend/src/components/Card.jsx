import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const Card = ({ data, index }) => {
    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="card bg-[rgb(var(--card-depth-1))] w-full max-w-xs mx-auto transition-all duration-300 hover:-translate-y-1 shadow-[0_2px_10px_rgba(72,72,72,0.95)] hover:shadow-[0_4px_20px_rgba(72,72,72,1)]"
        >


            <figure className="w-full h-48 flex items-center justify-center overflow-hidden">
                <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-full object-cover rounded"
                >
                </img>
            </figure>

            <div className="card-body text-[rgb(var(--text-primary))]">
                <span className="card-title text-xl">{data.title}</span>
                <p>{data.description}</p>
                <div className="card-actions justify-end"></div>
            </div>
        </motion.div>
    );
};

export default Card;
