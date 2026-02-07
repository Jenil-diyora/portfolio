import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { SectionWrapper } from './SectionWrapper';

const projects = [
    {
        id: 1,
        title: "PulseFlow",
        category: "Mobile Application",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A cross-platform mobile application built with React Native for seamless performance. Features real-time data synchronization and a modern, fluid user interface.",
        tech: ["React Native", "TypeScript", "Firebase", "Expo"],
        links: { live: "#", github: "https://github.com/Jenil-diyora" }
    }
];

export const Projects = () => {
    return (
        <SectionWrapper id="projects" className="bg-rich-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold font-heading mb-6 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Featured Projects
                    </motion.h2>
                    <p className="text-rich-text-muted max-w-2xl mx-auto text-lg">
                        Exploring the boundaries of code and creativity.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -5 }}
                            className="group relative rounded-2xl overflow-hidden glass-card h-full flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative h-56 w-full overflow-hidden">
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-rich-surface to-transparent opacity-60" />
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow bg-rich-surface/40 backdrop-blur-sm">
                                <span className="text-accent-primary text-xs font-bold tracking-widest uppercase mb-3 block">
                                    {project.category}
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-primary-muted transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-rich-text-muted text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tech.map((t) => (
                                        <span key={t} className="px-3 py-1 text-[11px] font-medium rounded-full bg-rich-surface border border-white/5 text-slate-300 group-hover:border-accent-primary/20 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-6 pt-6 border-t border-white/5 mt-auto">
                                    <a href={project.links.github} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group/link">
                                        <Github className="w-4 h-4 group-hover/link:text-white" />
                                        <span>Code</span>
                                    </a>
                                    <a href={project.links.live} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group/link">
                                        <ExternalLink className="w-4 h-4 group-hover/link:text-accent-primary" />
                                        <span>Live Demo</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};
