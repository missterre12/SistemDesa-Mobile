// screens/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation';
import Header from '../components/log/Header';
import InputField from '../components/log/InputField';
import AuthButton from '../components/log/LogButton';
import { ArrowLeft } from 'lucide-react-native';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      console.log('Registered with:', name, email, password);
      setLoading(false);
      navigation.navigate('Login');
    }, 1500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header title="REGISTER" />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#003C3C" />
          <Text style={styles.backText}>Silahkan login ke akun anda</Text>
        </TouchableOpacity>

        <View style={styles.form}>
          <InputField
            label="Nama"
            placeholder="Masukkan nama..."
            value={name}
            onChangeText={setName}
          />
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
          <InputField
            label="Konfirmasi Password"
            placeholder="Masukkan kembali password anda..."
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <AuthButton
            text={loading ? 'REGISTERING...' : 'REGISTER'}
            onPress={handleRegister}
            disabled={loading}
          />
          <Text style={styles.loginPrompt}>
            Sudah punya akun? silahkan{' '}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </Text>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 20,
  },
  backText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#003C3C',
  },
  form: {
    width: '100%',
  },
  loginPrompt: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    color: '#555',
  },
  loginLink: {
    color: '#7B61FF',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
