import { prisma } from "./prisma";
import { 
  generateSessionToken, 
  setSessionToken, 
  getSessionToken, 
  clearSessionToken 
} from "./sessionToken";

/**
 * Server-side function to create and store device token for a session
 */
export async function createDeviceToken(sessionToken: string): Promise<string> {
  try {
    const deviceToken = generateSessionToken();
    
    // Update session with device token
    await prisma.session.update({
      where: { token: sessionToken },
      data: { deviceToken }
    });
    
    return deviceToken;
  } catch (error) {
    console.error("Error creating device token:", error);
    throw error;
  }
}

/**
 * Server-side function to validate device token matches session
 */
export async function validateDeviceToken(
  sessionToken: string, 
  deviceToken: string
): Promise<boolean> {
  try {
    const session = await prisma.session.findUnique({
      where: { token: sessionToken }
    });
    
    if (!session) {
      return false;
    }
    
    // Check if device token matches
    return session.deviceToken === deviceToken;
  } catch (error) {
    console.error("Error validating device token:", error);
    return false;
  }
}

/**
 * Server-side function to invalidate all other sessions for a user
 */
export async function invalidateOtherSessions(
  userId: string, 
  currentDeviceToken: string
): Promise<void> {
  try {
    // Delete all sessions that don't have the current device token
    await prisma.session.deleteMany({
      where: {
        userId,
        deviceToken: { not: currentDeviceToken }
      }
    });
  } catch (error) {
    console.error("Error invalidating other sessions:", error);
    throw error;
  }
}

/**
 * Client-side function to initialize device token after login
 */
export function initializeDeviceToken(deviceToken: string): void {
  setSessionToken(deviceToken);
}

/**
 * Client-side function to cleanup on logout
 */
export function cleanupDeviceToken(): void {
  clearSessionToken();
}

/**
 * Client-side function to get current device token
 */
export function getCurrentDeviceToken(): string | null {
  return getSessionToken();
}
