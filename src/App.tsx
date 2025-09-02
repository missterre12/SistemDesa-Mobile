import React, { useEffect } from "react";
import AppNavigator from "./navigation/index";
import { SocketProvider } from "./context/SocketContext";

export function App() {
   return (
        <SocketProvider>
            <AppNavigator />
        </SocketProvider>
    );
}
