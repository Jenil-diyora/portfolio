import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techSkills } from '../data/techLogos';

interface Bubble {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    delay: number;
    logo: string;
    name: string;
}

interface Burst {
    id: number;
    x: number;
    y: number;
}

export const FloatingBubbles = () => {
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    const [bursts, setBursts] = useState<Burst[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const bubblePositions = useRef<Map<number, { x: number; y: number; size: number }>>(new Map());

    // Check for bubble collisions
    const checkCollisions = useCallback(() => {
        const positions = Array.from(bubblePositions.current.entries());
        const collidedIds: number[] = [];

        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const [id1, pos1] = positions[i];
                const [id2, pos2] = positions[j];

                const dx = pos1.x - pos2.x;
                const dy = pos1.y - pos2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = (pos1.size + pos2.size) / 2;

                if (distance < minDistance && !collidedIds.includes(id1) && !collidedIds.includes(id2)) {
                    collidedIds.push(id1, id2);

                    const burstX = (pos1.x + pos2.x) / 2;
                    const burstY = (pos1.y + pos2.y) / 2;
                    const burstId = Date.now() + Math.random();
                    setBursts(prev => [...prev, { id: burstId, x: burstX, y: burstY }]);

                    setTimeout(() => {
                        setBursts(prev => prev.filter(b => b.id !== burstId));
                    }, 1000);
                }
            }
        }

        if (collidedIds.length > 0) {
            setBubbles(prev => prev.filter(b => !collidedIds.includes(b.id)));
            collidedIds.forEach(id => bubblePositions.current.delete(id));
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(checkCollisions, 100);
        return () => clearInterval(interval);
    }, [checkCollisions]);

    // Generate initial bubbles on mount
    useEffect(() => {
        const initialBubbles: Bubble[] = [];
        for (let i = 0; i < 5; i++) {
            const randomSkill = techSkills[Math.floor(Math.random() * techSkills.length)];
            initialBubbles.push({
                id: Date.now() + i,
                x: Math.random() * 30 + 65,
                y: window.innerHeight - (Math.random() * window.innerHeight * 0.3),
                size: Math.random() * 50 + 90,
                speed: Math.random() * 20 + 50,
                delay: i * 0.5,
                logo: randomSkill.logo,
                name: randomSkill.name
            });
        }
        setBubbles(initialBubbles);
    }, []);

    useEffect(() => {
        const generateBubble = () => {
            if (document.hidden) return;

            setBubbles(prev => {
                if (prev.length >= 10) return prev;

                const randomSkill = techSkills[Math.floor(Math.random() * techSkills.length)];

                return [...prev, {
                    id: Date.now() + Math.random(),
                    x: Math.random() * 30 + 65,
                    y: window.innerHeight + 50,
                    size: Math.random() * 50 + 90,
                    speed: Math.random() * 20 + 50,
                    delay: 0,
                    logo: randomSkill.logo,
                    name: randomSkill.name
                }];
            });
        };

        const interval = setInterval(generateBubble, 5000);
        return () => clearInterval(interval);
    }, []);

    const removeBubble = useCallback((id: number) => {
        setBubbles(prev => prev.filter(b => b.id !== id));
        bubblePositions.current.delete(id);
    }, []);

    const handleBurst = useCallback((id: number, e: React.MouseEvent) => {
        e.stopPropagation();

        removeBubble(id);

        const burstId = Date.now();
        setBursts(prev => [...prev, { id: burstId, x: e.clientX, y: e.clientY }]);

        setTimeout(() => {
            setBursts(prev => prev.filter(b => b.id !== burstId));
        }, 1000);
    }, [removeBubble]);

    const updateBubblePosition = useCallback((id: number, x: number, y: number, size: number) => {
        bubblePositions.current.set(id, { x, y, size });
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden h-screen w-screen">
            {/* Bubble Generator */}
            <div className="fixed bottom-4 right-[20%] w-32 h-32 pointer-events-none">
                <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-500/10 to-transparent blur-xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-400/20 rounded-full blur-md" />
            </div>

            <AnimatePresence>
                {bubbles.map(bubble => (
                    <SoapBubble
                        key={bubble.id}
                        bubble={bubble}
                        onBurst={handleBurst}
                        onComplete={() => removeBubble(bubble.id)}
                        onPositionUpdate={updateBubblePosition}
                    />
                ))}
            </AnimatePresence>

            {bursts.map(burst => (
                <BurstEffect key={burst.id} x={burst.x} y={burst.y} />
            ))}
        </div>
    );
};

const SoapBubble = ({
    bubble,
    onBurst,
    onComplete,
    onPositionUpdate
}: {
    bubble: Bubble,
    onBurst: (id: number, e: React.MouseEvent) => void,
    onComplete: () => void,
    onPositionUpdate: (id: number, x: number, y: number, size: number) => void
}) => {
    const { id, x, size, speed, delay, logo, name, y: startY } = bubble;
    const elementRef = useRef<HTMLDivElement>(null);

    // Stable random values for animation
    const animationValues = useRef({
        xOffset: [
            0,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 40,
            0
        ]
    }).current;

    useEffect(() => {
        const updatePosition = () => {
            if (elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect();
                onPositionUpdate(id, rect.left + rect.width / 2, rect.top + rect.height / 2, size);
            }
        };

        const interval = setInterval(updatePosition, 100);
        return () => clearInterval(interval);
    }, [id, size, onPositionUpdate]);

    const totalDistance = window.innerHeight + 500;

    return (
        <motion.div
            ref={elementRef}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
                left: `${x}%`,
                width: size,
                height: size,
                bottom: startY - window.innerHeight,
            }}
            initial={{
                y: 0,
                x: 0,
                opacity: 0,
                scale: 0.3
            }}
            animate={{
                y: -totalDistance,
                x: animationValues.xOffset,
                opacity: [0, 1, 1, 1, 1, 0],
                scale: [0.3, 1, 1, 1, 1, 0.95],
            }}
            transition={{
                duration: speed,
                delay: delay,
                ease: "linear",
                times: [0, 0.1, 0.4, 0.8, 0.95, 1]
            }}
            onAnimationComplete={onComplete}
            onClick={(e) => onBurst(id, e)}
        >
            {/* CSS Wobbly Bubble Effect (User Requested) */}
            <div className="ball bubble w-full h-full relative" style={{ cursor: 'pointer' }}>
                {/* Shadow if needed, though user CSS puts it transformed strangely, might skip or adjust */}

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                    {/* Tech Logo and Name placeholder or remove if handled by outer layer */}
                </div>
            </div>

            {/* Iridescent Rainbow Overlay */}
            <motion.div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    borderRadius: '48% 40% 62% 47% / 61% 49% 64% 43%',
                    background: `
                            linear-gradient(135deg, 
                                rgba(147, 51, 234, 0.15) 0%,
                                rgba(59, 130, 246, 0.1) 25%,
                                rgba(16, 185, 129, 0.08) 50%,
                                rgba(251, 191, 36, 0.1) 75%,
                                rgba(239, 68, 68, 0.15) 100%
                            )
                        `
                }}
                animate={{
                    rotate: [0, 360]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                {/* Tech Logo and Name */}
                <div className="relative flex flex-col items-center gap-2 px-2 pointer-events-none">
                    <img
                        src={logo}
                        alt={name}
                        className="drop-shadow-lg object-contain select-none transform transition-transform duration-500"
                        style={{
                            width: size * 0.45,
                            height: size * 0.45,
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                            transform: 'scale(1.15)' // Magnification illusion
                        }}
                    />
                    <span
                        className="font-semibold tracking-wide text-white/95 text-center leading-tight px-1"
                        style={{
                            fontSize: Math.max(10, size * 0.12),
                            textShadow: '0 1px 3px rgba(0,0,0,0.4), 0 0 8px rgba(255,255,255,0.3)'
                        }}
                    >
                        {name}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const BurstEffect = ({ x, y }: { x: number, y: number }) => {
    return (
        <div
            className="fixed pointer-events-none z-50"
            style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
        >
            {/* Water droplets */}
            {[...Array(16)].map((_, i) => {
                const angle = (i / 16) * Math.PI * 2;
                const distance = 60 + Math.random() * 60;
                return (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-white/60 to-purple-200/40"
                        initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                        animate={{
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance - 30,
                            scale: 0,
                            opacity: 0
                        }}
                        transition={{
                            duration: 0.6 + Math.random() * 0.3,
                            ease: "easeOut"
                        }}
                    />
                );
            })}

            {/* Expanding ring */}
            <motion.div
                className="absolute border-2 border-white/40 rounded-full shadow-lg"
                initial={{ width: 0, height: 0, opacity: 1 }}
                animate={{ width: 100, height: 100, opacity: 0, borderWidth: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Center flash */}
            <motion.div
                className="absolute bg-white/40 rounded-full blur-lg"
                initial={{ width: 20, height: 20, opacity: 1 }}
                animate={{ width: 80, height: 80, opacity: 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Shimmer particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`shimmer-${i}`}
                    className="absolute w-1 h-1 bg-white/60 rounded-full"
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 100,
                        opacity: 0,
                        scale: 0
                    }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.05 }}
                />
            ))}
        </div>
    );
};
