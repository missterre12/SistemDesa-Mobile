import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSocket } from "../context/SocketContext";

const NotificationDropdown: React.FC = () => {
  const { notifications } = useSocket();

  return (
    <View style={styles.dropdown}>
      {notifications.length === 0 ? (
        <Text style={styles.emptyText}>Tidak ada notifikasi</Text>
      ) : (
        <ScrollView style={{ maxHeight: 250 }}>
          {notifications.map((notif, index) => (
            <View key={index} style={styles.notificationItem}>
              <Text style={styles.title}>{notif.title}</Text>
              <Text style={styles.body}>{notif.body}</Text>
              <Text style={styles.timestamp}>{notif.timestamp}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 250,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 9998,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    paddingVertical: 20,
  },
  notificationItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 8,
  },
  title: {
    fontWeight: "600",
    color: "#333",
  },
  body: {
    color: "#555",
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});

export default NotificationDropdown;
