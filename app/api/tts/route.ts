import { NextRequest, NextResponse } from "next/server";
import { textToSpeech } from "@/lib/tts/elevenLabsClient";

export async function POST(request: NextRequest) {
  try {
    const { text, voiceId, section } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    // Generate speech using ElevenLabs
    const audioBuffer = await textToSpeech(text, voiceId);

    // Return audio as response
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="${section || "plan"}.mp3"`,
      },
    });
  } catch (error: any) {
    console.error("TTS API error:", error);
    return NextResponse.json(
      {
        error:
          error.message ||
          "Failed to generate speech. Please check your ELEVENLABS_API_KEY.",
      },
      { status: 500 }
    );
  }
}

