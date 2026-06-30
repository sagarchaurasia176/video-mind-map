import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../prisma";

const redirectUrl = "google";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: ["email", "profile"],
      redirectURI: `https://your-app.com/auth/callback/${redirectUrl}`,
      refreshAccessToken: async (token) => {
        return {
          accessToken: "new-access-token",
          refreshToken: "new-refresh-token",
        };
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  rateLimit: {
    window: 60,
    max: 100,
    customRules: {
      "/get-session": {
        window: 60,
        max: 50, // Allow more frequent session checks
      },
      "/sign-in": {
        window: 60,
        max: 5, // Keep sign-in attempts limited
      },
      "/sign-up": {
        window: 60,
        max: 5, // Keep sign-up attempts limited
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // for 7 days
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  cors: {
    origin: process.env.BETTER_AUTH_URL || "https://video-mind-map.vercel.app",
    credentials: true,
  },
  onError: (error: Error, request: Request) => {
    console.error("Auth error:", {
      error: error.message,
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    });
  },
});
