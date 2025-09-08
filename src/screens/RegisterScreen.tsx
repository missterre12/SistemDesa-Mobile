import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation';
import Header from '../components/log/Header';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import StepIndicator from '../components/register/StepIndicator';
import Step1Form from '../components/register/Step1Form';
import Step2Form from '../components/register/Step2Form';
import Step3Form from '../components/register/Step3Form';
import { API_URL } from '../config';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  // Step 1: Basic user data
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  // Step 2: Additional user data
  const [nik, setNik] = useState('');
  const [alamat, setAlamat] = useState('');
  const [noHp, setNoHp] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  // Step 3: Selection fields
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [agama, setAgama] = useState('');

  const [currentStep, setCurrentStep] = useState(1);
  const [showAddressDetail, setShowAddressDetail] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateStep1 = () => {
    if (!name || !username || !password || !confirmPassword || !email) {
      Alert.alert('Error', 'Semua field harus diisi');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password tidak cocok!');
      return false;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Format email tidak valid');
      return false;
    }
    return true;
  };

  // Toggle for address detail textarea
  const toggleAddressDetail = () => {
    setShowAddressDetail(!showAddressDetail);
  };

  const validateStep2 = () => {
    if (!nik || !alamat || !noHp) {
      Alert.alert('Error', 'Semua field harus diisi');
      return false;
    }
    if (nik.length !== 16) {
      Alert.alert('Error', 'NIK harus 16 digit');
      return false;
    }
    if (noHp.length < 10) {
      Alert.alert('Error', 'Nomor HP tidak valid');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!jenisKelamin || !agama) {
      Alert.alert('Error', 'Silahkan pilih jenis kelamin dan agama');
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const pickImage = () => {
    const options = {
      mediaType: 'photo' as 'photo',
      quality: 1 as 1,
    };
    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const convertToBase64 = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleRegister = async () => {
    if (!validateStep3()) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: name,
          username,
          password,
          NIK: nik,
          agama,
          alamat,
          jenis_kel: jenisKelamin,
          no_hp: noHp,
          role: "user", // Or "admin" if needed
          photo: photo ? await convertToBase64(photo) : null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registrasi gagal');
      }

      Alert.alert('Registrasi Berhasil', 'Akun berhasil dibuat!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header title="REGISTER" />
        <View style={{ paddingTop: 20 }}>
          <StepIndicator currentStep={currentStep} totalSteps={3} />
        </View>

        <View style={styles.form}>
          {currentStep === 1 && (
            <Step1Form
              name={name}
              setName={setName}
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              onNext={nextStep}
              loading={loading}
            />
          )}

          {currentStep === 2 && (
            <Step2Form
              nik={nik}
              setNik={setNik}
              alamat={alamat}
              setAlamat={setAlamat}
              noHp={noHp}
              setNoHp={setNoHp}
              showAddressDetail={showAddressDetail}
              toggleAddressDetail={toggleAddressDetail}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 3 && (
            <Step3Form
              jenisKelamin={jenisKelamin}
              setJenisKelamin={setJenisKelamin}
              agama={agama}
              setAgama={setAgama}
              photo={photo}
              onSelectPhoto={pickImage}
              onPrev={prevStep}
              onSubmit={handleRegister}
              loading={loading}
            />
          )}
        </View>

        <Text style={styles.loginPrompt}>
          Sudah punya akun? silahkan{' '}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Text>
        </Text>
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
    color: '#003C3C',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;