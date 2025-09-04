import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Define the shape of your context data
interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

// 2. Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value = { isLoggedIn, setIsLoggedIn };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Create a custom hook for easy access
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
