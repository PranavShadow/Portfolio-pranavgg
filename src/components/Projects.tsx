"use client";

import { Code, Download, ExternalLink } from "lucide-react";
import React from "react";

const PROJECTS = [
  {
    title: "Imagify",
    status: "[DEPLOYED]",
    statusColor: "text-primary-fixed bg-primary-fixed/10 border-primary-fixed/30",
    description:
      "AI Image Generator built with secure JWT authentication and ClipDrop API integration. Features a credit-based system with real-time usage tracking to ensure API limits are maintained.",
    tags: ["MERN", "JWT Auth", "ClipDrop API"],
    links: [
      { label: "Source", icon: <Code/>, url: "https://github.com/PranavShadow/Imagify" },
      { label: "Live", icon: <ExternalLink/>, url: "https://imagify-frontend-p65c.onrender.com/" },
    ],
  },
  {
    title: "TransactBud",
    status: "[DEPLOYED]",
    statusColor: "text-primary-fixed bg-primary-fixed/10 border-primary-fixed/30",
    description:
      "Expense tracking application engineered for real-time data syncing. Utilizes Recharts for dynamic data visualization and a robust database architecture for immediate transactional updates.",
    tags: ["Next.js", "Tailwind", "Shadcn", "Neon + Drizzle"],
    links: [
      { label: "Source", icon: <Code/>, url: "https://github.com/PranavShadow/TransactBud-Expense-Tracker" },
      { label: "Live", icon: <ExternalLink/>, url: "https://transactbud.vercel.app/" },
    ],
  },
  {
    title: "Climb Up the Hill",
    status: "[EXECUTABLE]",
    statusColor: "text-primary-fixed bg-primary-fixed/10 border-primary-fixed/30",
    description:
      "A 2D arcade-style game demonstrating core computer science concepts. Implements pixel-level collision detection, responsive keyboard event handling, and complex game state management loops without relying on heavy game engines.",
    tags: ["Python", "Turtle", "Tkinter"],
    links: [
      { label: "Source", icon: <Code/>, url: "https://github.com/PranavShadow/Climb-Up-the-Hill" },
      { label: "Download", icon: <Download/>, url: "https://pranavshadow.itch.io/pranav-climb-up-the-hill" },
    ],
  },
    {
    title: "BloodVision",
    status: "[Under Development]",
    statusColor: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    description:
      "BloodVision is an AI-powered medical imaging project designed to analyze and classify blood cell images using machine learning and computer vision techniques.",
    tags: ["Python", "Machine Learning Technique", "Image Processing", "Vanilla"],
    links: [
      { label: "Source", icon: <Code/>, url: "https://github.com/PranavShadow/Bloodvision" },
      { label: "Download", icon: <ExternalLink/>, url: "https://pranavshadow.github.io/Bloodvision/" },
    ],
  },

  // for full width project

  //   {
  //   title: "Climb Up the Hill",
  //   status: "[EXECUTABLE]",
  //   statusColor: "text-primary-fixed bg-primary-fixed/10 border-primary-fixed/30",
  //   description:
  //     "A 2D arcade-style game demonstrating core computer science concepts. Implements pixel-level collision detection, responsive keyboard event handling, and complex game state management loops without relying on heavy game engines.",
  //   tags: ["Python", "Turtle", "Tkinter"],
  //   fullWidth: true,
  //   links: [
  //     { label: "Source", icon: <Code/>, url: "https://github.com/PranavShadow/Climb-Up-the-Hill" },
  //     { label: "Download", icon: <Download/>, url: "https://pranavshadow.itch.io/pranav-climb-up-the-hill" },
  //   ],
  // },
];

export default function Projects() {
  return (
    <section className="space-y-12 reveal" id="work">
      {/* Brutalist section divider */}
      <div className="font-label-sm text-on-surface-variant uppercase tracking-widest border-t border-outline-variant pt-4 select-none">
        // ./bin/execute_projects
      </div>

      {/* Grid container */}
      <div className="grid md:grid-cols-2 gap-gutter">
        {PROJECTS.map((project, idx) => (
          <article
            key={project.title}
            className={`border border-outline-variant bg-surface-container flex flex-col group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary-container hover:shadow-[0_0_15px_rgba(0,255,178,0.15)] ${
              project.fullWidth ? "md:col-span-2" : ""
            }`}
          >
            {/* Hover top highlight bar */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-primary-fixed opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Header bar */}
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-dim">
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface group-hover:text-primary-container transition-colors duration-300">
                {project.title}
              </h3>
              <span className={`font-label-sm border px-2 py-1 select-none font-semibold ${project.statusColor}`}>
                {project.status}
              </span>
            </div>

            {/* Content info */}
            <div className="p-6 flex-grow space-y-4">
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {project.description}
              </p>
              
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant bg-surface px-2 py-1 border border-outline-variant select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer action buttons */}
            <div className="p-6 pt-0 flex gap-4 mt-auto">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (link.url === "#") {
                      e.preventDefault();
                      alert(`Accessing [${project.title}] ${link.label} Link (mocked).`);
                    }
                  }}
                  className="text-primary-fixed font-label-sm font-semibold uppercase hover:underline hover:text-primary-container transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
