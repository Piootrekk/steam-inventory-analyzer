import { createContext, useContext } from "react";
import { AuthType } from "../types/authType";

export const AuthContext = createContext<AuthType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
