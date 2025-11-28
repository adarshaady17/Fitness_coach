import { GeneratedPlan } from "@/lib/types/plan";

export interface PlanStats {
  totalWorkoutDays: number;
  totalExercises: number;
  totalDietDays: number;
  totalMeals: number;
  averageCaloriesPerDay: number;
  totalTips: number;
}

export function calculatePlanStats(plan: GeneratedPlan): PlanStats {
  const totalWorkoutDays = plan.workoutPlan.length;
  const totalExercises = plan.workoutPlan.reduce(
    (sum, day) => sum + day.exercises.length,
    0
  );
  const totalDietDays = plan.dietPlan.length;
  const totalMeals = plan.dietPlan.reduce(
    (sum, day) => sum + day.meals.length,
    0
  );

  const totalCalories = plan.dietPlan.reduce((sum, day) => {
    return sum + (day.totalCalories || 0);
  }, 0);

  const averageCaloriesPerDay =
    totalDietDays > 0 ? Math.round(totalCalories / totalDietDays) : 0;

  const totalTips =
    plan.tips.lifestyleTips.length +
    plan.tips.postureTips.length +
    plan.tips.motivationLines.length;

  return {
    totalWorkoutDays,
    totalExercises,
    totalDietDays,
    totalMeals,
    averageCaloriesPerDay,
    totalTips,
  };
}

export function getPlanSummary(plan: GeneratedPlan): string {
  const stats = calculatePlanStats(plan);
  return `${stats.totalWorkoutDays} workout days, ${stats.totalExercises} exercises, ${stats.totalDietDays} diet days, ${stats.totalMeals} meals`;
}

