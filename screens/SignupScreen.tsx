import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { BASE_URL } from "../services/api";
import { RootStackParamList } from '../types/navigation';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';


type SendOtpPayload = {
  name: string;
  mobile: string;
  user_id: string;
};


const SignupScreen = () => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Signup'>>();

  const getLocationBasedUserId = async (fullName: string): Promise<string | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const geo = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (!geo || geo.length === 0) return null;

      const { region, city, district, name } = geo[0];

      const state = (region || 'XX').toLowerCase().replace(/\s/g, '');
      const dist = (district || 'YYY').toLowerCase().replace(/\s/g, '');
      const cityName = (city || name || 'LOCAL').toLowerCase().replace(/\s/g, '');
      const firstName = fullName.split(" ")[0]?.toLowerCase() || 'user';
      const uniqueCode = Math.floor(1000 + Math.random() * 9000); // Optional

      const userId = `${state}-${dist}-${cityName}-${firstName}${uniqueCode}`;
      return userId;
    } catch (err) {
      console.log('Location error:', err);
      return null;
    }
  };

  const handleSendOTP = async () => {
    if (!fullName || !mobile) {
      Alert.alert('Error', 'Please enter all fields');
      return;
    }

    // ✅ Generate location-based user_id or fallback in dev mode
    let userId = await getLocationBasedUserId(fullName);
    if (!userId) {
      userId = `temp-cg-bhilai-${fullName.split(" ")[0].toLowerCase()}${Math.floor(1000 + Math.random() * 9000)}`;
      console.log("⚠️ Fallback user_id:", userId);
    }

    try {
      const payload: SendOtpPayload = {
        name: fullName,
        mobile,
        user_id: userId,
      };

      const res = await axios.post(
        `${BASE_URL}/auth/send-otp`,
        payload
      );

      if (res.status === 200 && res.data.success) {
        Alert.alert("OTP (Dev Mode)", `Use this OTP: ${res.data.otp}`);
        await AsyncStorage.setItem('biyaah-username', fullName.split(" ")[0].toLowerCase()); // or use server-resolved username later
        navigation.navigate('OtpVerification', payload);    // ✅ send all 3 props
      } else {
        Alert.alert('Failed', res.data.message || 'Something went wrong');
      }
    } catch (err: any) {
      if (err.response?.status === 409) {
        Alert.alert("Already Registered", "This mobile number is already registered. Please log in.");
        navigation.navigate("Login");
      } else {
        console.error('❌ OTP Send Error:', err);
        Alert.alert('Error', 'Something went wrong');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoiding}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar backgroundColor="#fddada" barStyle="dark-content" />

        <View style={styles.logoRow}>
          <View style={styles.logoItem}>
            <Image
              source={require('../assets/image/svskk-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>SVSKK</Text>
            <Text style={styles.subText}>Bhilai, CG</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.logoItem}>
            <Image
              source={require('../assets/image/biyaah-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>Biyaah</Text>
            <Text style={styles.subText}>Your Perfect Match Await!</Text>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter your full name..."
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            placeholderTextColor="#db5e5e"
          />

          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            placeholder="Enter your mobile number"
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
            keyboardType="phone-pad"
            placeholderTextColor="#db5e5e"
          />

          <TouchableOpacity onPress={handleSendOTP} style={styles.submitBtn}>
            <Text style={styles.submitText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
            Log in here.
          </Text>
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    backgroundColor: '#fddada',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fddada',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  logoItem: {
    alignItems: 'center',
    width: '40%',
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 5,
  },
  separator: {
    width: 1,
    backgroundColor: '#cc7e7e',
    height: '80%',
    marginHorizontal: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#701111',
    fontFamily: 'Marmelad',
  },
  subText: {
    fontSize: 12,
    color: '#b85555',
    fontFamily: 'Marmelad',
  },
  form: {
    width: '100%',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#6f1d1d',
    marginBottom: 6,
    marginTop: 10,
    fontFamily: 'Marmelad',
  },
  input: {
    backgroundColor: '#fce1e1',
    borderWidth: 1,
    borderColor: '#f5a5a5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Marmelad',
  },
  submitBtn: {
    backgroundColor: '#500202',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Marmelad',
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#8b0000',
    fontFamily: 'Marmelad',
  },

  linkText: {
    color: '#b30000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});