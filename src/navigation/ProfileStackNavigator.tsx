import React from "react";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import ProfilScreen from "../screens/ProfilScreen";
import EditProfileScreen from "../screens/EditProfilScreen";

type Props = {
    setIsLoggedIn: (val: boolean) => void;
};

// Define the navigation parameter types
export type ProfilStackParamList = {
    Profil: undefined; // The Profil screen doesn't receive initial params from here
    EditProfile: { 
        onUpdate: (updatedUser: any) => void; 
    };
};

const ProfileStack = createNativeStackNavigator<ProfilStackParamList>();

// Define the props for ProfilScreen, including navigation props and custom props
type ProfilScreenProps = NativeStackScreenProps<ProfilStackParamList, 'Profil'> & Props;

const ProfileStackNavigator: React.FC<Props> = ({ setIsLoggedIn }) => {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: true }}>
            <ProfileStack.Screen
                name="Profil"
                options={{ title: "Profil" }}
            >
                {(props: any) => <ProfilScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
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