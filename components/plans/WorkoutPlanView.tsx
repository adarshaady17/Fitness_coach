"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WorkoutDay } from "@/lib/types/plan";
import { Card } from "@/components/ui/Card";

interface WorkoutPlanViewProps {
  workoutPlan: WorkoutDay[];
  onExerciseClick?: (exerciseName: string) => void;
}

export default function WorkoutPlanView({
  workoutPlan,
  onExerciseClick,
}: WorkoutPlanViewProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        🏋️ Workout Plan
      </h2>
      {workoutPlan.map((day) => (
        <Card key={day.day} className="overflow-hidden">
          <button
            onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
            className="w-full text-left"
          >
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {day.dayName} - {day.focus}
                </h3>
                {day.duration && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Duration: {day.duration}
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
                    {day.exercises.map((exercise, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4
                                className="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline decoration-dotted"
                                onClick={() =>
                                  onExerciseClick?.(exercise.name)
                                }
                                title="Click to see exercise image"
                              >
                                {exercise.name}
                              </h4>
                              <span className="text-xs text-blue-500 dark:text-blue-400" title="Click exercise name for image">
                                🖼️
                              </span>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <span>
                                <strong>Sets:</strong> {exercise.sets}
                              </span>
                              <span>
                                <strong>Reps:</strong> {exercise.reps}
                              </span>
                              <span>
                                <strong>Rest:</strong> {exercise.rest}
                              </span>
                            </div>
                            {exercise.notes && (
                              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">
                                💡 {exercise.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
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

