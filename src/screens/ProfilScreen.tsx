import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCircle, Edit, LogOut } from "lucide-react-native";

type Props = {
   setIsLoggedIn: (val: boolean) => void;
};

const ProfilScreen: React.FC<Props> = ({ setIsLoggedIn }) => {
   const handleEditProfile = () => {
      console.log("Edit Profil ditekan");
   };

   const handleLogout = () => {
      Alert.alert(
         "Konfirmasi Logout",
         "Apakah Anda yakin ingin keluar?",
         [
         {
            text: "Batal",
            style: "cancel",
         },
         {
            text: "Ya, Logout",
            onPress: () => {
               setIsLoggedIn(false);
            },
         },
         ]
      );
   };

   return (
      <SafeAreaView style={styles.safeArea}>
         <View style={styles.container}>
         <UserCircle size={100} color="#0F766E" style={styles.profileIcon} />
         <Text style={styles.name}>John Doe</Text>
         <Text style={styles.email}>johndoe@email.com</Text>

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
   safeArea: {
      flex: 1,
      backgroundColor: "#F5F5F5", // Optional: Match background color
   },
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
      width: 200,
      justifyContent: "center",
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