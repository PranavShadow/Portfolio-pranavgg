"use client";

import React, { useEffect, useState } from "react";
import { Download, MoveRight } from 'lucide-react';

export default function Hero() {
  const nameText = "Pranav Gupta";
  const [typedName, setTypedName] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < nameText.length) {
        setTypedName((prev) => prev + nameText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col justify-center min-h-[614px] gap-6 reveal active" id="hero">
      {/* Location Status */}
      <div className="font-label-sm text-on-surface-variant flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px] text-primary-fixed">location_on</span>
        Lucknow, UP, India
      </div>

      {/* Main Terminal Heading */}
      <div className="space-y-4">
        <h1 className="font-display text-4xl sm:text-5xl md:text-display text-on-surface flex flex-wrap items-end tracking-tighter">
          <span className="text-primary-fixed mr-4 select-none">&gt;</span>
          {typedName}
          <span
            className={`inline-block w-[0.4em] h-[0.9em] bg-primary-fixed ml-1 translate-y-[-0.05em] ${typingComplete ? "cursor-blink" : ""
              }`}
          />
        </h1>

        <h2 className="font-headline-lg text-2xl md:text-headline-lg text-on-surface-variant font-semibold">
          Software Developer.
        </h2>

        {/* Developer Quote */}
        <p className="font-body-lg text-lg md:text-body-lg text-on-surface-variant max-w-2xl border-l-2 border-outline-variant pl-4 italic">
          &ldquo;I build the part of the app nobody sees &mdash; until it breaks.&rdquo;
        </p>
      </div>

      {/* Hero Buttons */}
      <div className="flex flex-wrap gap-4 mt-8">
        <a
          className="btn-primary bg-primary-fixed text-on-primary-fixed font-label-sm px-8 py-4 uppercase tracking-widest flex items-center gap-2 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(71,255,184,0.4)] transition-all duration-300 font-semibold"
          href="#work"
        >
          See my work
          <span className="material-symbols-outlined text-[16px]"><MoveRight/></span>
        </a>
        <a
          className="btn-cta border border-primary-fixed text-primary-fixed font-label-sm px-8 py-4 uppercase tracking-widest flex items-center gap-2 font-semibold"
          href="https://drive.google.com/file/d/1RZz0bGKPKIlXSNZAnKgJPaqaxjdLx94Y/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="material-symbols-outlined text-[16px]"><Download/></span>
          Download Resume
        </a>
      </div>
    </section>
  );
}
