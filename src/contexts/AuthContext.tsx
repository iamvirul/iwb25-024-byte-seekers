import React, { createContext, useContext, useState, ReactNode } from "react";

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

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
        socketToken,
        userId,
        nic,
        sludi,
        email: userEmail,
        userType,
        name,
        legalOfficerId
      } = data.content;

      localStorage.setItem("token", token);
      localStorage.setItem("socketToken", socketToken);
      localStorage.setItem("userId", userId.toString());
      localStorage.setItem("role",userType);
      if (legalOfficerId != 0) {
        localStorage.setItem("legalOfficerId", legalOfficerId.toString());
      }


      const role = userType.toLowerCase() as User["role"];

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
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
