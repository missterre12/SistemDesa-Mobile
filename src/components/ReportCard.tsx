import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CustomButton from "../components/Button";

interface ReportCardProps {
    imageUrl: string;
    date: string;
    title: string;
    description: string;
    status: string;
    reporter: string;
    location: string;
    onVote: () => void;
    buttonLabel?: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
    imageUrl,
    date,
    title,
    description,
    status,
    reporter,
    location,
    onVote,
    buttonLabel = "Vote", // Default label jika tidak diberikan
}) => {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text>
                <Text style={styles.bold}>Status: </Text>
                {status}
            </Text>
            <Text>
                <Text style={styles.bold}>Pelapor: </Text>
                {reporter}
            </Text>
            <Text>
                <Text style={styles.bold}>Lokasi: </Text>
                {location}
            </Text>
            <CustomButton title={buttonLabel} onPress={onVote} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 10,
    },
    date: {
        marginTop: 8,
        color: "gray",
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
    },
    description: {
        color: "gray",
        marginVertical: 5,
    },
    bold: {
        fontWeight: "bold",
    },
});

export default ReportCard;