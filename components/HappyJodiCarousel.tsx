import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const { width } = Dimensions.get('window');

const images = [
  'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=987&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=987&auto=format&fit=crop',
  'https://plus.unsplash.com/premium_photo-1674055047918-87672ee689f5?q=80&w=987&auto=format&fit=crop',
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HappyJodiCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation<NavigationProp>();

  const getIndices = (index: number) => {
    const left = (index + 2) % images.length;
    const center = index;
    const right = (index + 1) % images.length;
    return { left, center, right };
  };

  const animatePulse = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.08, duration: 600, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1.12, duration: 400, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1.08, duration: 600, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    animatePulse();
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      animatePulse();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { left, center, right } = getIndices(currentIndex);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Our Happy Jodi!</Text>
      <View style={styles.underline} />

      <View style={styles.carousel}>
        {/* LEFT CARD */}
        <View style={[styles.card, styles.leftCard]}>
          <Image source={{ uri: images[left] }} style={styles.image} />
          <LinearGradient
            colors={['rgba(255,0,85,0.4)', 'rgba(255,0,85,0)']}
            style={styles.overlayLeft}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>

        {/* CENTER CARD */}
        <Animated.View style={[styles.card, styles.centerCard, { transform: [{ scale: scaleAnim }] }]}>
          <Image source={{ uri: images[center] }} style={styles.image} />
        </Animated.View>

        {/* RIGHT CARD */}
        <View style={[styles.card, styles.rightCard]}>
          <Image source={{ uri: images[right] }} style={styles.image} />
          <LinearGradient
            colors={['rgba(255,0,85,0.4)', 'rgba(255,0,85,0)']}
            style={styles.overlayRight}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
          />
        </View>
      </View>

      {/* Dots */}
      <View style={styles.dots}>
        {images.map((_, i) => (
          <View key={i} style={[styles.dot, currentIndex === i && styles.dotActive]} />
        ))}
      </View>

      {/* Explore Button */}
      <TouchableOpacity onPress={() => navigation.navigate('HappyJodi')} style={styles.button}>
        <Text style={styles.buttonText}>Explore</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HappyJodiCarousel;

const CARD_WIDTH = width > 400 ? width * 0.27 : width * 0.25;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fce6e6',
    paddingVertical: 40,
    borderRadius: 20,
    position: 'relative',
    alignItems: 'center',
    transform: [{ scale: 0.92 }],
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Marmelad',
    color: '#701111',
    marginBottom: 12,
    borderColor: '#db5e5e',
  },
  underline: {
    height: 2,
    width: 100,
    backgroundColor: '#c44e4e',
    marginTop: 1.5,
    marginBottom: 50,
  },
  carousel: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center', // ✅ cards align centered
    alignItems: 'flex-end',
    gap: 12, // optional for newer RN versions
    flexWrap: 'nowrap',
  },
  card: {
    width: CARD_WIDTH, // ✅ responsive width
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    marginHorizontal: 5, // ✅ spacing instead of padding in parent
  },
  leftCard: {
    transform: [{ translateY: 20 }, { rotate: '-6deg' }],
    zIndex: 1,
  },
  centerCard: {
    transform: [{ translateY: -10 }],
    zIndex: 2,
    borderWidth: 3,
    borderColor: '#f8dcdc',
    shadowColor: '#ff6464',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
  },
  rightCard: {
    transform: [{ translateY: 20 }, { rotate: '6deg' }],
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  overlayRight: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  dots: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#f8bcbc',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 20,
    backgroundColor: '#701111',
  },
  button: {
    backgroundColor: '#fddada',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 16,
  },
  buttonText: {
    fontFamily: 'Marmelad',
    fontSize: 16,
    color: '#701111',
  },
});
