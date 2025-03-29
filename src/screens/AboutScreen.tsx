import React from "react";
import { View, ScrollView, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Header from "../header/index";
import SectionHeader from "../components/SectionHeader";

const AboutScreen = () => {
   return (
      <SafeAreaView style={styles.container}>
         <ScrollView style={styles.scrollView}>
            <View style={styles.main}>
               <SectionHeader 
                     title="Tentang Desa" 
                     subtitle="Informasi terbaru seputar kegiatan tentang desa" 
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

export default AboutScreen;
