import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    ScrollView,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Alert,
    Text,
    Platform, // Import Platform for conditional logic
} from "react-native";
import Header from "../header/index";
import SectionHeader from "../components/SectionHeader";
import SearchBar from "../components/SearchBar";
import FAButton from "../components/FAButton";
import ReportCard from "../components/ReportCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../config";
import { useFocusEffect } from "@react-navigation/native";
import TambahDataModal from "../components/ModalLaporan";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";
import { R2_PUBLIC_URL } from '../config';

const LaporanScreen = () => {
    const [laporans, setLaporans] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [filteredLaporans, setFilteredLaporans] = useState<any[]>([]);
    const socket = useSocket();
    const { isLoggedIn } = useAuth();

    useFocusEffect(
        useCallback(() => {
            const fetchLaporans = async () => {
                if (!isLoggedIn) {
                    console.log("Not logged in, skipping data fetch.");
                    return;
                }
                try {
                    const token = await AsyncStorage.getItem("token");
                    if (!token) {
                        console.log("No token found, skipping data fetch.");
                        return;
                    }
                    const response = await axios.get(`${API_URL}/api/reports`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setLaporans(response.data.data);
                } catch (error: any) {
                    console.error(
                        "Failed to fetch laporans:",
                        error.response?.data || error.message
                    );
                    Alert.alert(
                        "Error",
                        "Gagal memuat laporan. Silakan coba login kembali."
                    );
                }
            };
            fetchLaporans();
        }, [isLoggedIn])
    );

    useEffect(() => {
        setFilteredLaporans(laporans);
    }, [laporans]);

    const handleSubmitLaporan = async (data: {
        tanggal: string;
        keluhan: string;
        deskripsi: string;
        lokasi: string;
        image: string | null;
    }) => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Error", "Sesi login berakhir. Silakan login kembali.");
                return;
            }

            if (!data.image) {
                Alert.alert("Peringatan", "Foto harus diunggah sebagai bukti laporan.");
                return;
            }

            const formData = new FormData();
            formData.append("tanggal", new Date(data.tanggal).toISOString());
            formData.append("keluhan", data.keluhan);
            formData.append("deskripsi", data.deskripsi);
            formData.append("lokasi", data.lokasi);
            formData.append("vote", "0");
            formData.append("status", "belum dikerjakan");

            if (data.image) {
                const fileName = data.image.split("/").pop();
                const fileType = "image/jpeg";

                if (Platform.OS === 'web') {
                    const response = await fetch(data.image);
                    const blob = await response.blob();
                    formData.append("photo", blob, fileName);
                } else {
                    formData.append("photo", {
                        uri: data.image,
                        name: fileName,
                        type: fileType,
                    } as any);
                }
            }
            
            const response = await axios.post(`${API_URL}/api/reports`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (socket) {
                socket.emit("notification", {
                    title: "Laporan Baru",
                    body: `Ada laporan baru: ${data.keluhan}`,
                    time: new Date(),
                });
            }

            setModalVisible(false);

            const refreshed = await axios.get(`${API_URL}/api/reports`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLaporans(refreshed.data.data);
            Alert.alert("Sukses", "Laporan berhasil ditambahkan!");
        } catch (error: any) {
            console.error(
                "Failed to submit laporan:",
                error.response?.data || error.message
            );
            Alert.alert("Error", "Gagal mengirim laporan. Silakan coba lagi.");
        }
    };

    const handleSearch = (text: string) => {
        const query = text.toLowerCase().trim();
        if (query === "") {
            setFilteredLaporans(laporans);
        } else {
            const filtered = laporans.filter((item: any) =>
                item.keluhan.toLowerCase().includes(query)
            );
            setFilteredLaporans(filtered);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
            <Header />
            <ScrollView style={styles.scrollView}>
                <View style={styles.main}>
                    <SectionHeader
                        title="Laporan Masyarakat"
                        subtitle="Laporkan masalah untuk tanggapan sigap dan cepat"
                    />
                    <SearchBar
                        placeholder="Cari Laporan..."
                        onSearch={handleSearch}
                    />

                    {filteredLaporans.length > 0 ? (
                        filteredLaporans.map((laporan) => (
                            <ReportCard
                                key={laporan.laporan_id}
                                imageUrl={laporan.photo_url ? `${R2_PUBLIC_URL}/${laporan.photo_url}` : "https://via.placeholder.com/600x400"}
                                date={laporan.tanggal}
                                title={laporan.keluhan}
                                description={laporan.deskripsi}
                                status={laporan.status}
                                nama={laporan.nama}
                                location={laporan.lokasi}
                                onVote={async () => {
                                    try {
                                        const token = await AsyncStorage.getItem("token");
                                        if (!token) {
                                            Alert.alert("Error", "Sesi login berakhir. Silakan login kembali.");
                                            return;
                                        }
                                        const updatedVote = laporan.vote + 1;

                                        await axios.patch(
                                            `${API_URL}/api/reports/${laporan.laporan_id}`,
                                            { vote: updatedVote },
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            }
                                        );

                                        setLaporans(prevLaporans => prevLaporans.map(lap =>
                                            lap.laporan_id === laporan.laporan_id ? { ...lap, vote: updatedVote } : lap
                                        ));
                                    } catch (error: any) {
                                        console.error("Vote failed:", error.response?.data || error.message);
                                    }
                                }}
                            />
                        ))
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>Tidak ada laporan yang tersedia.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={styles.fabContainer}>
                <FAButton onPress={() => setModalVisible(true)} />
            </View>

            <TambahDataModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmitLaporan}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    main: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
    },
    scrollView: {
        flex: 1,
    },
    fabContainer: {
        position: "absolute",
        bottom: 20,
        right: 100,
        zIndex: 10,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 50,
    },
    noDataText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    }
});

export default LaporanScreen;