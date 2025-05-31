import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ProfileCard = ({ image }: { image: any }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 200,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#db5e5e',
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
