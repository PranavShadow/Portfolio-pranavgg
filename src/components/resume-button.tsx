"use client";

import { motion } from 'motion/react';
import { FileDown, Download } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ResumeButton() {
    const [isHovered, setIsHovered] = useState(false);

    const handleDownload = () => {
        toast.success("Resume Downloaded", {
            description: "Thanks for your interest in my work!",
            duration: 4000,
            icon: <Download className="h-5 w-5 text-primary" />,
        });
    };

    return (
        <motion.div
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
        >
            <motion.a
                href="/resume.pdf"
                download="Pranav_Gupta_Resume.pdf"
                onClick={handleDownload}
                className="relative flex items-center gap-2 bg-background/30 backdrop-blur-md border border-r-0 border-white/10 p-2 rounded-l-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden group hover:border-primary/50 transition-colors duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ x: -5 }}
            >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Vertical Text Container */}
                <div className="flex flex-col items-center gap-3 py-2 min-h-[100px] justify-center">
                    {/* Icon at top */}
                    <motion.div
                        animate={{ y: isHovered ? 3 : 0 }}
                        transition={{ repeat: isHovered ? Infinity : 0, repeatType: "reverse", duration: 0.8 }}
                    >
                        <FileDown className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </motion.div>

                    {/* Rotated Text */}
                    <div className="relative" style={{ writingMode: 'vertical-rl' }}>
                        <span className="text-xs font-bold tracking-[0.25em] text-muted-foreground group-hover:text-primary transition-colors duration-300 rotate-180 select-none whitespace-nowrap pt-2">
                            GET RESUME
                        </span>
                    </div>
                </div>

                {/* Shine Effect */}
                <motion.div
                    className="absolute inset-0 -translate-y-[100%] z-20 bg-gradient-to-b from-transparent via-white/10 to-transparent"
                    animate={isHovered ? { translateY: ['100%', '-100%'] } : {}}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                />
            </motion.a>
        </motion.div>
    );
}

// Add strict type for writing-mode using CSSProperties if needed, but Tailwind 'writing-mode-vertical' (vertical-rl) style helper might be needed.
// Tailwind doesn't strictly have 'writing-mode-vertical' by default in older versions, usually it's `vertical-rl` or similar via plugin or arbitary values.
// I will use style={{ writingMode: 'vertical-rl' }} to be safe and `rotate-180` to orient text correctly.
