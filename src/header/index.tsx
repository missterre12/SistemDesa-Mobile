import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Bell, User, Settings } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import SettingsDropdown from "../components/SettingsDropdown";
import NotificationDropdown from "../components/NotificationDropdown";
import { useAuth } from '../context/AuthContext';
import { MainTabsParamList } from '../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type HeaderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigation = useNavigation<HeaderNavigationProp>();
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const handleSettingsToggle = () => {
    setShowSettingsDropdown(prev => !prev);
    setShowNotificationDropdown(false);
  };

  const handleNotificationToggle = () => {
    setShowNotificationDropdown(prev => !prev);
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
    console.log("Going to profile...");
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
        <TouchableOpacity style={styles.iconButton} onPress={handleNotificationToggle}>
          <Bell size={24} color="#0F766E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={navigateToProfile}>
          <User size={24} color="#0F766E" />
        </TouchableOpacity>
      </View>

      {showNotificationDropdown && <NotificationDropdown notifications={[]} />}
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
    zIndex: 99999,
  },
  headerRight: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 16,
  },
});

export default Header;
