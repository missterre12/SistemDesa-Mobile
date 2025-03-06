import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home";
import LayananScreen from "./screens/LayananScreen";
import LaporanScreen from "./screens/LaporanScreen";
import BeritaScreen from "./screens/BeritaScreen";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/home.png"),
  require("./assets/surat.png"),
  require("./assets/report.png"),
  require("./assets/news.png"),
]);

// Mencegah splash screen hilang otomatis
SplashScreen.preventAutoHideAsync();

// Buat navigator
const Tab = createBottomTabNavigator();

export function App() {
  return (
    <NavigationContainer
      linking={{
        prefixes: ["helloworld://"], // Sesuaikan dengan skema app.json
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    >
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Layanan" component={LayananScreen} />
        <Tab.Screen name="Laporan" component={LaporanScreen} />
        <Tab.Screen name="Berita" component={BeritaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
