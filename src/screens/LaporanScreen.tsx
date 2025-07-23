import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    ScrollView,
    SafeAreaView,
    StatusBar,
    StyleSheet,
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

const LaporanScreen = () => {
    const [laporans, setLaporans] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [filteredLaporans, setFilteredLaporans] = useState<any[]>([]);

    // Fetch laporans every time screen is focused
    useFocusEffect(
        useCallback(() => {
            const fetchLaporans = async () => {
                try {
                    const token = await AsyncStorage.getItem("token");
                    const response = await axios.get(`${API_URL}/api/reports`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setLaporans(response.data.data);
                } catch (error: any) {
                    console.error(
                        "Failed to fetch laporans:",
                        error.response?.data || error.message
                    );
                }
            };

            fetchLaporans();
        }, [])
    );

    useEffect(() => {
        setFilteredLaporans(laporans);
    }, [laporans]);


    const handleSubmitLaporan = async (data: {
        namaPelapor: string;
        tanggal: string;
        keluhan: string;
        deskripsi: string;
        lokasi: string;
        image: string | null;
    }) => {
        try {
            const token = await AsyncStorage.getItem("token");

            let photoBase64: string | undefined;

            if (data.image) {
                const response = await fetch(data.image);
                const blob = await response.blob();
                const reader = new FileReader();

                const base64Promise = new Promise<string>((resolve, reject) => {
                    reader.onloadend = () => {
                        const result = reader.result as string;
                        resolve(result); // full data URL, e.g., "data:image/jpeg;base64,..."
                    };
                    reader.onerror = reject;
                });

                reader.readAsDataURL(blob);
                photoBase64 = await base64Promise;
            }

            // Build payload conditionally
            const payload: any = {
                nama: data.namaPelapor,
                tanggal: new Date(data.tanggal).toISOString(),
                keluhan: data.keluhan,
                deskripsi: data.deskripsi,
                lokasi: data.lokasi,
                vote: 0,
                status: "belum dikerjakan",
                photo:
                    photoBase64 ??
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
            };

            if (photoBase64) {
                payload.photo = photoBase64;
            }

            await axios.post(`${API_URL}/api/reports`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setModalVisible(false);

            const refreshed = await axios.get(`${API_URL}/api/reports`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLaporans(refreshed.data.data);
        } catch (error: any) {
            console.error(
                "Failed to submit laporan:",
                error.response?.data || error.message
            );
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
                        onSearch={(text) => {
                            const query = text.toLowerCase().trim();
                            if (query === "") {
                                setFilteredLaporans(laporans); // Reset to full list on empty input
                            } else {
                                const filtered = laporans.filter((item: any) =>
                                    item.keluhan.toLowerCase().includes(query)
                                );
                                setFilteredLaporans(filtered); // Show filtered results
                            }
                        }}

                    />

                    {filteredLaporans.map((laporan) => ( 
                        <ReportCard
                            key={laporan.laporan_id}
                            imageUrl={laporan.photo}
                            date={laporan.tanggal}
                            title={laporan.keluhan}
                            description={laporan.deskripsi}
                            status={laporan.status}
                            reporter={laporan.nama}
                            location={laporan.lokasi}
                            onVote={async () => {
                                try {
                                    const token = await AsyncStorage.getItem("token");
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

                                    const refreshed = await axios.get(`${API_URL}/api/reports`, {
                                        headers: { Authorization: `Bearer ${token}` },
                                    });
                                    setLaporans(refreshed.data.data);
                                } catch (error: any) {
                                    console.error(
                                        "Vote failed:",
                                        error.response?.data || error.message
                                    );
                                }
                            }}
                        />
                    ))}
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
});

export default LaporanScreen;
