import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import authDataService from "../services/http/auth.service";
import { LoginUserDto, RegisterUserDto } from "./interfaces/auth.type";
import { useNavigate } from "react-router-dom";

type AuthContext = {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean | null;
  isAdmin: boolean | null;
  login: (user: LoginUserDto) => void;
  logout: () => void;
  checkAuthentication: () => void;
  checkIsAdmin: () => void;
  register: (user: RegisterUserDto) => void;
  getToken: () => string | null;
};

type User = {
  email: string;
  password: string;
};

const AuthContext = createContext({} as AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthentication = async () => {
    let response;
    if (!getToken()) return logout();
    try {
      response = await authDataService.currentUser();
      setUserData(response.user);
    } catch (error) {
      logout();
      navigate("/login");
      console.error("error", response.error);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setUserData = (userData: any) => {
    setAccessToken(userData.access_token);
    setToken(userData.access_token);
    setUser(userData);
    setIsAuthenticated(true);
    setIsAdmin(userData.isAdmin === "true");
  };

  const login = async (user: LoginUserDto) => {
    let response;
    try {
      response = await authDataService.login({ ...user });
      setUserData(response.user);
      navigate("/store");
    } catch (error) {
      console.error("error", response.error);
      logout();
    }
  };

  const checkIsAdmin = () => {
    if (isAdmin !== true) navigate("/store");
  };

  const register = async (user: RegisterUserDto) => {
    try {
      const response = await authDataService.register(user);
      setUserData(response.user);
      navigate("/store");
    } catch (error) {
      logout();
    }
  };

  const logout = () => {
    setUserData({
      access_token: null,
      user: null,
      isAdmin: null,
    });
    setIsAuthenticated(false);
    removeToken();
    navigate("/login");
  };

  const setToken = (accessToken: string): void => {
    localStorage.setItem("token", accessToken);
  };

  const removeToken = (): void => {
    localStorage.clear;
    localStorage.removeItem("token");
  };

  const getToken = (): string | null => {
    return localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        checkIsAdmin,
        checkAuthentication,
        accessToken,
        user,
        isAdmin,
        isAuthenticated,
        login,
        logout,
        register,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuthContext };
