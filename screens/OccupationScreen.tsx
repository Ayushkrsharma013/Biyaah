import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import InfoCard from '../components/InfoCard';

type OccupationType = {
  'Employment Type': string;
  'Company Name': string;
  'Designation': string;
  'Sector': string;
  'Monthly Salary': string;
};

const OccupationScreen = () => {
  const [occupation, setOccupation] = useState<OccupationType>({
    'Employment Type': 'Full-Time',
    'Company Name': 'Tech Corp',
    'Designation': 'Software Engineer',
    'Sector': 'IT',
    'Monthly Salary': '₹80,000',
  });

  return (
    <View style={styles.full}>
      <HeaderBar />
      <ScrollView style={styles.container}>
        <InfoCard
          title="OCCUPATION"
          data={Object.entries(occupation).map(([label, value]) => ({ label, value }))}
          onSave={(updated) => setOccupation(updated as OccupationType)}
        />
      </ScrollView>
    </View>
  );
};

export default OccupationScreen;

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: '#fddada',
  },
  container: {
    flex: 1,
  },
});
