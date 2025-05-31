import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { hobbyIcons } from '../constants/hobbyIcons';

interface HobbySelectorProps {
  initialSelection?: string[];
  onSave: (selected: string[]) => void;
}

const hobbiesData: Record<string, { folder: string; hobbies: string[] }> = {
  'Creative': {
    folder: 'creative',
    hobbies: [
      'Painting', 'Photography', 'Acting', 'Designing',
      'Gardening', 'Singing', 'Writing', 'DIY Crafts', 'Dancing',
    ],
  },
  'Sports and Adventure': {
    folder: 'sports',
    hobbies: [
      'Cricket', 'Basket Ball', 'Swimming', 'Badminton',
      'Tennis', 'Cycling', 'Volley Ball', 'Hiking', 'Foot Ball',
    ],
  },
  'Intellectual and Learning': {
    folder: 'learning',
    hobbies: [
      'Reading', 'History', 'Philosophy', 'Learn Language',
      'Coding', 'Robotics',
    ],
  },
  'Social and Entertainment': {
    folder: 'social',
    hobbies: [
      'Movies', 'Shopping', 'Volunteering', 'Board Games',
      'Travelling', 'Social Media',
    ],
  },
  'Lifestyle and Wellness': {
    folder: 'wellness',
    hobbies: [
      'Cooking', 'Walking', 'Gym Workout', 'Meditation', 'Yoga',
    ],
  },
};

const HobbySelector: React.FC<HobbySelectorProps> = ({
  initialSelection = [],
  onSave,
}) => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  useEffect(() => {
    setSelectedHobbies(initialSelection);
  }, [initialSelection]);

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const renderHobbyButton = (hobby: string, folder: string) => (
    <TouchableOpacity
      key={hobby}
      style={[
        styles.hobbyButton,
        selectedHobbies.includes(hobby) && styles.hobbyButtonSelected,
      ]}
      onPress={() => toggleHobby(hobby)}
    >
      <Image
        source={hobbyIcons[`${folder}:${hobby}`]}
        style={styles.hobbyIcon}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.hobbyText,
          selectedHobbies.includes(hobby) && styles.hobbyTextSelected,
        ]}
      >
        {hobby}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {Object.entries(hobbiesData).map(([section, { folder, hobbies }]) => (
        <View key={section} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{section}</Text>
          <View style={styles.hobbyGrid}>
            {hobbies.map((hobby) => renderHobbyButton(hobby, folder))}
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => onSave(selectedHobbies)}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HobbySelector;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Marmelad',
    color: '#701111',
    marginBottom: 10,
    paddingLeft: 16,
  },
  hobbyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 12,
  },
  hobbyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#701111',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
    margin: 4,
  },
  hobbyButtonSelected: {
    backgroundColor: '#ffd6d6',
  },
  hobbyText: {
    fontSize: 12,
    fontFamily: 'Marmelad',
    color: '#701111',
    marginLeft: 4,
  },
  hobbyTextSelected: {
    fontWeight: 'bold',
  },
  hobbyIcon: {
    width: 18,
    height: 18,
  },
  submitButton: {
    backgroundColor: '#701111',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Marmelad',
  },
});
