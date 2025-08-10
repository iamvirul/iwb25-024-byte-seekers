import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
  email: string;
  role: "land_owner" | "land_officer" | "legal_officer";
  nic: string;
  slUdiId: string;
}

interface JwtPayload {
  exp: number;
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    user_type: number
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (e) {
    return true;
  }
}

let logoutTimer: ReturnType<typeof setTimeout>;


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    clearTimeout(logoutTimer);
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      logout();
      setLoading(false);
      return;
    }

    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const nic = localStorage.getItem("nic");
    const slUdiId = localStorage.getItem("slUdiId");

    if (userId && name && email && role && nic && slUdiId) {
      const userObj: User = {
        id: userId,
        name,
        email,
        role: role as User["role"],
        nic,
        slUdiId,
      };
      setUser(userObj);
    }

    // Set up auto logout timer
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const expiresIn = decoded.exp * 1000 - Date.now();
      logoutTimer = setTimeout(() => logout(), expiresIn);
    } catch (err) {
      logout();
    }

    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    user_type: number
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, user_type }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      if (!data.success) return false;

      const {
        token,
        userSessionId,
        userId,
        nic,
        sludi,
        email: userEmail,
        userType,
        name,
        legalOfficerId,
      } = data.content;

      const role = userType.toLowerCase() as User["role"];

      localStorage.setItem("token", token);
      localStorage.setItem("userSessionId", userSessionId);
      localStorage.setItem("userId", userId.toString());
      localStorage.setItem("name", name);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("role", role);
      localStorage.setItem("nic", nic);
      localStorage.setItem("slUdiId", sludi);
      if (legalOfficerId !== 0) {
        localStorage.setItem("legalOfficerId", legalOfficerId.toString());
      }

      const userObj: User = {
        id: userId.toString(),
        name,
        email: userEmail,
        role,
        nic,
        slUdiId: sludi,
      };

      setUser(userObj);

      // Setup auto logout timer
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const expiresIn = decoded.exp * 1000 - Date.now();
        logoutTimer = setTimeout(() => logout(), expiresIn);
      } catch (err) {
        console.error("Invalid token received:", err);
      }

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
