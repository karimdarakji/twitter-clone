import React, { createContext, useState } from "react";

interface IAuthContext {
  accessToken: string,
  setAccessToken: (accessToken: string) => void
}

const AuthContext = createContext<IAuthContext>({
  accessToken: "",
  setAccessToken: (accessToken: string) => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState("");

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
