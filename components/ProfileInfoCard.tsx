import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { API } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

type UserProfile = {
  username: string;
  name: string;
  mobile: string; 
  user_id?: string;
  dob?: string;
  birth_time?: string;
  gotra?: string;
  horoscope?: {
    rashi?: string;
    placeOfBirth?: string;
    photo_url?: string;
    timeOfBirth?: string;
    gotra?: string;
    dob?: {
      day: string;
      month: string;
      year: string;
    };
  };
};


const ProfileInfoCard = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  const fetchProfile = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('biyaah-username');
      if (!storedUsername) {
        console.warn('⚠️ Username not found in AsyncStorage.');
        return;
      }

      const response = await axios.get(API.profileInfo,
        { params: { username: storedUsername } }
      );

      if (response.data.success) {
        setProfile(response.data.data);
        setImageLoadFailed(false);
      } else {
        console.warn('Failed to load profile:', response.data.message);
      }
    } catch (err) {
      console.error('API fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePress = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Media library access is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const photoUri = result.assets[0].uri;
      const fileName = photoUri.split('/').pop() || `profile.jpg`;
      const fileType = fileName.split('.').pop();

      const formData = new FormData();
      formData.append('user_id', profile?.user_id || '');
      formData.append(
        'horoscope',
        JSON.stringify({ ...profile?.horoscope, photo_url: '' }) // dummy to trigger save
      );
      formData.append('photo', {
        uri: photoUri,
        name: fileName,
        type: `image/${fileType}`,
      } as any);

      try {
        const uploadRes = await axios.post(API.saveHoroscope,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        if (uploadRes.data.success) {
          Alert.alert('Success', 'Profile image updated!');
          fetchProfile(); // refresh
        } else {
          Alert.alert('Failed', uploadRes.data.message || 'Could not update image.');
        }
      } catch (e) {
        Alert.alert('Error', 'Something went wrong while uploading.');
        console.error(e);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#701111" />;

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Failed to load profile data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePress}>
        {!imageLoadFailed && profile?.horoscope?.photo_url ? (
          <Image
            source={{ uri: profile.horoscope.photo_url }}
            style={styles.avatar}
            onError={() => setImageLoadFailed(true)}
          />
        ) : (
          <Image
            source={require('../assets/image/dp1.png')}
            style={styles.avatar}
          />
        )}
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>@{profile?.username ?? 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{profile?.name ?? 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Mobile</Text>
          <Text style={styles.value}>{profile?.mobile ?? 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Birth Date</Text>
          <View style={styles.dobRow}>
            <Text style={styles.value}> 
              {profile?.horoscope?.dob
                ? `${profile.horoscope.dob.day}-${profile.horoscope.dob.month}-${profile.horoscope.dob.year}`
                : 'N/A'}
            </Text>
            <Text style={styles.value}>{profile?.horoscope?.timeOfBirth ?? 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gotra</Text>
          <Text style={styles.value}>{profile?.horoscope?.gotra ?? 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Rashi</Text>
          <Text style={styles.value}>{profile?.horoscope?.rashi ?? 'N/A'}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileInfoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  card: {
    backgroundColor: '#fdeaea',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flex: 1,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  dobRow: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Marmelad',
    color: '#ee7777',
  },
  value: {
    fontSize: 14,
    fontFamily: 'Marmelad',
    color: '#701111',
  },
});
