"use client";

import * as React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { siteConfig } from '@/config/site.config';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Announcement, AnnouncementTitle, AnnouncementTag } from '@/components/ui/announcement';
import { ArrowRight, Zap } from 'lucide-react';
import { ArrowUpRightIcon } from 'lucide-react';
import { TypingMotion } from './TypingMotion';

export function HeroSection() {
  const roles = ["Software Development Engineer", "2D Game Development", "Gen AI Development", "Problem Solving", "Full Stack Development"];
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Spotlight effect state
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden z-10 bg-background selection:bg-primary/20"
    >
      {/* Dynamic Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary-rgb), 0.08), transparent 40%)`
        }}
      />

      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none select-none" />

      {/* Floating Particles/Glows */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] opacity-40 animate-pulse"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] opacity-40 animate-pulse delay-1000"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-left z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          {/* Announcement Component */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="https://github.com/PranavShadow/LinkGuru" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Announcement
                themed
                className="flex items-center justify-start w-fit max-w-full text-xs sm:text-sm md:text-base px-5 py-2 border border-primary/10 bg-background/50 backdrop-blur-md rounded-full hover:border-primary/30 hover:bg-primary/5 transition-all shadow-sm"
              >
                <AnnouncementTag className="bg-primary/10 text-primary">New</AnnouncementTag>
                <AnnouncementTitle className="flex items-center gap-2 text-foreground/80">
                  LinkGuru
                  <ArrowUpRightIcon className="shrink-0 text-primary" size={14} />
                </AnnouncementTitle>
              </Announcement>
            </Link>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9]">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50 pb-2">
                {siteConfig.siteName}
              </span>
            </h1>
            <div className="h-8 sm:h-10 md:h-12 overflow-hidden">
              <p className="max-w-3xl text-sm sm:text-lg md:text-xl text-muted-foreground font-medium tracking-wide">
                <TypingMotion roles={roles} />
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start justify-start gap-4 sm:gap-6 pt-8"
          >
            <Button
              asChild
              size="lg"
              className="relative h-12 px-8 rounded bg-foreground text-background hover:bg-foreground/90 transition-all text-base font-semibold shadow-xl shadow-primary/5 group"
            >
              <Link href='/projects'>
                Explore Work <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 rounded border-primary/20 hover:bg-primary/5 hover:border-primary/40 backdrop-blur-sm transition-all text-base font-medium text-foreground group"
            >
              <Link href='/contact'>
                Contact Me
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
