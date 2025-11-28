import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/ai/geminiClient";
import { buildPlanPrompt } from "@/lib/ai/planPrompt";
import { UserProfile } from "@/lib/types/user";
import { userSchema } from "@/lib/validators/userSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate user profile data
    const validatedData = userSchema.parse(body);
    const userProfile = validatedData as UserProfile;

    // Build the prompt
    const prompt = buildPlanPrompt(userProfile);

    // Generate plan using Gemini
    const responseText = await generateText(prompt);

    // Parse JSON response (remove markdown code blocks if present)
    let jsonText = responseText.trim();
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }

    const plan = JSON.parse(jsonText);

    // Add metadata
    const generatedPlan = {
      ...plan,
      generatedAt: new Date().toISOString(),
      userProfile: {
        name: userProfile.name,
        fitnessGoal: userProfile.fitnessGoal,
        fitnessLevel: userProfile.fitnessLevel,
      },
    };

    return NextResponse.json(generatedPlan, { status: 200 });
  } catch (error: any) {
    console.error("Error generating plan:", error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid user data provided", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to generate plan. Please check your API key and try again." },
      { status: 500 }
    );
  }
}

