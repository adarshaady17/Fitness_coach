import axios from "axios";

if (!process.env.ELEVENLABS_API_KEY) {
  console.warn("ELEVENLABS_API_KEY is not set. Voice features will be disabled.");
}

const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1";

const MAX_TTS_CHARACTERS = 4000; // keep requests within safe limits

export async function textToSpeech(
  inputText: string,
  voiceId: string = "21m00Tcm4TlvDq8ikWAM" // Default: Rachel voice
): Promise<Buffer> {
  if (!process.env.ELEVENLABS_API_KEY) {
    throw new Error("ELEVENLABS_API_KEY is not set in environment variables");
  }

  // Trim text if it's too long for a single request
  const text =
    inputText.length > MAX_TTS_CHARACTERS
      ? inputText.slice(0, MAX_TTS_CHARACTERS)
      : inputText;

  try {
    const response = await axios.post(
      `${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`,
      {
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      {
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    return Buffer.from(response.data);
  } catch (error: any) {
    let detailMessage: string | undefined;

    // ElevenLabs often returns JSON in a Buffer; try to decode it for a clearer error
    if (error.response?.data) {
      try {
        const raw =
          error.response.data instanceof Buffer
            ? error.response.data.toString("utf8")
            : String(error.response.data);
        const parsed = JSON.parse(raw);
        detailMessage =
          parsed?.detail?.message ||
          parsed?.detail?.status ||
          parsed?.detail ||
          parsed?.message;
        console.error("ElevenLabs TTS error:", parsed);
      } catch {
        console.error("ElevenLabs TTS raw error:", error.response.data);
      }
    } else {
      console.error("ElevenLabs TTS error:", error.message);
    }

    throw new Error(
      detailMessage ||
        "Failed to generate speech. Check your ELEVENLABS_API_KEY and character limits."
    );
  }
}

export async function getVoices() {
  if (!process.env.ELEVENLABS_API_KEY) {
    return [];
  }

  try {
    const response = await axios.get(`${ELEVENLABS_API_URL}/voices`, {
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
      },
    });

    return response.data.voices || [];
  } catch (error: any) {
    console.error("Error fetching voices:", error);
    return [];
  }
}

