import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Feather } from '@expo/vector-icons';

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
   const [isAgreed, setIsAgreed] = useState<boolean>(false); // State untuk status persetujuan

   useEffect(() => {
      if (initialData && initialData.setujuPernyataan !== undefined) {
         setIsAgreed(initialData.setujuPernyataan);
      }
   }, [initialData]);

   const handleChooseFile = (type: 'ktp' | 'kk') => {

      console.log(`Memilih file untuk ${type === 'ktp' ? 'KTP' : 'Kartu Keluarga'}`);
      if (type === 'ktp') {
         setScanKTP('nama_file_ktp.jpg'); // Contoh nama file
      } else {
         setScanKK('nama_file_kk.png'); // Contoh nama file
      }
   };

   const handleSubmit = () => {
      if (isAgreed) {
         onDataChange({ scanKTP, scanKK, setujuPernyataan: isAgreed }); // Kirim status persetujuan
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
            <TouchableOpacity style={styles.filePicker} onPress={() => handleChooseFile('ktp')}>
               <Text style={styles.filePickerText}>{scanKTP || 'Pilih File'}</Text>
               <Feather name="upload" size={20} color="gray" style={styles.uploadIcon} />
            </TouchableOpacity>
            <Text style={styles.fileFormat}>Format : JPG , PNG , atau PDF . Maks : 2MB</Text>
         </View>

         <View style={styles.documentContainer}>
            <Text style={styles.label}>Scan Kartu Keluarga</Text>
            <TouchableOpacity style={styles.filePicker} onPress={() => handleChooseFile('kk')}>
               <Text style={styles.filePickerText}>{scanKK || 'Pilih File'}</Text>
               <Feather name="upload" size={18} color="gray" style={styles.uploadIcon} />
            </TouchableOpacity>
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
      marginBottom: 20,
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
      backgroundColor: 'teal',
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