"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { UserProfile } from "@/lib/types/user";

interface UserDataContextType {
  userData: Partial<UserProfile>;
  updateUserData: (data: Partial<UserProfile>) => void;
  resetUserData: () => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<Partial<UserProfile>>({});

  const updateUserData = (data: Partial<UserProfile>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const resetUserData = () => {
    setUserData({});
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData, resetUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}

