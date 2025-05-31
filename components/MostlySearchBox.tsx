import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const tags = [
  'Send',
  'My Preferences',
  'Area & Locality',
  'Request',
  'Name',
  'Daily Matches',
  'Education',
  'Occupation',
];

const MostlySearchBox = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Mostly Search....</Text>
      <View style={styles.tagWrap}>
        {tags.map((label, index) => (
          <TouchableOpacity key={index} style={styles.tag}>
            <Text style={styles.tagText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MostlySearchBox;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fdeaea',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Marmelad',
    color: '#701111',
    marginBottom: 10,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'flex-start',
  },
  tag: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#db5e5e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2,
  },
  tagText: {
    fontSize: 13,
    fontFamily: 'Marmelad',
    color: '#701111',
  },
});
