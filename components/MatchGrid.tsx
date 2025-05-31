import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MatchProfileCard from './cards/MatchProfileCard';

const dummyProfiles = [
  {
    name: 'Sanjana Sharma',
    age: 28,
    gotra: 'Bharadwaj',
    occupation: 'IT, TCS',
    location: 'Raipur',
    interest: 'Travel, cooking',
    image: require('../assets/image/dp3.png'),
  },
  {
    name: 'Shruti Verma',
    age: 27,
    gotra: 'Kashyap',
    occupation: 'Professor',
    location: 'Bhilai',
    interest: 'Classical Dance',
    image: require('../assets/image/dp2.png'),
  },
  // add more as needed
];

const MatchGrid = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyProfiles}
        keyExtractor={(_, i) => i.toString()}
        numColumns={2}
        renderItem={({ item }) => <MatchProfileCard {...item} />}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

export default MatchGrid;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 10,
  },
});
