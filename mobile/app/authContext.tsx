import { createContext, useContext, useState, ReactNode } from 'react';

const AuthContext = createContext<any>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const isLoggedIn = userId ? true : false;
  
  return (
    <AuthContext.Provider value={{ userId, setUserId, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);