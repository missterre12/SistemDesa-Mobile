import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

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

   const [isGenderModalVisible, setIsGenderModalVisible] = useState<boolean>(false);
   const [isAgamaModalVisible, setIsAgamaModalVisible] = useState<boolean>(false);

   const genderOptions = [
      { label: 'Laki-laki', value: 'Laki-laki' },
      { label: 'Perempuan', value: 'Perempuan' }
   ];

   const agamaOptions = [
      { label: 'Islam', value: 'Islam' },
      { label: 'Kristen', value: 'Kristen' },
      { label: 'Katolik', value: 'Katolik' },
      { label: 'Hindu', value: 'Hindu' },
      { label: 'Buddha', value: 'Buddha' },
      { label: 'Konghucu', value: 'Konghucu' }
   ];

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
      if (nik && namaLengkap && tempatLahir && tanggalLahir && jenisKelamin && agama && alamat && nomorTelepon && email) {
         onDataChange({ nik, namaLengkap, tempatLahir, tanggalLahir, jenisKelamin, agama, alamat, nomorTelepon, email });
         onSubmit();
      } else {
         alert('Harap isi semua field di Form 1');
      }
   };

   const selectGender = (gender: string) => {
      setJenisKelamin(gender);
      setIsGenderModalVisible(false);
   };

   const selectAgama = (value: string) => {
      setAgama(value);
      setIsAgamaModalVisible(false);
   };

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Data Pribadi</Text>
         <Text style={styles.subtitle}>Masukkan data pribadi Anda sesuai dengan KTP</Text>

         {/* Field NIK */}
         <View style={styles.fieldContainer}>
            <Text style={styles.label}>NIK</Text>
            <TextInput
               style={styles.input}
               placeholder="Nomor Induk Kependudukan"
               value={nik}
               onChangeText={setNik}
               keyboardType="numeric"
            />
            <Text style={styles.fileFormat}>Masukkan 16 digit NIK Anda</Text>
         </View>

         {/* Nama Lengkap */}
         <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
               style={styles.input}
               placeholder="Nama Sesuai KTP"
               value={namaLengkap}
               onChangeText={setNamaLengkap}
            />
            <Text style={styles.fileFormat}>Gunakan nama lengkap sesuai KTP</Text>
         </View>

         {/* Tempat Lahir */}
         <View style={styles.fieldContainer}>
            <Text style={styles.label}>Tempat Lahir</Text>
            <TextInput
               style={styles.input}
               placeholder="Tempat lahir"
               value={tempatLahir}
               onChangeText={setTempatLahir}
            />
            <Text style={styles.fileFormat}>Tuliskan nama kota tempat lahir Anda</Text>
         </View>

         {/* Tanggal Lahir */}
         <View style={styles.fieldContainer}>
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
            <Text style={styles.fileFormat}>Format: DD/MM/YYYY</Text>
         </View>

         {/* Jenis Kelamin */}
         <View style={styles.fieldContainer}>
            <Text style={styles.label}>Jenis Kelamin</Text>
            <TouchableOpacity 
               style={styles.dropdown}
               onPress={() => setIsGenderModalVisible(true)}
            >
               <Text style={[styles.dropdownPlaceholder, jenisKelamin ? styles.selectedText : null]}>
                  {jenisKelamin || 'Pilih Jenis Kelamin'}
               </Text>
               <Feather name="chevron-down" size={20} color="gray" />
            </TouchableOpacity>
            <Text style={styles.fileFormat}>Pilih jenis kelamin sesuai KTP</Text>
         </View>

         {/* Agama */}
         <View style={styles.fieldContainer}>
            <Text style={styles.label}>Agama</Text>
            <TouchableOpacity 
               style={styles.dropdown}
               onPress={() => setIsAgamaModalVisible(true)}
            >
               <Text style={[styles.dropdownPlaceholder, agama ? styles.selectedText : null]}>
                  {agama || 'Pilih Agama'}
               </Text>
               <Feather name="chevron-down" size={20} color="gray" />
            </TouchableOpacity>
            <Text style={styles.fileFormat}>Pilih agama sesuai KTP</Text>
         </View>

         {/* Alamat */}
         <View style={styles.fieldContainer}>
            <Text style={styles.label}>Alamat</Text>
            <TextInput
               style={styles.textArea}
               placeholder="Alamat Sesuai KTP"
               value={alamat}
               onChangeText={setAlamat}
               multiline
               textAlignVertical="top"
            />
            <Text style={styles.fileFormat}>Masukkan alamat lengkap sesuai KTP</Text>
         </View>

         {/* Nomor Telepon */}
         <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nomor Telepon</Text>
            <TextInput
               style={styles.input}
               placeholder="Nomor Telephon Aktif"
               value={nomorTelepon}
               onChangeText={setNomorTelepon}
               keyboardType="phone-pad"
            />
            <Text style={styles.fileFormat}>Contoh: 08xxxxxxxxxx</Text>
         </View>

         {/* Email */}
         <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
               style={styles.input}
               placeholder="Email Aktif"
               value={email}
               onChangeText={setEmail}
               keyboardType="email-address"
            />
            <Text style={styles.fileFormat}>Contoh: nama@email.com</Text>
         </View>

         {/* Tombol Selanjutnya */}
         <View style={styles.navigationButtons}>
            <View style={styles.emptySpace}></View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
               <Text style={styles.nextButtonText}>Selanjutnya</Text>
            </TouchableOpacity>
         </View>

         {/* Modal Jenis Kelamin */}
         <Modal
            visible={isGenderModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsGenderModalVisible(false)}
         >
            <TouchableOpacity 
               style={styles.modalOverlay}
               activeOpacity={1}
               onPress={() => setIsGenderModalVisible(false)}
            >
               <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                     <Text style={styles.modalTitle}>Pilih Jenis Kelamin</Text>
                     <TouchableOpacity onPress={() => setIsGenderModalVisible(false)}>
                        <Feather name="x" size={24} color="#555" />
                     </TouchableOpacity>
                  </View>
                  
                  <FlatList
                     data={genderOptions}
                     keyExtractor={(item) => item.value}
                     renderItem={({item}) => (
                        <TouchableOpacity 
                           style={styles.optionItem}
                           onPress={() => selectGender(item.value)}
                        >
                           <Text style={styles.optionText}>{item.label}</Text>
                           {jenisKelamin === item.value && (
                              <Feather name="check" size={20} color="#003C43" />
                           )}
                        </TouchableOpacity>
                     )}
                     ItemSeparatorComponent={() => <View style={styles.separator} />}
                  />
               </View>
            </TouchableOpacity>
         </Modal>

         {/* Modal Agama */}
         <Modal
            visible={isAgamaModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsAgamaModalVisible(false)}
         >
            <TouchableOpacity 
               style={styles.modalOverlay}
               activeOpacity={1}
               onPress={() => setIsAgamaModalVisible(false)}
            >
               <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                     <Text style={styles.modalTitle}>Pilih Agama</Text>
                     <TouchableOpacity onPress={() => setIsAgamaModalVisible(false)}>
                        <Feather name="x" size={24} color="#555" />
                     </TouchableOpacity>
                  </View>
                  
                  <FlatList
                     data={agamaOptions}
                     keyExtractor={(item) => item.value}
                     renderItem={({item}) => (
                        <TouchableOpacity 
                           style={styles.optionItem}
                           onPress={() => selectAgama(item.value)}
                        >
                           <Text style={styles.optionText}>{item.label}</Text>
                           {agama === item.value && (
                              <Feather name="check" size={20} color="#003C43" />
                           )}
                        </TouchableOpacity>
                     )}
                     ItemSeparatorComponent={() => <View style={styles.separator} />}
                  />
               </View>
            </TouchableOpacity>
         </Modal>
      </View>
   );
};

