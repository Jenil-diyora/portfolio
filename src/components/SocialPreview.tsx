import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IconType } from 'react-icons';

interface SocialPreviewProps {
    Icon: IconType;
    href: string;
    label: string;
    username: string;
    color: string;
    profilePic: string;
    headline: string;
    description: string;
    subDescription?: string;
    isNavbar?: boolean;
}

export const SocialPreview = ({
    Icon,
    href,
    label,
    color,
    profilePic,
    headline,
    description,
    subDescription,
    isNavbar = false
}: SocialPreviewProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className={`p-2 rounded-lg transition-all duration-300 ${isHovered ? 'bg-white/10 text-white' : 'text-gray-400'
                    }`}
            >
                <Icon size={20} />
            </motion.a>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={`absolute ${isNavbar ? 'top-full mt-4' : 'bottom-full mb-4'} right-0 z-[200] w-72 pointer-events-none`}
                    >
                        <div className="bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            {/* Header */}
                            <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                                <span className="text-white font-bold text-sm tracking-tight">{label}</span>
                                <Icon size={12} style={{ color }} />
                            </div>

                            {/* Body */}
                            <div className="p-5">
                                <div className="flex items-start gap-4 mb-4">
                                    <img
                                        src={`${profilePic}?t=${new Date().getTime()}`}
                                        alt="Profile"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenil&backgroundColor=0b0616";
                                        }}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
                                    />
                                </div>

                                <h4 className="text-white font-bold text-lg mb-1 leading-tight">{headline}</h4>
                                <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                                    {description}
                                </p>

                                {subDescription && (
                                    <p className="text-gray-500 text-xs leading-relaxed">
                                        {subDescription}
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
