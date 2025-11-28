"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PlanWizard from "@/components/forms/PlanWizard";
import { useUserData } from "@/lib/context/UserDataContext";
import { GeneratedPlan } from "@/lib/types/plan";

export default function CreatePlanPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useUserData();
  const router = useRouter();

  const handleComplete = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Validate that we have all required data
      if (!userData.name || !userData.age || !userData.fitnessGoal) {
        throw new Error("Please complete all required fields");
      }

      // Call the API to generate the plan
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate plan");
      }

      const plan: GeneratedPlan = await response.json();

      // Save plan using storage utility
      const { savePlan } = await import("@/lib/storage/planStorage");
      await savePlan(plan);

      // Redirect to view page
      router.push("/plans/view");
    } catch (err: any) {
      console.error("Plan generation error:", err);
      setError(err.message || "Failed to generate plan. Please try again.");
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Generating Your Plan...
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Our AI is creating a personalized workout and diet plan just for you!
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            This may take 10-30 seconds
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
          Create Your Fitness Plan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Answer a few questions to get your personalized AI-generated workout and diet plan
        </p>
      </motion.div>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"
        >
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-sm underline"
          >
            Dismiss
          </button>
        </motion.div>
      )}
      <PlanWizard onComplete={handleComplete} />
    </div>
  );
}

