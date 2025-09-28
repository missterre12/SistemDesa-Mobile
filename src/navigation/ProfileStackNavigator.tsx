import React from "react";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import ProfilScreen from "../screens/ProfilScreen";
import EditProfileScreen from "../screens/EditProfilScreen";

type Props = {
    setIsLoggedIn: (val: boolean) => void;
};

export type ProfilStackParamList = {
    Profil: undefined; 
    EditProfile: { 
        onUpdate: (updatedUser: any) => void; 
    };
};

const ProfileStack = createNativeStackNavigator<ProfilStackParamList>();

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