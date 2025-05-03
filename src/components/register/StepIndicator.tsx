// components/register/StepIndicator.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StepIndicatorProps {
   currentStep: number;
   totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
   return (
      <View style={styles.stepIndicator}>
         {Array.from({ length: totalSteps }).map((_, index) => (
         <React.Fragment key={index}>
            <View style={[styles.step, currentStep >= index + 1 ? styles.activeStep : {}]}>
               <Text style={styles.stepText}>{index + 1}</Text>
            </View>
            {index < totalSteps - 1 && <View style={styles.stepLine} />}
         </React.Fragment>
         ))}
      </View>
   );
};

const styles = StyleSheet.create({
   stepIndicator: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      width: '80%',
   },
   step: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#e0e0e0',
      justifyContent: 'center',
      alignItems: 'center',
   },
   activeStep: {
      backgroundColor: '#003C3C',
   },
   stepText: {
      color: '#fff',
      fontWeight: 'bold',
   },
   stepLine: {
      flex: 1,
      height: 2,
      backgroundColor: '#e0e0e0',
      marginHorizontal: 5,
   },
});

export default StepIndicator;