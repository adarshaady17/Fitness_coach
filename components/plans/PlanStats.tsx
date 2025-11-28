"use client";

import { motion } from "framer-motion";
import { GeneratedPlan } from "@/lib/types/plan";
import { calculatePlanStats } from "@/lib/analytics/planAnalytics";
import { Card } from "@/components/ui/Card";

interface PlanStatsProps {
  plan: GeneratedPlan;
}

export default function PlanStats({ plan }: PlanStatsProps) {
  const stats = calculatePlanStats(plan);

  const statItems = [
    {
      label: "Workout Days",
      value: stats.totalWorkoutDays,
      icon: "📅",
      color: "blue",
    },
    {
      label: "Total Exercises",
      value: stats.totalExercises,
      icon: "🏋️",
      color: "purple",
    },
    {
      label: "Diet Days",
      value: stats.totalDietDays,
      icon: "🥗",
      color: "green",
    },
    {
      label: "Total Meals",
      value: stats.totalMeals,
      icon: "🍽️",
      color: "orange",
    },
    {
      label: "Avg Calories/Day",
      value: stats.averageCaloriesPerDay,
      icon: "🔥",
      color: "red",
    },
    {
      label: "Tips & Motivation",
      value: stats.totalTips,
      icon: "💡",
      color: "yellow",
    },
  ];

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        📊 Plan Statistics
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="mb-2 text-3xl">{item.icon}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {item.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

