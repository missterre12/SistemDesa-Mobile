import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Form1 from '../components/ui/Form1';
import Form2 from '../components/ui/Form2';
import Form3 from '../components/ui/Form3';
import UpperNavigation from '../components/UpperNavigation'; // Sesuaikan path jika berbeda

interface Form1Data {
   nama?: string;
   email?: string;
   // tambahkan field lain dari Form 1
}

interface Form2Data {
   tujuanPengajuan?: string;
   jenisSurat?: string;
   // tambahkan field dari Form 2
}

interface Form3Data {
   scanKTP?: string;
   scanKK?: string;
   setujuPernyataan?: boolean;
  // tambahkan field dari Form 3
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
            onSubmit={() => console.log('Submit Data:', formData)}
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