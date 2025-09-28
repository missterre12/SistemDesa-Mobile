import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); 

    const fetchUser = useCallback(async (token: string) => {
        try {
            const decoded: any = jwtDecode(token);
            const res = await axios.get(`${API_URL}/api/users/${decoded.user_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data.data);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            await AsyncStorage.removeItem('token');
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