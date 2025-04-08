// components/Header.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface HeaderProps {
   title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
   return (
      <View style={styles.header}>
         <Text style={styles.title}>{title}</Text>
         <Image
            source={require('../../assets/daun.png')}
            style={styles.image}
            resizeMode="contain"
         />
      </View>
   );
};

const styles = StyleSheet.create({
   header: {
      backgroundColor: '#003C3C',
      width: 400,
      height: 150,
      borderBottomRightRadius: 80,
      paddingLeft: 40,
      paddingTop: 20,
      justifyContent: 'center',
      alignItems: 'baseline',
   },
   title: {
      color: '#fff',
      fontSize: 32,
      fontWeight: 'bold',
   },
   image: {
      position: 'absolute',
      bottom: 2,
      right: 18,
      width: width * 0.5,
      height: 110,
   },
});

export default Header;
