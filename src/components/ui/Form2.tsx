import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Form2Data {
    tujuan_surat?: string;
    jenis_surat?: string;
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

    const suratOptions = [
        { label: '-- Pilihlah Jenis Surat --', value: '' },
        { label: 'Surat Keterangan tidak mampu', value: 'tidak_mampu' },
        { label: 'Surat Keterangan Pindah', value: 'pindah' },
        { label: 'Surat Keterangan Kelahiran', value: 'kelahiran' },
        { label: 'Surat Keterangan Kematian', value: 'kematian' },
        { label: 'Surat Izin Mendirikan Bangunan (IMB) Sederhana', value: 'imb_sederhana' },
    ];

    const getJenisSuratLabel = (value: string) => {
        const option = suratOptions.find(opt => opt.value === value);
        return option ? option.label : suratOptions[0].label;
    };

    useEffect(() => {
        if (initialData) {
            setTujuanPengajuan(initialData.tujuan_surat || '');
            setJenisSurat(initialData.jenis_surat || '');
        }
    }, [initialData]);

    const handleNext = () => {
        if (tujuanPengajuan.length < 10) {
            Alert.alert('Tujuan pengajuan minimal 10 karakter');
            return;
        }
        if (jenisSurat) {
            const selectedOption = suratOptions.find(opt => opt.value === jenisSurat);
            const jenisSuratLabel = selectedOption ? selectedOption.label : jenisSurat;
            onDataChange({
                tujuan_surat: tujuanPengajuan,
                jenis_surat: jenisSuratLabel,
            });
            onSubmit();
        } else {
            Alert.alert('Harap isi semua field di Form 2');
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
                </View>
                <Text style={styles.fileFormat}>Minimal 10 karakter</Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Pilih Jenis Surat</Text>
                <View style={styles.pickerContainer}>
                    {/* ✅ FIX: Display the label based on the selected value */}
                    <Text style={styles.pickerLabel}>
                        {getJenisSuratLabel(jenisSurat)}
                    </Text>
                    <Picker
                        selectedValue={jenisSurat}
                        style={styles.picker}
                        onValueChange={(itemValue) => {
                            setJenisSurat(itemValue);
                        }}
                    >
                        {suratOptions.map((opt) => (
                            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                        ))}
                    </Picker>
                </View>
                <Text style={styles.fileFormat}>Pilih jenis surat yang sesuai dengan kebutuhan Anda</Text>
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
        marginLeft: 30,
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20,
        marginLeft: 30,
    },
    inputContainer: {
        marginBottom: 20,
        marginLeft: 30,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    textAreaContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: 308,
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    textArea: {
        fontSize: 16,
        minHeight: 80,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: 308,
    },
    pickerLabel: {
        position: 'absolute',
        top: 15,
        left: 10,
        fontSize: 16,
        color: 'black',
    },
    picker: {
        height: 50,
        opacity: 0, 
    },
    fileFormat: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
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
        paddingHorizontal: 50,
        alignItems: 'center',
    },
    prevButtonText: {
        fontSize: 16,
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
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Form2;