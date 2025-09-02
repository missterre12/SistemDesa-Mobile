import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
} from "react-native";
import Header from "../header/index";
import SectionHeader from "../components/SectionHeader";
import SearchBar from "../components/SearchBar";
import ReportCard from "../components/ReportCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BeritaStackParamList } from "../navigation/BeritaStackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../config";

const BeritaScreen = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<BeritaStackParamList>>();
    const [beritas, setBeritas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredBeritas, setFilteredBeritas] = useState([]);

    useEffect(() => {
        const fetchBeritas = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const response = await axios.get(`${API_URL}/api/beritas`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBeritas(response.data.data);
                setFilteredBeritas(response.data.data);
            } catch (error) {
                console.error("Gagal mengambil data berita:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBeritas();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
            <Header />
            <ScrollView style={styles.scrollView}>
                <View style={styles.main}>
                    <SectionHeader
                        title="Berita Desa"
                        subtitle="Informasi terbaru seputar kegiatan tentang desa"
                    />
                    <SearchBar
                        placeholder="Cari Berita..."
                        onSearch={(text) => {
                            const filtered = beritas.filter((item: any) =>
                                item.judul.toLowerCase().includes(text.toLowerCase())
                            );
                            setFilteredBeritas(filtered);
                        }}
                    />
                    {loading ? (
                        <Text>Memuat berita...</Text>
                    ) : (
                        filteredBeritas.map((berita: any) => (
                            <ReportCard
                                key={berita.berita_id}
                                imageUrl={berita.photo ? `data:image/jpeg;base64,${berita.photo}` : "https://via.placeholder.com/600x400"}
                                date={new Date(berita.tanggal).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                                title={berita.judul}
                                description={
                                    berita.kontent.length > 100
                                        ? berita.kontent.slice(0, 100) + "..."
                                        : berita.kontent
                                }
                                status={berita.status}
                                reporter="Admin Desa"
                                location={berita.kategori}
                                buttonLabel="Baca Selengkapnya"
                                onVote={() =>
                                    navigation.navigate("DetailBerita", {
                                        title: berita.judul,
                                        description: berita.kontent,
                                        imageUrl: berita.photo
                                            ? `data:image/jpeg;base64,${berita.photo}`
                                            : "https://via.placeholder.com/600x400",
                                        date: new Date(berita.tanggal).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }),
                                        reporter: "Admin Desa",
                                        location: berita.kategori,
                                    })
                                }
                            />
                        ))
                    )}

                </View>
            </ScrollView>
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
});

export default BeritaScreen;
