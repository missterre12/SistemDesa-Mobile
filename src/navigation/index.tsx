import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";

import LaporanScreen from "../screens/LaporanScreen";
import ProfileStackNavigator from "./ProfileStackNavigator";
import LayananStackNavigator from "./LayananStackNavigator";
import CardStackNavigator from "./CardStackNavigator";
import BeritaStackNavigator from "./BeritaStackNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

import { useAuth } from "../context/AuthContext";

export type MainTabsParamList = {
  Beranda: undefined;
  "Layanan Surat": undefined;
  Laporan: undefined;
  Berita: undefined;
  Profil: undefined; 
};

export type RootStackParamList = {
  MainTabs: undefined;
  ProfileStack: undefined;
  Login: undefined;
  Register: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: "#fobe8", paddingBottom: 5 },
      tabBarActiveTintColor: "#0F766E",
      tabBarInactiveTintColor: "gray",
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
      component={BeritaStackNavigator}
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
);

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="MainTabs" component={MainTabs} />
          <RootStack.Screen name="ProfileStack">
            {() => <ProfileStackNavigator setIsLoggedIn={() => {}} />}
          </RootStack.Screen>
        </RootStack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
