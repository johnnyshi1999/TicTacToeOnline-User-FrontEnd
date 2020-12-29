import Axios from 'axios';
import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const existingTokens = localStorage.getItem("token");
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    if (data) {
      localStorage.setItem("token", data);
    }
    else {
      localStorage.removeItem("token");
    }

    setAuthTokens(data);
  }

  Axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
  )

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
  )

  const value = { authTokens: authTokens, setAuthTokens: setTokens};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

}