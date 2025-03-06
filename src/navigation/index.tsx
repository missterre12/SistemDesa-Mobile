import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native"; 
import HomeScreen from "../screens/Home";
import LayananScreen from "../screens/LayananScreen";
import LaporanScreen from "../screens/LaporanScreen";
import BeritaScreen from "../screens/BeritaScreen";

import homeIcon from '../assets/home.png';
import paperPlaneIcon from '../assets/surat.png';
import clipboardIcon from '../assets/report.png';
import newspaperIcon from '../assets/news.png';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
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
              source={homeIcon}
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
              source={paperPlaneIcon}
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
              source={clipboardIcon}
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
              source={newspaperIcon}
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
