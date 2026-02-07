import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Globe, Shield, Zap } from 'lucide-react';
import { SectionWrapper } from './SectionWrapper';
import { useRef } from 'react';
import pulseflowImg from '../assets/pulseflow.png';

const project = {
    id: 1,
    title: "PulseFlow",
    category: "Mobile Application",
    image: pulseflowImg,
    description: "A high-performance personal project built for Android. Currently refining core mechanics and UI for an upcoming Google Play Store deployment. Features real-time state management and fluid gesture-based interactions.",
    tech: ["React Native", "TypeScript", "Firebase", "Redux"],
    stats: [
        { label: "Performance", value: "99%", icon: Zap },
        { label: "Security", value: "End-to-End", icon: Shield },
        { label: "Stability", value: "99.9%", icon: Globe }
    ],
    links: { live: "#", github: "https://github.com/Jenil-diyora" }
};

export const Projects = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

    return (
        <SectionWrapper id="projects" className="bg-rich-dark relative overflow-hidden py-32">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-accent-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
                    >
                        Featured Work
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold font-heading text-white"
                    >
                        The <span className="text-accent-primary">Masterpiece</span>
                    </motion.h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Interactive Frame */}
                    <div className="relative group order-2 lg:order-1">
                        <motion.div
                            style={{ y, rotate }}
                            className="relative z-20 w-full max-w-[600px] mx-auto overflow-hidden rounded-3xl bg-gradient-to-br from-accent-primary/10 to-transparent p-8 shadow-2xl shadow-accent-primary/30 backdrop-blur-sm border border-white/10"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-auto object-cover rounded-2xl transition-transform duration-1000 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />


                        </motion.div>

                        {/* Floating elements */}
                        <motion.div
                            animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute -top-10 -right-10 w-40 p-4 rounded-2xl glass-card border border-white/10 z-30"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Zap className="w-4 h-4 text-yellow-400" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Performance</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full w-[99%] bg-accent-primary" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="order-1 lg:order-2 space-y-10">
                        <div className="space-y-4">
                            <span className="text-accent-primary font-bold text-sm tracking-widest uppercase">{project.category}</span>
                            <h3 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                                Delivering <br />
                                <span className="text-accent-primary-muted italic">Fluid</span> Experiences
                            </h3>
                            <p className="text-rich-text-muted text-lg leading-relaxed max-w-xl">
                                {project.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {project.stats.map((stat, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <stat.icon className="w-5 h-5 text-accent-primary mb-3" />
                                    <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {project.tech.map((t) => (
                                <span key={t} className="px-5 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-xs font-bold text-white uppercase tracking-widest">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-8 pt-8 border-t border-white/5">
                            <a href={project.links.github} className="flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-white transition-colors group/link">
                                <Github className="w-5 h-5" />
                                <span>View Source</span>
                                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                            </a>
                            <a href={project.links.live} className="flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-white transition-colors group/link">
                                <ExternalLink className="w-5 h-5" />
                                <span>Live System</span>
                                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
