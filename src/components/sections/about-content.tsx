"use client";

import { motion } from 'motion/react';
import {
  Atom,
  Code2,
  Database,
  Figma,
  FileCode,
  GitBranch,
  Github,
  Image,
  Layers,
  Send,
  Server,
  Sparkles,
  Terminal,
  Triangle,
  Turtle,
  Type,
  Cloud,
  Dock,
  Coffee,
  Wind,
  Worm,
} from 'lucide-react';

const techStack = [
  { label: 'Java', icon: Coffee },
  { label: 'JavaScript', icon: Type },
  { label: 'TypeScript', icon: Type },
  { label: 'Python', icon: Worm },
  { label: 'C', icon: Code2 },
  { label: 'SQL', icon: Database },
  { label: 'Next.js', icon: Layers },
  { label: 'React', icon: Atom },
  { label: 'Node.js', icon: Server },
  { label: 'Express.js', icon: Terminal },
  { label: 'Tailwind CSS', icon: Wind },
  { label: 'shadcn/ui', icon: Layers },
  { label: 'Lucide', icon: Sparkles },
  { label: 'HTML5', icon: FileCode },
  { label: 'CSS3', icon: FileCode },
  { label: 'Tkinter', icon: Terminal },
  { label: 'Turtle', icon: Turtle },
  { label: 'Figma', icon: Figma },
  { label: 'Canva', icon: Image },
  { label: 'Drizzle ORM', icon: Database },
  { label: 'MongoDB', icon: Database },
  { label: 'MySQL', icon: Database },
  { label: 'PostgreSQL', icon: Database },
  { label: 'Neon', icon: Database },
  { label: 'Git', icon: GitBranch },
  { label: 'GitHub', icon: Github },
  { label: 'Docker', icon: Dock },
  { label: 'Netlify', icon: Cloud },
  { label: 'Vercel', icon: Triangle },
  { label: 'Render', icon: Layers },
  { label: 'Postman', icon: Send },
];

export function AboutContent() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-12 pt-12 lg:pt-8"
    >
      <div className="text-muted-foreground font-light text-lg space-y-8">
        {/* Intro */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Hi, I&apos;m Pranav Gupta</h2>
          <p className="leading-relaxed">
          I&apos;m a passionate Software Engineer who loves building products that solve real-world problems. Over time, I've been a bit of a jack of all trades, exploring domains like Computer Vision, 2D Game Development, Full-Stack Web Development, and AI-powered applications. I enjoy taking ideas from concept to completion, constantly learning new technologies, and challenging myself with unfamiliar problems.
        </p>

        <p className="leading-relaxed">
          My current flagship product is <a href="https://linkguru.pranavgg.me/" className='text-primary cursor-pointer'>LinkGuru</a>, a full-stack application built from the ground up with a strong focus on product quality and user experience. Alongside personal projects, I'm gradually finding my place in the Open Source community and continuously sharpening my problem-solving skills through LeetCode. I believe great engineering comes from curiosity, consistency, and a willingness to keep learning.
        </p>

        </section>

        {/* Beyond Coding */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Tech Stack</h2>
          <p className="leading-relaxed">Here are the main technologies and tools I work with regularly:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.label}
                  className="flex items-center gap-2 rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm font-medium text-foreground shadow-sm shadow-primary/5"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {tech.label}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </motion.article>
  );
}
