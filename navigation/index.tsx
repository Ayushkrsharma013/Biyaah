import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import HoroscopeDetailsScreen from '../screens/HoroscopeDetailsScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import EditUsernameScreen from '../screens/EditUsernameScreen';
import MainTabs from './MainTabs';
import HobbiesScreen from '../screens/HobbiesScreen';
import AddressScreen from '../screens/AddressScreen';
import FamilyDetailsScreen from '../screens/FamilyDetailsScreen';
import OccupationScreen from '../screens/OccupationScreen';
import EducationScreen from '../screens/EducationScreen';

import HappyJodiScreen from '../screens/HappyJodiScreen';
import JodiDetailScreen from '../screens/JodiDetailScreen';

import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OtpVerification"
          component={OtpVerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Horoscope"
          component={HoroscopeDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileSetupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditUsername"
          component={EditUsernameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HobbiesScreen"
          component={HobbiesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddressScreen" component={AddressScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FamilyDetailsScreen" component={FamilyDetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OccupationScreen" component={OccupationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EducationScreen" component={EducationScreen} options={{ headerShown: false }} />

        <Stack.Screen name="HappyJodi" component={HappyJodiScreen} options={{ headerShown: false }} />
        <Stack.Screen name="JodiDetail" component={JodiDetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
