import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  userEmail: string | null;
  userRole: string | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Checa token salvo e usuário ao iniciar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Opcional: decodificar token para pegar email/role
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserEmail(payload.email || null);
      setUserRole(payload.role || null);
      setIsAuthenticated(true);
    } else {
      setUserEmail(null);
      setUserRole(null);
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao logar');
      localStorage.setItem('token', data.token);
      setUserEmail(data.user.email);
      setUserRole(data.user.role);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setUserEmail(null);
      setUserRole(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem('token');
      setUserEmail(null);
      setUserRole(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      userEmail,
      userRole,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}