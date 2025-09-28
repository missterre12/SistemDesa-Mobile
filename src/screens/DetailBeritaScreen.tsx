import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { BeritaStackParamList } from "../navigation/BeritaStackNavigator";

type DetailRouteProp = RouteProp<BeritaStackParamList, "DetailBerita">;

const DetailBeritaScreen = () => {
    const route = useRoute<DetailRouteProp>();
    const { title, description, imageUrl, date, reporter, location } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Image
                    source={{ uri: imageUrl || "https://via.placeholder.com/600x400" }}
                    style={styles.image}
                />
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.label}>Lokasi: <Text style={styles.text}>{location}</Text></Text>
                    <Text style={styles.label}>Pelapor: <Text style={styles.text}>{reporter}</Text></Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    backButton: {
        padding: 10,
    },
    image: {
        width: "100%",
        height: 200,
    },
    content: {
        padding: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    date: {
        color: "#888",
        marginBottom: 10,
    },
    label: {
        fontWeight: "bold",
        marginTop: 5,
    },
    text: {
        fontWeight: "normal",
    },
    description: {
        marginTop: 15,
        fontSize: 16,
        lineHeight: 22,
    },
});

export default DetailBeritaScreen;