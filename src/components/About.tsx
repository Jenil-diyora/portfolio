import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionWrapper } from './SectionWrapper';

export const About = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <SectionWrapper id="about" className="bg-rich-dark relative overflow-hidden min-h-[80vh] flex items-center">
            {/* Drifting Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-primary-muted/5 rounded-full blur-3xl opacity-30" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    style={{ opacity, y }}
                    className="max-w-4xl mx-auto"
                >
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-bold mb-12 flex items-center gap-4 font-heading text-white"
                    >
                        Engineering Mindset
                        <div className="h-px bg-white/10 flex-grow" />
                    </motion.h2>

                    <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-start">
                        <div className="relative group">
                            <div className="relative h-full bg-rich-surface/50 border border-white/5 rounded-2xl p-8 flex flex-col gap-6 hover:bg-rich-surface/80 transition-colors duration-500">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-white font-heading">Jenil Diyora</h3>
                                    <p className="text-accent-primary font-medium text-sm uppercase tracking-widest">Software Engineer</p>
                                    <p className="text-rich-text-muted text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        Based in Gujarat, India
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 text-lg font-light text-rich-text-muted leading-relaxed">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-rich-surface/30 p-8 rounded-2xl border border-white/5 hover:border-accent-primary/20 transition-all duration-300"
                            >
                                <p>
                                    Currently working as a <span className="text-white font-medium">Full Stack Developer</span> at <span className="text-white font-medium">Engross Infotech</span>. I specialize in building scalable, high-performance web applications using functional paradigms and clean architecture.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-rich-surface/30 p-8 rounded-2xl border border-white/5 hover:border-accent-primary/20 transition-all duration-300"
                            >
                                <p>
                                    Pursuing my <span className="text-white font-medium">BSc IT</span> at SSIU. My philosophy is rooted in simplicity and efficiency—ensuring that every line of code serves a distinct purpose without unnecessary complexity.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};
