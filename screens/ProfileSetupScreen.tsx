import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API } from '../services/api';
import { CommonActions } from '@react-navigation/native';

const ProfileSetupScreen = ({ route, navigation }: any) => {
    const { userId, name, dob, gender, city, state } = route.params;

    const [username, setUsername] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [photoUri, setPhotoUri] = useState<string>('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        generateUsernameSuggestions();
    }, []);

    const generateUsernameSuggestions = () => {
        const first = name?.split(' ')[0]?.toLowerCase() || 'user';
        const last = name?.split(' ')[1]?.toLowerCase() || '';
        const year = dob?.year || '2000';
        const cityLower = city?.toLowerCase() || '';

        const patterns = [
            `${first}_${cityLower}`,
            `${first}${year}`,
            `${last}_${cityLower}`,
            `${first}.${last}`,
            `${first}_${gender?.toLowerCase()}`,
        ];

        setSuggestions(patterns.slice(0, 3));
    };

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets?.length) {
            setPhotoUri(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!username || !photoUri) {
            Alert.alert("Please select a username and upload a photo.");
            return;
        }

        try {
            setSubmitting(true);
            const formData = new FormData();
            formData.append('user_id', userId);
            formData.append('username', username);
            formData.append('photo', {
                uri: photoUri,
                name: `photo.jpg`,
                type: 'image/jpeg',
            } as any);

            const res = await axios.post(API.saveProfileSetup, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.success) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'Main',
                                state: {
                                    routes: [
                                        {
                                            name: 'Home',
                                            params: {
                                                userId: userId,
                                                username: username,
                                                name: name,
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                    })
                );
            } else {
                Alert.alert("Upload failed.");
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.innerContainer}>
                {/* Logos */}
                <View style={styles.logoRow}>
                    <View style={styles.logoItem}>
                        <Image source={require('../assets/image/svskk-logo.png')} style={styles.logo} />
                        <Text style={styles.logoText}>SVSKK</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.logoItem}>
                        <Image source={require('../assets/image/biyaah-logo.png')} style={styles.logo} />
                        <Text style={styles.logoText}>Biyaah</Text>
                    </View>
                </View>

                <Text style={styles.label}>Choose a Username: @</Text>
                <TextInput style={styles.input} placeholder="Enter your username" value={username} onChangeText={setUsername} />
                {suggestions.length > 0 && (
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.label}>Suggestions</Text>
                        {suggestions.map((sug, idx) => (
                            <TouchableOpacity key={idx} onPress={() => setUsername(sug)} style={styles.suggestionItem}>
                                <Text style={styles.suggestionText}>@{sug}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <Text style={styles.label}>Upload Your Photo</Text>
                {photoUri ? (<Image source={{ uri: photoUri }} style={styles.preview} />) : (
                    <TouchableOpacity style={styles.uploadBox} onPress={handleImagePick}>
                        <Text style={styles.uploadText}>Choose Photo</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
                    <Text style={styles.submitText}>{submitting ? "Submitting..." : "Submit"}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ProfileSetupScreen;

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logoItem: {
        alignItems: 'center',
        width: '40%',
    },
    separator: {
        width: 1,
        backgroundColor: '#cc7e7e',
        marginHorizontal: 10,
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    logoText: {
        color: '#701111',
        fontFamily: 'Marmelad',
        marginTop: 5,
    },
    label: {
        fontFamily: 'Marmelad',
        color: '#701111',
        fontSize: 16,
        marginTop: 20,
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#f5a5a5',
        marginTop: 10,
    },
    suggestionItem: {
        backgroundColor: '#fff3f3',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#f5a5a5',
        marginVertical: 4,
    },
    suggestionText: {
        fontFamily: 'Marmelad',
        color: '#d14b4b',
    },
    uploadBox: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#f5a5a5',
        marginTop: 10,
        alignItems: 'center',
    },
    uploadText: {
        fontFamily: 'Marmelad',
        color: '#701111',
    },
    preview: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderColor: '#cc7e7e',
        borderWidth: 2,
        alignSelf: 'center',
        marginVertical: 15,
    },
    submitBtn: {
        backgroundColor: '#500202',
        padding: 14,
        borderRadius: 14,
        marginTop: 30,
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontFamily: 'Marmelad',
        fontSize: 16,
    },
});
