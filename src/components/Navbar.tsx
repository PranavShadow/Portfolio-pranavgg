"use client";

import { usePortfolioTheme } from "@/context/ThemeContext";
import { Lightbulb, LightbulbOff, Menu, SquareChevronRight, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "work", label: "WORK" },
  { id: "skills", label: "SKILLS" },
  { id: "achievements", label: "EXPERIENCE" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar() {
  const {
    theme,
    toggleTheme,
    scanlines,
    toggleScanlines,
    isTerminalOpen,
    toggleTerminal,
  } = usePortfolioTheme();
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scrolling to highlight the active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for sticky nav
      
      // Determine which section is currently in view
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            return;
          }
        }
      }
      
      // Fallback for hero section
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 bg-background/90 backdrop-blur-md border-b border-outline-variant z-50">
        <a
          className="font-display text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tighter hover:text-primary-fixed transition-colors duration-300"
          href="/"
        >
          PRANAV GUPTA
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link font-label-sm transition-colors duration-150 active:opacity-80 active:scale-95 transition-all ${
                  isActive
                    ? "text-primary-fixed font-bold active"
                    : "text-on-surface-variant hover:text-primary-fixed"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Utility Toggles */}
        <div className="flex items-center gap-4">
          {/* Interactive Shell Terminal Toggle Button */}
          <button
            onClick={toggleTerminal}
            title={isTerminalOpen ? "Close Shell Terminal" : "Open Shell Terminal"}
            className={`text-on-surface-variant hover:text-primary-fixed transition-colors duration-150 active:scale-95 cursor-pointer ${
              isTerminalOpen ? "text-primary-fixed shadow-[0_0_10px_rgba(0,255,178,0.3)] border border-primary-fixed/30 px-1 py-0.5" : ""
            }`}
            aria-label="Toggle Shell Terminal"
          >
            <span className="material-symbols-outlined align-middle text-[22px]">
              <SquareChevronRight/>
            </span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Theme"
            className="text-primary-fixed hover:text-primary-fixed hover:rotate-12 transition-all duration-300 active:opacity-80 active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined align-middle text-[24px]">
              {theme === "dark" ? <Lightbulb/> : <LightbulbOff/>}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-on-surface hover:text-primary-fixed transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined align-middle text-[28px]">
              {mobileMenuOpen ? <X/> : <Menu/>}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-nav-drawer backdrop-blur-md z-40 md:hidden flex flex-col justify-start items-center p-8 border-b border-outline-variant">
          <div className="flex flex-col items-center gap-8 w-full mt-10">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-label-sm text-lg tracking-widest py-2 border-b transition-all w-full text-center ${
                    isActive
                      ? "text-primary-fixed font-bold border-primary-fixed"
                      : "text-on-surface-variant border-transparent hover:text-primary-fixed"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
