import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');  // ✅ Go directly to Login screen
    }, 2500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fddada" barStyle="dark-content" />
      <Image
        source={require('../assets/image/biyaah-logo.png')} // 👈 your uploaded PNG
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fddada',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '85%',
    height: '85%',
  },
});
