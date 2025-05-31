import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MatchProfileCard = ({ name, age, gotra, occupation, location, interest, image }: any) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.profile} />
      <View style={styles.info}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{name}</Text>

        <Text style={styles.label}>Age</Text>
        <Text style={styles.value}>{age} Yrs</Text>

        <Text style={styles.label}>Gotra</Text>
        <Text style={styles.value}>{gotra}</Text>

        <Text style={styles.label}>Occupation</Text>
        <Text style={styles.value}>{occupation}</Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{location}</Text>

        <Text style={styles.label}>Interests</Text>
        <Text style={styles.value}>{interest}</Text>
      </View>

      <TouchableOpacity style={styles.arrowBtn}>
        <Text style={styles.arrow}>➔</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchProfileCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff0f0',
    borderRadius: 16,
    padding: 12,
    margin: 8,
    width: '45%',
    elevation: 3,
    shadowColor: '#d66',
  },
  profile: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  info: {
    gap: 2,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Marmelad',
    color: '#701111',
  },
  value: {
    fontSize: 12,
    fontFamily: 'Marmelad',
    marginBottom: 2,
    color: '#333',
  },
  arrowBtn: {
    alignSelf: 'flex-end',
    marginTop: 6,
    padding: 4,
  },
  arrow: {
    fontSize: 18,
    color: '#701111',
  },
});
