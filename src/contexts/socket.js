import { createContext, useContext, useEffect, useState } from 'react';
import io from "socket.io-client";
import API from "../services/api";

export const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({children}) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io.connect(API.url));
  }, []);

  const value = {socket, setSocket};

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );

}