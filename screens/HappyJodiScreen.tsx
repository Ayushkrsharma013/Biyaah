import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HappyJodi'>;

const { width } = Dimensions.get('window');

const jodiData = [
  {
    id: '1',
    name: 'Ravi & Priya',
    city: 'Bhopal',
    photo: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80',
  },
  {
    id: '2',
    name: 'Ankit & Sneha',
    city: 'Raipur',
    photo: 'https://images.unsplash.com/photo-1609477767579-b788f520b327?q=80',
  },
  {
    id: '3',
    name: 'Sahil & Riya',
    city: 'Indore',
    photo: 'https://images.unsplash.com/photo-1549388604-817d15aa0110?q=80',
  },
];

const HappyJodiScreen = () => {
  const animationRef = useRef<LottieView>(null);
  const navigation = useNavigation<NavigationProp>();
  const [selectedJodi, setSelectedJodi] = useState<typeof jodiData[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  const openModal = (jodi: typeof jodiData[0]) => {
    setSelectedJodi(jodi);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          ref={animationRef}
          source={require('../assets/lottie/biyaah_lottie.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.lottieTagline}>Jodis Made With ❤️ on Biyaah</Text>
      </View>


      <FlatList
        data={jodiData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)} style={styles.card}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.city}>{item.city}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal Box */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalWrapper}>
          <View style={styles.modalBox}>
            {selectedJodi && (
              <>
                <Image source={{ uri: selectedJodi.photo }} style={styles.modalImage} />
                <Text style={styles.modalName}>{selectedJodi.name}</Text>
                <Text style={styles.modalCity}>📍 {selectedJodi.city}</Text>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('JodiDetail', { jodiId: selectedJodi.id });
                  }}
                >
                  <Text style={styles.modalButtonText}>💌 View Full Story</Text>
                </TouchableOpacity>

                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={styles.close}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.submitButton} onPress={() => console.log('Submit flow')}>
        <Text style={styles.submitText}>📩 Submit Your Jodi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HappyJodiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fde9ec',
    paddingTop: 40,
  },
  lottieContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },

  lottie: {
    width: 100,
    height: 100,
    marginBottom: -10,
  },

  lottieTagline: {
    fontSize: 16,
    color: '#c44e4e',
    fontWeight: '600',
    marginTop: 5,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    width: width * 0.42,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 15,
    paddingBottom: 10,
    alignItems: 'center',
    shadowColor: '#ff6d6d',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#c44e4e',
    marginTop: 8,
  },
  city: {
    fontSize: 14,
    color: '#555',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  modalName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#c44e4e',
  },
  modalCity: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#c44e4e',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  close: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#c44e4e',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
