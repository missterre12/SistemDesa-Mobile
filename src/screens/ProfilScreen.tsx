// File: screens/ProfilScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { UserCircle, Edit, LogOut } from "lucide-react-native";

const ProfilScreen: React.FC = () => {
   const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

   const handleEditProfile = () => {
      console.log("Edit Profil ditekan");
   };

   const handleLogout = () => {
      // Reset navigation stack agar kembali ke LoginScreen
      navigation.dispatch(
         CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
         })
      );
   };

   return (
      <View style={styles.container}>
         {/* Ikon Profil */}
         <UserCircle size={100} color="#0F766E" style={styles.profileIcon} />

         {/* Nama dan Email */}
         <Text style={styles.name}>John Doe</Text>
         <Text style={styles.email}>johndoe@email.com</Text>

         {/* Tombol Edit Profil */}
         <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
            <Edit size={20} color="#FFF" style={styles.icon} />
            <Text style={styles.buttonText}>Edit Profil</Text>
         </TouchableOpacity>

         {/* Tombol Logout */}
         <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <LogOut size={20} color="#FFF" style={styles.icon} />
            <Text style={styles.buttonText}>Logout</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5F5F5",
   },
   profileIcon: {
      marginBottom: 15,
   },
   name: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
   },
   email: {
      fontSize: 16,
      color: "#777",
      marginBottom: 20,
   },
   button: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#0F766E",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginTop: 10,
   },
   logoutButton: {
      backgroundColor: "#D32F2F",
   },
   buttonText: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 16,
      marginLeft: 10,
   },
   icon: {
      marginRight: 5,
   },
});

export default ProfilScreen;
