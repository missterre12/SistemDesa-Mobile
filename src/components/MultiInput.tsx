import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Form1 from '../components/ui/Form1';
import Form2 from '../components/ui/Form2';
import Form3 from '../components/ui/Form3';
import UpperNavigation from '../components/UpperNavigation';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

interface Form1Data {
   nama?: string;
   email?: string;
   nik?: string;
   tempat_lahir?: string;
   tanggal_lahir?: string;
   jenis_kelamin?: string;
   agama?: string;
   alamat?: string;
   no_hp?: string;
}

interface Form2Data {
   tujuan_surat?: string;
   jenis_surat?: string;
}

interface Form3Data {
   ktp_photo?: string;
   kk_photo?: string;
   setujuPernyataan?: boolean;
}

interface FormData {
   form1Data: Form1Data;
   form2Data: Form2Data;
   form3Data: Form3Data;
}

const MultiStepFormScreen: React.FC = () => {
   const [currentForm, setCurrentForm] = useState<number>(1);
   const [formData, setFormData] = useState<FormData>({
      form1Data: {},
      form2Data: {},
      form3Data: {},
   });

   const goToForm = (formNumber: number) => {
      setCurrentForm(formNumber);
   };

   const submitToServer = async () => {
   const token = await AsyncStorage.getItem('token');
    if (!token) {
    Alert.alert('Gagal', 'Token tidak ditemukan. Harap login ulang.');
    return;
    }

   const data = new FormData();

   // === Append text fields from form1 and form2 ===
   Object.entries(formData.form1Data).forEach(([key, value]) => {
      if (value !== undefined) data.append(key, value);
   });

   Object.entries(formData.form2Data).forEach(([key, value]) => {
      if (value !== undefined) data.append(key, value);
   });

   // === Append files from form3 ===
   const appendFile = (fieldName: string, uri?: string) => {
      if (uri) {
         data.append(fieldName, {
            uri,
            name: `${fieldName}.jpg`,
            type: 'image/jpeg',
         } as any); // cast to avoid TS errors
      }
   };

   appendFile('photo_ktp', formData.form3Data.ktp_photo);
   appendFile('photo_kk', formData.form3Data.kk_photo);
   // add other optional files like 'foto_usaha' if needed

   try {
      const response = await axios.post(
         `${API_URL}/api/letters`,
         data,
         {
            headers: {
               'Content-Type': 'multipart/form-data',
               Authorization: `Bearer ${token}`,
            },
         }
      );
      Alert.alert('Sukses', 'Data berhasil dikirim!');
      console.log('Response:', response.data);
   } catch (err: any) {
      console.error(err.response?.data || err.message);
      Alert.alert('Gagal', 'Terjadi kesalahan saat mengirim data');
   }
};


   const updateFormData = (
      formNumber: 1 | 2 | 3,
      data: Partial<FormData['form1Data'] | FormData['form2Data'] | FormData['form3Data']>
   ) => {
      let formKey: keyof FormData;
      switch (formNumber) {
         case 1:
         formKey = 'form1Data';
         break;
         case 2:
         formKey = 'form2Data';
         break;
         case 3:
         formKey = 'form3Data';
         break;
         default:
         return;
      }
      setFormData(prevState => ({
         ...prevState,
         [formKey]: { ...prevState[formKey], ...data },
      }));
   };

   return (
      <View style={styles.container}>
         <UpperNavigation currentForm={currentForm} onPress={goToForm} />

         {currentForm === 1 && (
         <Form1
            onSubmit={() => goToForm(2)}
            onDataChange={(data) => updateFormData(1, data as Partial<Form1Data>)}
            initialData={formData.form1Data}
         />
         )}
         {currentForm === 2 && (
         <Form2
            onSubmit={() => goToForm(3)}
            onPrev={() => goToForm(1)}
            onDataChange={(data) => updateFormData(2, data as Partial<Form2Data>)}
            initialData={formData.form2Data}
         />
         )}
         {currentForm === 3 && (
         <Form3
            onSubmit={submitToServer}
            onPrev={() => goToForm(2)}
            onDataChange={(data) => updateFormData(3, data as Partial<Form3Data>)}
            initialData={formData.form3Data}
         />
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
   },
});

export default MultiStepFormScreen;