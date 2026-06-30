"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ContextProvider,
  useGlobalContextApiState,
} from "../context/GlobalStateManager";
import { authClient } from "@/lib/auth/auth-client";
import { User } from "../../lib/userType";

interface UserProviderWrapperProps {
  children: React.ReactNode;
  initialUser: User | null;
}

export default function UserProviderWrapper({
  children,
  initialUser,
}: UserProviderWrapperProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  //function to refresh the user state from the server
  const refreshUser = useCallback(async () => {
    try {
      const session = await authClient.getSession();
      if (session?.data?.user) {
        const userData = {
          id: session.data.user.id,
          email: session.data.user.email,
          name: session.data.user.name || "",
          emailVerified: session.data.user.emailVerified,
          image: session.data.user.image || null,
          createdAt: session.data.user.createdAt,
          updatedAt: session.data.user.updatedAt,
        };
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      //only set a null if we get the clear "no session" response
      if (
        error &&
        typeof error === "object" &&
        "response" in (error as Record<string, unknown>)
      ) {
        const response = (error as { response?: { status?: number } }).response;
        if (response?.status === 401 || response?.status === 403) {
          setUser(null);
        }
      }
    }
  }, []);
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);
  return (
    <ContextProvider User={user} refreshUser={refreshUser}>
      {children}
    </ContextProvider>
  );
}
