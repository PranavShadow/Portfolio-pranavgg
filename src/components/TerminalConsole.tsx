"use client";

import { usePortfolioTheme } from "@/context/ThemeContext";
import React, { useEffect, useRef, useState } from "react";

interface HistoryItem {
  type: "input" | "output" | "error";
  text: string;
}

const WELCOME_LOGS: HistoryItem[] = [
  { type: "output", text: "SYSTEM BOOT SUCCESSFUL. CONNECTING TO HOST..." },
  { type: "output", text: "WELCOME TO PRANAV GUPTA'S TECHNICAL PORTFOLIO CONSOLE [v1.0.2]." },
  { type: "output", text: "TYPE 'help' FOR A LIST OF COMPILED SYSTEM COMMANDS." },
  { type: "output", text: "--------------------------------------------------------" },
];

export default function TerminalConsole() {
  const { isTerminalOpen, closeTerminal, toggleTheme } = usePortfolioTheme();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>(WELCOME_LOGS);
  
  const historyEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of command history
  useEffect(() => {
    if (historyEndRef.current) {
      historyEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // Autofocus terminal input when window opens
  useEffect(() => {
    if (isTerminalOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTerminalOpen]);

  if (!isTerminalOpen) return null;

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const args = trimmedInput.split(/\s+/);
    const command = args[0].toLowerCase();
    const newHistory: HistoryItem[] = [...history, { type: "input", text: input }];

    // Handle 'goto' command separately to parse arguments
    if (command === "goto") {
      const targetSection = args[1]?.toLowerCase();
      if (!targetSection) {
        newHistory.push({
          type: "error",
          text: "COMMAND_FAILURE: Missing section target. Usage: 'goto <section_name>'\nValid sections: hero, about, skills, projects, achievements, contact.",
        });
      } else {
        // Map user input arguments to HTML element IDs
        let elementId = "";
        if (targetSection === "hero") elementId = "hero";
        else if (targetSection === "about") elementId = "about";
        else if (targetSection === "skills") elementId = "skills";
        else if (targetSection === "projects" || targetSection === "work") elementId = "work";
        else if (targetSection === "achievements" || targetSection === "experience") elementId = "achievements";
        else if (targetSection === "contact") elementId = "contact";

        if (elementId) {
          const el = document.getElementById(elementId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            newHistory.push({
              type: "output",
              text: `SYSTEM: Routing viewport to [${targetSection}] section successful.`,
            });
          } else {
            newHistory.push({
              type: "error",
              text: `SYSTEM_ERROR: Section '${targetSection}' found, but its DOM element is missing.`,
            });
          }
        } else {
          newHistory.push({
            type: "error",
            text: `COMMAND_FAILURE: '${targetSection}' is not a recognized section.\nValid targets: hero, about, skills, projects, achievements, contact.`,
          });
        }
      }
      setHistory(newHistory);
      setInput("");
      return;
    }

    switch (command) {
      case "help":
        newHistory.push({
          type: "output",
          text: "Available commands:\n  goto <sec> - Smooth-scroll to section (e.g. 'goto about', 'goto skills')\n  about     - Core developer philosophy and technical profile\n  skills    - List classified languages, frameworks, and tools\n  projects  - Show detailed listing of engineered projects\n  contact   - Display transmission and active social routing details\n  theme     - Hot-swap between light and dark modes\n  clear     - Clean the screen log buffer\n  exit      - Close the system terminal console",
        });
        break;
      case "about":
        newHistory.push({
          type: "output",
          text: "PROFILE: Pranav Gupta\nROLE: Full-Stack Developer\nPHILOSOPHY: \"I build the part of the app nobody sees — until it breaks.\"\nI engineer robust, high-performance backend systems and seamless frontend interfaces. Focus is strictly on structural integrity, scalability, and security.",
        });
        break;
      case "skills":
        newHistory.push({
          type: "output",
          text: "LANGUAGES: Java, JavaScript, Python, C, SQL\nFRAMEWORKS: React, Next.js, Express, Tailwind CSS, Shadcn\nTECHNOLOGIES: MERN Stack, MongoDB, Convex, JWT Auth, REST APIs\nTOOLS: Git, VS Code, Figma, Adobe CC",
        });
        break;
      case "projects":
        newHistory.push({
          type: "output",
          text: "1. IMAGIFY [DEPLOYED]\n   - AI Image Generator with JWT authentication & ClipDrop API integration.\n2. TRANSACTBUD [DEPLOYED]\n   - Real-time expense tracker with Drizzle, Neon DB, and Recharts.\n3. CLIMB UP THE HILL [LOCAL]\n   - Game implementing pixel collision and custom states loops in Python.",
        });
        break;
      case "contact":
        newHistory.push({
          type: "output",
          text: "TRANSMISSION PORT: Go to section '#contact' at the bottom of the page to submit a packet.\nSOCIAL METRIC PATHS:\n  - GitHub: github.com\n  - LinkedIn: linkedin.com\n  - LeetCode: leetcode.com",
        });
        break;
      case "theme":
        toggleTheme();
        newHistory.push({ type: "output", text: "SYSTEM: Inverting primary color spectrum (Theme Swapped)." });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "exit":
        closeTerminal();
        setInput("");
        return;
      default:
        newHistory.push({
          type: "error",
          text: `COMMAND_FAILURE: System bash could not recognize instruction '${input}'. Type 'help' for instructions.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div 
      className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-8 md:bottom-8 md:w-[500px] h-[350px] bg-[#0c0e0f] text-[#00ffb2] border border-[#3a4a41] z-50 flex flex-col font-mono shadow-[0_0_20px_rgba(0,255,178,0.15)] selection:bg-[#005236] selection:text-white"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Title Bar */}
      <div className="flex justify-between items-center bg-[#1c1b1b] border-b border-[#3a4a41] px-4 py-2 select-none cursor-default">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#ff5f56] rounded-full" />
          <span className="inline-block w-2.5 h-2.5 bg-[#ffbd2e] rounded-full" />
          <span className="inline-block w-2.5 h-2.5 bg-[#27c93f] rounded-full" />
          <span className="text-xs text-on-surface-variant font-semibold ml-2">pranav@portfolio: ~</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            closeTerminal();
          }}
          className="text-on-surface-variant hover:text-error hover:scale-115 transition-all text-sm font-bold"
          aria-label="Close Terminal"
        >
          ✕
        </button>
      </div>

      {/* Terminal logs display */}
      <div className="flex-grow p-4 overflow-y-auto text-xs space-y-2 select-text">
        {history.map((item, index) => (
          <div key={index} className="whitespace-pre-wrap leading-relaxed">
            {item.type === "input" ? (
              <p className="text-on-surface">
                <span className="text-[#47ffb8] font-bold">pranav@portfolio:~$</span> {item.text}
              </p>
            ) : item.type === "error" ? (
              <p className="text-[#ffb4ab]">{item.text}</p>
            ) : (
              <p className="text-[#00ffb2]">{item.text}</p>
            )}
          </div>
        ))}
        <div ref={historyEndRef} />
      </div>

      {/* Terminal Input Prompt */}
      <form onSubmit={handleCommandSubmit} className="flex border-t border-[#3a4a41] bg-[#131313] p-3 select-none">
        <span className="text-[#47ffb8] font-bold text-xs select-none mr-2 shrink-0">
          pranav@portfolio:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          className="flex-grow bg-transparent text-white text-xs outline-none border-none p-0 focus:ring-0 w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
