import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import HomeScreen from "./screens/Home";
import LaporanScreen from "./screens/LaporanScreen";
import BeritaScreen from "./screens/BeritaScreen";
import LayananStackNavigator from "./navigation/LayananStackNavigator"; // Import LayananStackNavigator

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/navigations/home.png"),
  require("./assets/navigations/surat.png"),
  require("./assets/navigations/report.png"),
  require("./assets/navigations/news.png"),
]);

// Mencegah splash screen hilang otomatis
SplashScreen.preventAutoHideAsync();

// Buat navigator
const Tab = createBottomTabNavigator();

export function App() {
  return (
    <NavigationContainer
      linking={{
        prefixes: ["helloworld://"],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#f8f8f8",
            paddingBottom: 5
          },
          tabBarActiveTintColor: "#0F766E",
        }}
      >
        <Tab.Screen
          name="Beranda"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./assets/navigations/home.png")}
                style={{
                  width: size,
                  height: size,
                  tintColor: color
                }}
              />
            )
          }}
        />
        <Tab.Screen
          name="Layanan Surat"
          component={LayananStackNavigator} // Gunakan LayananStackNavigator di sini
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./assets/navigations/surat.png")}
                style={{
                  width: size,
                  height: size,
                  tintColor: color
                }}
              />
            )
          }}
        />
        <Tab.Screen
          name="Laporan"
          component={LaporanScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./assets/navigations/report.png")}
                style={{
                  width: size,
                  height: size,
                  tintColor: color
                }}
              />
            )
          }}
        />
        <Tab.Screen
          name="Berita"
          component={BeritaScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./assets/navigations/news.png")}
                style={{
                  width: size,
                  height: size,
                  tintColor: color
                }}
              />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}