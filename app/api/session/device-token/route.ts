import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createDeviceToken, invalidateOtherSessions } from "@/lib/sessionValidator";

/**
 * POST /api/session/device-token
 * Create a device token for the current session
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Create device token for this session
    const deviceToken = await createDeviceToken(session.session.token);
    
    // Invalidate all other sessions for this user
    await invalidateOtherSessions(session.user.id, deviceToken);

    return NextResponse.json({ 
      success: true, 
      deviceToken 
    });
  } catch (error) {
    console.error("Device token creation error:", error);
    return NextResponse.json(
      { error: "Failed to create device token" },
      { status: 500 }
    );
  }
}
