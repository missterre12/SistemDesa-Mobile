import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';

interface FABProps {
  onPress: () => void;
}

const FAButton: React.FC<FABProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fab} onPress={onPress}>
        <Plus size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 10,
  },
  fab: {
    backgroundColor: '#003C43',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default FAButton;
