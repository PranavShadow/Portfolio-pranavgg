"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-gutter border-t border-outline-variant bg-background mt-32">
      {/* Copyright branding */}
      <p className="text-on-surface-variant font-label-sm uppercase tracking-wide">
        &copy; 2026 PRANAV GUPTA // BUILT FOR PERFORMANCE
      </p>

      {/* Social metadata links */}
      <div className="flex gap-6">
        <a
          className="nav-link text-on-surface-variant font-label-sm hover:text-primary-fixed transition-colors px-2 py-1 rounded-sm uppercase font-bold"
              href="https://github.com/PranavShadow"
              target="_blank"
              rel="noopener noreferrer"
        >
          GITHUB
        </a>
        <a
          className="nav-link text-on-surface-variant font-label-sm hover:text-primary-fixed transition-colors px-2 py-1 rounded-sm uppercase font-bold"
          href="https://www.linkedin.com/in/pranavgg/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LINKEDIN
        </a>
        <a
          className="nav-link text-on-surface-variant font-label-sm hover:text-primary-fixed transition-colors px-2 py-1 rounded-sm uppercase font-bold"
          href="https://x.com/pranavvgg"
          target="_blank"
          rel="noopener noreferrer"
        >
          TWITTER
        </a>
        <a
          className="nav-link text-on-surface-variant font-label-sm hover:text-primary-fixed transition-colors px-2 py-1 rounded-sm uppercase font-bold"
              href="https://linktr.ee/Pranavgg"
              target="_blank"
              rel="noopener noreferrer"
        >
          MORE
        </a>
      </div>
    </footer>
  );
}
