"use client";

import React, { useEffect } from "react";
import ScanlineOverlay from "@/components/ScanlineOverlay";
import TerminalConsole from "@/components/TerminalConsole";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  // Setup Intersection Observer scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    // Track all modular sections carrying the .reveal animation tag
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-background text-on-surface bg-technical-grid min-h-screen flex flex-col relative overflow-x-hidden">
      {/* CRT scanline display filter */}
      {/* <ScanlineOverlay /> */}

      {/* Floating interactive terminal console */}
      <TerminalConsole />

      {/* Standard sticky top nav */}
      <Navbar />

      {/* Core main flow wrapper */}
      <main className="flex-grow pt-32 pb-16 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop space-y-[128px]">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      {/* Universal footer */}
      <Footer />
    </div>
  );
}
