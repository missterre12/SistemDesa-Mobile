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
import * as ImagePicker from "expo-image-picker";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../config";

export default function EditProfileScreen() {
    const [photo, setPhoto] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
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

                // If the photo is just a filename or blob, construct the URL
                if (user.photo) {
                    setPhoto(`${API_URL}/uploads/${user.photo}`);
                } else {
                    setPhoto(user.photo); // already base64
                }
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };

        fetchUser();
    }, []);

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
            base64: true,
        });

        if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            const base64 = asset.base64;
            const uri = asset.uri;
            const extension = uri.split(".").pop()?.toLowerCase();

            const mimeType =
                extension === "png"
                    ? "image/png"
                    : extension === "jpg" || extension === "jpeg"
                        ? "image/jpeg"
                        : "image/jpeg"; // fallback

            if (base64) {
                setPhoto(`data:${mimeType};base64,${base64}`);
            } else {
                setPhoto(uri); // fallback
            }
        }
    };

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token || !userData) return;

            const formData = new FormData();
            formData.append("username", userData.username);
            formData.append("email", userData.email);
            formData.append("alamat", userData.alamat);

            if (password && password.length >= 6) {
                formData.append("password", password); 
            }

            if (photo && !photo.startsWith(API_URL)) {
                if (photo.startsWith("data:image")) {
                    // It's base64
                    formData.append("photo", photo);
                } else {
                    // It's file URI
                    const filename = photo.split("/").pop();
                    const match = /\.(\w+)$/.exec(filename || "");
                    const type = match ? `image/${match[1]}` : `image`;

                    formData.append("photo", {
                        uri: photo,
                        name: filename,
                        type,
                    } as any);
                }
            }

            const decoded: any = jwtDecode(token);
            await axios.patch(`${API_URL}/api/users/${decoded.user_id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            Alert.alert("Berhasil", "Profil berhasil diperbarui.");
        } catch (error) {
            console.error(error);
            Alert.alert("Gagal", "Terjadi kesalahan saat menyimpan.");
        }
    };

    const isPhotoValid =
        photo &&
        (photo.startsWith("http") ||
            photo.startsWith("file:") ||
            photo.startsWith("data:image"));

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={handlePickImage} style={styles.imageContainer}>
                {isPhotoValid ? (
                    <Image source={{ uri: photo }} style={styles.image} />
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
                    <Text style={styles.label}>{key.toUpperCase()}</Text>
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
