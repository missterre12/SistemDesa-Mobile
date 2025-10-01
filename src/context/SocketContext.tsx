import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Notification {
  title: string;
  body: string;
  timestamp: string;
  isRead?: boolean;
}

interface SocketContextType {
  socket: Socket | null;
  notifications: Notification[];
  emit: (event: string, data?: any) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  notifications: [],
  emit: () => {},
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socketIo = io("https://si-desa2.onrender.com");
    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log("Connected to socket server");
    });

    socketIo.on("notification", (data: any) => {
      console.log("New notification:", data);
      setNotifications((prev) => [
        { title: data.title, body: data.body, timestamp: new Date().toLocaleString(), isRead: false },
        ...prev,
      ]);
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const emit = (event: string, data?: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, notifications, emit }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
