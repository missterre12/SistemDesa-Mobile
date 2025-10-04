import { createStackNavigator } from "@react-navigation/stack";
import LayananScreen from "../screens/LayananScreen";
import AjukanSuratScreen from "../screens/AjukanSurat"; 

const Stack = createStackNavigator<LayananStackParamList>();

export type LayananStackParamList = {
  LayananUtama: undefined;
  AjukanSurat: undefined;
};

const LayananStackNavigator = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="LayananUtama" component={LayananScreen} />
         <Stack.Screen name="AjukanSurat" component={AjukanSuratScreen} />
      </Stack.Navigator>
   );
};

export default LayananStackNavigator;
