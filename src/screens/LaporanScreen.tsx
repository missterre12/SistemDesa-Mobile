import React from "react";
import { View, ScrollView, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Header from "../header/index";
import SectionHeader from "../components/SectionHeader";
import SearchBar from "../components/SearchBar";
import FAB from "../components/FAButton";
import ReportCard from "../components/ReportCard";

const LaporanScreen = () => {
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
         <Header />
         <ScrollView style={styles.scrollView}>
            <View style={styles.main}>
               <SectionHeader 
                  title="Laporan Masyarakat" 
                  subtitle="Laporkan masalah untuk tanggapan sigap dan cepat" 
               />
               <SearchBar onSearch={(text) => console.log("Search:", text)} />
               <ReportCard
                  imageUrl="/images/sampah.jpg"
                  date="10 Juni 2025"
                  title="Sampah Menumpuk"
                  description="Sampah menumpuk di pinggir sungai dan menimbulkan bau. Mohon segera dibersihkan untuk mencegah penyebaran penyakit dan pencemaran sungai."
                  status="Diproses"
                  reporter="Hendrawan"
                  location="Bantaran Sungai Sejahtera"
                  onVote={() => console.log("Voted!")}
               />
               <ReportCard 
                  imageUrl="../assets/navigations/news.png" 
                  date="10 Juni 2025" 
                  title="Sampah Menumpuk" 
                  description="Sampah menumpuk di pinggir sungai dan menimbulkan bau. Mohon segera dibersihkan untuk mencegah penyebaran penyakit dan pencemaran sungai."
                  status="Diproses" 
                  reporter="Hendrawan" 
                  location="Bantaran Sungai Sejahtera" 
                  onVote={() => console.log("Voted!")} 
               />
               <ReportCard 
                  imageUrl="https://example.com/sample-image.jpg" 
                  date="10 Juni 2025" 
                  title="Sampah Menumpuk" 
                  description="Sampah menumpuk di pinggir sungai dan menimbulkan bau. Mohon segera dibersihkan untuk mencegah penyebaran penyakit dan pencemaran sungai."
                  status="Diproses" 
                  reporter="Hendrawan" 
                  location="Bantaran Sungai Sejahtera" 
                  onVote={() => console.log("Voted!")} 
               />
            </View>
         </ScrollView>
         <View style={styles.fabContainer}>
         <FAB />
         </View>
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
   fabContainer: {
      position: "absolute",
      bottom: 20,
      right: 100,
      zIndex: 10,
   },
});

export default LaporanScreen;
