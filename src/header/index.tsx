// components/Header.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Bell, User, Settings } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamListBase } from "@react-navigation/native";
import SettingsDropdown from "../components/SettingsDropdown";
import NotificationDropdown from "../components/NotificationDropdown";

// Tipe navigasi untuk Bottom Tab
type HeaderNavigationProp = BottomTabNavigationProp<ParamListBase>;

const Header: React.FC = () => {
  const navigation = useNavigation<HeaderNavigationProp>();
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  // Toggle profile dropdown
  const handleSettingsToggle = () => {
    setShowSettingsDropdown((prev) => !prev);
    setShowNotificationDropdown(false); // hide the other
  };

  // Toggle notification dropdown
  const handleNotificationToggle = () => {
    setShowNotificationDropdown((prev) => !prev);
    setShowSettingsDropdown(false);
  };

  const handleLogout = () => {
    console.log("Going to profile...");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
    setShowSettingsDropdown(false);
  };

   const navigateToProfile = () => {
    console.log("Going to profile...");
    navigation.navigate("ProfileStack", { screen: "Profil" });
    setShowSettingsDropdown(false);
  };

  return (
    <View style={styles.header}>
  {/* Wrap settings icon & dropdown in a relative container */}
  <View style={{ position: "relative" }}>
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
  headerRight: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 16,
  },
});

export default Header;
