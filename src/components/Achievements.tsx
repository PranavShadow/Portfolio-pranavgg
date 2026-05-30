import React from "react";

const SYSTEM_LOGS = [
  { type: "Hackathon", message: <>Urja Hackathon 2024 (1st Place) :<br /> Engineered a comprehensive Hostel Leave Management System.</> },
  { type: "Problem Solving", message: <>Achieved 5 Star in Java and 3 Star in Problem Solving on HackerRank.</> },
  { type: "Data Structures", message: "Solved 250+ DSA problems across platforms (LeetCode, CodeChef, GeeksforGeeks)" },
  { type: "certification", message: "Certified in AWS Academy Cloud Foundations" },
];

export default function Achievements() {
  return (
    <section className="grid md:grid-cols-12 gap-gutter items-start reveal" id="achievements">
      {/* Code metaphor heading */}
      <div className="md:col-span-4 font-label-sm text-on-surface-variant uppercase tracking-widest border-t border-outline-variant pt-4 select-none">
        /var/log/achievements
      </div>

      {/* Terminal log window */}
      <div className="md:col-span-8 bg-surface-container border border-outline-variant p-6 font-label-sm text-on-surface leading-relaxed hover:border-primary-container transition-colors duration-500">
        <div className="space-y-3">
          {SYSTEM_LOGS.map((log, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:gap-4 items-start gap-5">
              <span className="text-primary-fixed font-bold tracking-widest select-none uppercase shrink-0 w-40 min-w-[10rem]">
                {log.type}
              </span>
              <p className="text-on-surface font-body-md text-sm md:text-[15px]">
                {log.message}
              </p>
            </div>
          ))}
        </div>

        {/* Command line prompt with blink cursor */}
        <div className="mt-4 flex items-center select-none">
          <span className="text-primary-fixed font-bold">&gt;</span>
          <span className="cursor-blink ml-2 inline-block w-[0.5em] h-[1em] bg-primary-fixed" />
        </div>
      </div>
    </section>
  );
}
