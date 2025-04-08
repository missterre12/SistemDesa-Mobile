// components/AuthButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
   text: string;
   onPress: () => void;
   disabled?: boolean;
   type?: 'primary' | 'secondary';
}

const AuthButton: React.FC<Props> = ({ text, onPress, disabled = false, type = 'primary' }) => {
   return (
      <TouchableOpacity
         style={[styles.button, type === 'secondary' ? styles.secondary : styles.primary]}
         onPress={onPress}
         disabled={disabled}
      >
         <Text style={[styles.text, type === 'secondary' ? styles.secondaryText : styles.primaryText]}>
         {text}
         </Text>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   button: {
      borderRadius: 15,
      padding: 15,
      alignItems: 'center',
      marginBottom: 15,
   },
   primary: {
      backgroundColor: '#003C3C',
   },
   secondary: {
      backgroundColor: '#D9D9D9',
   },
   text: {
      fontWeight: 'bold',
   },
   primaryText: {
      color: '#fff',
   },
   secondaryText: {
      color: '#003C3C',
   },
});

export default AuthButton;
