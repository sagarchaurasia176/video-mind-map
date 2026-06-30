"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGlobalContextApiState } from "@/app/context/GlobalStateManager";

export default function SignOutForm({
  children,
}: React.PropsWithChildren<unknown>) {
  const router = useRouter();
  const { setUser } = useGlobalContextApiState();

  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setUser(null);
            toast.success("Successfully signed out");
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            console.error("Sign out error:", ctx.error);
            toast.error("Failed to sign out");
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return <form onSubmit={handleSignOut}>{children}</form>;
}
