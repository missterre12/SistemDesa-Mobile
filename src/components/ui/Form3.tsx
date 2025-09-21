import React, { useState, useEffect } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Form3Data {
    ktp_photo?: string; 
    kk_photo?: string; 
    setujuPernyataan?: boolean;
}

interface Form3Props {
    onSubmit: () => void;
    onPrev: () => void;
    onDataChange: (data: Form3Data) => void;
    initialData?: Form3Data;
}

const Form3: React.FC<Form3Props> = ({ onSubmit, onPrev, onDataChange, initialData }) => {
    const [ktpLocalUri, setKtpLocalUri] = useState<string | null>(null);
    const [kkLocalUri, setKkLocalUri] = useState<string | null>(null);
    const [isAgreed, setIsAgreed] = useState<boolean>(false);

    useEffect(() => {
        if (initialData) {
            if (initialData.ktp_photo) setKtpLocalUri(initialData.ktp_photo);
            if (initialData.kk_photo) setKkLocalUri(initialData.kk_photo);
            if (initialData.setujuPernyataan !== undefined) {
                setIsAgreed(initialData.setujuPernyataan);
            }
        }
    }, [initialData]);

    const pickImage = (type: 'ktp' | 'kk') => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode, response.errorMessage);
                Alert.alert('Error', `Gagal memilih gambar: ${response.errorMessage}`);
            } else if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                if (uri) {
                    if (type === 'ktp') {
                        setKtpLocalUri(uri);
                        onDataChange({ ...initialData, ktp_photo: uri });
                    } else {
                        setKkLocalUri(uri);
                        onDataChange({ ...initialData, kk_photo: uri });
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

    if (!ktpLocalUri || !kkLocalUri) {
        Alert.alert('Unggah Dokumen', 'Harap unggah scan KTP dan Kartu Keluarga.');
        return;
    }
    
    const finalData = {
        ktp_photo: ktpLocalUri,
        kk_photo: kkLocalUri,
        setujuPernyataan: isAgreed,
    };
    
    onDataChange(finalData);
    onSubmit();
};

    const toggleAgreement = () => {
        const newAgreementState = !isAgreed;
        setIsAgreed(newAgreementState);
        onDataChange({ ...initialData, setujuPernyataan: newAgreementState });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Unggah Dokumen</Text>
            <Text style={styles.subtitle}>Lengkapi formulir berikut untuk mengajukan permohonan surat</Text>

            {/* KTP */}
            <View style={styles.documentContainer}>
                <Text style={styles.label}>Scan KTP</Text>
                <TouchableOpacity style={styles.filePicker} onPress={() => pickImage('ktp')}>
                    <Text style={styles.filePickerText}>{ktpLocalUri ? 'Ganti Gambar' : 'Pilih File'}</Text>
                    <Feather name="upload" size={20} color="gray" />
                </TouchableOpacity>
                {ktpLocalUri && (
                    <View style={styles.imagePreviewContainer}>
                        <Image source={{ uri: ktpLocalUri }} style={styles.imagePreview} />
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => {
                                setKtpLocalUri(null);
                                onDataChange({ ...initialData, ktp_photo: undefined });
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
                    <Text style={styles.filePickerText}>{kkLocalUri ? 'Ganti Gambar' : 'Pilih File'}</Text>
                    <Feather name="upload" size={20} color="gray" />
                </TouchableOpacity>
                {kkLocalUri && (
                    <View style={styles.imagePreviewContainer}>
                        <Image source={{ uri: kkLocalUri }} style={styles.imagePreview} />
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => {
                                setKkLocalUri(null);
                                onDataChange({ ...initialData, kk_photo: undefined });
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

// Styles
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