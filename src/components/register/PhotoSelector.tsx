// components/register/PhotoSelector.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'lucide-react-native';

interface PhotoSelectorProps {
   photo: string | null;
   onSelectPhoto: () => void;
}

const PhotoSelector: React.FC<PhotoSelectorProps> = ({ photo, onSelectPhoto }) => {
   return (
      <TouchableOpacity style={styles.photoSelector} onPress={onSelectPhoto}>
         {photo ? (
         <Image source={{ uri: photo }} style={styles.photoPreview} />
         ) : (
         <View style={styles.photoPlaceholder}>
            <Camera size={40} color="#003C3C" />
            <Text style={styles.photoText}>Pilih Foto</Text>
         </View>
         )}
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   photoSelector: {
      width: 120,
      height: 120,
      borderRadius: 60,
      overflow: 'hidden',
      marginVertical: 15,
      alignSelf: 'center',
   },
   photoPlaceholder: {
      width: '100%',
      height: '100%',
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
   },
   photoPreview: {
      width: '100%',
      height: '100%',
   },
   photoText: {
      marginTop: 8,
      color: '#003C3C',
   },
});

export default PhotoSelector;