import React, { createContext } from "react";

interface AuthContextValue {
  signedIn: boolean;
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)


export function AuthProvider({children}: { children: React.ReactNode}) {
  return(
    <AuthContext.Provider value={{ signedIn: true }}>
      {children}
    </AuthContext.Provider>
  )
}
