import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, animate } from 'framer-motion'
const StatCounter = ({ value, suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            const numericValue = parseInt(value.replace(/,/g, ''), 10);
            const controls = animate(0, numericValue, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate: (val) => setDisplayValue(Math.floor(val)),
            });
            return () => controls.stop();
        }
    }, [isInView, value]);

    return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>;
};
export default StatCounter