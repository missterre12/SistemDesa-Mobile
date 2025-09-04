// screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation';
import Header from '../components/log/Header';
import InputField from '../components/log/InputField';
import AuthButton from '../components/log/LogButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<Props> = ({ navigation, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
        const res = await axios.post(`${API_URL}/api/login`, {
        username: email,
        password,
        });

        const token = res.data.token;
        await AsyncStorage.setItem('token', token);

        setLoading(false);
        onLoginSuccess(); 
    } catch (error) {
        setLoading(false);
        alert("Email atau password salah");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header title="LOGIN" />
        <Text style={styles.appTitle}>Sistem Desa Digital</Text>
        <Text style={styles.appDescription}>
          Aplikasi pelayanan masyarakat terkait surat menyurat laporan masyarakat
        </Text>

        <View style={styles.form}>
          <InputField
            label="Email"
            placeholder="Masukkan email..."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <InputField
            label="Password"
            placeholder="Masukkan password..."
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <AuthButton
            text={loading ? 'Logging in...' : 'LOGIN'}
            onPress={handleLogin}
            disabled={loading}
          />

          <Text style={styles.registerPrompt}>
            belum punya akun? silahkan tekan register
          </Text>

          <AuthButton
            text="REGISTER"
            onPress={() => navigation.navigate('Register')}
            type="secondary"
            disabled={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003C3C',
    marginTop: 30,
    textAlign: 'center',
  },
  appDescription: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 6,
    color: '#333',
  },
  form: {
    marginTop: 30,
    width: '100%',
  },
  registerPrompt: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
  },
});

export default LoginScreen;
