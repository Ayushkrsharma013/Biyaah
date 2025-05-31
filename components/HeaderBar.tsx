import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { Theme, Padding, Radius, AppShadow } from '../utils/ThemePolishHelper';
import CustomDrawer from './CustomDrawer';

const HeaderBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerAnim] = useState(new Animated.Value(0));

  const toggleDrawer = () => {
    if (!isOpen) {
      Animated.timing(drawerAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(drawerAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../assets/image/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity style={styles.menuToggle} onPress={toggleDrawer}>
          <Svg viewBox="0 0 60 60" width={32} height={32}>
            <Line
              x1="15"
              y1="20"
              x2="45"
              y2="20"
              stroke="#AD2831"
              strokeWidth="3.5"
              strokeLinecap="round"
              transform={isOpen ? "rotate(45 30 30) translate(5 5)" : ""}
            />
            <Line
              x1="15"
              y1="30"
              x2="45"
              y2="30"
              stroke="#F26871"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity={isOpen ? 0 : 1}
            />
            <Line
              x1="15"
              y1="40"
              x2="45"
              y2="40"
              stroke="#AD2831"
              strokeWidth="3.5"
              strokeLinecap="round"
              transform={isOpen ? "rotate(-45 30 30) translate(5 -5)" : ""}
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <CustomDrawer visible={isOpen} animValue={drawerAnim} />
    </>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Padding.lg,
    paddingVertical: Padding.md,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Theme.shadowColor,
    ...AppShadow,
  },
  logo: {
    width: 160,
    height: 60,
  },
  menuToggle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
