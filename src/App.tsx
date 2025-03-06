import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
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
          tabBarActiveTintColor: "#007bff",
        }}
      >
        <Tab.Screen
          name="Beranda"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./assets/home.png")}
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
          component={LayananScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("./assets/surat.png")}
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
                source={require("./assets/report.png")}
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
                source={require("./assets/news.png")}
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