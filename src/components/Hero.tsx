import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiDotnet, SiFastapi, SiPostgresql, SiTailwindcss, SiDocker, SiFirebase } from 'react-icons/si';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const name = "JENIL DIYORA";

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            id="home"
            ref={containerRef}
            className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-rich-dark pt-24 md:pt-40 pb-20 md:pb-32"
        >
            {/* Dynamic Interactive Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Layer 1: Base Dim Dots (Static) */}
                <div
                    className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px]"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                    }}
                />

                {/* Layer 2: Default Random Twinkling Dots (White) */}
                <div
                    className="absolute inset-0 bg-[radial-gradient(#ffffff15_1.5px,transparent_1.5px)] [background-size:48px_48px] animate-twinkle"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                    }}
                />

                {/* Layer 3: Randomized Purple Twinkling Dots (New) */}
                <div
                    className="absolute inset-0 bg-[radial-gradient(#9333ea30_1.5px,transparent_1.5px)] [background-size:32px_32px] animate-twinkle"
                    style={{
                        animationDelay: '1.5s',
                        maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                    }}
                />

                {/* Layer 4: Interactive Reactive Layer (Dots light up purple around cursor) */}
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{
                        background: 'radial-gradient(#9333ea 1.5px, transparent 1.5px)',
                        backgroundSize: '24px 24px',
                        maskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                        WebkitMaskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
                    }}
                />

                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-primary/20 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-pulse-glow" style={{ animationDuration: '7s' }} />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-gold/10 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-pulse-glow" style={{ animationDuration: '10s', animationDelay: '2s' }} />

            {/* Content */}
            <motion.div
                style={{ y, opacity }}
                className="z-10 container mx-auto px-6 flex flex-col items-center gap-8 md:gap-12"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full"
                >
                    <span className="text-accent-primary font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-4 block animate-pulse text-center">
                        Engineering the Future
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[10rem] font-bold tracking-tight font-heading text-white leading-[1.1] w-full text-center flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8">
                        {name.split(" ").map((word, wordIdx) => (
                            <span key={wordIdx} className="inline-block whitespace-nowrap">
                                {word.split("").map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: (wordIdx * word.length + i) * 0.05,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                        className="inline-block hover:text-accent-primary transition-all duration-300 transform hover:-translate-y-2 cursor-default"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col items-center w-full max-w-4xl"
                >
                    <p className="text-rich-text-muted text-sm sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide leading-relaxed text-center px-4">
                        Software Engineer @ <span className="text-white font-medium">Engross Infotech</span> specializing in
                        <span className="text-white font-medium"> React.js</span>,
                        <span className="text-white font-medium"> .NET Core</span>, and building
                        <span className="text-white font-medium"> fluid user experiences</span>.
                    </p>
                </motion.div>

                {/* Tech Marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 1 }}
                    className="mt-8 md:mt-12 w-full max-w-4xl overflow-hidden relative mx-auto"
                >
                    <div className="flex items-center gap-4 mb-4 justify-center">
                        <div className="w-8 h-[1px] bg-white/10" />
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Tech Stack</span>
                        <div className="w-8 h-[1px] bg-white/10" />
                    </div>

                    <div className="flex w-max animate-marquee gap-6 sm:gap-10 py-10">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex gap-8 sm:gap-16 mx-4">
                                <TechIcon Icon={FaReact} name="React JS" />
                                <TechIcon Icon={SiTypescript} name="TypeScript" />
                                <TechIcon Icon={FaNodeJs} name="Node.js" />
                                <TechIcon Icon={SiDotnet} name=".NET" />
                                <TechIcon Icon={SiFastapi} name="FastAPI" />
                                <TechIcon Icon={SiPostgresql} name="PostgreSQL" />
                                <TechIcon Icon={SiFirebase} name="Firebase" />
                                <TechIcon Icon={SiTailwindcss} name="Tailwind" />
                                <TechIcon Icon={SiDocker} name="Docker" />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="absolute bottom-8 md:bottom-12 left-0 w-full z-10 flex flex-col items-center gap-4"
            >
                <div className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-white/10 flex justify-center p-1.5 md:p-2">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-accent-primary"
                    />
                </div>
            </motion.div>
        </section>
    );
};

const TechIcon = ({ Icon, name }: { Icon: any; name: string }) => (
    <div className="flex flex-col items-center justify-center gap-3 group cursor-default">
        <div className="p-4 rounded-2xl bg-rich-surface/40 border border-white/5 backdrop-blur-sm transition-all duration-500 group-hover:border-accent-primary/20 group-hover:bg-rich-surface/80 group-hover:shadow-soft-glow">
            <Icon className="text-3xl text-slate-500 group-hover:text-white transition-colors duration-500" />
        </div>
        <span className="text-xs font-medium text-slate-500 group-hover:text-accent-primary-muted transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-500 absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            {name}
        </span>
    </div>
);
