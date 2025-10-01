import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Props {}

const VisiMisi: React.FC<Props> = () => {
   return (
      <ScrollView style={styles.container}>
         <Text style={styles.title}>Visi & Misi</Text>
         <Text style={styles.subtitle}>Arah dan tujuan pembangunan Desa Maju Sejahtera</Text>

         <View style={styles.section}>
         <Text style={styles.sectionTitle}>Visi</Text>
         <View style={styles.visiContainer}>
            <Text style={styles.visiText}>
               "Terwujudnya Desa Hamparan Perak yang maju, mandiri, sejahtera. "
            </Text>
         </View>
         </View>

         <View style={styles.section}>
         <Text style={styles.sectionTitle}>Misi</Text>
         <View style={styles.misiContainer}>
            <View style={styles.misiItem}>
               <Text style={styles.misiNumber}>1.</Text>
               <Text style={styles.misiText}>Meningkatkan kualitas pelayanan administrasi desa yang cepat, mudah, dan transparan.</Text>
            </View>
            <View style={styles.misiItem}>
               <Text style={styles.misiNumber}>2.</Text>
               <Text style={styles.misiText}>Mengembangkan potensi ekonomi dan pemberdayaan masyarakat untuk kesejahteraan bersama.</Text>
            </View>
         </View>
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#f8f8f8', 
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
   },
   subtitle: {
      fontSize: 16,
      color: '#666',
      marginBottom: 20,
   },
   section: {
      marginBottom: 20,
      backgroundColor: '#fff', 
      padding: 15,
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
   },
   sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
   },
   visiContainer: {
      backgroundColor: '#e9ecef', 
      padding: 15,
      borderRadius: 5,
   },
   visiText: {
      fontSize: 16,
      color: '#495057',
      lineHeight: 24,
   },
   misiContainer: {},
   misiItem: {
      flexDirection: 'row',
      paddingVertical: 5,
   },
   misiNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#495057',
      marginRight: 10,
   },
   misiText: {
      fontSize: 16,
      color: '#495057',
      lineHeight: 24,
      flex: 1,
   },
});

export default VisiMisi;