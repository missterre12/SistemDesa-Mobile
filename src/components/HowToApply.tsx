// File: components/HowToApply.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { ArrowRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const steps = [
   {
      title: "Pilih Jenis Surat",
      description: "Pilih jenis surat yang ingin diajukan dari daftar yang tersedia",
   },
   {
      title: "Isi Formulir",
      description: "Lengkapi formulir pengajuan dengan data yang benar",
   },
   {
      title: "Unggah Dokumen",
      description: "Unggah dokumen persyaratan yang dibutuhkan",
   },
   {
      title: "Tunggu Persetujuan",
      description: "Tunggu persetujuan dari petugas desa (1-5 hari kerja)",
   },
   {
      title: "Ambil Surat",
      description: "Ambil surat di kantor desa dengan membawa bukti pengajuan",
   },
];

// Definisikan type untuk parameter di dalam LayananStackNavigator
type LayananStackParamList = {
   LayananUtama: undefined;
   AjukanSurat: undefined;
};

const HowToApply: React.FC = () => {
   const navigation = useNavigation<any>();

   const handleAjukanSurat = () => {
      navigation.navigate("Layanan Surat", {
        screen: "AjukanSurat"
      });
   };

   return (
      <Card style={styles.container}>
         <Card.Content>
            <Text variant="headlineSmall" style={styles.title}>
               Cara Mengajukan Surat
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
               Ajukan permohonan surat keterangan secara online
            </Text>

            <View style={styles.stepsContainer}>
               {steps.map((step, index) => (
                  <View key={index} style={styles.step}>
                  <Text variant="bodyLarge" style={styles.stepTitle}>
                     • {step.title}
                  </Text>
                  <Text variant="bodyMedium" style={styles.stepDescription}>
                     {step.description}
                  </Text>
                  </View>
               ))}
            </View>

            <Button
               mode="contained"
               style={styles.button}
               icon={() => <ArrowRight size={18} color="#FFF" />}
               onPress={handleAjukanSurat} // Tambahkan onPress handler
            >
               Ajukan Surat
            </Button>
         </Card.Content>
      </Card>
   );
};

const styles = StyleSheet.create({
   container: {
      margin: 10,
      padding: 15,
      borderRadius: 10,
      backgroundColor: "#FFFFFF",
   },
   title: {
      fontWeight: "bold",
      marginBottom: 5,
   },
   subtitle: {
      marginBottom: 15,
   },
   stepsContainer: {
      marginBottom: 20,
   },
   step: {
      marginBottom: 10,
   },
   stepTitle: {
      fontWeight: "bold",
   },
   stepDescription: {
      marginLeft: 15,
      color: "#555",
   },
   button: {
      backgroundColor: "#003C43",
      borderRadius: 8,
   },
});

export default HowToApply;