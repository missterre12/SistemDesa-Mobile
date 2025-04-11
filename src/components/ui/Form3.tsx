import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface Form3Data {
   scanKTP?: string;
   scanKK?: string; 
   setujuPernyataan?: boolean; 
}

interface Form3Props {
   onSubmit: () => void;
   onPrev: () => void;
   onDataChange: (data: Form3Data) => void;
   initialData?: Form3Data;
}

const Form3: React.FC<Form3Props> = ({ onSubmit, onPrev, onDataChange, initialData }) => {
   const [scanKTP, setScanKTP] = useState<string>('');
   const [scanKK, setScanKK] = useState<string>('');
   const [isAgreed, setIsAgreed] = useState<boolean>(false);
   const [ktpImage, setKtpImage] = useState<string | null>(null);
   const [kkImage, setKkImage] = useState<string | null>(null);

   useEffect(() => {
      if (initialData) {
         setScanKTP(initialData.scanKTP || '');
         setScanKK(initialData.scanKK || '');
         if (initialData.setujuPernyataan !== undefined) {
            setIsAgreed(initialData.setujuPernyataan);
         }
      }
   }, [initialData]);

   const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
         alert('Maaf, kami membutuhkan izin akses galeri untuk mengunggah gambar!');
         return false;
      }
      return true;
   };

   const pickImage = async (type: 'ktp' | 'kk') => {
      const hasPermission = await requestPermission();
      
      if (!hasPermission) {
         return;
      }

      try {
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
         });

         if (!result.canceled) {
            const uri = result.assets[0].uri;
            const fileName = uri.split('/').pop() || 'image';
            
            if (type === 'ktp') {
               setScanKTP(fileName);
               setKtpImage(uri);
            } else {
               setScanKK(fileName);
               setKkImage(uri);
            }
         }
      } catch (error) {
         console.error('Error picking image:', error);
         alert('Terjadi kesalahan saat memilih gambar');
      }
   };

   const handleSubmit = () => {
      if (isAgreed) {
         if (!scanKTP || !scanKK) {
            alert('Harap unggah scan KTP dan Kartu Keluarga');
            return;
         }
         onDataChange({ scanKTP, scanKK, setujuPernyataan: isAgreed }); 
         onSubmit();
      } else {
         alert('Harap setujui pernyataan di atas.');
      }
   };

   const handlePrev = () => {
      onPrev();
   };

   const toggleAgreement = () => {
      setIsAgreed(!isAgreed);
   };

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Unggah Dokumen</Text>
         <Text style={styles.subtitle}>Lengkapi formulir berikut untuk mengajukan permohonan surat</Text>

         <View style={styles.documentContainer}>
            <Text style={styles.label}>Scan KTP</Text>
            <TouchableOpacity 
               style={styles.filePicker} 
               onPress={() => pickImage('ktp')}
            >
               <Text style={styles.filePickerText}>{scanKTP || 'Pilih File'}</Text>
               <Feather name="upload" size={20} color="gray" style={styles.uploadIcon} />
            </TouchableOpacity>
            {ktpImage && (
               <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: ktpImage }} style={styles.imagePreview} />
                  <TouchableOpacity 
                     style={styles.deleteButton}
                     onPress={() => {
                        setKtpImage(null);
                        setScanKTP('');
                     }}
                  >
                     <Feather name="x" size={16} color="white" />
                  </TouchableOpacity>
               </View>
            )}
            <Text style={styles.fileFormat}>Format : JPG , PNG , atau PDF . Maks : 2MB</Text>
         </View>

         <View style={styles.documentContainer}>
            <Text style={styles.label}>Scan Kartu Keluarga</Text>
            <TouchableOpacity 
               style={styles.filePicker} 
               onPress={() => pickImage('kk')}
            >
               <Text style={styles.filePickerText}>{scanKK || 'Pilih File'}</Text>
               <Feather name="upload" size={18} color="gray" style={styles.uploadIcon} />
            </TouchableOpacity>
            {kkImage && (
               <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: kkImage }} style={styles.imagePreview} />
                  <TouchableOpacity 
                     style={styles.deleteButton}
                     onPress={() => {
                        setKkImage(null);
                        setScanKK('');
                     }}
                  >
                     <Feather name="x" size={16} color="white" />
                  </TouchableOpacity>
               </View>
            )}
            <Text style={styles.fileFormat}>Format : JPG , PNG , atau PDF . Maks : 2MB</Text>
         </View>

         <View style={styles.statementContainer}>
            <Text style={styles.statementText}>
               Dengan ini saya menyatakan bahwa data yang saya berikan adalah benar dan dapat dipertanggungjawabkan
            </Text>
            <TouchableOpacity style={styles.agreement} onPress={toggleAgreement}>
               <View style={[styles.checkbox, isAgreed && styles.checkboxActive]}>
                  {isAgreed && <Feather name="check" size={16} color="white" />}
               </View>
               <Text style={styles.agreementText}>Saya setuju dengan pernyataan di atas</Text>
            </TouchableOpacity>
         </View>

         <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
               <Text style={styles.prevButtonText}>Kembali</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
               <Text style={styles.submitButtonText}>Ajukan Permohonan</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      marginLeft: 30,
   },
   subtitle: {
      fontSize: 14,
      color: 'gray',
      marginBottom: 20,
      marginLeft: 30,
   },
   documentContainer: {
      marginBottom: 25,
      marginLeft: 30,
   },
   label: {
      fontSize: 16,
      marginBottom: 5,
   },
   filePicker: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      width: 308,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 12,
   },
   filePickerText: {
      fontSize: 16,
      color: 'gray',
   },
   uploadIcon: {
      color: 'gray',
   },
   imagePreviewContainer: {
      marginTop: 10,
      position: 'relative',
      width: 308,
      height: 150,
      borderRadius: 5,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#ddd',
   },
   imagePreview: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
   },
   deleteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
   },
   fileFormat: {
      fontSize: 12,
      color: 'gray',
      marginTop: 5,
   },
   statementContainer: {
      marginBottom: 30,
   },
   statementText: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 10,
      marginLeft: 30,
   },
   agreement: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginLeft: 30,
   },
   agreementText: {
      marginLeft: 10,
      fontSize: 16,
   },
   checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
   },
   checkboxActive: {
      backgroundColor: 'teal',
      borderColor: 'teal',
   },
   navigationButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
   },
   prevButton: {
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      paddingVertical: 15,
      paddingHorizontal: 50,
      alignItems: 'center',
   },
   prevButtonText: {
      fontSize: 16,
      color: 'gray',
   },
   submitButton: {
      backgroundColor: '#003C43',
      borderRadius: 5,
      paddingVertical: 15,
      paddingHorizontal: 20,
      alignItems: 'center',
   },
   submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
   },
});

export default Form3;