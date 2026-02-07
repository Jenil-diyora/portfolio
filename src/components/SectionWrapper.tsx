import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    delay?: number;
}

export const SectionWrapper = ({
    children,
    id,
    className = "",
    delay = 0.2,
}: SectionWrapperProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id={id} className={`relative z-10 py-20 ${className}`}>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </section>
    );
};
