import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { useUserData } from '../hooks/useUserData';
import HeaderBar from '../components/HeaderBar';
import HobbySelector from '../components/HobbySelector';
import HobbySummary from '../components/HobbySummary';
import EditIcon from '../components/EditIcon';

const HobbiesScreen = () => {
  const { user, setUser } = useUserData();
  const [isEditMode, setIsEditMode] = useState(user?.hobbies?.length === 0); // default to edit if no hobbies

  const handleSave = (selectedHobbies: string[]) => {
    setUser({ ...user, hobbies: selectedHobbies });
    setIsEditMode(false); // Switch back to summary view
  };

  return (
    <ScrollView style={styles.container}>

      <HeaderBar />
      {/* Header Row */}
      <View style={styles.header}>
        <Text style={styles.title}>HOBBIES</Text>
        {!isEditMode && (
          <TouchableOpacity onPress={() => setIsEditMode(true)}>
            <EditIcon onPress={() => setIsEditMode(true)} />
          </TouchableOpacity>
        )}
      </View>

      {/* Body */}
      {isEditMode ? (
        <HobbySelector
          initialSelection={user.hobbies}
          onSave={handleSave}
        />
      ) : (
        <HobbySummary hobbies={user.hobbies} />
      )}
    </ScrollView>
  );
};

export default HobbiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7f7',
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#701111',
    fontFamily: 'Marmelad',
    fontWeight: 'bold',
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: '#701111',
  },
});
