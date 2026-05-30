import React from "react";

const SKILL_CATEGORIES = [
  {
    title: "[ Languages ]",
    skills: ["Java", "JavaScript", "Python", "C", "SQL"],
  },
  {
    title: "[ Frameworks & Libraries ]",
    skills: ["React", "Next.js", "Express", "Node.js", "Shadcn UI", "Lucide", "Tailwind", "Shadcn", "Drizzle", "Tkinter", "Turtle", "HTML", "CSS"],
  },
   {
    title: "[ Databases ]",
    skills: ["MongoDB", "MySQL", "Postgres", "Neon"],
  },
  {
    title: "[ Tools ]",
    skills: ["Git", "Github", "VS Code", "Figma", "Canva", "Adobe CC"],
  },
];

export default function Skills() {
  return (
    <section className="grid md:grid-cols-12 gap-gutter items-start reveal" id="skills">
      {/* Code metaphor heading */}
      <div className="md:col-span-4 font-label-sm text-on-surface-variant uppercase tracking-widest border-t border-outline-variant pt-4 select-none">
        // dependencies.lock
      </div>

      {/* Category listings */}
      <div className="md:col-span-8 space-y-8">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.title} className="space-y-4">
            <h3 className="font-label-sm text-primary-fixed mb-2 uppercase tracking-wide">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-outline-variant bg-surface-container px-3 py-1.5 font-label-sm text-on-surface hover:-translate-y-0.5 hover:border-primary-container hover:shadow-[0_0_8px_rgba(0,255,178,0.3)] hover:text-primary-container transition-all duration-200 cursor-default select-none font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
