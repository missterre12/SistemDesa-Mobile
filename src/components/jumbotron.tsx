// File: components/Jumbotron.tsx
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';

// Definisikan tipe untuk parameter navigasi (sesuaikan jika perlu)
type JumbotronNavigationProp = BottomTabNavigationProp<ParamListBase, 'Layanan Surat'>;

const Jumbotron: React.FC = () => {
   const navigation = useNavigation<JumbotronNavigationProp>();

   const handleBuatLaporan = () => {
      navigation.navigate('Laporan');
   };

   const handleBuatSurat = () => {
      navigation.navigate('Layanan Surat', { screen: 'AjukanSurat' });
   };

   return (
      <Card style={styles.jumbotron}>
         <Card.Content style={styles.content}>
         <View style={styles.textContainer}>
            <Text variant="headlineMedium" style={styles.title}>
               Portal Desa Digital
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
               Akses layanan desa dengan mudah dan cepat melalui platform digital
            </Text>
            <View style={styles.buttonContainer}>
               <Button mode="outlined" style={styles.buttonOutline} onPress={handleBuatSurat}>
               Buat Surat
               </Button>
               <Button mode="contained" style={styles.button} onPress={handleBuatLaporan}>
               Buat Laporan
               </Button>
            </View>
         </View>
         <Image
            source={require("../assets/jumbotron.jpeg")}
            style={styles.image}
            resizeMode="contain"
         />
         </Card.Content>
      </Card>
   );
};

const styles = StyleSheet.create({
   jumbotron: {
      margin: 10,
      padding: 10,
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: "#F0F0F0",
   },
   content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
   textContainer: {
      flex: 1,
      marginRight: 10,
   },
   title: {
      fontWeight: 900,
      marginBottom: 5,
      fontSize : 22,
      color: "#003C43",
   },
   subtitle: {
      textAlign: "left",
      fontSize : 11,
      marginBottom: 17,
   },
   buttonContainer: {
      flexDirection: "row",
      gap: 10,
   },
   buttonOutline: {
      borderColor: "#ccc",
   },
   button: {
      backgroundColor: "#003C43",
   },
   image: {
      width: 110,
      height: 110,
      marginTop: -40,
      marginBottom: 20,
   },
});

export default Jumbotron;