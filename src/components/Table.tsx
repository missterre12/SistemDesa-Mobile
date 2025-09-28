import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface TableRow {
   no: number;
   nama: string;
   jenisSurat: string;
   tanggal: string;
   status: string;
}

interface TableProps {
   data: TableRow[];
}

const Table: React.FC<TableProps> = ({ data }) => {
   const tableHeaders = ['No', 'Nama', 'Jenis Surat', 'Tanggal', 'Status'];

   return (
      <ScrollView horizontal={true}>
         <View style={styles.table}>
         {/* Header Tabel */}
         <View style={styles.headerRow}>
            {tableHeaders.map((header, index) => (
               <Text key={index} style={styles.headerCell}>
               {header}
               </Text>
            ))}
         </View>

         {/* Baris Data */}
         {data.map((row, index) => (
            <View key={index} style={styles.dataRow}>
               <Text style={styles.dataCell}>{row.no}</Text>
               <Text style={styles.dataCell}>{row.nama}</Text>
               <Text style={styles.dataCell}>{row.jenisSurat}</Text>
               <Text style={styles.dataCell}>{row.tanggal}</Text>
               <Text style={styles.dataCell}>{row.status}</Text>
            </View>
         ))}
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   table: {
      borderWidth: 1,
      borderColor: '#ccc',
   },
   headerRow: {
      flexDirection: 'row',
      backgroundColor: '#f0f0f0',
   },
   dataRow: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderColor: '#ccc',
   },
   headerCell: {
      flex: 1,
      padding: 10,
      fontWeight: 'bold',
      textAlign: 'center',
   },
   dataCell: {
      flex: 1,
      padding: 10,
      textAlign: 'center',
   },
});

export default Table;