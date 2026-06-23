"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { validateSession } from "@/app/_actions/session-logics/validateSession";
import { initializeSession } from "@/app/_actions/session-logics/initializeSession";
import { clearDeviceToken } from "@/app/_actions/session-logics/clearDeviceToken";
import Image from "next/image";
import Loader from "@/app/loading";

interface SessionGuardProps {
  children: React.ReactNode;
}

/**
 * SessionGuard Component
 * Validates session on mount and periodically checks if session is still valid
 * If user logs in from another device/browser, this session will be invalidated
 */
export default function SessionGuard({ children }: SessionGuardProps) {
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkSession = async () => {
      try {
        // Check if device token exists in localStorage
        const deviceToken = localStorage.getItem('auth_session_token');
        
        if (!deviceToken) {
          // No device token, try to initialize (this is first time after login)
          const initialized = await initializeSession();
          if (initialized) {
            setIsValid(true);
            setIsValidating(false);
            return;
          }
        } else {
          // Validate existing device token
          const valid = await validateSession();
          
          if (!valid) {
            // Session was invalidated by another login
            console.log("Session invalidated by another login");
            clearDeviceToken();
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/?reason=session_invalidated");
                }
              }
            });
            return;
          }
          
          setIsValid(true);
        }
      } catch (error) {
        console.error("Session check error:", error);
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    // Initial check
    checkSession();

    // Check session every 30 seconds
    intervalId = setInterval(checkSession, 30000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [router]);

  // Show loading state while validating
  if (isValidating) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
        <Loader/>
        </div>
      </div>
    );
  }

  // Don't render children if session is invalid
  if (!isValid) {
    return null;
  }

  return <>{children}</>;
}
