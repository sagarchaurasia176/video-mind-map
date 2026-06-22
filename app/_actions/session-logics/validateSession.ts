export const validateSession = async (): Promise<boolean> => {
  try {
    const deviceToken = typeof window !== 'undefined' 
      ? localStorage.getItem('auth_session_token')
      : null;

    if (!deviceToken) {
      return false;
    }

    const response = await fetch("/api/session/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deviceToken }),
      credentials: "include",
    });

    const data = await response.json();
    return data.valid === true;
  } catch (error) {
    console.error("Session validation error:", error);
    return false;
  }
};
