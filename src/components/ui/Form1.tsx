import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Contoh untuk ikon kalender

interface Form1Data {
   nik?: string;
   namaLengkap?: string;
   tempatLahir?: string;
   tanggalLahir?: string;
   jenisKelamin?: string;
   agama?: string;
   alamat?: string;
   nomorTelepon?: string;
   email?: string;
}

interface Form1Props {
   onSubmit: () => void;
   onDataChange: (data: Form1Data) => void;
   initialData?: Form1Data;
}

const Form1: React.FC<Form1Props> = ({ onSubmit, onDataChange, initialData }) => {
   const [nik, setNik] = useState<string>('');
   const [namaLengkap, setNamaLengkap] = useState<string>('');
   const [tempatLahir, setTempatLahir] = useState<string>('');
   const [tanggalLahir, setTanggalLahir] = useState<string>('');
   const [jenisKelamin, setJenisKelamin] = useState<string>('');
   const [agama, setAgama] = useState<string>('');
   const [alamat, setAlamat] = useState<string>('');
   const [nomorTelepon, setNomorTelepon] = useState<string>('');
   const [email, setEmail] = useState<string>('');

   useEffect(() => {
      if (initialData) {
         setNik(initialData.nik || '');
         setNamaLengkap(initialData.namaLengkap || '');
         setTempatLahir(initialData.tempatLahir || '');
         setTanggalLahir(initialData.tanggalLahir || '');
         setJenisKelamin(initialData.jenisKelamin || '');
         setAgama(initialData.agama || '');
         setAlamat(initialData.alamat || '');
         setNomorTelepon(initialData.nomorTelepon || '');
         setEmail(initialData.email || '');
      }
   }, [initialData]);

   const handleNext = () => {
      // Validasi form 1 jika diperlukan
      if (nik && namaLengkap && tempatLahir && tanggalLahir && jenisKelamin && agama && alamat && nomorTelepon && email) {
         onDataChange({ nik, namaLengkap, tempatLahir, tanggalLahir, jenisKelamin, agama, alamat, nomorTelepon, email });
         onSubmit();
      } else {
         alert('Harap isi semua field di Form 1');
      }
   };

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Data Pribadi</Text>
         <Text style={styles.subtitle}>Masukkan data pribadi Anda sesuai dengan KTP</Text>

         <View style={styles.inputContainer}>
         <Text style={styles.label}>NIK</Text>
         <TextInput
            style={styles.input}
            placeholder="Nomor Induk Kependudukan"
            value={nik}
            onChangeText={setNik}
            keyboardType="numeric"
         />
         </View>

         <View style={styles.inputContainer}>
         <Text style={styles.label}>Nama Lengkap</Text>
         <TextInput
            style={styles.input}
            placeholder="Nama Sesuai KTP"
            value={namaLengkap}
            onChangeText={setNamaLengkap}
         />
         </View>

         <View style={styles.inputContainer}>
         <Text style={styles.label}>Tempat Lahir</Text>
         <TextInput
            style={styles.input}
            placeholder="Tempat lahir"
            value={tempatLahir}
            onChangeText={setTempatLahir}
         />
         </View>

         <View style={styles.inputContainer}>
         <Text style={styles.label}>Tanggal Lahir</Text>
         <View style={styles.dateInputContainer}>
            <TextInput
               style={styles.dateInput}
               placeholder="hh / bb / tttt"
               value={tanggalLahir}
               onChangeText={setTanggalLahir}
               keyboardType="numeric"
            />
            <TouchableOpacity style={styles.datePickerButton}>
               <Feather name="calendar" size={20} color="gray" />
            </TouchableOpacity>
         </View>
         </View>

         <View style={styles.inputContainer}>
         <Text style={styles.label}>Jenis Kelamin</Text>
         {/* Ganti dengan Picker jika Anda ingin menggunakan dropdown */}
         <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownPlaceholder}>{jenisKelamin || 'Pilih Jenis Kelamin'}</Text>
            <Feather name="chevron-down" size={20} color="gray" />
            {/* Implementasikan logika dropdown di sini */}
         </TouchableOpacity>
         </View>

         <View style={styles.inputContainer}>
         <Text style={styles.label}>Agama</Text>
         {/* Ganti dengan Picker jika Anda ingin menggunakan dropdown */}
         <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownPlaceholder}>{agama || 'Pilih Agama'}</Text>
            <Feather name="chevron-down" size={20} color="gray" />
            {/* Implementasikan logika dropdown di sini */}
         </TouchableOpacity>
         </View>

         <View style={styles.inputContainer}>
         <Text style={styles.label}>Alamat</Text>
         <TextInput
            style={styles.input}
            placeholder="Alamat Sesuai KTP"
            value={alamat}
            onChangeText={setAlamat}
            multiline
         />
         </View>

         <View style={styles.inputContainer}>
         <Text style={styles.label}>Nomor Telepon</Text>
         <TextInput
            style={styles.input}
            placeholder="Nomor Telephon Aktif"
            value={nomorTelepon}
            onChangeText={setNomorTelepon}
            keyboardType="phone-pad"
         />
         </View>

         <View style={styles.inputContainer}>
         <Text style={styles.label}>Email</Text>
         <TextInput
            style={styles.input}
            placeholder="Email Aktif"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
         />
         </View>

         <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
         <Text style={styles.nextButtonText}>Selanjutnya</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      padding: 20,
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   subtitle: {
      fontSize: 14,
      color: 'gray',
      marginBottom: 20,
   },
   inputContainer: {
      marginBottom: 15,
   },
   label: {
      fontSize: 16,
      marginBottom: 5,
   },
   input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 12,
      fontSize: 16,
   },
   dateInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingRight: 10,
   },
   dateInput: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 12,
      fontSize: 16,
   },
   datePickerButton: {
      padding: 10,
   },
   dropdown: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 12,
      fontSize: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   dropdownPlaceholder: {
      fontSize: 16,
      color: 'gray',
   },
   nextButton: {
      backgroundColor: 'teal',
      borderRadius: 5,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 20,
   },
   nextButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
   },
});

export default Form1;