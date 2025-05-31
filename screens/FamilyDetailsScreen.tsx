import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import InfoCard from '../components/InfoCard';

type FamilyType = {
  "Father’s Name": string;
  "Father’s Occupation": string;
  "Mother’s Name": string;
  "Mother’s Occupation": string;
  "Brother(s)": string;
  "Sister(s)": string;
};

const FamilyDetailsScreen = () => {
  const [family, setFamily] = useState<FamilyType>({
    "Father’s Name": 'John Doe',
    "Father’s Occupation": 'Engineer',
    "Mother’s Name": 'Jane Doe',
    "Mother’s Occupation": 'Teacher',
    "Brother(s)": '1',
    "Sister(s)": '2',
  });

  return (
    <View style={styles.full}>
      <HeaderBar />
      <ScrollView style={styles.container}>
        <InfoCard
          title="FAMILY DETAILS"
          data={Object.entries(family).map(([label, value]) => ({ label, value }))}
          onSave={(updated) => setFamily(updated as FamilyType)}
        />
      </ScrollView>
    </View>
  );
};

export default FamilyDetailsScreen;

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: '#fddada',
  },
  container: {
    flex: 1,
  },
});
