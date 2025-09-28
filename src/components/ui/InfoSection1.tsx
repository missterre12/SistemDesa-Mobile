import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Props {}

const TentangDesa: React.FC<Props> = () => {
   return (
      <ScrollView style={styles.container}>
         <View style={styles.section}>
         <Text style={styles.paragraph}>
            Desa Maju Sejahtera didirikan pada tahun 1945 setelah kemerdekaan Indonesia. Awalnya, desa ini merupakan
            pemukiman kecil yang dihuni oleh beberapa keluarga petani yang mengolah lahan subur di sekitar sungai.
         </Text>
         </View>

         <View style={styles.section}>
         <Text style={styles.paragraph}>
            Nama "Maju Sejahtera" diberikan oleh pendiri desa, Bapak Soekarno (bukan presiden), yang memiliki visi agar desa ini
            dapat maju dan sejahtera di masa depan. Seiring berjalannya waktu, desa ini berkembang menjadi pusat pertanian yang
            produktif di kabupaten.
         </Text>
         </View>

         <View style={styles.section}>
         <Text style={styles.paragraph}>
            Pada tahun 1970-an, desa ini mulai mengembangkan infrastruktur dasar seperti jalan, saluran irigasi, dan fasilitas
            umum. Tahun 1990-an, listrik masuk ke desa dan membuka era baru modernisasi.
         </Text>
         </View>

         <View style={styles.section}>
         <Text style={styles.paragraph}>
            Saat ini, Desa Maju Sejahtera telah bertransformasi menjadi desa yang mandiri dengan berbagai potensi ekonomi, tidak
            hanya pertanian tetapi juga kerajinan tangan, pariwisata desa, dan UMKM.
         </Text>
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#ffffff', 
      borderRadius: 15,
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
      marginBottom: 15,
      backgroundColor: '#fff', 
      padding: 15,
      borderRadius: 5,
   },
   paragraph: {
      fontSize: 16,
      color: '#495057',
      lineHeight: 24,
   },
});

export default TentangDesa;