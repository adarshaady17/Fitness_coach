"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select } from "@/components/ui/Select";
import { useUserData } from "@/lib/context/UserDataContext";

const step2Schema = z.object({
  fitnessGoal: z.enum(["weight-loss", "muscle-gain", "endurance", "general-fitness", "flexibility", "strength"]),
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]),
  workoutLocation: z.enum(["home", "gym", "outdoor", "mixed"]),
});

type Step2Data = z.infer<typeof step2Schema>;

interface GoalFormProps {
  onNext: () => void;
  onBack: () => void;
}

export default function GoalForm({ onNext, onBack }: GoalFormProps) {
  const { userData, updateUserData } = useUserData();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      fitnessGoal: userData.fitnessGoal || undefined,
      fitnessLevel: userData.fitnessLevel || undefined,
      workoutLocation: userData.workoutLocation || undefined,
    },
    mode: "onChange",
  });

  const onSubmit = (data: Step2Data) => {
    updateUserData(data);
    onNext();
  };

  const goalOptions = [
    { value: "weight-loss", label: "Weight Loss" },
    { value: "muscle-gain", label: "Muscle Gain" },
    { value: "endurance", label: "Endurance" },
    { value: "general-fitness", label: "General Fitness" },
    { value: "flexibility", label: "Flexibility" },
    { value: "strength", label: "Strength" },
  ];

  const levelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const locationOptions = [
    { value: "home", label: "Home" },
    { value: "gym", label: "Gym" },
    { value: "outdoor", label: "Outdoor" },
    { value: "mixed", label: "Mixed" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-1">
        <Select
          label="Fitness Goal"
          options={goalOptions}
          {...register("fitnessGoal")}
          error={errors.fitnessGoal?.message}
          helperText="What do you want to achieve?"
          required
        />
        <Select
          label="Current Fitness Level"
          options={levelOptions}
          {...register("fitnessLevel")}
          error={errors.fitnessLevel?.message}
          helperText="Be honest about your current level"
          required
        />
        <Select
          label="Workout Location"
          options={locationOptions}
          {...register("workoutLocation")}
          error={errors.workoutLocation?.message}
          helperText="Where do you prefer to exercise?"
          required
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step →
        </button>
      </div>
    </form>
  );
}

