import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import InfoCard from '../components/InfoCard';

type AddressType = {
  'House No.': string;
  'Street No.': string;
  'Landmark': string;
  'Post': string;
  'District': string;
  'City': string;
  'State': string;
  'Country': string;
};

const AddressScreen = () => {
  const [address, setAddress] = useState<AddressType>({
    'House No.': '123',
    'Street No.': 'Baker Street',
    'Landmark': 'Near Clock Tower',
    'Post': 'Central Post',
    'District': 'Central',
    'City': 'London',
    'State': 'England',
    'Country': 'UK',
  });

  return (
    <View style={styles.full}>
      <HeaderBar />
      <ScrollView style={styles.container}>
        <InfoCard
          title="ADDRESS"
          data={Object.entries(address).map(([label, value]) => ({ label, value }))}
          onSave={(updated) => setAddress(updated as AddressType)}
        />
      </ScrollView>
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: '#fddada',
  },
  container: {
    flex: 1,
  },
});
