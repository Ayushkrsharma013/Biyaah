// app/screens/EditProfileScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Theme from '../utils/ThemePolishHelper'; // ✅ Corrected path

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: '',
    age: '',
    height: '',
    profession: '',
    education: '',
    location: '',
    about: '',
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({ base64: false });
    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Edit Profile</Text>

      <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <Ionicons name="camera" size={40} color="#aaa" style={styles.cameraIcon} />
        )}
      </TouchableOpacity>

      {[
        { key: 'fullName', placeholder: 'Full Name' },
        { key: 'age', placeholder: 'Age' },
        { key: 'height', placeholder: 'Height (e.g. 5\'9")' },
        { key: 'profession', placeholder: 'Profession' },
        { key: 'education', placeholder: 'Education' },
        { key: 'location', placeholder: 'Location (City, State)' },
        { key: 'about', placeholder: 'About Me (a short bio)', multiline: true },
      ].map((field) => (
        <TextInput
          key={field.key}
          placeholder={field.placeholder}
          value={form[field.key as keyof typeof form]}
          onChangeText={(value) => handleChange(field.key as keyof typeof form, value)}
          style={[
            styles.input,
            field.multiline ? styles.multiline : null,
          ]}
          multiline={field.multiline || false}
        />
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={() => {
        console.log('Saving profile:', form);
        navigation.goBack();
      }}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Theme.primary,
    borderRadius: 100,
    padding: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    padding: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: Theme.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
