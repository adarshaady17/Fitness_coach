export type Gender = "male" | "female" | "other";
export type FitnessGoal = "weight-loss" | "muscle-gain" | "endurance" | "general-fitness" | "flexibility" | "strength";
export type FitnessLevel = "beginner" | "intermediate" | "advanced";
export type WorkoutLocation = "home" | "gym" | "outdoor" | "mixed";
export type DietType = "veg" | "non-veg" | "vegan" | "keto" | "paleo" | "mediterranean" | "no-restriction";

export interface UserProfile {
  // Step 1: Basic Info
  name: string;
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg

  // Step 2: Goals
  fitnessGoal: FitnessGoal;
  fitnessLevel: FitnessLevel;
  workoutLocation: WorkoutLocation;

  // Step 3: Diet
  dietType: DietType;
  dietaryRestrictions?: string[];
  allergies?: string;
  mealPreference?: string; // e.g., "3 meals", "intermittent fasting"

  // Step 4: Extras
  medicalHistory?: string;
  injuries?: string;
  stressLevel?: "low" | "medium" | "high";
  sleepHours?: number;
  activityLevel?: "sedentary" | "lightly-active" | "moderately-active" | "very-active";
  notes?: string;
}

