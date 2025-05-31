import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InfoFieldProps {
  label: string;
  value?: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value = 'Placeholder' }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default InfoField;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  label: {
    fontFamily: 'Marmelad',
    fontSize: 14,
    color: '#701111',
  },
  value: {
    fontFamily: 'Marmelad',
    fontSize: 14,
    color: '#ec9a9a',
  },
});
