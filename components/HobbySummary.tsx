import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HobbySummaryProps {
  hobbies: string[];
}

const HobbySummary: React.FC<HobbySummaryProps> = ({ hobbies }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Hobbies</Text>
      <View style={styles.hobbyGrid}>
        {hobbies.map((hobby, index) => (
          <View key={index} style={styles.hobbyBox}>
            <Text style={styles.hobbyText}>{hobby}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default HobbySummary;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff7f7',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#701111',
    marginBottom: 16,
    textAlign: 'center',
  },
  hobbyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  hobbyBox: {
    backgroundColor: '#fdeaea',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    margin: 6,
    borderColor: '#701111',
    borderWidth: 1,
  },
  hobbyText: {
    color: '#701111',
    fontSize: 14,
  },
});
