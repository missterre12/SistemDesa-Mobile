// File: components/SectionHeader.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface SectionHeaderProps {
   title: string;
   subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
   return (
      <View style={styles.container}>
         <Text variant="headlineSmall" style={styles.title}>
         {title}
         </Text>
         <Text variant="bodyMedium" style={styles.subtitle}>
         {subtitle}
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      alignItems: "baseline",
      marginBottom: 15,
   },
   title: {
      fontWeight: "bold",
      color: "#003C43",
   },
   subtitle: {
      textAlign: "left",
      maxWidth: 300,
   },
});

export default SectionHeader;
