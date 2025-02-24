import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (ID: string) => void;
  logout: () => void;
  loading: boolean;
  userID: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserID = localStorage.getItem('userID');  // Retrieve userID from localStorage

    if (storedToken && storedUserID) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUserID(storedUserID);  // Set the userID from localStorage
    } else {
      setIsAuthenticated(false);
    }
    
    setLoading(false);
  }, []);

  const login = (ID: string) => {
    setUserID(ID);
    setIsAuthenticated(true);
    localStorage.setItem('userID', ID);  // Store userID in localStorage
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');  // Remove userID from localStorage
    setIsAuthenticated(false);
    setToken(null);
    setUserID("");  // Clear the userID state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userID, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
