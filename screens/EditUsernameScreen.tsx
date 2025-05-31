import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ScrollView
} from 'react-native';
import axios from 'axios';
import { API } from '../services/api';


const EditUsernameScreen = ({ route, navigation }: any) => {
  const { userId, currentUsername, name } = route.params;

  const [newUsername, setNewUsername] = useState('');
  const [available, setAvailable] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const checkAvailability = async () => {
    if (!newUsername) {
      Alert.alert("Please enter a new username.");
      return;
    }

    setLoadingCheck(true);
    try {
      const res = await axios.post(API.checkUsername, {
        username: newUsername,
      });

      if (res.data.available) {
        setAvailable(true);
        Alert.alert("Username is available!");

        const sugRes = await axios.post(API.suggestUsernames, {
          name: name || 'user',
        });

        if (sugRes.data.suggestions) {
          setSuggestions(sugRes.data.suggestions);
        }

      } else {
        setAvailable(false);
        Alert.alert("Username already taken");
        setSuggestions([]);
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Something went wrong.");
    } finally {
      setLoadingCheck(false);
    }
  };

  const updateUsername = async () => {
    if (!available) {
      Alert.alert("Please check availability first.");
      return;
    }

    setLoadingUpdate(true);
    try {
      const res = await axios.post(API.editUsername, {
        user_id: userId,
        new_username: newUsername,
      });

      if (res.data.success) {
        Alert.alert("Updated successfully!");
        navigation.navigate("HoroscopeDetails", {
          updatedUsername: newUsername,
        });
      } else {
        Alert.alert("Could not update username.");
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Something went wrong.");
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Username</Text>

      <Text style={styles.label}>New Username</Text>
      <TextInput
        value={newUsername}
        onChangeText={(text) => {
          setNewUsername(text);
          setAvailable(false); // reset availability
        }}
        placeholder="Enter new username"
        style={styles.input}
      />

      <TouchableOpacity onPress={checkAvailability} style={styles.checkBtn}>
        <Text style={styles.checkText}>{loadingCheck ? "Checking..." : "Check Availability"}</Text>
      </TouchableOpacity>

      {suggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          <Text style={styles.label}>Suggestions</Text>
          {suggestions.map((sug, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setNewUsername(sug)}
              style={styles.suggestionItem}
            >
              <Text style={styles.suggestionText}>@{sug}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={updateUsername}
        style={[styles.updateBtn, { backgroundColor: available ? '#500202' : '#ccc' }]}
        disabled={!available || loadingUpdate}
      >
        <Text style={styles.updateText}>{loadingUpdate ? "Updating..." : "Update Username"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditUsernameScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fddada',
    padding: 20,
    flexGrow: 1,
    minHeight: '100%',
  },
  title: {
    fontSize: 20,
    color: '#701111',
    textAlign: 'center',
    fontFamily: 'Marmelad',
    marginBottom: 30,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Marmelad',
    color: '#701111',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f5a5a5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontFamily: 'Marmelad',
  },
  checkBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c75656',
    padding: 12,
    borderRadius: 12,
    marginTop: 15,
    alignItems: 'center',
  },
  checkText: {
    color: '#701111',
    fontFamily: 'Marmelad',
  },
  suggestionBox: {
    marginTop: 20,
  },
  suggestionItem: {
    padding: 12,
    backgroundColor: '#fff3f3',
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e39494',
  },
  suggestionText: {
    color: '#d14b4b',
    fontFamily: 'Marmelad',
    fontSize: 15,
  },
  updateBtn: {
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  updateText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Marmelad',
  },
});