import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCircle, Edit, LogOut } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../config";
import { CommonActions } from "@react-navigation/native";

type Props = {
    setIsLoggedIn: (val: boolean) => void;
};

type DecodedToken = {
    user_id: number;
    role: string;
};

type User = {
    username: string;
    nama: string;
    email?: string;
};

const ProfilScreen: React.FC<Props> = ({ setIsLoggedIn }) => {
    const [user, setUser] = useState<User | null>(null);
    const fetchUserProfile = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) return;

            const decoded: DecodedToken = jwtDecode(token);
            if (!decoded?.user_id) return;

            const url = `${API_URL}/api/users/${decoded.user_id}`;
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(res.data.data);
        } catch (error: any) {
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const navigation = useNavigation<any>();
    const handleEditProfile = () => {
        navigation.navigate("EditProfile");
    };

    const handleLogout = () => {
        Alert.alert("Konfirmasi Logout", "Apakah Anda yakin ingin keluar?", [
            { text: "Batal", style: "cancel" },
            {
                text: "Ya, Logout",
                onPress: async () => {
                    await AsyncStorage.removeItem("token");
                    setIsLoggedIn(false); 
                },
            },
        ]);
        // const confirmed = window.confirm("Apakah Anda yakin ingin keluar?");
        // if (confirmed) {
        //     await AsyncStorage.removeItem("token");
        //     setIsLoggedIn(false);
        // }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <UserCircle size={100} color="#0F766E" style={styles.profileIcon} />
                <Text style={styles.name}>{user?.nama || "Memuat..."}</Text>
                <Text style={styles.email}>{user?.email || "-"}</Text>

                <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                    <Edit size={20} color="#FFF" style={styles.icon} />
                    <Text style={styles.buttonText}>Edit Profil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.logoutButton]}
                    onPress={handleLogout}
                    activeOpacity={0.7}
                >
                    <LogOut size={20} color="#FFF" style={styles.icon} />
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#F5F5F5" },
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    profileIcon: { marginBottom: 15 },
    name: { fontSize: 20, fontWeight: "bold", color: "#333" },
    email: { fontSize: 16, color: "#777", marginBottom: 20 },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0F766E",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
        width: 200,
        justifyContent: "center",
    },
    logoutButton: { backgroundColor: "#D32F2F" },
    buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 16, marginLeft: 10 },
    icon: { marginRight: 5 },
});

export default ProfilScreen;
