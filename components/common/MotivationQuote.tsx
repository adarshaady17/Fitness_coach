"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const placeholderQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can do it. It's your mind you need to convince.",
  "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
  "Take care of your body. It's the only place you have to live.",
  "The pain you feel today will be the strength you feel tomorrow.",
];

// Default quote for SSR - always show something
const defaultQuote = placeholderQuotes[1]; // "Your body can do it..."

export default function MotivationQuote() {
  const [quote, setQuote] = useState<string>(defaultQuote);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // After mount, optionally change to a random quote
    const randomQuote =
      placeholderQuotes[Math.floor(Math.random() * placeholderQuotes.length)];
    if (randomQuote !== quote) {
      setTimeout(() => {
        setQuote(randomQuote);
      }, 100);
    }
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center shadow-sm dark:border-gray-800 dark:from-gray-800 dark:to-gray-900">
      <p className="mb-2 text-2xl">💬</p>
      {mounted ? (
        <motion.p
          key={quote}
          className="text-lg font-medium text-gray-800 dark:text-gray-200 md:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          &quot;{quote}&quot;
        </motion.p>
      ) : (
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 md:text-xl">
          &quot;{quote}&quot;
        </p>
      )}
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Daily Motivation Quote
      </p>
    </div>
  );
}

