// in src/screens/EditProfilScreen.tsx

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../config";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfilStackParamList } from "../navigation/ProfileStackNavigator";
import { R2_PUBLIC_URL } from '../config';

type EditProfileScreenNavigationProp = StackNavigationProp<ProfilStackParamList, 'EditProfile'>;

export default function EditProfileScreen() {
    const [photo, setPhoto] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation<EditProfileScreenNavigationProp>();
    const route = useRoute();
    const { onUpdate } = route.params as any; // Get the onUpdate callback

    const fetchUser = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) return;

            const decoded: any = jwtDecode(token);
            const res = await axios.get(`${API_URL}/api/users/${decoded.user_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const user = res.data.data;
            setUserData(user);
            setPhoto(user.photo_url || null);
        } catch (error) {
            console.error("Error loading user data:", error);
            Alert.alert("Error", "Gagal memuat data pengguna.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handlePickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.error('ImagePicker Error: ', response.errorCode, response.errorMessage);
                Alert.alert('Error', 'Gagal memilih gambar.');
            } else if (response.assets && response.assets.length > 0) {
                const asset = response.assets[0];
                setPhoto(asset.uri || null); 
                setSelectedFile(asset);
            }
        });
    };

    const handleSave = async () => {
        if (!userData) return;
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Gagal", "Token tidak ditemukan.");
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append("username", userData.username);
            formData.append("email", userData.email);
            formData.append("alamat", userData.alamat);

            if (password && password.length >= 6) {
                formData.append("password", password);
            }

            if (selectedFile) {
                const filename = selectedFile.uri?.split("/").pop();
                const match = /\.(\w+)$/.exec(filename || "");
                const type = match ? `image/${match[1]}` : `image/jpeg`;

                formData.append("photo", {
                    uri: selectedFile.uri,
                    name: filename,
                    type,
                } as any);
            } else {
                console.log("No new photo selected.");
            }

            const decoded: any = jwtDecode(token);
            const res = await axios.patch(`${API_URL}/api/users/${decoded.user_id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            const newUserData = res.data.data;

            if (onUpdate) {
                onUpdate(newUserData); // ✅ Pass the new data back to ProfilScreen
            }
            
            Alert.alert("Berhasil", "Profil berhasil diperbarui.", [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.goBack();
                    },
                },
            ]);
        } catch (error: any) {
            console.error("Error saving profile:", error.response?.data || error.message);
            Alert.alert("Gagal", "Terjadi kesalahan saat menyimpan.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={handlePickImage} style={styles.imageContainer}>
                {photo ? (
                    <Image source={{ uri: `${R2_PUBLIC_URL}/${userData.photo_url}` }} style={styles.image} />
                ) : (
                    <Text style={styles.imagePlaceholder}>Pick Photo</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={userData?.username || ""}
                onChangeText={(text) => setUserData({ ...userData, username: text })}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={userData?.email || ""}
                onChangeText={(text) => setUserData({ ...userData, email: text })}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Text style={styles.label}>Alamat</Text>
            <TextInput
                style={styles.input}
                value={userData?.alamat || ""}
                onChangeText={(text) => setUserData({ ...userData, alamat: text })}
            />

            {["NIK", "nama", "jenis_kel", "agama", "role"].map((key) => (
                <View key={key}>
                    <Text style={styles.label}>
                        {key === "NIK"
                            ? key.toUpperCase()
                            : key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                    </Text>
                    <TextInput
                        style={[styles.input, styles.disabledInput]}
                        value={userData?.[key] || ""}
                        editable={false}
                    />
                </View>
            ))}

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        alignSelf: "center",
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#ccc",
        textAlign: "center",
        textAlignVertical: "center",
        lineHeight: 100,
        color: "#666",
    },
    label: {
        marginTop: 10,
        marginBottom: 4,
        fontWeight: "bold",
        color: "#0F766E",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    disabledInput: {
        backgroundColor: "#f0f0f0",
        color: "#999",
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: "#0F766E",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});