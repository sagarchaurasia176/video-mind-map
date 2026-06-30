import { createAuthClient } from "better-auth/react";
const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.BETTER_AUTH_URL || "https://video-mind-map.vercel.app";
  }
  return "http://localhost:3000";
};

// auth-client
export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After");
        console.warn(`Rate limited. Retry after ${retryAfter} seconds`);

        const url = new URL(context.request.url);
        if (!url.pathname.includes("get-session")) {
          const message = `Too many requests. Please wait ${retryAfter} seconds before trying again.`;
          console.error(message);
        }
      }
      if (response.status === 401) {
        console.warn("Authentication failed - session may have expired");
      }
      if (response.status === 0 || response.type === "opaque") {
        console.error(
          "CORS error detected. Check your domain configuration and ensure the auth server is running.",
        );
      }
    },
  },
});
