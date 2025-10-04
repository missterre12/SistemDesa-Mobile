import React from "react";
import { ScrollView, StyleSheet, StatusBar, SafeAreaView, View } from "react-native";
import HowToApply from "../components/HowToApply";
import Header from "../header/index";
import SectionHeader from "../components/SectionHeader";


export default function AjukanSuratScreen() {
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
         <Header />
         <ScrollView style={styles.scrollView}>   
            <View style={styles.main}>
               <SectionHeader 
                  title="Layanan Surat" 
                  subtitle="Ajukan permohonan surat keterangan secara online"
               />
               <HowToApply />
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}

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
