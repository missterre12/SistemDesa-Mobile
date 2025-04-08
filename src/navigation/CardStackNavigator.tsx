import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home"; 
import AboutScreen from "../screens/AboutScreen"; 
import BeritaDesaScreen from "../screens/BeritaScreen";
import LayananScreen from "../screens/LayananScreen"
import LaporanScreen from "../screens/LaporanScreen";
import MainTabs from "../header/index";

const Stack = createStackNavigator();

export default function CardStackNavigator() {
   return (
      <Stack.Navigator initialRouteName="Home">
         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
         <Stack.Screen name="Tentang Desa" component={AboutScreen} />
         <Stack.Screen name="Layanan Desa" component={LayananScreen} />
         <Stack.Screen name="Berita Desa" component={BeritaDesaScreen} />
         <Stack.Screen name="Laporan Desa" component={LaporanScreen}/>
         <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
   );
}
