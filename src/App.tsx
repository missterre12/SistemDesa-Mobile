import React, { useEffect } from "react";
import AppNavigator from "./navigation/index";
import { io } from "socket.io-client";
import { Alert } from "react-native";

const socket = io("http://192.168.1.10:5000");  

export function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    socket.on("notification", (data) => {
      console.log("📨 New notification:", data);
      Alert.alert("Notifikasi Baru", `Laporan: ${data.keluhan || "Laporan baru masuk!"}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <AppNavigator />;
}
