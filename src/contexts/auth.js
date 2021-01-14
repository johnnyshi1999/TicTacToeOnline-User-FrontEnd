import Axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";
import socket from "../services/socket";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const existingTokens = localStorage.getItem("token");
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const [isActive, setActive] = useState(false);

  const setTokens = (data) => {
    if (data) {
      localStorage.setItem("token", data);
    } else {
      localStorage.removeItem("token");
    }

    setAuthTokens(data);
  };

  // const setLocalActive = (data) => {
  //   if (data) {
  //     localStorage.setItem("active", data);

  //   }
  //   else {
  //     localStorage.removeItem("active");
  //   }

  //   setActive(data);
  // }

  Axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.authorization = `Bearer ${token}`;
    return config;
  });

  Axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        //if unauthorized, will direct back to login
        if (error.response.status === 401) {
          console.log("axios intercept");
          setAuthTokens(null);
        }
      }
      throw error;
    }
  );

  const emitLogin = async () => {
    const result = await Axios.get(API.url + "/api/auth/");

    const userId = result.data.user._id;

    socket.emit("login", userId);
  };

  useEffect(() => {
    if (authTokens) {
      emitLogin();
    }
  }, [authTokens]);

  const value = {
    authTokens: authTokens,
    setAuthTokens: setTokens,
    isActive: isActive,
    setActive: setActive,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
