import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaReact, FaNodeJs, FaCode } from 'react-icons/fa';
import { SiTypescript, SiDotnet, SiFastapi, SiPostgresql, SiTailwindcss, SiDocker } from 'react-icons/si';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const name = "JENIL DIYORA";

    return (
        <section
            ref={containerRef}
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-rich-dark py-32"
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
                <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_120%,rgba(124,58,237,0.1),rgba(255,255,255,0))]" />
            </div>

            {/* Glowing Orbs - Subtle */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-primary/20 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-pulse-glow" style={{ animationDuration: '7s' }} />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-gold/10 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-pulse-glow" style={{ animationDuration: '10s', animationDelay: '2s' }} />

            {/* Content */}
            <motion.div
                style={{ y, opacity }}
                className="z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center gap-10"
            >
                <div className="relative group perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-20"
                    >
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight font-heading text-white drop-shadow-lg">
                            {name.split("").map((letter, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: i * 0.03,
                                        ease: "easeOut"
                                    }}
                                    className="inline-block hover:text-accent-primary-muted transition-colors duration-500 cursor-default"
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
                        </h1>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col md:flex-row items-center gap-4 text-lg md:text-xl font-light tracking-wide text-rich-text-muted"
                >
                    <span className="text-accent-primary font-medium tracking-widest uppercase">Full Stack Engineer</span>
                    <span className="hidden md:inline w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <span className="text-slate-400">Building Digital Experiences</span>
                </motion.div>

                {/* Tech Marquee with Icons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-20 w-full max-w-5xl overflow-hidden relative"
                >
                    <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-rich-dark to-transparent z-10" />
                    <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-rich-dark to-transparent z-10" />

                    <div className="flex w-max animate-marquee gap-10 py-4">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex gap-16 mx-4">
                                <TechIcon Icon={FaReact} name="React" />
                                <TechIcon Icon={SiTypescript} name="TypeScript" />
                                <TechIcon Icon={FaNodeJs} name="Node.js" />
                                <TechIcon Icon={SiDotnet} name=".NET" />
                                <TechIcon Icon={SiFastapi} name="FastAPI" />
                                <TechIcon Icon={SiPostgresql} name="PostgreSQL" />
                                <TechIcon Icon={SiTailwindcss} name="Tailwind" />
                                <TechIcon Icon={SiDocker} name="Docker" />
                                <TechIcon Icon={FaCode} name="Clean Code" />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-0 w-full z-10 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] uppercase tracking-[0.25em] pl-[0.25em] text-slate-500 font-medium">Scroll to Explore</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-accent-primary/50 to-transparent" />
            </motion.div>
        </section>
    );
};

const TechIcon = ({ Icon, name }: { Icon: any; name: string }) => (
    <div className="flex flex-col items-center justify-center gap-3 group cursor-default">
        <div className="p-4 rounded-2xl bg-rich-surface/40 border border-white/5 backdrop-blur-sm transition-all duration-500 group-hover:border-accent-primary/20 group-hover:bg-rich-surface/80 group-hover:shadow-soft-glow">
            <Icon className="text-3xl text-slate-500 group-hover:text-white transition-colors duration-500" />
        </div>
        <span className="text-xs font-medium text-slate-500 group-hover:text-accent-primary-muted transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-500 absolute -bottom-8">
            {name}
        </span>
    </div>
);
