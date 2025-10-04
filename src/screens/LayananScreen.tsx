import React from "react";
import { View, ScrollView, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import SectionHeader from "../components/SectionHeader";
import Header from "../header/index";
import InputSurat from "../components/MultiInput"

const LayananScreen = () => {
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="#fff" />
         <Header />
         <ScrollView style={styles.scrollView}>
            <View style={styles.main}>
               <SectionHeader 
                     title="Berita Desa" 
                     subtitle="Informasi terbaru seputar kegiatan tentang desa" 
                  />
               <InputSurat />
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

export default LayananScreen;