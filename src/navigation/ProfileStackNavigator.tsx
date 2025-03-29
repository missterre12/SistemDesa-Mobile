// navigation/ProfileStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilScreen from '../screens/ProfilScreen';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen name="Profil" component={ProfilScreen} />
      </Stack.Navigator>
   );
};

export default ProfileStackNavigator;