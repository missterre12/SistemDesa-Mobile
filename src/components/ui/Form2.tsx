import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

interface Form2Data {
  tujuanPengajuan?: string;
  jenisSurat?: string;
}

interface Form2Props {
  onSubmit: () => void;
  onPrev: () => void;
  onDataChange: (data: Form2Data) => void;
  initialData?: Form2Data;
}

const Form2: React.FC<Form2Props> = ({ onSubmit, onPrev, onDataChange, initialData }) => {
  const [tujuanPengajuan, setTujuanPengajuan] = useState<string>('');
  const [jenisSurat, setJenisSurat] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setTujuanPengajuan(initialData.tujuanPengajuan || '');
      setJenisSurat(initialData.jenisSurat || '');
    }
  }, [initialData]);

  const handleNext = () => {
    if (tujuanPengajuan && jenisSurat) {
      onDataChange({ tujuanPengajuan, jenisSurat });
      onSubmit();
    } else {
      alert('Harap isi semua field di Form 2');
    }
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Permohonan</Text>
      <Text style={styles.subtitle}>Masukkan detail permohonan surat Anda</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tujuan Pengajuan</Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Jelaskan tujuan pengajuan ini"
            value={tujuanPengajuan}
            onChangeText={setTujuanPengajuan}
            multiline
            textAlignVertical="top"
          />
          {Platform.OS === 'ios' && <Feather name="chevron-down" size={20} color="gray" style={styles.dropdownIcon} />}
          {Platform.OS === 'android' && <Feather name="chevron-down" size={20} color="gray" style={styles.dropdownIcon} />}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pilih Jenis Surat</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={jenisSurat}
            style={styles.picker}
            onValueChange={(itemValue) => setJenisSurat(itemValue)}
          >
            <Picker.Item label="-- Pilihlah Jenis Surat --" value="" />
            <Picker.Item label="Surat Keterangan tidak mampu" value="tidak_mampu" />
            <Picker.Item label="Surat Keterangan Pindah" value="pindah" />
            <Picker.Item label="Surat Keterangan Kelahiran" value="kelahiran" />
            <Picker.Item label="Surat Keterangan Kematian" value="kematian" />
            <Picker.Item label="Surat Izin Mendirikan Bangunan (IMB) Sederhana" value="imb_sederhana" />
          </Picker>
        </View>
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
          <Text style={styles.prevButtonText}>Kembali</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Selanjutnya</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textArea: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8, 
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    ...(Platform.OS === 'android' && {
      paddingHorizontal: 10,
      paddingVertical: 5,
    }),
  },
  picker: {
    height: 50, 
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  prevButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  prevButtonText: {
    fontSize: 18,
    color: 'gray',
  },
  nextButton: {
    backgroundColor: '#003C43',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Form2;