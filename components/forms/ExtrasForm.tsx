"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useUserData } from "@/lib/context/UserDataContext";

const step4Schema = z.object({
  medicalHistory: z.string().max(1000).optional(),
  injuries: z.string().max(500).optional(),
  stressLevel: z.enum(["low", "medium", "high"]).optional(),
  sleepHours: z.number().min(4).max(12).optional(),
  activityLevel: z.enum(["sedentary", "lightly-active", "moderately-active", "very-active"]).optional(),
  notes: z.string().max(1000).optional(),
});

type Step4Data = z.infer<typeof step4Schema>;

interface ExtrasFormProps {
  onSubmit: () => void;
  onBack: () => void;
}

export default function ExtrasForm({ onSubmit, onBack }: ExtrasFormProps) {
  const { userData, updateUserData } = useUserData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      medicalHistory: userData.medicalHistory || "",
      injuries: userData.injuries || "",
      stressLevel: userData.stressLevel || undefined,
      sleepHours: userData.sleepHours || undefined,
      activityLevel: userData.activityLevel || undefined,
      notes: userData.notes || "",
    },
  });

  const onFormSubmit = (data: Step4Data) => {
    updateUserData(data);
    onSubmit();
  };

  const stressOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const activityOptions = [
    { value: "sedentary", label: "Sedentary (little to no exercise)" },
    { value: "lightly-active", label: "Lightly Active (light exercise 1-3 days/week)" },
    { value: "moderately-active", label: "Moderately Active (moderate exercise 3-5 days/week)" },
    { value: "very-active", label: "Very Active (hard exercise 6-7 days/week)" },
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-1">
        <Textarea
          label="Medical History"
          placeholder="Any relevant medical conditions, medications, or health concerns..."
          rows={4}
          {...register("medicalHistory")}
          error={errors.medicalHistory?.message}
          helperText="This helps us create a safer plan for you"
        />
        <Textarea
          label="Current Injuries or Limitations"
          placeholder="e.g., Lower back pain, knee injury..."
          rows={3}
          {...register("injuries")}
          error={errors.injuries?.message}
          helperText="List any injuries or physical limitations"
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Select
            label="Stress Level"
            options={stressOptions}
            {...register("stressLevel")}
            error={errors.stressLevel?.message}
            helperText="How would you rate your current stress level?"
          />
          <Input
            label="Average Sleep Hours"
            type="number"
            placeholder="7"
            {...register("sleepHours", { valueAsNumber: true })}
            error={errors.sleepHours?.message}
            helperText="Hours of sleep per night"
          />
        </div>
        <Select
          label="Activity Level"
          options={activityOptions}
          {...register("activityLevel")}
          error={errors.activityLevel?.message}
          helperText="How active are you currently?"
        />
        <Textarea
          label="Additional Notes"
          placeholder="Anything else you'd like us to know..."
          rows={3}
          {...register("notes")}
          error={errors.notes?.message}
          helperText="Optional: Any other information that might help"
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
          className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Generate Plan 🚀
        </button>
      </div>
    </form>
  );
}

