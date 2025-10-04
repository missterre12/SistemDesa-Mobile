import React from 'react';
import { View, Text, StyleSheet, Image as RNImage } from 'react-native';
import { Image } from 'expo-image';
import CustomButton from '../components/Button';
import { fetch } from 'expo/fetch';

interface ReportCardProps {
  imageUrl: string;
  date: string;
  title: string;
  description: string;
  status: string;
  nama: string;
  location: string;
  locationLabel?: string;
  onVote: () => void;
  buttonDisabled?: boolean;
  buttonLabel?: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
  imageUrl,
  date,
  title,
  description,
  status,
  nama,
  location,
  locationLabel = 'Lokasi',
  onVote,
  buttonDisabled,
  buttonLabel = 'Vote',
}) => {
  const proxiedImageUrl =
    'https://si-desa2.onrender.com/api' +
    imageUrl.replace('https://pub-d7852a03f254462ab8cdffdfeadb3c66.r2.dev', '');

  return (
    <>
      <View style={styles.card}>
        <Image
          source={proxiedImageUrl}
          style={[styles.image, { backgroundColor: 'white' }]}
          contentFit="cover"
          cachePolicy="none"
          transition={250}
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
          {nama}
        </Text>
        <Text>
          <Text style={styles.bold}>{locationLabel}: </Text>
          {location}
        </Text>
        <CustomButton
          title={buttonLabel}
          onPress={onVote}
          disabled={buttonDisabled}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 'auto',
    height: 250,
    borderRadius: 10,
  },
  date: {
    marginTop: 8,
    color: 'gray',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    color: 'gray',
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default ReportCard;
