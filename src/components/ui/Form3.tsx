import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Feather } from '@react-native-vector-icons/feather';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

interface Form3Data {
    ktp_photo?: string; // base64 string
    kk_photo?: string; // base64 string
    setujuPernyataan?: boolean;
}

interface Form3Props {
    onSubmit: () => void;
    onPrev: () => void;
    onDataChange: (data: Form3Data) => void;
    initialData?: Form3Data;
}

const Form3: React.FC<Form3Props> = ({ onSubmit, onPrev, onDataChange, initialData }) => {
    const [ktpImage, setKtpImage] = useState<string | null>(null); // uri
    const [kkImage, setKkImage] = useState<string | null>(null); // uri
    const [ktpBase64, setKtpBase64] = useState<string | null>(null);
    const [kkBase64, setKkBase64] = useState<string | null>(null);
    const [isAgreed, setIsAgreed] = useState<boolean>(false);

    useEffect(() => {
        if (initialData) {
            if (initialData.setujuPernyataan !== undefined) {
                setIsAgreed(initialData.setujuPernyataan);
            }
        }
    }, [initialData]);

    const pickImage = (type: 'ktp' | 'kk') => {
        const options = {
            mediaType: 'photo' as 'photo',
            includeBase64: true,
        };

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const asset = response.assets[0];
                if (asset.uri && asset.base64) {
                    const uri = asset.uri;
                    const base64String = asset.base64;

                    if (type === 'ktp') {
                        setKtpImage(uri);
                        setKtpBase64(base64String);
                    } else {
                        setKkImage(uri);
                        setKkBase64(base64String);
                    }
                }
            }
        });
    };

    const handleSubmit = () => {
        if (!isAgreed) {
            Alert.alert('Pernyataan', 'Harap setujui pernyataan terlebih dahulu.');
            return;
        }

        if (!ktpBase64 || !kkBase64) {
            Alert.alert('Unggah Dokumen', 'Harap unggah scan KTP dan Kartu Keluarga.');
            return;
        }

        onDataChange({
            ktp_photo: ktpBase64,
            kk_photo: kkBase64,
            setujuPernyataan: isAgreed,
        });

        onSubmit();
    };

    const toggleAgreement = () => setIsAgreed(!isAgreed);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Unggah Dokumen</Text>
            <Text style={styles.subtitle}>Lengkapi formulir berikut untuk mengajukan permohonan surat</Text>

            {/* KTP */}
            <View style={styles.documentContainer}>
                <Text style={styles.label}>Scan KTP</Text>
                <TouchableOpacity style={styles.filePicker} onPress={() => pickImage('ktp')}>
                    <Text style={styles.filePickerText}>{ktpImage ? 'Ganti Gambar' : 'Pilih File'}</Text>
                    <Feather name="upload" size={20} color="gray" />
                </TouchableOpacity>
                {ktpImage && (
                    <View style={styles.imagePreviewContainer}>
                        <Image source={{ uri: ktpImage }} style={styles.imagePreview} />
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => {
                                setKtpImage(null);
                                setKtpBase64(null);
                            }}
                        >
                            <Feather name="x" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
                <Text style={styles.fileFormat}>Format: JPG/PNG, Max: 2MB</Text>
            </View>

            {/* KK */}
            <View style={styles.documentContainer}>
                <Text style={styles.label}>Scan Kartu Keluarga</Text>
                <TouchableOpacity style={styles.filePicker} onPress={() => pickImage('kk')}>
                    <Text style={styles.filePickerText}>{kkImage ? 'Ganti Gambar' : 'Pilih File'}</Text>
                    <Feather name="upload" size={20} color="gray" />
                </TouchableOpacity>
                {kkImage && (
                    <View style={styles.imagePreviewContainer}>
                        <Image source={{ uri: kkImage }} style={styles.imagePreview} />
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => {
                                setKkImage(null);
                                setKkBase64(null);
                            }}
                        >
                            <Feather name="x" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
                <Text style={styles.fileFormat}>Format: JPG/PNG, Max: 2MB</Text>
            </View>

            {/* Agreement */}
            <View style={styles.statementContainer}>
                <Text style={styles.statementText}>
                    Dengan ini saya menyatakan bahwa data yang saya berikan adalah benar dan dapat dipertanggungjawabkan
                </Text>
                <TouchableOpacity style={styles.agreement} onPress={toggleAgreement}>
                    <View style={[styles.checkbox, isAgreed && styles.checkboxActive]}>
                        {isAgreed && <Feather name="check" size={16} color="white" />}
                    </View>
                    <Text style={styles.agreementText}>Saya setuju dengan pernyataan di atas</Text>
                </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View style={styles.navigationButtons}>
                <TouchableOpacity style={styles.prevButton} onPress={onPrev}>
                    <Text style={styles.prevButtonText}>Kembali</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Ajukan Permohonan</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// ✅ STYLES — unchanged
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginLeft: 30 },
    subtitle: { fontSize: 14, color: 'gray', marginBottom: 20, marginLeft: 30 },
    documentContainer: { marginBottom: 25, marginLeft: 30 },
    label: { fontSize: 16, marginBottom: 5 },
    filePicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        width: 308,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    filePickerText: { fontSize: 16, color: 'gray' },
    imagePreviewContainer: {
        marginTop: 10,
        position: 'relative',
        width: 308,
        height: 150,
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    imagePreview: { width: '100%', height: '100%', resizeMode: 'cover' },
    deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fileFormat: { fontSize: 12, color: 'gray', marginTop: 5 },
    statementContainer: { marginBottom: 30 },
    statementText: { fontSize: 16, lineHeight: 24, marginBottom: 10, marginLeft: 30 },
    agreement: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 30 },
    agreementText: { marginLeft: 10, fontSize: 16 },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxActive: { backgroundColor: 'teal', borderColor: 'teal' },
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
    prevButtonText: { fontSize: 16, color: 'gray' },
    submitButton: {
        backgroundColor: '#003C43',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    submitButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default Form3;