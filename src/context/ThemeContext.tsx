"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  scanlines: boolean;
  toggleScanlines: () => void;
  isTerminalOpen: boolean;
  toggleTerminal: () => void;
  closeTerminal: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [scanlines, setScanlines] = useState<boolean>(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check local storage or system preferences on mount
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "dark"); // Default to dark brutalist
    setTheme(initialTheme);

    const savedScanlines = localStorage.getItem("portfolio-scanlines");
    if (savedScanlines !== null) {
      setScanlines(savedScanlines === "true");
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("portfolio-scanlines", String(scanlines));
  }, [scanlines]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleScanlines = () => {
    setScanlines((prev) => !prev);
  };

  const toggleTerminal = () => {
    setIsTerminalOpen((prev) => !prev);
  };

  const closeTerminal = () => {
    setIsTerminalOpen(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        scanlines,
        toggleScanlines,
        isTerminalOpen,
        toggleTerminal,
        closeTerminal,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function usePortfolioTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("usePortfolioTheme must be used within a ThemeProvider");
  }
  return context;
}
