import { NextRequest, NextResponse } from "next/server";
import { getVoices } from "@/lib/tts/elevenLabsClient";

export async function GET(request: NextRequest) {
  try {
    const voices = await getVoices();

    return NextResponse.json({ voices }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching voices:", error);
    return NextResponse.json(
      { error: "Failed to fetch voices", voices: [] },
      { status: 500 }
    );
  }
}

