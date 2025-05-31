import React from 'react';
import AppNavigator from './navigation';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Marmelad: require('./assets/fonts/Marmelad-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#701111" />
      </View>
    );
  }

  return <AppNavigator />;
}
