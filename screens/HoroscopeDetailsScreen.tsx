import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { API } from '../services/api';
import { rashis, gotras } from '../constants/hinduData';
import CustomDropdown from '../components/CustomDropdown';

const HoroscopeDetailsScreen = ({ route, navigation }: any) => {
  const [userId, setUserId] = useState('');
  const [dobDate, setDobDate] = useState<Date | null>(null);
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const [timeHourMin, setTimeHourMin] = useState('');
  const [ampm, setAmpm] = useState('AM');
  const [calculatedAge, setCalculatedAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | ''>('');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [caste, setCaste] = useState('');
  const [selectedGotra, setSelectedGotra] = useState('');
  const [selectedRashi, setSelectedRashi] = useState('');
  const [gotraVisible, setGotraVisible] = useState(false);
  const [rashiVisible, setRashiVisible] = useState(false);
  const [manglik, setManglik] = useState<'YES' | 'NO' | ''>('');

  useEffect(() => {
    const incomingUserId = route.params?.userId || route.params?.user_id;
    if (!incomingUserId) {
      Alert.alert('Error', 'User ID is missing. Redirecting to login.');
      navigation.navigate('Login');
      return;
    }
    setUserId(incomingUserId);
  }, [route.params]);

  const calculateAge = (dob: { day: string; month: string; year: string }) => {
    if (!dob?.day || !dob?.month || !dob?.year) return '';

    const birthDate = new Date(
      parseInt(dob.year),
      parseInt(dob.month) - 1,
      parseInt(dob.day)
    );
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years}-Years ${months}-Months ${days}-Days`;
  };



  const handleSubmit = async () => {
    if (!userId || !dob.day || !dob.month || !dob.year || !timeHourMin || !placeOfBirth || !caste || !selectedGotra || !selectedRashi || !manglik || !gender) {
      Alert.alert('Error', 'Please fill out all required fields.');
      return;
    }

    const timeOfBirth = `${timeHourMin} ${ampm}`;
    const birthDate = new Date(`${dob.year}-${dob.month}-${dob.day}T${timeHourMin}:00 ${ampm}`);
    const ageStr = calculateAge({
      day: dob.day,
      month: dob.month,
      year: dob.year,
    });
    if (!calculatedAge || calculatedAge.includes("NaN")) {
      Alert.alert("Invalid Age", "Please select a valid Date of Birth.");
      return;
    }

    try {
      const res = await axios.post(API.saveHoroscope, {
        user_id: userId, 
        horoscope: {
          dob: {
            day: dob.day.toString(),
            month: dob.month.toString(),
            year: dob.year.toString(),
          },
          timeOfBirth,
          placeOfBirth,
          caste,
          gotra: selectedGotra,
          rashi: selectedRashi,
          manglik,
          gender,
          age: ageStr,
        },
      });

      if (res.data.success) {
        navigation.navigate("Profile", {
          userId,
          dob,
          gender,
          name: route.params?.name,
          city: route.params?.city,
          state: route.params?.state,
        });
      } else {
        Alert.alert('Failed', res.data.message || 'Could not save details.');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Something went wrong while saving data.');
    }
  };

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#fddada' }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <StatusBar backgroundColor="#fddada" barStyle="dark-content" />

            {/* 👇 Inserted logo row block */}
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

            <Text style={styles.label}>Gender</Text>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              {['Male', 'Female'].map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => setGender(g as 'Male' | 'Female')}
                  style={[styles.optionBtn, gender === g && styles.selectedBtn, { marginRight: 10 }]}
                >
                  <Text style={styles.optionText}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowDOBPicker(true)}>
              <Text style={{ fontFamily: 'Marmelad' }}>
                {dobDate
                  ? `${dob.day}/${dob.month}/${dob.year} ${dobDate.toLocaleDateString('en-IN', { weekday: 'long' })}`
                  : 'Select Date'}
              </Text>
            </TouchableOpacity>
            {showDOBPicker && (
              <DateTimePicker
                value={dobDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDOBPicker(false);
                  if (selectedDate) {
                    const d = selectedDate.getDate().toString().padStart(2, '0');
                    const m = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
                    const y = selectedDate.getFullYear().toString();
                    const dobObj = { day: d, month: m, year: y };
                    setDobDate(selectedDate);
                    setDob(dobObj);
                    const ageStr = calculateAge(dobObj); // ✅ fixed
                    setCalculatedAge(ageStr);           // ✅ actually update state
                  }
                }}

              />
            )}

            <Text style={styles.label}>Time of Birth</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TextInput placeholder="07:10" value={timeHourMin} onChangeText={setTimeHourMin} style={[styles.input, { flex: 1 }]} />
              <TouchableOpacity onPress={() => setAmpm(ampm === 'AM' ? 'PM' : 'AM')} style={[styles.input, { width: 80, justifyContent: 'center', alignItems: 'center' }]}              >
                <Text>{ampm}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Age</Text>
            <TextInput editable={false} value={calculatedAge} placeholder="Calculated automatically" style={styles.input} />

            <Text style={styles.label}>Place of Birth</Text>
            <TextInput placeholder="Bhilai" value={placeOfBirth} onChangeText={setPlaceOfBirth} style={styles.input} />

            <Text style={styles.label}>Caste</Text>
            <TextInput placeholder="BARAHI" value={caste} onChangeText={setCaste} style={styles.input} />

            {/* Gotra Dropdown */}
            <Text style={styles.label}>Gotra</Text>
            <TouchableOpacity onPress={() => setGotraVisible(true)} style={styles.input}>
              <Text style={{ fontFamily: 'Marmelad', color: selectedGotra ? 'black' : '#aaa' }}>
                {selectedGotra || 'Select Gotra'}
              </Text>
            </TouchableOpacity>
            <CustomDropdown visible={gotraVisible} data={gotras} onSelect={(item) => { setSelectedGotra(item); setGotraVisible(false); }} onClose={() => setGotraVisible(false)} />

            {/* Rashi Dropdown */}
            <Text style={styles.label}>Rashi</Text>
            <TouchableOpacity onPress={() => setRashiVisible(true)} style={styles.input}>
              <Text style={{ fontFamily: 'Marmelad', color: selectedRashi ? 'black' : '#aaa' }}>
                {selectedRashi || 'Select Rashi'}
              </Text>
            </TouchableOpacity>
            <CustomDropdown visible={rashiVisible} data={rashis} onSelect={(item) => { setSelectedRashi(item); setRashiVisible(false); }} onClose={() => setRashiVisible(false)} />


            <Text style={styles.label}>Manglik</Text>
            <View style={styles.manglikRow}>
              <TouchableOpacity
                style={[styles.optionBtn, manglik === 'YES' && styles.selectedBtn]}
                onPress={() => setManglik('YES')}
              >
                <Text style={styles.optionText}>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionBtn, manglik === 'NO' && styles.selectedBtn]}
                onPress={() => setManglik('NO')}
              >
                <Text style={styles.optionText}>NO</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Save & Continue</Text>
            </TouchableOpacity>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HoroscopeDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minHeight: '100%',
    backgroundColor: '#fddada',
    padding: 20,
    paddingBottom: 140,
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
  label: {
    marginTop: 15,
    marginBottom: 5,
    color: '#701111',
    fontSize: 16,
    fontFamily: 'Marmelad',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f5a5a5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontFamily: 'Marmelad',
  },
  manglikRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  optionBtn: {
    borderWidth: 1,
    borderColor: '#f5a5a5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginRight: 12,
    backgroundColor: '#fff',
  },
  selectedBtn: { backgroundColor: '#fee', borderColor: '#ee4444' },
  optionText: { color: '#e23c3c', fontWeight: 'bold', fontFamily: 'Marmelad' },
  submitBtn: {
    backgroundColor: '#500202',
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontSize: 16, fontFamily: 'Marmelad' },
});

