// File: navigation/CardStackNavigator.tsx
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home"; 
import Services from "../components/card-services"; 
import AboutScreen from "../screens/AboutScreen"; 
import MainTabs from "../header/index";
// import ProfilScreen from "../screens/ProfilScreen"

const Stack = createStackNavigator();

export default function CardStackNavigator() {
   return (
      <Stack.Navigator initialRouteName="Home">
         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
         <Stack.Screen name="Services" component={Services} />
         <Stack.Screen name="Tentang Desa" component={AboutScreen} />
         <Stack.Screen name="Main" component={MainTabs} />
         {/* <Stack.Screen name="Profil" component={ProfilScreen} />  */}
      </Stack.Navigator>
   );
}
