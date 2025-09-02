import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Alert } from 'react-native';

const SocketContext = createContext<Socket | null>(null);

// Define the type for your notification data
interface NotificationData {
    title: string;
    body: string;
    time: string;
    message?: string; // Add message since it's used in your logic
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketIo = io("https://si-desa2.onrender.com");
        setSocket(socketIo);

        const handleConnect = () => {
            console.log("Connected to socket server");
        };

        // Specify the type for the 'data' parameter here
        const handleNotification = (data: NotificationData) => {
            console.log("New notification:", data);
            
            let alertTitle = "Notifikasi Baru";
            let alertMessage = data.message || "Ada pembaruan!";

            if (data.title === "Laporan Baru") {
                alertMessage = data.body || "Ada laporan baru!";
            } else if (data.title === "Berita Baru") {
                // Change `data.message` to `data.body` for consistency
                alertMessage = `Berita baru: ${data.body}`;
            } else if (data.title === "Surat Baru") {
                alertMessage = `Surat baru dari: ${data.body}`;
            }

            Alert.alert(alertTitle, alertMessage);
        };

        // Set up listeners
        socketIo.on("connect", handleConnect);
        socketIo.on("notification", handleNotification);

        // Cleanup function to remove listeners and disconnect
        return () => {
            socketIo.off("connect", handleConnect);
            socketIo.off("notification", handleNotification);
            socketIo.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);