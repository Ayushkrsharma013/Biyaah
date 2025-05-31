import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DownloadBioDataButton = () => {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Download Bio-data</Text>
      </TouchableOpacity>

      <Text style={styles.flowerLine}>✽✽✽✽✽✽✽</Text>
    </View>
  );
};

export default DownloadBioDataButton;

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#701111',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Marmelad',
  },
  flowerLine: {
    marginTop: 10,
    fontSize: 16,
    color: '#db5e5e',
  },
});
