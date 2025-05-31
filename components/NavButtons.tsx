import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

const NavButtons = ({
  buttons = ['Daily Matches', 'Near Me', 'Discover', 'My Preferences'],
  onTabChange,
}: {
  buttons?: string[];
  onTabChange?: (label: string, index: number) => void;
}) => {
  const [active, setActive] = useState(0);

  const handlePress = (label: string, index: number) => {
    setActive(index);
    onTabChange?.(label, index);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      {buttons.map((label, index) => {
        const isActive = index === active;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.btn, isActive && styles.activeBtn]}
            onPress={() => handlePress(label, index)}
          >
            {isActive && label === 'Daily Matches' && (
              <Image
                source={require('../assets/image/crown.png')}
                style={styles.crown}
                resizeMode="contain"
              />
            )}
            <Text style={[styles.text, isActive && styles.activeText]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default NavButtons;

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 10,
    marginTop: 20,
    gap: 10,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e15858',
    shadowColor: '#e15858',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Marmelad',
    color: '#701111',
  },
  activeBtn: {
    backgroundColor: '#b52727',
    borderColor: '#b52727',
  },
  activeText: {
    color: '#fff',
  },
  crown: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: -16,
    left: -8,
    zIndex: 2,
  },
});
