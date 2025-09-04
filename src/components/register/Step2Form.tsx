// components/register/Step2Form.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import InputField from '../../components/log/InputField';
import AuthButton from '../../components/log/LogButton';

interface Step2FormProps {
   nik: string;
   setNik: (value: string) => void;
   alamat: string;
   setAlamat: (value: string) => void;
   noHp: string;
   setNoHp: (value: string) => void;
   showAddressDetail: boolean;
   toggleAddressDetail: () => void;
   onNext: () => void;
   onPrev: () => void;
}

const Step2Form: React.FC<Step2FormProps> = ({
   nik,
   setNik,
   alamat,
   setAlamat,
   noHp,
   setNoHp,
   showAddressDetail,
   toggleAddressDetail,
   onNext,
   onPrev,
}) => {
   return (
      <>
         <InputField
         label="NIK"
         placeholder="Masukkan NIK 16 digit..."
         value={nik}
         onChangeText={setNik}
         keyboardType="default"
         />
         <View style={styles.container}>
         <Text style={styles.label}>Alamat</Text>
         {!showAddressDetail ? (
            <TouchableOpacity style={styles.input} onPress={toggleAddressDetail}>
               <Text style={alamat ? styles.inputText : styles.placeholderText}>
               {alamat || "Masukkan alamat lengkap..."}
               </Text>
            </TouchableOpacity>
         ) : (
            <View>
               <TextInput
               style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
               placeholder="Masukkan alamat lengkap..."
               value={alamat}
               onChangeText={setAlamat}
               multiline
               numberOfLines={4}
               />
               <TouchableOpacity
               style={styles.doneButton}
               onPress={toggleAddressDetail}
               >
               <Text style={styles.doneButtonText}>Selesai</Text>
               </TouchableOpacity>
            </View>
         )}
         </View>
         <InputField
         label="Nomor HP"
         placeholder="Masukkan nomor HP..."
         value={noHp}
         onChangeText={setNoHp}
         keyboardType="default"
         />
         <View style={styles.buttonGroup}>
         <View style={styles.backBtn}>
            <AuthButton
               text="KEMBALI"
               onPress={onPrev}
            />
         </View>
         <View style={styles.nextBtn}>
            <AuthButton
               text="LANJUTKAN"
               onPress={onNext}
            />
         </View>
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   container: {},
   label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#003C3C',
      marginBottom: 10,
      marginTop: 10,
   },
   input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 16,
      backgroundColor: '#f9f9f9',
   },
   inputText: {
      color: '#333',
      fontSize: 16,
   },
   placeholderText: {
      color: '#999',
      fontSize: 16,
   },
   doneButton: {
      alignSelf: 'flex-end',
      padding: 8,
      marginTop: 5,
   },
   doneButtonText: {
      color: '#003C3C',
      fontWeight: 'bold',
   },
   buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
   },
   backBtn: {
      flex: 1,
      marginRight: 10,
      backgroundColor: '#fff',
      borderColor: '#003C3C',
   },
   nextBtn: {
      flex: 1,
      marginLeft: 10,
   },
});

export default Step2Form;