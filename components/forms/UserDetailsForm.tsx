"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useUserData } from "@/lib/context/UserDataContext";

const step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(13, "Age must be at least 13").max(100, "Age must be less than 100"),
  gender: z.enum(["male", "female", "other"]),
  height: z.number().min(100, "Height must be at least 100cm").max(250, "Height must be less than 250cm"),
  weight: z.number().min(30, "Weight must be at least 30kg").max(300, "Weight must be less than 300kg"),
});

type Step1Data = z.infer<typeof step1Schema>;

interface UserDetailsFormProps {
  onNext: () => void;
}

export default function UserDetailsForm({ onNext }: UserDetailsFormProps) {
  const { userData, updateUserData } = useUserData();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: userData.name || "",
      age: userData.age || undefined,
      gender: userData.gender || undefined,
      height: userData.height || undefined,
      weight: userData.weight || undefined,
    },
    mode: "onChange",
  });

  const onSubmit = (data: Step1Data) => {
    updateUserData(data);
    onNext();
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          {...register("name")}
          error={errors.name?.message}
          required
        />
        <Input
          label="Age"
          type="number"
          placeholder="25"
          {...register("age", { valueAsNumber: true })}
          error={errors.age?.message}
          required
        />
        <Select
          label="Gender"
          options={genderOptions}
          {...register("gender")}
          error={errors.gender?.message}
          required
        />
        <Input
          label="Height (cm)"
          type="number"
          placeholder="175"
          {...register("height", { valueAsNumber: true })}
          error={errors.height?.message}
          helperText="Enter your height in centimeters"
          required
        />
        <Input
          label="Weight (kg)"
          type="number"
          placeholder="70"
          {...register("weight", { valueAsNumber: true })}
          error={errors.weight?.message}
          helperText="Enter your weight in kilograms"
          required
        />
      </div>
      <div className="flex justify-end">
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

