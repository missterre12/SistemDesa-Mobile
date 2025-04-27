import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import LaporanScreen from "../screens/LaporanScreen";
import LayananStackNavigator from "./LayananStackNavigator";
import CardStackNavigator from "./CardStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import BeritaStackNavigator from "./BeritaStackNavigator";
import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

Asset.loadAsync([
  ...NavigationAssets,
  require("../assets/navigations/home.png"),
  require("../assets/navigations/surat.png"),
  require("../assets/navigations/report.png"),
  require("../assets/navigations/news.png"),
]);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export type RootStackParamList = {
  MainTabs: undefined;
  ProfileStack: undefined;
};

export type AuthStackParamList = {
  Login: { onLoginSuccess: () => void } | undefined;
  Register: undefined;
};

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />
            )}
          </AuthStack.Screen>
          <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer
      linking={{
        prefixes: ["helloworld://"],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="MainTabs"
      >
        <Stack.Screen name="MainTabs">
          {() => <MainTabs setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="ProfileStack">
          {() => <ProfileStackNavigator setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

type MainTabsProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const MainTabs: React.FC<MainTabsProps> = ({ setIsLoggedIn }) => {
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
};

export default AppNavigator;
