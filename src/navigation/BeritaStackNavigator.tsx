import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BeritaScreen from "../screens/BeritaScreen";
import DetailBeritaScreen from "../screens/DetailBeritaScreen";

export type BeritaStackParamList = {
    Berita: undefined;
    DetailBerita: {
        title: string;
        description: string;
        imageUrl: string;
        date: string;
        reporter: string;
        location: string;
    };
};

const Stack = createNativeStackNavigator<BeritaStackParamList>();

const BeritaStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Berita">
            <Stack.Screen
                name="Berita"
                component={BeritaScreen}
            />
            <Stack.Screen
                name="DetailBerita"
                component={DetailBeritaScreen}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
};

export default BeritaStackNavigator;
