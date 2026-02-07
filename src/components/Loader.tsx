import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { techSkills } from '../data/techLogos';

export const Loader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Preload images
        const preloadImages = async () => {
            const imagePromises = techSkills.map((skill) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = skill.logo;
                    img.onload = resolve;
                    img.onerror = reject;
                });
            });

            try {
                await Promise.all(imagePromises);
            } catch (error) {
                console.error("Failed to preload images", error);
            }
        };

        preloadImages();

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#0b0616] via-[#1a0b2e] to-[#0b0616]"
            initial={{ opacity: 1 }}
            animate={{ opacity: progress >= 100 ? 0 : 1 }}
            transition={{ duration: 0.5, delay: progress >= 100 ? 0.3 : 0 }}
            style={{ pointerEvents: progress >= 100 ? 'none' : 'auto' }}
        >
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center gap-8 px-6">
                {/* Logo/Name with gradient */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-heading tracking-tight">
                        JD
                    </h1>
                    <p className="text-purple-300/70 text-sm md:text-base mt-2 tracking-widest uppercase">
                        Jenil Diyora
                    </p>
                </motion.div>

                {/* Progress bar container */}
                <div className="w-64 md:w-80">
                    <div className="relative h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                        />

                        {/* Shimmer effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{
                                x: ['-100%', '200%']
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                        />
                    </div>

                    {/* Progress percentage */}
                    <motion.p
                        className="text-purple-300/60 text-xs text-center mt-3 font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {progress}%
                    </motion.p>
                </div>

                {/* Loading text with dots animation */}
                <motion.div
                    className="flex items-center gap-2 text-purple-300/50 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <span>Loading</span>
                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <motion.span
                                key={i}
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            >
                                .
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Decorative floating particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 3) * 20}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};
