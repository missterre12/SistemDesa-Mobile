import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import TambahDataModal from '../components/ModalLaporan'; // Import komponen modal

const FAB: React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    // Fungsi onSubmit yang dimatikan sementara (menerima data)
    const handleOnSubmit = (data: any) => {
        console.log('Fungsi onSubmit sementara dipanggil dengan data:', data);
        // Tidak menutup modal saat ini
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
            <Plus size={24} color="white" />
            </TouchableOpacity>

            <TambahDataModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={handleOnSubmit} // Kirimkan prop onSubmit dengan fungsi handleOnSubmit
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#003C43',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
});

export default FAB;