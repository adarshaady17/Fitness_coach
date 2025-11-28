import { GeneratedPlan } from "@/lib/types/plan";
import { savePlanToCloud, getPlansFromCloud, deletePlanFromCloud } from "./cloudStorage";

const STORAGE_KEY_CURRENT = "currentPlan";
const STORAGE_KEY_HISTORY = "planHistory";
const STORAGE_KEY_USER_ID = "fitness_user_id";
const MAX_HISTORY = 10; // Keep last 10 plans

export interface PlanHistoryItem {
  plan: GeneratedPlan;
  savedAt: string;
  id: string;
}

// Get or create a simple user ID (for demo purposes - in production, use proper auth)
function getUserId(): string {
  if (typeof window === "undefined") return "anonymous";
  
  let userId = localStorage.getItem(STORAGE_KEY_USER_ID);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(STORAGE_KEY_USER_ID, userId);
  }
  return userId;
}

export async function savePlan(plan: GeneratedPlan): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    // Save as current plan
    localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(plan));

    // Get history (use sync version for immediate localStorage access)
    const history = getPlanHistorySync();
    const newItem: PlanHistoryItem = {
      plan,
      savedAt: new Date().toISOString(),
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    // Add to beginning and limit to MAX_HISTORY
    const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));

    // Try to save to cloud (optional - fails gracefully)
    const userId = getUserId();
    await savePlanToCloud(plan, userId).catch(() => {
      // Silently fail - localStorage is the primary storage
    });
  } catch (error) {
    console.error("Failed to save plan:", error);
  }
}

export function getCurrentPlan(): GeneratedPlan | null {
  if (typeof window === "undefined") return null;

  try {
    const planJson = localStorage.getItem(STORAGE_KEY_CURRENT);
    if (!planJson) return null;
    return JSON.parse(planJson) as GeneratedPlan;
  } catch (error) {
    console.error("Failed to load current plan:", error);
    return null;
  }
}

export async function getPlanHistory(): Promise<PlanHistoryItem[]> {
  if (typeof window === "undefined") return [];

  try {
    // Try to get from cloud first (if available)
    const userId = getUserId();
    const cloudPlans = await getPlansFromCloud(userId).catch(() => []);

    // Merge with localStorage plans (cloud takes priority)
    const localHistoryJson = localStorage.getItem(STORAGE_KEY_HISTORY);
    const localPlans = localHistoryJson
      ? (JSON.parse(localHistoryJson) as PlanHistoryItem[])
      : [];

    // Combine and deduplicate (prefer cloud data)
    if (cloudPlans.length > 0) {
      return cloudPlans;
    }

    return localPlans;
  } catch (error) {
    console.error("Failed to load plan history:", error);
    // Fallback to localStorage only
    try {
      const historyJson = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (!historyJson) return [];
      return JSON.parse(historyJson) as PlanHistoryItem[];
    } catch {
      return [];
    }
  }
}

// Synchronous version for backwards compatibility
export function getPlanHistorySync(): PlanHistoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    const historyJson = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (!historyJson) return [];
    return JSON.parse(historyJson) as PlanHistoryItem[];
  } catch (error) {
    console.error("Failed to load plan history:", error);
    return [];
  }
}

export async function deletePlanFromHistory(id: string): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    // Try to delete from cloud first
    const userId = getUserId();
    await deletePlanFromCloud(id, userId).catch(() => {
      // Silently fail - continue with localStorage
    });

    // Delete from localStorage
    const history = getPlanHistorySync();
    const updatedHistory = history.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to delete plan from history:", error);
  }
}

export function clearAllPlans(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY_CURRENT);
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  } catch (error) {
    console.error("Failed to clear plans:", error);
  }
}

