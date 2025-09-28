import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { decode as atob, encode as btoa } from "base-64";
import axios from 'axios';
import { API_URL } from '../config';

interface User {
    user_id: number;
    nama: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    token: string | null;
    user: User | null;
}

if (typeof global.atob === "undefined") {
  global.atob = atob;
}
if (typeof global.btoa === "undefined") {
  global.btoa = btoa;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async (token: string) => {
        try {
            const decoded: any = jwtDecode(token);

            const userId = decoded.user_id || decoded.id;

            if (!userId) {
                throw new Error("No user ID found in token");
            }

            const res = await axios.get(`${API_URL}/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("User data fetched:", res.data);

            setUser(res.data.data);
            setIsLoggedIn(true);
        } catch (error: any) {
            console.error(
                "Failed to fetch user data:",
                error.response?.data || error.message
            );
            setIsLoggedIn(false);
            setUser(null);
        }
    }, []);

    useEffect(() => {
        const loadTokenAndUser = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');

                if (storedToken) {
                    setToken(storedToken);
                    await fetchUser(storedToken);
                } else {
                    console.log("No token in storage, user not logged in.");
                    setIsLoggedIn(false);
                }
            } catch (e) {
                console.error('Failed to load token from storage:', e);
            } finally {
                setLoading(false);
            }
        };

        loadTokenAndUser();
    }, [fetchUser]);

    const login = async (newToken: string) => {
        try {
            await AsyncStorage.setItem('token', newToken);

            setToken(newToken);
            await fetchUser(newToken);

        } catch (e) {
            console.error('Failed to save token to storage:', e);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');

            setToken(null);
            setIsLoggedIn(false);
            setUser(null);
        } catch (e) {
            console.error('Failed to remove token from storage:', e);
        }
    };

    const value = { isLoggedIn, user, login, logout, token };

    if (loading) {
        console.log("AuthProvider still loading, not rendering children yet.");
        return null;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
