import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const FindMatchCard = () => {
  return (
    <View style={styles.card}>
      {/* Flower top-right */}
      <Image
        source={require('../assets/image/floral.png')}
        style={styles.flower}
        resizeMode="contain"
      />

      {/* Top-left circle hole */}
      <View style={styles.hole} />

      <Text style={styles.text}>
        Your story begins here,{'\n'}explore matches crafted just for you.
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Find My Match</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FindMatchCard;

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    backgroundColor: '#500202',
    borderRadius: 20,
    padding: 24,
    alignSelf: 'center',
    marginTop: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  flower: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  hole: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fddada',
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Marmelad',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fddada',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#500202',
    fontFamily: 'Marmelad',
  },
});
