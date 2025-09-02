import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  onProfilePress: () => void;
  onLogoutPress: () => void;
}

export default function SettingsDropdown({ onProfilePress, onLogoutPress }: Props) {
  return (
    <View style={styles.dropdown}>
      <TouchableOpacity style={styles.item} onPress={onProfilePress}>
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={onLogoutPress}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 30,
    right: -60,
    width: 100,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 9999,
  },
  item: {
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
    color: "#0F766E",
    zIndex: 9999
  },
});
