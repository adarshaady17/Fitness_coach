"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DietDay } from "@/lib/types/plan";
import { Card } from "@/components/ui/Card";

interface DietPlanViewProps {
  dietPlan: DietDay[];
  onMealClick?: (mealName: string) => void;
}

export default function DietPlanView({
  dietPlan,
  onMealClick,
}: DietPlanViewProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const mealIcons: Record<string, string> = {
    breakfast: "🌅",
    lunch: "☀️",
    dinner: "🌙",
    snack: "🍎",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        🥗 Diet Plan
      </h2>
      {dietPlan.map((day) => (
        <Card key={day.day} className="overflow-hidden">
          <button
            onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
            className="w-full text-left"
          >
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Day {day.day}
                </h3>
                {day.totalCalories && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Calories: {day.totalCalories} kcal
                  </p>
                )}
              </div>
              <motion.div
                animate={{ rotate: expandedDay === day.day ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {expandedDay === day.day && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <div className="space-y-4">
                    {day.meals.map((meal, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">
                            {mealIcons[meal.mealType] || "🍽️"}
                          </span>
                          <h4 className="font-semibold text-gray-900 dark:text-white capitalize">
                            {meal.mealType} - {meal.time}
                          </h4>
                          {meal.totalCalories && (
                            <span className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                              {meal.totalCalories} kcal
                            </span>
                          )}
                        </div>
                        <ul className="space-y-2">
                          {meal.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                              onClick={() => onMealClick?.(item.name)}
                              title="Click to see food image"
                            >
                              <span className="font-medium underline decoration-dotted group-hover:decoration-solid">
                                {item.name}
                              </span>
                              {" - "}
                              <span>{item.quantity}</span>
                              {item.calories && (
                                <span className="text-gray-500 dark:text-gray-400 ml-2">
                                  ({item.calories} kcal)
                                </span>
                              )}
                              <span className="text-xs text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" title="Click for image">
                                🖼️
                              </span>
                            </li>
                          ))}
                        </ul>
                        {meal.items[0]?.macros && (
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
                            <strong>Macros:</strong>{" "}
                            {meal.items[0].macros.protein && `P: ${meal.items[0].macros.protein}g `}
                            {meal.items[0].macros.carbs && `C: ${meal.items[0].macros.carbs}g `}
                            {meal.items[0].macros.fats && `F: ${meal.items[0].macros.fats}g`}
                          </div>
                        )}
                      </motion.div>
                    ))}
                    {day.macros && (
                      <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-sm">
                        <strong className="text-gray-900 dark:text-white">
                          Daily Macros:
                        </strong>
                        <div className="mt-1 text-gray-700 dark:text-gray-300">
                          Protein: {day.macros.protein}g | Carbs: {day.macros.carbs}g | Fats: {day.macros.fats}g
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
}

