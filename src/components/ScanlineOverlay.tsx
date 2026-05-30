"use client";

import { usePortfolioTheme } from "@/context/ThemeContext";

export default function ScanlineOverlay() {
  const { scanlines } = usePortfolioTheme();
  if (!scanlines) return null;
  return <div className="scanlines" />;
}
