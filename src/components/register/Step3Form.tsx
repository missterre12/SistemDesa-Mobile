// components/register/Step3Form.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AuthButton from '../../components/log/LogButton';
import PhotoSelector from './PhotoSelector';

interface Step3FormProps {
   jenisKelamin: string;
   setJenisKelamin: (value: string) => void;
   agama: string;
   setAgama: (value: string) => void;
   photo: string | null;
   onSelectPhoto: () => void;
   onPrev: () => void;
   onSubmit: () => void;
   loading: boolean;
}

const Step3Form: React.FC<Step3FormProps> = ({
   jenisKelamin,
   setJenisKelamin,
   agama,
   setAgama,
   photo,
   onSelectPhoto,
   onPrev,
   onSubmit,
   loading,
}) => {
   const genderOptions = ['Laki-laki', 'Perempuan'];
   const agamaOptions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'];

   return (
      <>
         <Text style={styles.label}>Jenis Kelamin</Text>
         <View style={styles.optionsContainer}>
         {genderOptions.map((gender) => (
            <TouchableOpacity
               key={gender}
               style={[
               styles.optionButton,
               jenisKelamin === gender && styles.selectedOption,
               ]}
               onPress={() => setJenisKelamin(gender)}
            >
               <Text style={[
               styles.optionText,
               jenisKelamin === gender && styles.selectedOptionText,
               ]}>
               {gender}
               </Text>
            </TouchableOpacity>
         ))}
         </View>
         
         <Text style={styles.label}>Agama</Text>
         <View style={styles.optionsContainer}>
         {agamaOptions.map((option) => (
            <TouchableOpacity
               key={option}
               style={[
               styles.optionButton,
               agama === option && styles.selectedOption,
               ]}
               onPress={() => setAgama(option)}
            >
               <Text style={[
               styles.optionText,
               agama === option && styles.selectedOptionText,
               ]}>
               {option}
               </Text>
            </TouchableOpacity>
         ))}
         </View>
         
         <Text style={styles.label}>Foto Profil</Text>
         <PhotoSelector photo={photo} onSelectPhoto={onSelectPhoto} />
         
         <View style={styles.buttonGroup}>
         <View style={styles.backBtn}>
            <AuthButton
               text="KEMBALI"
               onPress={onPrev}
            />
         </View>
         <View style={styles.nextBtn}>
            <AuthButton
               text={loading ? 'MENDAFTAR...' : 'DAFTAR'}
               onPress={onSubmit}
               disabled={loading}
            />
         </View>
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#003C3C',
      marginBottom: 10,
      marginTop: 10,
   },
   optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 15,
   },
   optionButton: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ddd',
      marginRight: 10,
      marginBottom: 10,
   },
   selectedOption: {
      backgroundColor: '#003C3C',
      borderColor: '#003C3C',
   },
   optionText: {
      color: '#555',
   },
   selectedOptionText: {
      color: '#fff',
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

export default Step3Form;