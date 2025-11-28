import { z } from "zod";

export const userSchema = z.object({
  // Step 1: Basic Info
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  age: z.number().min(13, "Age must be at least 13").max(100, "Age must be less than 100"),
  gender: z.enum(["male", "female", "other"]),
  height: z.number().min(100, "Height must be at least 100cm").max(250, "Height must be less than 250cm"),
  weight: z.number().min(30, "Weight must be at least 30kg").max(300, "Weight must be less than 300kg"),

  // Step 2: Goals
  fitnessGoal: z.enum(["weight-loss", "muscle-gain", "endurance", "general-fitness", "flexibility", "strength"]),
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]),
  workoutLocation: z.enum(["home", "gym", "outdoor", "mixed"]),

  // Step 3: Diet
  dietType: z.enum(["veg", "non-veg", "vegan", "keto", "paleo", "mediterranean", "no-restriction"]),
  dietaryRestrictions: z.array(z.string()).optional(),
  allergies: z.string().max(500, "Allergies description too long").optional(),
  mealPreference: z.string().max(200, "Meal preference too long").optional(),

  // Step 4: Extras
  medicalHistory: z.string().max(1000, "Medical history too long").optional(),
  injuries: z.string().max(500, "Injuries description too long").optional(),
  stressLevel: z.enum(["low", "medium", "high"]).optional(),
  sleepHours: z.number().min(4).max(12).optional(),
  activityLevel: z.enum(["sedentary", "lightly-active", "moderately-active", "very-active"]).optional(),
  notes: z.string().max(1000, "Notes too long").optional(),
});

export type UserFormData = z.infer<typeof userSchema>;

