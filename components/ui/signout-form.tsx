'use client';
import { clearDeviceToken } from "@/app/_actions/session-logics/clearDeviceToken";
import { authClient } from "@/lib/auth-client";


// Sign-out form using Better Auth
export default function SignOutForm({
  children,
}: React.PropsWithChildren<unknown>) {
  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear device token from localStorage
    clearDeviceToken();
    
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <form onSubmit={handleSignOut}>
      {children}
    </form>
  );
}
