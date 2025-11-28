"use client";

import { motion } from "framer-motion";
import { Tips } from "@/lib/types/plan";
import { Card } from "@/components/ui/Card";

interface TipsViewProps {
  tips: Tips;
}

export default function TipsView({ tips }: TipsViewProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        💡 Tips & Motivation
      </h2>

      {/* Lifestyle Tips */}
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          🌟 Lifestyle Tips
        </h3>
        <ul className="space-y-3">
          {tips.lifestyleTips.map((tip, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
            >
              <span className="mt-1 text-blue-600 dark:text-blue-400">✓</span>
              <span>{tip}</span>
            </motion.li>
          ))}
        </ul>
      </Card>

      {/* Posture Tips */}
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          🧘 Posture & Form Tips
        </h3>
        <ul className="space-y-3">
          {tips.postureTips.map((tip, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
            >
              <span className="mt-1 text-green-600 dark:text-green-400">✓</span>
              <span>{tip}</span>
            </motion.li>
          ))}
        </ul>
      </Card>

      {/* Motivation */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          💪 Daily Motivation
        </h3>
        <div className="space-y-3">
          {tips.motivationLines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-gray-800 dark:text-gray-200 italic"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </Card>
    </div>
  );
}

