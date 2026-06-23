import { supadataAction } from "@/app/_actions/supadata/supadataAction";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/app/utils/globalApiHandler";

// YouTube transcript handler
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { url } = body;

    // Validate URL
    if (!url || typeof url !== "string") {
      const errorResponse: ApiResponse = {
        success: false,
        message: "URL is required",
        error: "Please provide a valid URL",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Validate URL format (basic check)
    try {
      new URL(url);
    } catch {
      const errorResponse: ApiResponse = {
        success: false,
        message: "Invalid URL format",
        error: "Please provide a valid URL",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Get transcript from any supported platform (YouTube, TikTok, Instagram, X (Twitter)) or file
    const transcriptResult = await supadataAction().transcript({
      url: url,
      lang: "en", // optional
      text: true, // optional: return plain text instead of timestamped chunks
      mode: "auto", // optional: 'native', 'auto', or 'generate'
    });

    // Return success response
    const successResponse: ApiResponse = {
      success: true,
      message: "Transcript fetched successfully",
      data: transcriptResult,
    };

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    console.error("Transcript API Error:", error);

    const errorResponse: ApiResponse = {
      success: false,
      message: "Failed to fetch transcript",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
