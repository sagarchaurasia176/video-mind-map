/**
 * Session Token Manager
 * Manages unique session tokens in localStorage to prevent multiple simultaneous logins
 */

const SESSION_TOKEN_KEY = 'auth_session_token';

/**
 * Generate a unique session token
 */
export function generateSessionToken(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Store session token in localStorage
 */
export function setSessionToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_TOKEN_KEY, token);
  }
}

/**
 * Get current session token from localStorage
 */
export function getSessionToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(SESSION_TOKEN_KEY);
  }
  return null;
}

/**
 * Remove session token from localStorage
 */
export function clearSessionToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_TOKEN_KEY);
  }
}

/**
 * Check if session token exists
 */
export function hasSessionToken(): boolean {
  return getSessionToken() !== null;
}
