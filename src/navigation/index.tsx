import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";

import HomeScreen from "../screens/Home";
import LaporanScreen from "../screens/LaporanScreen";
import BeritaScreen from "../screens/BeritaScreen";
import LayananStackNavigator from "./LayananStackNavigator"; // Import LayananStackNavigator

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0F766E",
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
              source={require('../assets/navigations/home.png')}
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
              source={require('../assets/navigations/surat.png')}
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
              source={require('../assets/navigations/report.png')}
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
              source={require('../assets/navigations/news.png')}
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
  );
}

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}