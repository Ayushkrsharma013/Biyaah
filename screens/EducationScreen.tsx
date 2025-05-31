import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import InfoCard from '../components/InfoCard';

type EducationType = {
  'Highest Qualification': string;
  'Course Stream': string;
  'University/Institute': string;
  'Passing Year': string;
};

const EducationScreen = () => {
  const [education, setEducation] = useState<EducationType>({
    'Highest Qualification': 'B.Tech',
    'Course Stream': 'Computer Science',
    'University/Institute': 'ABC University',
    'Passing Year': '2021',
  });

  return (
    <View style={styles.full}>
      <HeaderBar />
      <ScrollView style={styles.container}>
        <InfoCard
          title="EDUCATION"
          data={Object.entries(education).map(([label, value]) => ({ label, value }))}
          onSave={(updated) => setEducation(updated as EducationType)}
        />
      </ScrollView>
    </View>
  );
};

export default EducationScreen;

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: '#fddada',
  },
  container: {
    flex: 1,
  },
});
