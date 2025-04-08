// components/InputField.tsx
import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

interface Props {
   label: string;
   placeholder: string;
   value: string;
   onChangeText: (text: string) => void;
   secureTextEntry?: boolean;
   keyboardType?: 'default' | 'email-address';
}

const InputField: React.FC<Props> = ({
   label,
   placeholder,
   value,
   onChangeText,
   secureTextEntry = false,
   keyboardType = 'default',
   }) => {
   return (
      <>
         <Text style={styles.label}>{label}</Text>
         <TextInput
         style={styles.input}
         placeholder={placeholder}
         value={value}
         onChangeText={onChangeText}
         secureTextEntry={secureTextEntry}
         keyboardType={keyboardType}
         />
      </>
   );
};

const styles = StyleSheet.create({
   label: {
      fontWeight: 'bold',
      marginBottom: 6,
      color: '#003C3C',
   },
   input: {
      backgroundColor: '#F2F2F2',
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
   },
});

export default InputField;
