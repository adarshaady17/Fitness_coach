// Optional Supabase client - only works if NEXT_PUBLIC_SUPABASE_URL is set
// This file works without @supabase/supabase-js installed (graceful fallback)

let supabaseClient: any = null;

export async function getSupabaseClient() {
  if (typeof window === "undefined") return null;

  // Only initialize if environment variables are set
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }

  // Lazy load Supabase to avoid errors if not installed
  if (!supabaseClient) {
    try {
      // Dynamic import with type assertion to avoid TypeScript errors
      // This will work if @supabase/supabase-js is installed, otherwise returns null
      const supabaseModule = await import("@supabase/supabase-js" as string).catch(() => null);
      if (!supabaseModule || !supabaseModule.createClient) {
        console.warn("Supabase package not installed. Using localStorage fallback.");
        return null;
      }
      const { createClient } = supabaseModule;
      supabaseClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
    } catch (error) {
      console.warn("Supabase not available. Using localStorage fallback.");
      return null;
    }
  }

  return supabaseClient;
}

export function isSupabaseAvailable(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

