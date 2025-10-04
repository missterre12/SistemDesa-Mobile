import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import Header from '../header/index';
import SectionHeader from '../components/SectionHeader';
import SearchBar from '../components/SearchBar';
import ReportCard from '../components/ReportCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BeritaStackParamList } from '../navigation/BeritaStackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { R2_PUBLIC_URL } from '../config';

const BeritaScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<BeritaStackParamList>>();
  const [beritas, setBeritas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchBeritas = async () => {
      if (!isLoggedIn) {
        setBeritas([]);
        setLoading(false);
        return;
      }

      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No token found. Please log in.');
          setBeritas([]);
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/api/beritas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBeritas(response.data.data);
      } catch (error: any) {
        console.error(
          'Failed to fetch news data:',
          error.response?.data || error.message,
        );
        Alert.alert('Error', 'Gagal mengambil data berita. Silakan coba lagi.');
        setBeritas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBeritas();
  }, [isLoggedIn]);

  const filteredBeritas = beritas
    .filter((item: any) => item.status === 'Dipublikasikan')
    .filter((item: any) =>
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()),
    );

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
          <SearchBar placeholder="Cari Berita..." onSearch={setSearchTerm} />
          {loading ? (
            <Text>Memuat berita...</Text>
          ) : filteredBeritas.length > 0 ? (
            filteredBeritas.map((berita: any) => (
              <ReportCard
                key={berita.berita_id}
                imageUrl={
                  berita.photo_url
                    ? `${berita.photo_url}`
                    : 'https://via.placeholder.com/600x400'
                }
                date={new Date(berita.tanggal).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
                title={berita.judul}
                description={
                  berita.konten?.length > 100
                    ? berita.konten.slice(0, 100) + '...'
                    : berita.konten
                }
                status={berita.status}
                nama="Admin Desa"
                location={berita.kategori}
                locationLabel="Kategori"
                buttonLabel="Baca Selengkapnya"
                onVote={() =>
                  navigation.navigate('DetailBerita', {
                    title: berita.judul,
                    description: berita.kontent,
                    imageUrl:
                      berita.photo || 'https://via.placeholder.com/600x400',
                    date: new Date(berita.tanggal).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }),
                    reporter: 'Admin Desa',
                    location: berita.kategori,
                  })
                }
              />
            ))
          ) : (
            <Text style={styles.noDataText}>
              Tidak ada berita yang tersedia.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  main: {
    flexGrow: 1,
    padding: 15,
  },
  scrollView: {
    flex: 1,
  },
  noDataText: {
    marginTop: 20,
    color: 'gray',
  },
});

export default BeritaScreen;
