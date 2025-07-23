import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Notification = {
  message: string;
  timestamp: string;
};

type NotificationDropdownProps = {
  notifications: Notification[];
};

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications }) => {
  return (
    <View style={styles.dropdown}>
      {notifications.length === 0 ? (
        <Text style={styles.emptyText}>No notifications</Text>
      ) : (
        notifications.map((notif, index) => (
          <View key={index} style={styles.notificationItem}>
            <Text style={styles.message}>{notif.message}</Text>
            <Text style={styles.timestamp}>{notif.timestamp}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 50,
    right: 60,
    width: 200,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
  },
  notificationItem: {
    marginBottom: 10,
  },
  message: {
    fontWeight: "500",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
});

export default NotificationDropdown;
