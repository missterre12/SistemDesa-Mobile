// components/Header.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Bell, User, Settings } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamListBase } from "@react-navigation/native";

// Tipe navigasi untuk Bottom Tab
type HeaderNavigationProp = BottomTabNavigationProp<ParamListBase>;

const Header: React.FC = () => {
   const navigation = useNavigation<HeaderNavigationProp>();

   // Fungsi untuk navigasi ke ProfilScreen
   const navigateToProfile = () => {
      navigation.navigate("ProfileStack");
   };

   return (
      <View style={styles.header}>
         <TouchableOpacity>
         <Settings size={24} color="#0F766E" />
         </TouchableOpacity>
         <View style={styles.headerRight}>
         <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#0F766E" />
         </TouchableOpacity>
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
   headerRight: {
      flexDirection: "row",
   },
   iconButton: {
      marginLeft: 16,
   },
});

export default Header;