"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { User } from "@/lib/userType";
import { authClient } from "@/lib/auth/auth-client";
interface GlobalState {
  User: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refreshUser: () => Promise<void>;
}
const userContext = createContext<GlobalState | undefined>(undefined);
interface userContextProviderProps {
  User: User | null;
  children: ReactNode;
  refreshUser: () => Promise<void>;
}

export const ContextProvider = ({
  User: initialUser,
  children,
}: Partial<userContextProviderProps>) => {
  const [User, setUser] = useState<User | null>(initialUser || null);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshUser = async () => {
    try {
      setLoading(true);
      const session = await authClient.getSession();

      if (session?.data?.user) {
        const user = session.data.user as User;
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error refreshing user session:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Refresh user session on mount and when auth state changes
  useEffect(() => {
    if (!initialUser) {
      refreshUser();
    }
  }, []);

  const values: GlobalState = {
    User,
    setUser,
    loading,
    setLoading,
    refreshUser,
  };

  return <userContext.Provider value={values}>{children}</userContext.Provider>;
};

export const useGlobalContextApiState = () => {
  const useGlobalComp = useContext(userContext);
  if (!useGlobalComp) {
    throw new Error(
      "useGlobalContextApiState must be used within a ContextProvider",
    );
  }
  return useGlobalComp;
};
