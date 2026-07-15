"use client";

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface TypingMotionProps {
  roles: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypingMotion({ 
  roles, 
  className,
  typingSpeed = 150,
  deletingSpeed = 75,
  pauseDuration = 2000 
}: TypingMotionProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let speed = typingSpeed;

    if (isDeleting) {
      speed = deletingSpeed;
    } else if (displayedText === currentRole) {
      speed = pauseDuration;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText !== currentRole) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        } else {
          // Finished typing, start deleting
          setIsDeleting(true);
        }
      } else {
        // Deleting
        if (displayedText !== "") {
          setDisplayedText(prev => prev.slice(0, -1));
        } else {
          // Finished deleting, move to next role
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, roles, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block ml-1 w-0.5 h-[1em] bg-primary align-middle mb-1"
      />
    </span>
  );
}
