import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const sections = [
  { label: 'Hobbies', screen: 'HobbiesScreen' },
  { label: 'Address', screen: 'AddressScreen' },
  { label: 'Family Details', screen: 'FamilyDetailsScreen' },
  { label: 'Occupation', screen: 'OccupationScreen' },
  { label: 'Education', screen: 'EducationScreen' },
  { label: 'Gallery', screen: '' },
];

const ProfileAccordion = () => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = (screen: string) => {
    if (screen) navigation.navigate(screen as keyof RootStackParamList);
  };

  return (
    <View style={styles.card}>
      {sections.map(({ label, screen }, i) => (
        <TouchableOpacity key={i} style={styles.row} onPress={() => handlePress(screen)}>
          <Text style={styles.text}>{label}</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileAccordion;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fdeaea',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    paddingVertical: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Marmelad',
    color: '#701111',
  },
  arrow: {
    fontSize: 16,
    color: '#701111',
  },
});
