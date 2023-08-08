import React, { createContext, useCallback, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/usersService";

interface AuthContextValue {
  signedIn: boolean;
  signIn(accessToken: string): void;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)


export function AuthProvider({children}: { children: React.ReactNode}) {

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return !!storedAccessToken
  })

  useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
  })

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, [])

  return(
    <AuthContext.Provider value={{ signedIn, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}
