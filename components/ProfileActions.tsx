import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileActions = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="link-variant" size={26} color="#701111" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="send" size={26} color="#701111" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileActions;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  container: {
    backgroundColor: '#ffe1e1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 160,
    height: 50,
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  iconButton: {
    paddingHorizontal: 10,
  },
  divider: {
    width: 1,
    height: 26,
    backgroundColor: '#d28282',
    borderRadius: 1,
  },
});
