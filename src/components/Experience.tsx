import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { SectionWrapper } from './SectionWrapper';

const experiences = [
    {
        id: 1,
        company: "Engross Infotech",
        role: "Software Developer",
        period: "2024 - Present",
        description: "Spearheading full-stack development initiatives, architecting scalable solutions using .NET Core and React.js. Optimizing database performance and implementing clean architecture patterns.",
        tech: ["React.js", ".NET Core", "SQL Server", "Azure"]
    },
    {
        id: 2,
        company: "Engross Infotech",
        role: "Junior Software Engineer (Intern)",
        period: "2023 - 2024",
        description: "Collaborated with senior developers to build responsive UI components. Learned and applied industry best practices in software development lifecycle.",
        tech: ["JavaScript", "C#", "HTML/CSS", "Bootstrap"]
    }
];

export const Experience = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    return (
        <SectionWrapper id="experience" className="bg-rich-dark">
            <div ref={containerRef} className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold font-heading mb-6 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Professional Voyage
                    </motion.h2>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Minimal Timeline Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 transform md:-translate-x-1/2">
                        <motion.div
                            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                            className="absolute top-0 left-0 w-full h-full bg-accent-primary"
                        />
                    </div>

                    <div className="space-y-20">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`relative flex items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-4 h-4 rounded-full bg-rich-dark border border-accent-primary z-10 transition-colors duration-500 group-hover:bg-accent-primary">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                                </div>

                                {/* Connector Line for Mobile */}
                                <div className="md:hidden absolute left-8 top-8 bottom-0 w-[1px] bg-white/5" />

                                {/* Content Card */}
                                <div className={`ml-12 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                                    <div className="glass-card p-6 md:p-8 rounded-2xl hover:bg-rich-surface/60 transition-all duration-300 group cursor-default relative overflow-hidden bg-rich-surface/30">

                                        <div className={`flex flex-col gap-1 mb-6 relative z-10 ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-accent-primary-muted transition-colors tracking-tight">
                                                {exp.role}
                                            </h3>
                                            <div className="flex items-center gap-2 text-accent-primary font-medium text-sm uppercase tracking-wider">
                                                <Briefcase className="w-4 h-4" />
                                                <span>{exp.company}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-rich-text-muted text-xs font-mono mt-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{exp.period}</span>
                                            </div>
                                        </div>

                                        <p className="text-rich-text-muted leading-relaxed mb-6 font-light relative z-10">
                                            {exp.description}
                                        </p>

                                        <div className={`flex flex-wrap gap-2 relative z-10 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                            {exp.tech.map((tag) => (
                                                <span key={tag} className="px-3 py-1 text-[11px] font-medium rounded-full bg-white/5 text-slate-300 border border-white/5 hover:border-accent-primary/20 transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
