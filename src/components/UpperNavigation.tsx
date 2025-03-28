import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface UpperNavigationProps {
   currentForm: number;
   onPress: (formNumber: number) => void;
}

const UpperNavigation: React.FC<UpperNavigationProps> = ({ currentForm, onPress }) => {
   return (
      <View style={styles.buttonContainer}>
         <TouchableOpacity
         style={[styles.button, currentForm === 1 && styles.activeButton]}
         onPress={() => onPress(1)}
         >
         <Text style={[styles.buttonText, currentForm === 1 && styles.activeButtonText]}>Data Pribadi</Text>
         </TouchableOpacity>
         <TouchableOpacity
         style={[styles.button, currentForm === 2 && styles.activeButton]}
         onPress={() => onPress(2)}
         >
         <Text style={[styles.buttonText, currentForm === 2 && styles.activeButtonText]}>Detail Permohonan</Text>
         </TouchableOpacity>
         <TouchableOpacity
         style={[styles.button, currentForm === 3 && styles.activeButton]}
         onPress={() => onPress(3)}
         >
         <Text style={[styles.buttonText, currentForm === 3 && styles.activeButtonText]}>Dokumen</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 8,
   },
   button: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      marginHorizontal: 5,
   },
   activeButton: {
      backgroundColor: 'teal',
   },
   buttonText: {
      fontSize: 14,
      color: 'gray',
      textAlign: 'center',
   },
   activeButtonText: {
      color: 'white',
   },
});

export default UpperNavigation;