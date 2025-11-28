"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GeneratedPlan } from "@/lib/types/plan";
import WorkoutPlanView from "@/components/plans/WorkoutPlanView";
import DietPlanView from "@/components/plans/DietPlanView";
import TipsView from "@/components/plans/TipsView";
import PlanActionsBar from "@/components/plans/PlanActionsBar";
import ImagePreviewModal from "@/components/media/ImagePreviewModal";
import TTSControls from "@/components/media/TTSControls";
import PlanStats from "@/components/plans/PlanStats";
import { getCurrentPlan } from "@/lib/storage/planStorage";

export default function ViewPlanPage() {
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [imageModal, setImageModal] = useState<{
    isOpen: boolean;
    title: string;
    type: "exercise" | "meal";
  }>({ isOpen: false, title: "", type: "exercise" });
  const [showTTSModal, setShowTTSModal] = useState(false);

  // This will be populated from localStorage or route params
  // For now, we'll get it from the create page redirect

  const handleExerciseClick = (exerciseName: string) => {
    setImageModal({
      isOpen: true,
      title: exerciseName,
      type: "exercise",
    });
  };

  const handleMealClick = (mealName: string) => {
    setImageModal({
      isOpen: true,
      title: mealName,
      type: "meal",
    });
  };

  const handleCloseModal = () => {
    setImageModal({ isOpen: false, title: "", type: "exercise" });
  };

  // Load plan from localStorage on mount
  useEffect(() => {
    const savedPlan = getCurrentPlan();
    if (savedPlan) {
      setPlan(savedPlan);
    }
  }, []);

  if (!plan) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            No Plan Found
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Please create a plan first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
          Your Fitness Plan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generated for {plan.userProfile.name} • {plan.userProfile.fitnessGoal} • {plan.userProfile.fitnessLevel}
        </p>
      </motion.div>

      {/* Plan Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <WorkoutPlanView
            workoutPlan={plan.workoutPlan}
            onExerciseClick={handleExerciseClick}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DietPlanView
            dietPlan={plan.dietPlan}
            onMealClick={handleMealClick}
          />
        </motion.div>
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <TipsView tips={plan.tips} />
      </motion.div>

      {/* Plan Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <PlanStats plan={plan} />
      </motion.div>

      {/* TTS Controls Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <TTSControls plan={plan} />
      </motion.div>

      {/* Actions Bar */}
      <PlanActionsBar
        plan={plan}
        onRegenerate={() => {
          window.location.href = "/plans/create";
        }}
        onListen={() => {
          setShowTTSModal(true);
        }}
      />

      {/* TTS Modal */}
      {showTTSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800"
          >
            <button
              onClick={() => setShowTTSModal(false)}
              className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <TTSControls plan={plan} />
          </motion.div>
        </div>
      )}

      {/* Image Modal */}
      <ImagePreviewModal
        isOpen={imageModal.isOpen}
        onClose={handleCloseModal}
        title={imageModal.title}
        type={imageModal.type}
      />
    </div>
  );
}

