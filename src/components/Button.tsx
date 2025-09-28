import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ButtonProps = {
   title: string;
   onPress: () => void;
   backgroundColor?: string;
   textColor?: string;
};

const CustomButton: React.FC<ButtonProps> = ({
   title,
   onPress,
   backgroundColor = "#003C43",
   textColor = "#ffffff",
}) => {
   return (
      <TouchableOpacity
         style={[styles.button, { backgroundColor }]} 
         onPress={onPress}
      >
         <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
   },
   text: {
      fontSize: 16,
      fontWeight: "bold",
   },
});

export default CustomButton;