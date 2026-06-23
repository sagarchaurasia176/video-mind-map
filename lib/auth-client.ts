import { createAuthClient } from "better-auth/react";

// Better Auth client for React components
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "https://video-mind-map.vercel.app",
})

export const { signIn, signOut, signUp, useSession } = authClient;
