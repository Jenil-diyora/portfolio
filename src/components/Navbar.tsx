import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SocialPreview } from './SocialPreview';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Basic active section detection
            const sections = ['home', 'about', 'skills', 'experience', 'education', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'contact', label: 'Contact' },
    ];

    const socialData = [
        {
            Icon: FaGithub,
            href: "https://github.com/Jenil-diyora",
            label: "GitHub",
            color: "#fff",
            profilePic: "/profile.jpeg",
            headline: "Jenil Diyora",
            description: "Full Stack Software Engineer | Building efficient & scalable solutions",
            subDescription: "Surat, Gujarat, India"
        },
        {
            Icon: FaLinkedin,
            href: "https://www.linkedin.com/in/jenil-diyora-061380360/",
            label: "LinkedIn",
            color: "#00a0dc",
            profilePic: "/profile.jpeg",
            headline: "Jenil Diyora",
            description: "Software Engineer @ Engross Infotech | React.js | JavaScript | TypeScript | .NET Core",
            subDescription: "Ex-Intern @ Engross Infotech | BSC IT (Pursuing)"
        }
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-[#0b0616]/80 backdrop-blur-xl border-b border-white/5' : 'py-8'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative group cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-accent-primary blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary via-purple-500 to-accent-primary-muted flex items-center justify-center p-[2px] shadow-2xl relative z-10">
                                <div className="w-full h-full bg-[#0b0616] rounded-[10px] flex items-center justify-center overflow-hidden">
                                    <span className="text-white font-black text-xl font-heading tracking-tighter">JD</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tighter text-white leading-none">
                                JENIL<span className="text-accent-primary">.</span>D
                            </span>
                            <span className="text-[10px] font-bold text-accent-primary tracking-[0.3em] uppercase opacity-60">
                                Engineer
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Nav Items */}
                <div className="hidden lg:flex items-center gap-2 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                const el = document.getElementById(item.id);
                                if (el) {
                                    const rect = el.getBoundingClientRect();
                                    const offsetTop = rect.top + window.pageYOffset - 100;
                                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                                }
                            }}
                            className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full ${activeSection === item.id
                                ? 'text-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {activeSection === item.id && (
                                <motion.div
                                    layoutId="nav-active"
                                    className="absolute inset-0 bg-accent-primary/20 rounded-full border border-accent-primary/30"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Socials & CTA */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-1">
                        {socialData.map((social, i) => (
                            <SocialPreview username={'Jenil Diyora'} key={i} {...social} isNavbar />
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open('./resume.html', '_blank')}
                        className="hidden sm:block px-6 py-2.5 rounded-full bg-accent-primary text-white font-bold text-sm shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-all duration-300"
                    >
                        Resume
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
};