const styles = StyleSheet.create({
   container: { flex: 1, padding: 20 },
   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginLeft: 30 },
   subtitle: { fontSize: 14, color: 'gray', marginBottom: 20, marginLeft: 30 },
   fieldContainer: { marginBottom: 20, marginLeft: 30 },
   label: { fontSize: 16, marginBottom: 5 },
   input: {
      borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
      paddingHorizontal: 10, paddingVertical: 12, fontSize: 16, width: 308
   },
   textArea: {
      borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
      paddingHorizontal: 10, paddingVertical: 12, fontSize: 16,
      width: 308, minHeight: 80
   },
   dateInputContainer: {
      flexDirection: 'row', alignItems: 'center',
      borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
      paddingRight: 10, width: 308
   },
   dateInput: { flex: 1, paddingHorizontal: 10, paddingVertical: 12, fontSize: 16 },
   datePickerButton: { padding: 10 },
   dropdown: {
      borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
      paddingHorizontal: 10, paddingVertical: 12, fontSize: 16,
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 308
   },
   dropdownPlaceholder: { fontSize: 16, color: 'gray' },
   selectedText: { color: '#000' },
   fileFormat: { fontSize: 12, color: 'gray', marginTop: 5 },
   navigationButtons: {
      flexDirection: 'row', justifyContent: 'space-between', marginTop: 20
   },
   emptySpace: { width: 120 },
   nextButton: {
      backgroundColor: '#003C43', borderRadius: 5,
      paddingVertical: 15, paddingHorizontal: 30, alignItems: 'center'
   },
   nextButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

   // Modal Styles
   modalOverlay: {
      flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center', alignItems: 'center'
   },
   modalContainer: {
      width: '85%', backgroundColor: 'white',
      borderRadius: 10, overflow: 'hidden', maxHeight: '60%'
   },
   modalHeader: {
      flexDirection: 'row', justifyContent: 'space-between',
      alignItems: 'center', padding: 15,
      borderBottomWidth: 1, borderBottomColor: '#eee'
   },
   modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#003C43' },
   optionItem: {
      flexDirection: 'row', justifyContent: 'space-between',
      alignItems: 'center', padding: 15
   },
   optionText: { fontSize: 16 },
   separator: { height: 1, backgroundColor: '#eee', width: '100%' },
});

export default Form1;
