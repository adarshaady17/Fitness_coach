"use client";

import { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false, ...props }: CardProps) {
  const baseStyles =
    "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800";

  if (hover) {
    return (
      <motion.div
        className={`${baseStyles} ${className}`}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}

