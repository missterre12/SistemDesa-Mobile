import React, { useState } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; 
import { Fontisto } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

type TambahDataModalProps = {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: {
        tanggal: string;
        keluhan: string;
        deskripsi: string;
        lokasi: string;
        image: string | null;
        namaPelapor: string;
    }) => void;
};

const TambahDataModal: React.FC<TambahDataModalProps> = ({ visible, onClose, onSubmit }) => {
    const { user } = useAuth();
    const [tanggal] = useState<string>(new Date().toISOString().split('T')[0]);
    const [keluhan, setKeluhan] = useState<string>('');
    const [deskripsi, setDeskripsi] = useState<string>('');
    const [lokasi, setLokasi] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.error('ImagePicker Error: ', response.errorCode, response.errorMessage);
                Alert.alert('Error', 'Gagal memilih gambar.');
            } else if (response.assets && response.assets.length > 0) {
                const asset = response.assets[0];
                setImage(asset.uri || null); 
            }
        });
    };

    const handleSubmit = () => {
        if (!tanggal || !keluhan || !deskripsi || !lokasi) {
            Alert.alert("Peringatan", "Harap isi semua data terlebih dahulu.");
            return;
        }
        
        onSubmit({
            tanggal,
            keluhan,
            deskripsi,
            lokasi,
            image,
            namaPelapor: user?.nama || 'Anonim'
        });

        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TextInput 
                        style={[styles.input, { backgroundColor: '#f0f0f0' }]} 
                        value={user?.nama || 'Memuat...'}
                        editable={false}
                    />

                    <Text style={styles.label}>Tanggal</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: '#f0f0f0' }]}
                        value={tanggal}
                        editable={false}
                    />

                    <Text style={styles.label}>Keluhan</Text>
                    <TextInput style={styles.input} value={keluhan} onChangeText={setKeluhan} placeholder="Masukkan keluhan" />

                    <Text style={styles.label}>Deskripsi Keluhan</Text>
                    <TextInput
                        style={styles.inputs}
                        value={deskripsi}
                        onChangeText={setDeskripsi}
                        placeholder="Deskripsi keluhan"
                        multiline
                    />

                    <Text style={styles.label}>Lokasi Laporan</Text>
                    <TextInput style={styles.input} value={lokasi} onChangeText={setLokasi} placeholder="Masukkan lokasi" />

                    <Text style={styles.label}>Bukti Laporan</Text>
                    <View style={styles.fileInputContainer}>
                        <TouchableOpacity style={styles.fileInputButton} onPress={pickImage}>
                            <Text style={styles.fileInputText}>Pilih File</Text>
                        </TouchableOpacity>
                        <Text style={styles.fileName}>{image ? "File telah dipilih" : "Tidak ada file yang dipilih"}</Text>
                        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                            <Fontisto name="cloud-up" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.fileInfo}>Format: JPG, PNG, atau PDF. Maks: 2MB</Text>

                    {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.buttonText}>Batal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Simpan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginTop: 5,
        borderRadius: 5,
    },
    inputs: {
        borderWidth: 1,
        borderColor: '#ccc',
        height: 60,
        padding: 8,
        marginTop: 5,
        borderRadius: 5,
    },
    fileInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 5,
    },
    fileInputButton: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    fileInputText: {
        fontWeight: 'bold',
    },
    fileName: {
        flex: 1,
        marginLeft: 10,
        fontSize: 12,
        color: '#555',
    },
    uploadButton: {
        backgroundColor: '#003C43',
        padding: 10,
        borderRadius: 5,
    },
    fileInfo: {
        fontSize: 12,
        color: '#777',
        marginTop: 5,
        marginBottom: 15,
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginTop: 10,
        alignSelf: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: 'grey',
    },
    saveButton: {
        backgroundColor: '#003C43',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TambahDataModal;