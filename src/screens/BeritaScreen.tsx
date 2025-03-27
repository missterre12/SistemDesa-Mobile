import React from "react";
import { View, ScrollView, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Header from "../header/index";
import SectionHeader from "../components/SectionHeader";
import SearchBar from "../components/SearchBar";
import ReportCard from "../components/ReportCard";
import CustomButton from "../components/Button";

const BeritaScreen = () => {
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
         <Header />
         <ScrollView style={styles.scrollView}>
            <View style={styles.main}>
               <SectionHeader 
                     title="Berita Desa" 
                     subtitle="Informasi terbaru seputar kegiatan tentang desa" 
                  />
                  <SearchBar onSearch={(text) => console.log("Search:", text)} />
                  <ReportCard 
                     imageUrl=""
                     date="10 Juni 2025" 
                     title="Sampah Menumpuk" 
                     description="Sampah menumpuk di pinggir sungai dan menimbulkan bau. Mohon segera dibersihkan untuk mencegah penyebaran penyakit dan pencemaran sungai."
                     status="Diproses" 
                     reporter="Hendrawan" 
                     location="Bantaran Sungai Sejahtera" 
                     onVote={() => console.log("Baca Selengkapnya!")} 
                     buttonLabel="Baca Selengkapnya"
                  />
                  <ReportCard 
                     imageUrl=""
                     date="15 Juni 2025" 
                     title="Pembangunan Jalan Desa" 
                     description="Pembangunan jalan desa tahap pertama telah selesai. Warga diminta memberikan masukan untuk tahap selanjutnya."
                     status="Selesai" 
                     reporter="Admin Desa" 
                     location="Dusun 1, Desa Sejahtera" 
                     onVote={() => console.log("Baca Selengkapnya!")} 
                     buttonLabel="Baca Selengkapnya"
                  />
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
   },
   main: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
   },
   scrollView: {
      flex: 1,
   },
});

export default BeritaScreen;
