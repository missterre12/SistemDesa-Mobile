import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import LaporanScreen from "../screens/LaporanScreen";
import LayananStackNavigator from "./LayananStackNavigator";
import CardStackNavigator from "./CardStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import BeritaStackNavigator from "./BeritaStackNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type AuthStackParamList = {
    Login: { onLoginSuccess: () => void } | undefined;
    Register: undefined;
};

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#fobe8",
                    paddingBottom: 5,
                },
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
};

const AuthStack = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
                {props => <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="MainTabs">
                        {() => <MainTabs />}
                    </Stack.Screen>
                    <Stack.Screen name="ProfileStack">
                        {() => <ProfileStackNavigator setIsLoggedIn={setIsLoggedIn} />}
                    </Stack.Screen>
                </Stack.Navigator>
            ) : (
                <AuthStack onLoginSuccess={() => setIsLoggedIn(true)} />
            )}
        </NavigationContainer>
    );
};

export default AppNavigator;
