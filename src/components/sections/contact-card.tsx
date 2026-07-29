"use client";

import React from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '@/config/site.config';
import { Github, Linkedin, Mail, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 4h2l-6.3 7.2L20 20h-5.2l-4.1-5.4L5.8 20H4l6.8-7.7L4 4h5.3l3.7 4.9L18 4Z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: 'GitHub',
    description: 'Check out my projects',
    url: siteConfig.links.github,
    icon: Github,
  },
  {
    label: 'LinkedIn',
    description: "Let's connect professionally",
    url: siteConfig.links.linkedin,
    icon: Linkedin,
  },
  {
    label: 'X',
    description: 'Follow for updates',
    url: siteConfig.links.twitter,
    icon: XIcon,
  },
  {
    label: 'Email',
    description: 'ompranav2003@gmail.com',
    url: `mailto:${siteConfig.links.email}`,
    icon: Mail,
  },
];

export default function ContactCard() {
  return (
    <section className="relative w-full max-w-4xl mx-auto">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative"
      >
        {/* Header Section */}
        <section className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 md:mb-6 bg-primary/5 text-primary border-primary/20">
              <MessageCircle className="mr-1 h-3 w-3" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              Let&apos;s{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I'm always open to meaningful conversations, exciting opportunities, and ambitious ideas. Whether you're looking to collaborate, discuss software, or simply connect, I'd love to hear from you.
            </p>
          </motion.div>
        </section>

        {/* Social Links Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.url}
                target={social.label !== 'Email' ? '_blank' : undefined}
                rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                {/* Icon Container */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>

                {/* Text Content */}
                <div className="relative z-10 flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {social.label}
                  </h3>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    {social.description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="relative z-10 hidden sm:block">
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-8 md:mt-12"
        >
          Looking forward to hearing from you!
        </motion.p>
      </motion.div>
    </section>
  );
}