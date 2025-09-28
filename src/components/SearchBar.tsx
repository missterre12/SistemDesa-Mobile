import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'; // Tambahkan Text
import { Search, XCircle } from 'lucide-react-native';

interface SearchBarProps {
  onSearch: (searchText: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Cari...' }) => {
   const [searchText, setSearchText] = useState('');

   const handleSearch = () => {
      onSearch(searchText);
   };

   const handleClear = () => {
      setSearchText('');
      onSearch('');
   };

   return (
      <View style={styles.container}>
         <TextInput
         style={styles.input}
         placeholder={placeholder}
         value={searchText}
         onChangeText={setSearchText}
         onSubmitEditing={handleSearch}
         />
         {searchText.length > 0 && (
         <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <XCircle size={24} color="#888" />
         </TouchableOpacity>
         )}
         <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
         <Search size={24} color="#003C43" />
         </TouchableOpacity>
         {/* Tambahkan Text untuk menampilkan hasil pencarian (contoh) */}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      paddingHorizontal: 10,
      margin: 10,
   },
   input: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
   },
   searchButton: {
      padding: 8,
   },
   clearButton: {
      padding: 8,
   },
   searchText: { // Style untuk Text hasil pencarian
      marginTop: 5,
      fontSize: 12,
      color: "#003C43",
   },
});

export default SearchBar;