import { NextRequest, NextResponse } from "next/server";

// Image generation using Gemini (\"Nano Banana\" setup)
// Uses the Google Generative Language REST API for image generation.
// Docs: https://ai.google.dev

export async function POST(request: NextRequest) {
  try {
    const { type, prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY is not set. Add it to your .env.local to enable image generation.",
        },
        { status: 500 }
      );
    }

    // Build a rich prompt for Gemini image generation
    const fullPrompt =
      type === "exercise"
        ? `High-quality, realistic fitness photograph of: ${prompt}. Gym environment, clear view of correct form, professional lighting.`
        : `High-quality, appetizing food photograph of: ${prompt}. Clean plate, professional lighting, healthy aesthetics.`;

    // Try Gemini Imagen API (imagegeneration@001)
    // Note: This endpoint may require specific API access or billing setup
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/imagegeneration@001:generateImages?key=" +
      apiKey;

    try {
      const geminiResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: {
            text: fullPrompt,
          },
          imageGenerationConfig: {
            numberOfImages: 1,
            aspectRatio: "SQUARE",
          },
        }),
      });

      if (!geminiResponse.ok) {
        const errorData = await geminiResponse.json().catch(() => null);
        console.error("Gemini image API error:", errorData || geminiResponse.statusText);
        
        // If the model doesn't exist, provide helpful error message
        if (geminiResponse.status === 404) {
          return NextResponse.json(
            {
              error: "Image generation model not available. Gemini image generation may require additional API access. Please check your Google Cloud project settings or use an alternative image service.",
            },
            { status: 500 }
          );
        }
        
        return NextResponse.json(
          {
            error: errorData?.error?.message || "Failed to generate image with Gemini. Check API key and quota.",
          },
          { status: 500 }
        );
      }

      const data: any = await geminiResponse.json();

      // The exact response shape can vary; typically you'll get base64 image data.
      const base64Image =
        data?.images?.[0]?.content || 
        data?.generatedImages?.[0]?.image || 
        data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data ||
        null;

      if (!base64Image) {
        console.error("Gemini image response structure:", JSON.stringify(data, null, 2));
        return NextResponse.json(
          {
            error: "Gemini did not return image data in expected format.",
          },
          { status: 500 }
        );
      }

      // Return base64 so the client can render it as a data URL
      const imageUrl = `data:image/png;base64,${base64Image}`;

      return NextResponse.json({ imageUrl }, { status: 200 });
    } catch (fetchError: any) {
      console.error("Image generation fetch error:", fetchError);
      return NextResponse.json(
        {
          error: `Image generation failed: ${fetchError.message}. Please ensure image generation is enabled in your Google Cloud project.`,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate image" },
      { status: 500 }
    );
  }
}
