import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LogOutIcon from '../assets/icons/LogOutIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type LogoutScreenNavProp = StackNavigationProp<RootStackParamList>;

const LogoutCard = () => {
  const navigation = useNavigation<LogoutScreenNavProp>();

  const handleLogout = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('biyaah-username');

      if (storedUsername) {
        await axios.post(API.logOut, { username: storedUsername, });
      }

      await AsyncStorage.removeItem('biyaah-username');
      Alert.alert("Logged Out", "You have been logged out.");

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });

    } catch (err) {
      console.error("Logout error:", err);
      Alert.alert("Logout Failed", "Could not log out. Please try again.");
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleLogout}>
      <Text style={styles.text}>Log Out</Text>
      <LogOutIcon width={20} height={20} />
    </TouchableOpacity>
  );
};

export default LogoutCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#db5e5e',
    padding: 14,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#701111',
    fontFamily: 'Marmelad',
  },
});
