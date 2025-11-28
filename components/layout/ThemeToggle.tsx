"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative h-6 w-12 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md"></div>
        <span className="absolute left-1.5 top-0.5 text-xs">🌙</span>
        <span className="absolute right-1.5 top-0.5 text-xs">☀️</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-6 w-12 rounded-full bg-gray-200 transition-colors dark:bg-gray-700"
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md"
        initial={false}
        animate={{
          x: theme === "dark" ? 24 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
      <span className="absolute left-1.5 top-0.5 text-xs">🌙</span>
      <span className="absolute right-1.5 top-0.5 text-xs">☀️</span>
    </button>
  );
}

