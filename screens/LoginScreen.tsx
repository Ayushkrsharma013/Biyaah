import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
} from 'react-native'
import axios from 'axios'
import { API } from '../services/api';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [username, setUsername] = useState('')
  const [mobile, setMobile] = useState('')
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const handleLogin = async () => {
    if (!username || !mobile) {
      Alert.alert('Missing Fields', 'Please enter both username/full name and mobile number.')
      return
    }

    try {
      const res = await axios.post(API.directLogin, {
        identity: username,
        mobile: mobile,
      })

      // ← destructure inside the function, where `res` exists
      const {
        success,
        user_id,
        username: returnedUsername,
        name,
        message
      } = res.data

      if (success) {
        await AsyncStorage.setItem('biyaah-username', returnedUsername)
        Alert.alert('Login Successful', `Welcome back @${returnedUsername}`)
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{
              name: 'Main',
              state: {
                routes: [{
                  name: 'Home',
                  params: {
                    userId: user_id,
                    username: returnedUsername,
                    name,
                  },
                }],
              },
            }],
          })
        )
      } else {
        Alert.alert('Login Failed', message || 'User not found')
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Please try again.')
    }
  }

  const handleSignupRedirect = () => {
    navigation.navigate('Signup')
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fddada" barStyle="dark-content" />
      <View style={styles.logoRow}>
        <View style={styles.logoItem}>
          <Image source={require('../assets/image/svskk-logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.logoText}>SVSKK</Text>
          <Text style={styles.subText}>Bhilai, CG</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.logoItem}>
          <Image source={require('../assets/image/biyaah-logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.logoText}>Biyaah</Text>
          <Text style={styles.subText}>Your Perfect Match Await!</Text>
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>First Name/Username</Text>
        <TextInput
          placeholder="Enter your full name..."
          value={username}
          onChangeText={setUsername}
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

        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSignupRedirect}>
        <Text style={styles.signupText}>
          New here? <Text style={styles.signupLink}>Create your account and join us!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fddada',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    marginBottom: 30,
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
  loginBtn: {
    backgroundColor: '#500202',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Marmelad',
  },
  signupText: {
    color: '#701111',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Marmelad',
  },
  signupLink: {
    color: '#e03b3b',
    fontWeight: 'bold',
    fontFamily: 'Marmelad',
  },
})
