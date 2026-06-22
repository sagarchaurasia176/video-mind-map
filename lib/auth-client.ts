import { createAuthClient } from "better-auth/react";

// Better Auth client for React components
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
})

export const { signIn, signOut, signUp, useSession } = authClient;
