// File: components/Services.tsx
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Card, Text, TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";

type ServicesNavigationProp = StackNavigationProp<ParamListBase>;

const Services: React.FC = () => {
   const navigation = useNavigation<ServicesNavigationProp>();

   const handleNavigateToAbout = () => {
      navigation.navigate("Tentang Desa");
   };

   const handleNavigateToBerita = () => {
      navigation.navigate("Berita Desa");
   };

   const handleNavigateToLayanan = () => {
      navigation.navigate("Layanan Desa");
   };

   const handleNavigateToLaporan = () => {
      navigation.navigate("Laporan Desa");
   };

   const services = [
      {
         title: "Layanan Surat",
         image: require("../assets/menu/layanan-surat.png"),
         backgroundColor: "#F5F5F5",
         onPress:  handleNavigateToLayanan,
      },
      {
         title: "Laporan Masyarakat",
         image: require("../assets/menu/laporan-masyarakat.png"),
         backgroundColor: "#003C43",
         textColor: "#FFF",
         onPress: handleNavigateToLaporan,
      },
      {
         title: "Berita Desa",
         image: require("../assets/menu/Berita-Desa.png"),
         backgroundColor: "#F5F5F5",
         onPress: handleNavigateToBerita,
      },
      {
         title: "Tentang Desa",
         image: require("../assets/menu/Tentang-Aplikasi.png"),
         backgroundColor: "#F5F5F5",
         onPress: handleNavigateToAbout,
      },
   ];

   return (
      <View style={styles.container}>
         <Text variant="headlineSmall" style={styles.title}>
            Layanan Kami
         </Text>
         <Text variant="bodyMedium" style={styles.subtitle}>
            Akses layanan desa dengan mudah dan cepat melalui platform digital
         </Text>
         <View style={styles.grid}>
            {services.map((service, index) => (
               <TouchableRipple
                  key={index}
                  onPress={service.onPress}
                  rippleColor="rgba(0, 0, 0, 0.2)"
                  style={styles.ripple}
               >
                  <Card style={[styles.card, { backgroundColor: service.backgroundColor }]}>
                     <Card.Content style={styles.cardContent}>
                        <Image source={service.image} style={styles.image} resizeMode="contain" />
                        <Text style={[styles.cardText, { color: service.textColor || "#000" }]}>
                           {service.title}
                        </Text>
                     </Card.Content>
                  </Card>
               </TouchableRipple>
            ))}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      margin: 10,
      alignItems: "center",
   },
   title: {
      fontWeight: "bold",
      marginBottom: 5,
      color: "#003C43",
   },
   subtitle: {
      textAlign: "center",
      marginBottom: 15,
      maxWidth: 300,
   },
   grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 10,
   },
   ripple: {
      margin: 5,
      borderRadius: 10,
   },
   card: {
      width: 150,
      height: 150,
      borderRadius: 10,
      justifyContent: "center",
   },
   cardContent: {
      alignItems: "center",
   },
   image: {
      width: 60,
      height: 60,
      marginBottom: 10,
   },
   cardText: {
      fontWeight: "bold",
      textAlign: "center",
   },
});

export default Services;
