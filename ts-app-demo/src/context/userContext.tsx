import React, { useContext, useState } from "react";
import { User } from "../types/types";

export const UserContext = React.createContext<UserContextType | null>(null);

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type UserProviderProps = {
  children: React.ReactNode;
};

export function UserProvider(props: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUser must be used within a UserProvider. Wrap a parent component in <UserProvider> to fix this error."
    );
  }
  return context;
}
