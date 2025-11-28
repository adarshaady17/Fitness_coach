"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import UserDetailsForm from "./UserDetailsForm";
import GoalForm from "./GoalForm";
import DietForm from "./DietForm";
import ExtrasForm from "./ExtrasForm";

const steps = [
  { id: 1, title: "You", description: "Basic Information" },
  { id: 2, title: "Goals", description: "Fitness Objectives" },
  { id: 3, title: "Diet", description: "Dietary Preferences" },
  { id: 4, title: "Extra", description: "Additional Details" },
];

interface PlanWizardProps {
  onComplete: () => void;
}

export default function PlanWizard({ onComplete }: PlanWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors ${
                    currentStep >= step.id
                      ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500"
                      : "border-gray-300 bg-white text-gray-500 dark:border-gray-700 dark:bg-gray-800"
                  }`}
                >
                  {currentStep > step.id ? (
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.id
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 transition-colors ${
                    currentStep > step.id
                      ? "bg-blue-600 dark:bg-blue-500"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card className="min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {steps[currentStep - 1].title}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {steps[currentStep - 1].description}
              </p>
            </div>

            {currentStep === 1 && <UserDetailsForm onNext={nextStep} />}
            {currentStep === 2 && (
              <GoalForm onNext={nextStep} onBack={prevStep} />
            )}
            {currentStep === 3 && (
              <DietForm onNext={nextStep} onBack={prevStep} />
            )}
            {currentStep === 4 && (
              <ExtrasForm onSubmit={handleComplete} onBack={prevStep} />
            )}
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
}

