import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { validateDeviceToken } from "@/lib/sessionValidator";

/**
 * POST /api/session/validate
 * Validate if the device token matches the current session
 */
export async function POST(request: NextRequest) {
  try {
    const { deviceToken } = await request.json();

    if (!deviceToken) {
      return NextResponse.json(
        { error: "Device token required" },
        { status: 400 }
      );
    }

    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session) {
      return NextResponse.json(
        { valid: false, error: "No active session" },
        { status: 200 }
      );
    }

    // Validate device token
    const isValid = await validateDeviceToken(
      session.session.token,
      deviceToken
    );

    if (!isValid) {
      // Session was invalidated by another login
      return NextResponse.json(
        { 
          valid: false, 
          error: "Session invalidated by another login" 
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ 
      valid: true,
      user: session.user 
    });
  } catch (error) {
    console.error("Session validation error:", error);
    return NextResponse.json(
      { error: "Failed to validate session" },
      { status: 500 }
    );
  }
}
