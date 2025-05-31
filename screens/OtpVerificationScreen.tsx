import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from "../services/api";

const OtpVerificationScreen = ({ route, navigation }: any) => {
  const { mobile, name, user_id } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/auth/verify-otp`, {
        mobile,
        otp: otpCode,
        name,
        user_id,
      });

      console.log("✅ OTP Verify Response:", res.data);

      console.log("📦 API returned user_id:", res.data.user_id);
      console.log("📦 Expected user_id format: CG-XXX-LOCAL-1234");


      if (res.data.success && res.data.user_id && res.data.username) {
        Alert.alert('Verified', 'Your OTP has been verified successfully');

        navigation.navigate('Horoscope', {
          userId: res.data.user_id,
          username: res.data.username,
          name: name,
        });
      } else {
        Alert.alert('Error', 'Invalid response from server. Try again.');
      }
    } catch (err: any) {
      console.error('❌ OTP Verify Error:', err);

      if (err.response?.status === 409) {
        Alert.alert("Already Registered", "You are already verified. Please log in.");
        navigation.navigate("Login");
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fddada" barStyle="dark-content" />

      {/* Logos Row */}
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

      <Text style={styles.label}>Enter OTP</Text>

      {/* OTP Input Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            ref={(ref) => { inputs.current[index] = ref }}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerificationScreen;

// Updated container and layout styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fddada',
    justifyContent: 'center', // ✅ vertical centering
    alignItems: 'center',     // ✅ horizontal centering
    paddingHorizontal: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
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
  label: {
    fontSize: 16,
    color: '#6f1d1d',
    fontFamily: 'Marmelad',
    marginBottom: 14,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f5a5a5',
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    fontFamily: 'Marmelad',
  },
  verifyBtn: {
    backgroundColor: '#500202',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 14,
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Marmelad',
  },
});

