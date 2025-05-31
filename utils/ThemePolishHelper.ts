import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Theme = {
  // 🔴 Brand Colors
  primary: '#701111',
  secondary: '#fddada',
  cardBg: '#fdeaea',
  white: '#ffffff',
  shadowColor: '#db5e5e',
  border: '#db5e5e',
  textDark: '#ad2831',
  accentColor: '#fafafa',
};

export const Radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 32,
};

export const Padding = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 32,
};

export const Font = {
  base: 14,
  small: 12,
  large: 18,
  heading: 22,
  family: 'Marmelad',
};

export const AppShadow = {
  shadowColor: Theme.shadowColor,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: Platform.OS === 'android' ? 3 : 2,
};

export const Screen = {
  width,
  height,
};

export default Theme;