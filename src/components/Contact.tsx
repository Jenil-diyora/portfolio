import { motion } from 'framer-motion';
import { Mail, MapPin, Github, User } from 'lucide-react';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { SectionWrapper } from './SectionWrapper';
import { gsap } from 'gsap';

export const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const routeRef = useRef<HTMLDivElement>(null);
    const userIconRef = useRef<HTMLDivElement>(null);
    const mailIconRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const validate = () => {
        const newErrors = { name: '', email: '', message: '' };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
            isValid = false;
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const playAnimation = () => {
        // Validation is now handled in handleSubmit
        const tl = gsap.timeline();
        const maskLine = document.querySelector('.mask-line') as SVGPathElement;

        if (!maskLine || !textRef.current || !routeRef.current) return;

        const pathLength = maskLine.getTotalLength();

        // Initial state
        gsap.set(maskLine, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        gsap.set([userIconRef.current, mailIconRef.current], { opacity: 0, scale: 0, y: 0 });
        gsap.set('.joint-dot', { scale: 0, opacity: 0, transformOrigin: "center center" });

        tl.to(textRef.current, { opacity: 0, scale: 0.9, duration: 0.4, ease: "power2.inOut" })
            .to(routeRef.current, { opacity: 1, duration: 0.2 }, "-=0.1")
            // Show User Icon + Dot
            .to('.joint-start', { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" })
            .to(userIconRef.current, {
                scale: 1,
                opacity: 1,
                y: -18,
                duration: 0.5,
                ease: "back.out(1.7)"
            }, "-=0.2")
            // Draw Route
            .to(maskLine, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: "power2.inOut"
            }, "-=0.3")
            // Show Mail Icon + Dot
            .to('.joint-end', { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.3")
            .to(mailIconRef.current, {
                scale: 1,
                opacity: 1,
                y: -18,
                duration: 0.5,
                ease: "back.out(1.7)"
            }, "-=0.2")
            // Wait and return
            .to(routeRef.current, { opacity: 0, duration: 0.5, delay: 1.5 })
            .to(textRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Trigger the visual animation
        playAnimation();

        try {
            const result = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_default',
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_default',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
            );

            if (result.status === 200) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            }
        } catch (error: any) {
            console.error('EmailJS Error:', error);
            // Log more details if available
            if (error?.text) console.error('Error detail:', error.text);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
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
                            <label className={`text-xs font-bold uppercase tracking-widest mb-2 block transition-colors ${errors.name ? 'text-red-400' : 'text-slate-500 group-focus-within:text-accent-primary'}`}>Name</label>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:bg-white/5 transition-all ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-primary/50'}`}
                                placeholder="John Doe"
                            />
                            {errors.name && <span className="text-red-400 text-[10px] mt-1 block font-medium absolute right-0 -top-1 uppercase tracking-tighter">Required</span>}
                        </div>

                        <div className="relative group">
                            <label className={`text-xs font-bold uppercase tracking-widest mb-2 block transition-colors ${errors.email ? 'text-red-400' : 'text-slate-500 group-focus-within:text-accent-primary'}`}>Email</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:bg-white/5 transition-all ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-primary/50'}`}
                                placeholder="john@example.com"
                            />
                            {errors.email && <span className="text-red-400 text-[10px] mt-1 block font-medium absolute right-0 -top-1 uppercase tracking-tighter">{errors.email}</span>}
                        </div>

                        <div className="relative group">
                            <label className={`text-xs font-bold uppercase tracking-widest mb-2 block transition-colors ${errors.message ? 'text-red-400' : 'text-slate-500 group-focus-within:text-accent-primary'}`}>Message</label>
                            <textarea
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleInputChange}
                                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:bg-white/5 transition-all resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent-primary/50'}`}
                                placeholder="Tell me about your project..."
                            />
                            {errors.message && <span className="text-red-400 text-[10px] mt-1 block font-medium absolute right-0 -top-1 uppercase tracking-tighter">Required</span>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mail-btn group mt-8 overflow-visible"
                        disabled={isSubmitting}
                    >
                        <div ref={routeRef} className="route-container">
                            <div className="relative w-[200px] h-full flex items-center justify-center">
                                <svg className="route-svg" viewBox="0 0 200 64" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
                                    <defs>
                                        <mask id="dash-mask">
                                            <path
                                                className="mask-line"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="10"
                                                d="M40,38 Q100,10 160,38"
                                            />
                                        </mask>
                                    </defs>

                                    <path
                                        className="dashed-path"
                                        mask="url(#dash-mask)"
                                        d="M40,38 Q100,10 160,38"
                                        style={{ strokeWidth: '1.5px', opacity: 1, stroke: 'white' }}
                                    />

                                    <circle cx="40" cy="38" r="3" className="joint-dot joint-start" fill="#7c3aed" stroke="white" strokeWidth="1" />
                                    <circle cx="160" cy="38" r="3" className="joint-dot joint-end" fill="#7c3aed" stroke="white" strokeWidth="1" />
                                </svg>

                                <div
                                    ref={userIconRef}
                                    className="absolute flex items-center justify-center text-white"
                                    style={{
                                        left: '40px',
                                        top: '30px',
                                        transform: 'translateX(-50%)',
                                        zIndex: 20
                                    }}
                                >
                                    <User size={18} strokeWidth={2.5} />
                                </div>

                                <div
                                    ref={mailIconRef}
                                    className="absolute flex items-center justify-center text-white"
                                    style={{
                                        left: '160px',
                                        top: '30px',
                                        transform: 'translateX(-50%)',
                                        zIndex: 20
                                    }}
                                >
                                    <Mail size={18} strokeWidth={2.5} />
                                </div>
                            </div>
                        </div>
                        <span ref={textRef} className="btn-text">
                            {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent!' : 'Send Message'}
                        </span>
                    </button>

                    {submitStatus === 'success' && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-accent-primary text-center text-sm font-medium mt-4"
                        >
                            Message sent successfully! I'll get back to you soon.
                        </motion.p>
                    )}

                    {submitStatus === 'error' && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-center text-sm font-medium mt-4"
                        >
                            Something went wrong. Please try again or email me directly.
                        </motion.p>
                    )}

                </motion.form>
            </div>
        </SectionWrapper>
    );
};
