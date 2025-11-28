"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GeneratedPlan } from "@/lib/types/plan";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

interface TTSControlsProps {
  plan: GeneratedPlan;
}

type Section = "workout" | "diet" | "tips" | "full";

export default function TTSControls({ plan }: TTSControlsProps) {
  const [selectedSection, setSelectedSection] = useState<Section>("full");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatPlanText = (section: Section): string => {
    let text = "";

    if (section === "workout" || section === "full") {
      text += "WORKOUT PLAN\n\n";
      plan.workoutPlan.forEach((day) => {
        text += `${day.dayName} - ${day.focus}\n`;
        day.exercises.forEach((exercise) => {
          text += `${exercise.name}: ${exercise.sets} sets of ${exercise.reps}. Rest ${exercise.rest}.\n`;
          if (exercise.notes) {
            text += `Note: ${exercise.notes}\n`;
          }
        });
        text += "\n";
      });
    }

    if (section === "diet" || section === "full") {
      text += "\nDIET PLAN\n\n";
      plan.dietPlan.forEach((day) => {
        text += `Day ${day.day}:\n`;
        day.meals.forEach((meal) => {
          text += `${meal.mealType} at ${meal.time}:\n`;
          meal.items.forEach((item) => {
            text += `- ${item.name}: ${item.quantity}\n`;
          });
        });
        text += "\n";
      });
    }

    if (section === "tips" || section === "full") {
      text += "\nTIPS AND MOTIVATION\n\n";
      text += "Lifestyle Tips:\n";
      plan.tips.lifestyleTips.forEach((tip) => {
        text += `- ${tip}\n`;
      });
      text += "\nPosture Tips:\n";
      plan.tips.postureTips.forEach((tip) => {
        text += `- ${tip}\n`;
      });
      text += "\nMotivation:\n";
      plan.tips.motivationLines.forEach((line) => {
        text += `${line}\n`;
      });
    }

    return text;
  };

  const handlePlay = async () => {
    if (isPlaying) {
      // Stop playback
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const text = formatPlanText(selectedSection);

      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          section: selectedSection,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate audio");
      }

      // Create audio blob and play
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setError("Error playing audio");
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
      setIsPlaying(true);
      setIsLoading(false);
    } catch (err: any) {
      console.error("TTS error:", err);
      setError(err.message || "Failed to generate speech. Please check your API key.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const sectionOptions = [
    { value: "full", label: "Full Plan" },
    { value: "workout", label: "Workout Only" },
    { value: "diet", label: "Diet Only" },
    { value: "tips", label: "Tips Only" },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        🔊 Listen to Your Plan
      </h3>

      <div className="space-y-4">
        <div className="w-full">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Section
          </label>
          <select
            value={selectedSection}
            onChange={(e) => {
              if (isPlaying) {
                // Stop current playback if changing section
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current = null;
                }
                setIsPlaying(false);
              }
              setSelectedSection(e.target.value as Section);
            }}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          >
            {sectionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <Button
          onClick={handlePlay}
          disabled={isLoading}
          isLoading={isLoading}
          variant="primary"
          className="w-full"
        >
          {isPlaying ? "⏸️ Stop" : "▶️ Play"}
        </Button>

        {isPlaying && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-gray-600 dark:text-gray-400"
          >
            🔊 Playing...
          </motion.p>
        )}
      </div>
    </div>
  );
}

