/**
 * Initialize device token after successful login
 * Call this after user is redirected to dashboard
 */
export const initializeSession = async (): Promise<boolean> => {
  try {
    const response = await fetch("/api/session/device-token", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to initialize session");
      return false;
    }

    const { deviceToken } = await response.json();
    
    // Store device token in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_session_token', deviceToken);
    }

    return true;
  } catch (error) {
    console.error("Session initialization error:", error);
    return false;
  }
};
