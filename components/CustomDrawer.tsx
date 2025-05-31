import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme, Padding, Radius, AppShadow } from '../utils/ThemePolishHelper';

const drawerItems = [
  'Personal Information',
  'Likes',
  'Connects',
  'Favourite',
  'Address Information',
  'Family Details',
  'About',
];

const CustomDrawer = ({
  visible,
  animValue,
}: {
  visible: boolean;
  animValue: Animated.Value;
}) => {
  const height = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 350], // Adjust height as needed
  });

  if (!visible) return null;

  return (
    <Animated.View style={[styles.drawer, { height }]}>
      <ScrollView contentContainerStyle={styles.menu}>
        {drawerItems.map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.menuItem}>
            <Text style={styles.menuText}>{item}</Text>
            <Feather name="chevron-right" size={18} color={Theme.shadowColor} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.version}>Version 1.0</Text>
    </Animated.View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 70, // adjust based on HeaderBar height
    left: 0,
    right: 0,
    backgroundColor: Theme.secondary,
    overflow: 'hidden',
    zIndex: 999,
    ...AppShadow,
  },
  menu: {
    paddingHorizontal: Padding.lg,
    paddingTop: Padding.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Padding.md,
    borderBottomColor: '#f5a5a5',
    borderBottomWidth: 1,
  },
  menuText: {
    color: Theme.primary,
    fontSize: 14,
    fontFamily: 'Marmelad',
  },
  version: {
    textAlign: 'center',
    marginTop: Padding.md,
    color: Theme.primary,
    fontSize: 12,
    fontFamily: 'Marmelad',
  },
});
