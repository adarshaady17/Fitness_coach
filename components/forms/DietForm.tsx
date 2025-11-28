"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useUserData } from "@/lib/context/UserDataContext";

const step3Schema = z.object({
  dietType: z.enum(["veg", "non-veg", "vegan", "keto", "paleo", "mediterranean", "no-restriction"]),
  dietaryRestrictions: z.array(z.string()).optional(),
  allergies: z.string().max(500).optional(),
  mealPreference: z.string().max(200).optional(),
});

type Step3Data = z.infer<typeof step3Schema>;

interface DietFormProps {
  onNext: () => void;
  onBack: () => void;
}

export default function DietForm({ onNext, onBack }: DietFormProps) {
  const { userData, updateUserData } = useUserData();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      dietType: userData.dietType || undefined,
      allergies: userData.allergies || "",
      mealPreference: userData.mealPreference || "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: Step3Data) => {
    updateUserData(data);
    onNext();
  };

  const dietOptions = [
    { value: "veg", label: "Vegetarian" },
    { value: "non-veg", label: "Non-Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "keto", label: "Keto" },
    { value: "paleo", label: "Paleo" },
    { value: "mediterranean", label: "Mediterranean" },
    { value: "no-restriction", label: "No Restrictions" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-1">
        <Select
          label="Diet Type"
          options={dietOptions}
          {...register("dietType")}
          error={errors.dietType?.message}
          helperText="What type of diet do you follow?"
          required
        />
        <Textarea
          label="Allergies or Food Restrictions"
          placeholder="e.g., Nuts, Dairy, Gluten..."
          rows={3}
          {...register("allergies")}
          error={errors.allergies?.message}
          helperText="List any food allergies or restrictions"
        />
        <Input
          label="Meal Preference"
          type="text"
          placeholder="e.g., 3 meals a day, Intermittent fasting (16:8)"
          {...register("mealPreference")}
          error={errors.mealPreference?.message}
          helperText="Any specific meal timing preferences?"
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

