import { GeneratedPlan } from "@/lib/types/plan";
import { PlanHistoryItem } from "./planStorage";
import { getSupabaseClient, isSupabaseAvailable } from "./supabaseClient";

// Cloud storage functions with localStorage fallback

export async function savePlanToCloud(
  plan: GeneratedPlan,
  userId?: string
): Promise<boolean> {
  if (!isSupabaseAvailable() || !userId) {
    return false; // Fall back to localStorage
  }

  try {
    const supabase = await getSupabaseClient();
    if (!supabase) return false;

    const { error } = await supabase.from("fitness_plans").insert({
      user_id: userId,
      plan_data: plan,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Failed to save plan to cloud:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Cloud save error:", error);
    return false;
  }
}

export async function getPlansFromCloud(
  userId: string
): Promise<PlanHistoryItem[]> {
  if (!isSupabaseAvailable() || !userId) {
    return []; // Fall back to localStorage
  }

  try {
    const supabase = await getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("fitness_plans")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Failed to fetch plans from cloud:", error);
      return [];
    }

    return (
      data?.map((item: any) => ({
        plan: item.plan_data,
        savedAt: item.created_at,
        id: item.id.toString(),
      })) || []
    );
  } catch (error) {
    console.error("Cloud fetch error:", error);
    return [];
  }
}

export async function deletePlanFromCloud(
  planId: string,
  userId: string
): Promise<boolean> {
  if (!isSupabaseAvailable() || !userId) {
    return false;
  }

  try {
    const supabase = await getSupabaseClient();
    if (!supabase) return false;

    const { error } = await supabase
      .from("fitness_plans")
      .delete()
      .eq("id", planId)
      .eq("user_id", userId);

    if (error) {
      console.error("Failed to delete plan from cloud:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Cloud delete error:", error);
    return false;
  }
}

