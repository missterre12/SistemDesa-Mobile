// components/register/Step1Form.tsx
import React from 'react';
import InputField from '../../components/log/InputField';
import AuthButton from '../../components/log/LogButton';

interface Step1FormProps {
   name: string;
   setName: (value: string) => void;
   username: string;
   setUsername: (value: string) => void;
   email: string;
   setEmail: (value: string) => void;
   password: string;
   setPassword: (value: string) => void;
   confirmPassword: string;
   setConfirmPassword: (value: string) => void;
   onNext: () => void;
   loading: boolean;
}

const Step1Form: React.FC<Step1FormProps> = ({
   name,
   setName,
   username,
   setUsername,
   email,
   setEmail,
   password,
   setPassword,
   confirmPassword,
   setConfirmPassword,
   onNext,
   loading,
}) => {
   return (
      <>
         <InputField
         label="Nama Lengkap"
         placeholder="Masukkan nama lengkap..."
         value={name}
         onChangeText={setName}
         />
         <InputField
         label="Username"
         placeholder="Masukkan username..."
         value={username}
         onChangeText={setUsername}
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
         text="LANJUTKAN"
         onPress={onNext}
         disabled={loading}
         />
      </>
   );
};

export default Step1Form;