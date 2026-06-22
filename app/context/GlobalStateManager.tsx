"use client"
import { createContext, ReactNode, useContext, useState } from "react";

//to create context api
interface GlobalState {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
//consumer
const userContext = createContext<GlobalState | undefined>(undefined);
type userContextProviderProps = {
  children: ReactNode;
};

//export the context-api
//this fnc() you can used in the layout.tsx file
export const ContextProvider = ({ children }: userContextProviderProps) => {
  //defiend all the state
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const values: GlobalState = {
    user,
    setUser,
    loading,
    setLoading,
  };
  //consumer
  return <userContext.Provider value={values}>{children}</userContext.Provider>;
};

//export global contextapi | this you can used in the whole project file
export const useGlobalContextApiState = () => {
  const useGlobalComp = useContext(userContext);
  if (!useGlobalComp) {
    throw new Error(
      "useGlobalContextApiState must be used within a userContextProvider",
    );
  }
  return useGlobalComp;
};
