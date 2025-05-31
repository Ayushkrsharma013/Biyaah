import React, { useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  require('../assets/image/dp2.png'),
  require('../assets/image/dp2.png'),
  require('../assets/image/dp2.png'),
  require('../assets/image/dp2.png'),
];

const FeaturedProfilesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / 130);
    setActiveIndex(index);
  };

  return (
    <View style={styles.wrap}>
      <FlatList
        horizontal
        data={images}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        onScroll={handleScroll}
        snapToInterval={130}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} />
        )}
      />
      <View style={styles.dots}>
        {images.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, activeIndex === i && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default FeaturedProfilesCarousel;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fdeaea',
    margin: 20,
    padding: 12,
    borderRadius: 16,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#f5bcbc',
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#701111',
  },
});
