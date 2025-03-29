// navigation/index.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import LaporanScreen from "../screens/LaporanScreen";
import BeritaScreen from "../screens/BeritaScreen";
import LayananStackNavigator from "./LayananStackNavigator";
import CardStackNavigator from "./CardStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator"; // Import Stack Navigator Profil
import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import createNativeStackNavigator

Asset.loadAsync([
  ...NavigationAssets,
  require("../assets/navigations/home.png"),
  require("../assets/navigations/surat.png"),
  require("../assets/navigations/report.png"),
  require("../assets/navigations/news.png"),
]);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // Tambahkan Stack Navigator

const AppNavigator = () => {
  return (
    <NavigationContainer
      linking={{
        prefixes: ["helloworld://"],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    >
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="ProfileStack" component={ProfileStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#f8f8f8",
            paddingBottom: 5,
          },
          tabBarActiveTintColor: "#0F766E",
        }}
      >
        <Tab.Screen
          name="Beranda"
          component={CardStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/navigations/home.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Layanan Surat"
          component={LayananStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/navigations/surat.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Laporan"
          component={LaporanScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/navigations/report.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Berita"
          component={BeritaScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/navigations/news.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
      </Tab.Navigator>
  )
}

export default AppNavigator;