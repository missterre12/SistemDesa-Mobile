import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilScreen from "../screens/ProfilScreen";

type Props = {
   setIsLoggedIn: (val: boolean) => void;
};

const Stack = createNativeStackNavigator();

const ProfileStackNavigator: React.FC<Props> = ({ setIsLoggedIn }) => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: true }}>
         <Stack.Screen
         name="Profil"
         options={{ title: "Profil" }}
         >
         {(props) => <ProfilScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
         </Stack.Screen>
      </Stack.Navigator>
   );
};

export default ProfileStackNavigator;
