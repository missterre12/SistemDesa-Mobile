import React from "react";
import { View } from "react-native";
import ReportCard from "../components/ReportCard";

// BeritaList will receive the news data and a navigation function as props
const BeritaList = ({ beritas, navigation }) => {
    return (
        <View>
            {beritas.map((berita: any) => (
                <ReportCard
                    key={berita.berita_id}
                    imageUrl={berita.photo ? `data:image/jpeg;base64,${berita.photo}` : "https://via.placeholder.com/600"}
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
                            imageUrl: berita.photo ? `data:image/jpeg;base64,${berita.photo}` : "https://via.placeholder.com/600",
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
            ))}
        </View>
    );
};

export default BeritaList;