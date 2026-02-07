import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';
import { SectionWrapper } from './SectionWrapper';

export const Education = () => {
    return (
        <SectionWrapper id="education" className="bg-rich-dark relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl -translate-y-1/2" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.01 }}
                    className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden group border border-white/5 hover:border-accent-primary/20 bg-rich-surface/30"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <GraduationCap className="w-32 h-32 md:w-48 md:h-48 text-white rotate-12" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                    <h2 className="text-3xl font-bold font-heading text-white mb-10 inline-block relative z-10">
                        Education
                    </h2>

                    <div className="space-y-8 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                    <BookOpen className="w-6 h-6 text-accent-primary" />
                                    BSc IT
                                </h3>
                                <p className="text-accent-primary-muted font-medium text-lg">
                                    Swarnim Startup & Innovation University (SSIU)
                                </p>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-rich-text-muted text-sm font-mono border border-white/10 self-start">
                                <Calendar className="w-4 h-4" />
                                <span>2023 – 2026</span>
                            </div>
                        </div>

                        <div className="h-px w-full bg-white/5" />

                        <p className="text-rich-text-muted max-w-2xl leading-relaxed text-lg font-light">
                            Pursuing a comprehensive curriculum in Information Technology, focusing on software engineering principles, database management, and scalable system architecture.
                            Combining academic theory with practical application in full-stack development.
                        </p>
                    </div>

                    <div className="mt-8 flex gap-4 items-center relative z-10">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm text-emerald-500/80 font-mono tracking-wider uppercase font-medium">Currently Enrolled</span>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};
