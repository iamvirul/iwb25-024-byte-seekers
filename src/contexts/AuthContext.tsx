import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "land_owner" | "land_officer" | "legal_officer";
  nic: string;
  slUdiId: string;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const nic = localStorage.getItem("nic");
    const slUdiId = localStorage.getItem("slUdiId");

    if (token && userId && name && email && role && nic && slUdiId) {
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
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
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
