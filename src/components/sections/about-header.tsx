"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

export function AboutHeader() {
  return (
    <div className="lg:sticky lg:top-24 lg:overflow-y-auto lg:pb-16 pt-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
      >
        {/* Profile Image */}
        <div className="relative w-48 h-48 lg:w-64 lg:h-64 overflow-hidden rounded-2xl border-4 border-muted/20 shadow-xl">
          <Image
            src={siteConfig.author_img}
            alt={siteConfig.author}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Info */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Pranav Gupta
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">
            Software Developer Engineer
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {siteConfig.social.map((item) => {
            const Icon = item.icon ? iconMap[item.icon as keyof typeof iconMap] : null;

            return (
              <Button key={item.label} variant="outline" size="icon" asChild>
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  {Icon && <Icon className="h-5 w-5" />}
                  <span className="sr-only">{item.label}</span>
                </Link>
              </Button>
            )
          })}
          <Button variant="outline" size="icon" asChild>
            <Link href={`mailto:${siteConfig.links.email}`}>
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
