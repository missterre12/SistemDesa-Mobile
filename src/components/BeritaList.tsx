import React from "react";
import { View } from "react-native";
import ReportCard from "../components/ReportCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
    DetailBerita: {
        title: string;
        description: string;
        imageUrl: string;
        date: string;
        reporter: string;
        location: string;
    };
};

type BeritaListNavigationProp = NativeStackNavigationProp<RootStackParamList, "DetailBerita">;

interface Berita {
    berita_id: string;
    photo?: string;
    tanggal: string;
    judul: string;
    kontent: string;
    status: string;
    kategori: string;
}

interface BeritaListProps {
    beritas: Berita[];
    navigation: BeritaListNavigationProp;
}

const BeritaList: React.FC<BeritaListProps> = ({ beritas, navigation }) => {
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