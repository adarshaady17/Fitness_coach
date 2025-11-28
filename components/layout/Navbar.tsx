"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          {mounted ? (
            <motion.span
              className="text-2xl font-bold text-gray-900 dark:text-white"
              whileHover={{ scale: 1.05 }}
            >
              💪 AI Fitness Coach
            </motion.span>
          ) : (
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              💪 AI Fitness Coach
            </span>
          )}
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/plans/history"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            History
          </Link>
          <Link
            href="/plans/create"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Create Plan
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

