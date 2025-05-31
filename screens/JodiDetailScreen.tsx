import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type JodiDetailRouteProp = RouteProp<RootStackParamList, 'JodiDetail'>;

const { width } = Dimensions.get('window');

type Jodi = {
    name: string;
    city: string;
    photo: string;
    story: string;
};

const mockJodiData: Record<string, Jodi> = {
    '1': {
        name: 'Ravi & Priya',
        city: 'Bhopal',
        photo: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80',
        story: 'Ravi and Priya met through Biyaah and within just 3 months, their families met and sealed the match. Their journey is full of warmth, laughter and togetherness.',
    },
    '2': {
        name: 'Ankit & Sneha',
        city: 'Raipur',
        photo: 'https://images.unsplash.com/photo-1609477767579-b788f520b327?q=80',
        story: 'Ankit and Sneha’s story is one of patience and perseverance. After months of conversation, they realized they were made for each other.',
    },
    '3': {
        name: 'Sahil & Riya',
        city: 'Indore',
        photo: 'https://images.unsplash.com/photo-1549388604-817d15aa0110?q=80',
        story: 'Sahil saw Riya’s profile and sent a request — and the rest is history. Their bond grew stronger with every call and visit.',
    },
};

const JodiDetailScreen = () => {
    const route = useRoute<JodiDetailRouteProp>();
    const { jodiId } = route.params;
    const jodi = mockJodiData[jodiId];

    if (!jodi) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Jodi details not found 💔</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: jodi.photo }} style={styles.image} />
            <Text style={styles.name}>{jodi.name}</Text>
            <Text style={styles.city}>📍 {jodi.city}</Text>
            <Text style={styles.storyTitle}>Their Love Story</Text>
            <Text style={styles.story}>{jodi.story}</Text>

            <TouchableOpacity
                style={styles.backBtn}
                onPress={() => {
                    // Optionally add go back if needed
                }}
            >
                <Text style={styles.backText}>← Back to Happy Jodis</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default JodiDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff9f9',
  },
  image: {
    width: width * 0.85,
    height: 240,
    borderRadius: 16,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: '#701111',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  city: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  storyTitle: {
    fontSize: 18,
    color: '#c44e4e',
    fontWeight: '600',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  story: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    textAlign: 'justify',
  },
  backBtn: {
    marginTop: 30,
    backgroundColor: '#ffeaea',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  backText: {
    color: '#701111',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#999',
  },
});