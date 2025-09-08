import React from "react";
import AppNavigator from "./src/navigation/index";
import { SocketProvider } from "./src/context/SocketContext";
import { AuthProvider } from "./src/context/AuthContext";

export function App() {
    return (
        <AuthProvider>
            <SocketProvider>
                <AppNavigator />
            </SocketProvider>
        </AuthProvider>
    );
}
