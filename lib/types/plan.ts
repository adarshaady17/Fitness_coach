export interface Exercise {
  name: string;
  sets: number;
  reps: string; // e.g., "10-12" or "30 seconds"
  rest: string; // e.g., "60 seconds" or "2 minutes"
  notes?: string;
}

export interface WorkoutDay {
  day: number;
  dayName: string; // e.g., "Monday", "Day 1"
  focus: string; // e.g., "Upper Body", "Cardio"
  exercises: Exercise[];
  duration?: string; // e.g., "45 minutes"
}

export interface MealItem {
  name: string;
  quantity: string;
  calories?: number;
  macros?: {
    protein?: number;
    carbs?: number;
    fats?: number;
  };
}

export interface Meal {
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  time: string; // e.g., "8:00 AM"
  items: MealItem[];
  totalCalories?: number;
}

export interface DietDay {
  day: number;
  meals: Meal[];
  totalCalories?: number;
  macros?: {
    protein?: number;
    carbs?: number;
    fats?: number;
  };
}

export interface Tips {
  lifestyleTips: string[];
  postureTips: string[];
  motivationLines: string[];
}

export interface GeneratedPlan {
  workoutPlan: WorkoutDay[];
  dietPlan: DietDay[];
  tips: Tips;
  generatedAt: string;
  userProfile: {
    name: string;
    fitnessGoal: string;
    fitnessLevel: string;
  };
}

