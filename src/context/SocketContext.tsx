import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_URL } from '../config';
import { useAuth } from './AuthContext';

interface Notification {
  id?: number;
  title: string;
  body: string;
  type?: string;
  timestamp?: string;
  isRead?: boolean;
}

interface SocketContextType {
  socket: Socket | null;
  notifications: Notification[];
  emit: (event: string, data?: any) => void;
  markAsRead: (id: number) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  notifications: [],
  emit: () => {},
  markAsRead: () => {},
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const connectSocket = async () => {
      const userId = user?.user_id;

      const socketIo = io(API_URL, {
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      setSocket(socketIo);

      socketIo.on('connect', () => {
        console.log('Connected to socket server');
        if (userId) {
          socketIo.emit('join', userId);
          console.log(`Joined room for user ${userId}`);
        }
      });

      socketIo.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      socketIo.on('notification:new', (data: Notification) => {
        console.log('New notification received:', data);
        setNotifications(prev => [
          { ...data, timestamp: new Date().toLocaleString(), isRead: false },
          ...prev,
        ]);
      });

      return () => {
        socketIo.disconnect();
      };
    };

    connectSocket();
  }, [user?.user_id]);

  const emit = (event: string, data?: any) => {
    if (socket?.connected) {
      socket.emit(event, data);
    } else {
      console.warn('Socket not connected, cannot emit:', event);
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  return (
    <SocketContext.Provider value={{ socket, notifications, emit, markAsRead }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
