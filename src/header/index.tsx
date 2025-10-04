import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert, Text } from "react-native";
import { Bell, User, Settings } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SettingsDropdown from "../components/SettingsDropdown";
import NotificationDropdown from "../components/NotificationDropdown";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../navigation";
import { useSocket } from "../context/SocketContext";

type HeaderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Header: React.FC = () => {
    const { logout } = useAuth();
    const navigation = useNavigation<HeaderNavigationProp>();
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const { notifications } = useSocket();
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const handleSettingsToggle = () => {
        setShowSettingsDropdown((prev) => !prev);
        setShowNotificationDropdown(false);
    };

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
                    await logout();
                },
            },
        ]);
    };

    const navigateToProfile = () => {
        navigation.navigate("ProfileStack");
        setShowSettingsDropdown(false);
    };

    return (
        <View style={styles.header}>
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

            <View style={styles.headerRight}>
                <View style={styles.notificationContainer}>
                    <TouchableOpacity style={styles.iconButton} onPress={handleNotificationToggle}>
                        <Bell size={24} color="#0F766E" />
                        {unreadCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{unreadCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {showNotificationDropdown && <NotificationDropdown />}
                </View>

                <TouchableOpacity style={styles.iconButton} onPress={navigateToProfile}>
                    <User size={24} color="#0F766E" />
                </TouchableOpacity>
            </View>
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
        zIndex: 20,
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    notificationContainer: {
        position: "relative",
        zIndex: 50,
    },
    iconButton: {
        marginLeft: 16,
    },
    badge: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: "red",
        borderRadius: 10,
        minWidth: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 3,
    },
    badgeText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
});

export default Header;
