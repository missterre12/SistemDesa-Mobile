// File: components/Header.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Bell, User, Settings } from "lucide-react-native";

const Header: React.FC = () => {
   return (
      <View style={styles.header}>
         <TouchableOpacity>
         <Settings size={24} color="#0F766E" />
         </TouchableOpacity>
         <View style={styles.headerRight}>
         <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#0F766E" />
         </TouchableOpacity>
         <TouchableOpacity style={styles.iconButton}>
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
