import React, { useEffect } from "react";
import AppNavigator from "./navigation/index";
import { SocketProvider } from "./context/SocketContext";
import { AuthProvider } from "./context/AuthContext";

export function App() {
    return (
        <SocketProvider>
            <AuthProvider>
                <AppNavigator />
            </AuthProvider>
        </SocketProvider>
    );
}
