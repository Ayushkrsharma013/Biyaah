import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '../utils/ThemePolishHelper';

const options = {
  age: ['18-24', '25-30', '31-35', '36-40', '40+'],
  height: ['4\'5"-5\'0"', '5\'1"-5\'5"', '5\'6"-6\'0"', '6\'1"+'],
  religion: ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Other'],
  caste: ['Brahmin', 'Rajput', 'Yadav', 'SC/ST', 'Other'],
  location: ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Anywhere in India'],
};

const PreferencesScreen = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    age: '',
    height: '',
    religion: '',
    caste: '',
    location: '',
  });

  const [dropdown, setDropdown] = useState<keyof typeof form | null>(null);

  const openDropdown = (key: keyof typeof form) => setDropdown(key);
  const closeDropdown = () => setDropdown(null);

  const selectOption = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
    closeDropdown();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Your Preferences</Text>

      {Object.entries(form).map(([key, value]) => (
        <View key={key} style={styles.fieldContainer}>
          <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => openDropdown(key as keyof typeof form)}>
            <Text style={styles.dropdownText}>
              {value || `Select ${key}`}
            </Text>
            <Ionicons name="chevron-down" size={18} color={Theme.textDark} />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={() => {
        console.log('Preferences:', form);
        navigation.goBack();
      }}>
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </TouchableOpacity>

      {/* Custom Modal Dropdown */}
      <Modal visible={!!dropdown} animationType="slide" transparent>
        <TouchableOpacity style={styles.modalOverlay} onPress={closeDropdown} activeOpacity={1}>
          <View style={styles.modalContainer}>
            <FlatList
              data={options[dropdown as keyof typeof options]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selectOption(dropdown!, item)}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default PreferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: Theme.textDark,
    fontWeight: '600',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: Theme.textDark,
  },
  saveButton: {
    backgroundColor: Theme.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
  },
});
