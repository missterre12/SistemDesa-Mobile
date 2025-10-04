// screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation';
import Header from '../components/log/Header';
import InputField from '../components/log/InputField';
import AuthButton from '../components/log/LogButton';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/api/login`, {
                username: email,
                password,
            });

            const token = res.data.token;
            const user = res.data.user;

            await login(token);

            await AsyncStorage.setItem("userId", user.user_id.toString());

            console.log("User logged in:", user.user_id);

            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.error("Login failed:", error);
            Alert.alert("Email atau password salah");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Header title="LOGIN" />
                <Text style={styles.appTitle}>Desa Hamparan Perak</Text>
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
