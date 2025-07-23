import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilScreen from "../screens/ProfilScreen";
import EditProfileScreen from "../screens/EditProfilScreen";

type Props = {
    setIsLoggedIn: (val: boolean) => void;
};

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator: React.FC<Props> = ({ setIsLoggedIn }) => {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: true }}>
            <ProfileStack.Screen
                name="Profil"
                options={{ title: "Profil" }}
            >
                {(props) => <ProfilScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </ProfileStack.Screen>
            <ProfileStack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ title: "Edit Profil" }}
            />
        </ProfileStack.Navigator>
    );
};

export default ProfileStackNavigator;
