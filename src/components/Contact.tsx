import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Github } from 'lucide-react';
import { useRef } from 'react';
import type { FormEvent } from 'react';
import { SectionWrapper } from './SectionWrapper';

export const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Handle submission logic
    };

    return (
        <SectionWrapper id="contact" className="bg-rich-dark relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-rich-surface via-rich-dark to-rich-dark pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-accent-primary/5 to-transparent blur-3xl opacity-20" />

            <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white">
                        Let's Build <span className="text-accent-primary">The Future</span>
                    </h2>
                    <p className="text-rich-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
                        Ready to turn your vision into a digital reality? <br />
                        I'm currently available for freelance projects and full-time opportunities.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <motion.a
                        href="mailto:diyorajenil23@gmail.com"
                        whileHover={{ scale: 1.02 }}
                        className="glass-card p-8 rounded-2xl flex flex-col items-center gap-4 group hover:bg-rich-surface/60 transition-all border border-white/5 hover:border-accent-primary/20 bg-rich-surface/30"
                    >
                        <div className="p-4 bg-white/5 rounded-full group-hover:bg-accent-primary/10 transition-colors text-accent-primary-muted group-hover:text-accent-primary">
                            <Mail className="w-6 h-6" />
                        </div>
                        <span className="text-lg font-medium text-rich-text-muted group-hover:text-white">diyorajenil23@gmail.com</span>
                    </motion.a>

                    <motion.a
                        href="https://github.com/Jenil-diyora"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        className="glass-card p-8 rounded-2xl flex flex-col items-center gap-4 group hover:bg-rich-surface/60 transition-all border border-white/5 hover:border-accent-primary/20 bg-rich-surface/30"
                    >
                        <div className="p-4 bg-white/5 rounded-full group-hover:bg-accent-primary/10 transition-colors text-accent-primary-muted group-hover:text-accent-primary">
                            <Github className="w-6 h-6" />
                        </div>
                        <span className="text-lg font-medium text-rich-text-muted group-hover:text-white">GitHub Profile</span>
                    </motion.a>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass-card p-8 rounded-2xl flex flex-col items-center gap-4 group hover:bg-rich-surface/60 transition-all border border-white/5 hover:border-accent-primary/20 bg-rich-surface/30 cursor-default"
                    >
                        <div className="p-4 bg-white/5 rounded-full group-hover:bg-accent-primary/10 transition-colors text-accent-primary-muted group-hover:text-accent-primary">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <span className="text-lg font-medium text-rich-text-muted group-hover:text-white">Gujarat, India</span>
                    </motion.div>
                </div>

                <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-xl mx-auto space-y-8 text-left glass-card p-10 rounded-3xl border border-white/5 shadow-xl relative bg-rich-surface/20"
                >
                    <div className="space-y-6">
                        <div className="relative group">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block group-focus-within:text-accent-primary transition-colors">Name</label>
                            <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent-primary/50 focus:bg-white/5 transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="relative group">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block group-focus-within:text-accent-primary transition-colors">Email</label>
                            <input
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent-primary/50 focus:bg-white/5 transition-all"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="relative group">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block group-focus-within:text-accent-primary transition-colors">Message</label>
                            <textarea
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent-primary/50 focus:bg-white/5 transition-all resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 mt-8 bg-accent-primary/80 hover:bg-accent-primary rounded-xl text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-soft-glow"
                    >
                        <span>Send Message</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                </motion.form>
            </div>
        </SectionWrapper>
    )
}
