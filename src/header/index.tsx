import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Bell, User, Settings } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamListBase } from "@react-navigation/native";
import SettingsDropdown from "../components/SettingsDropdown";
import NotificationDropdown from "../components/NotificationDropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from '../context/AuthContext';

// Tipe navigasi untuk Bottom Tab
type HeaderNavigationProp = BottomTabNavigationProp<ParamListBase>;

const Header: React.FC = () => {
    
    const { setIsLoggedIn } = useAuth();
    const navigation = useNavigation<HeaderNavigationProp>();
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

    // Toggle profile dropdown
    const handleSettingsToggle = () => {
        setShowSettingsDropdown((prev) => !prev);
        setShowNotificationDropdown(false);
    };

    // Toggle notification dropdown
    const handleNotificationToggle = () => {
        setShowNotificationDropdown((prev) => !prev);
        setShowSettingsDropdown(false);
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
    };

    const navigateToProfile = () => {
        console.log("Going to profile...");
        navigation.navigate("ProfileStack", { screen: "Profil" });
        setShowSettingsDropdown(false);
    };

    return (
        <View style={styles.header}>
            {/* Wrap settings icon & dropdown in a relative container */}
            <View style={styles.settingsContainer}>
                <TouchableOpacity onPress={handleSettingsToggle}>
                    <Settings size={24} color="#0F766E" />
                </TouchableOpacity>

                {showSettingsDropdown && (
                    <SettingsDropdown
                        onProfilePress={navigateToProfile}
                        onLogoutPress={handleLogout}
                    />
                )}
            </View>

            {/* Right side buttons */}
            <View style={styles.headerRight}>
                <TouchableOpacity style={styles.iconButton} onPress={handleNotificationToggle}>
                    <Bell size={24} color="#0F766E" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={navigateToProfile}>
                    <User size={24} color="#0F766E" />
                </TouchableOpacity>
            </View>

            {/* Notification Dropdown */}
            {showNotificationDropdown && (
                <NotificationDropdown notifications={[]} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    settingsContainer: {
        position: "relative",
        zIndex: 9999
    },
    headerRight: {
        flexDirection: "row",
    },
    iconButton: {
        marginLeft: 16,
    },
});

export default Header;
