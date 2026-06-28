/**
 * Frontend utility to fetch transcript from the API
 */

export interface TranscriptResponse {
  success: boolean;
  message: string;
  data?: {
    text?: string;
    chunks?: Array<{ timestamp: number; text: string }>;
  };
  error?: string;
}

export async function fetchTranscript(url: string): Promise<TranscriptResponse> {
  try {
    const response = await fetch("/api/transcript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data: TranscriptResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || "Failed to fetch transcript");
    }

    return data;
  } catch (error) {
    console.error("Fetch transcript error:", error);
    return {
      success: false,
      message: "Failed to fetch transcript",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

