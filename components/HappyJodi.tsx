import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

const images = [
    require('../assets/image/jodi1.png'),
    require('../assets/image/jodi1.png'),
    require('../assets/image/jodi1.png'),
];

const HappyJodi = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / (width * 0.6));
        setActiveIndex(index);
    };

    return (
        <View style={styles.container}>
            {/* Garland Left */}
            <Image source={require('../assets/image/flower-left.png')} style={styles.flowerLeft} />
            <Image source={require('../assets/image/flower-right.png')} style={styles.flowerRight} />

            <Text style={styles.heading}>Our Happy Jodi!</Text>

            {/* Jodi Carousel */}
            <FlatList
                data={images}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled={false}
                onScroll={handleScroll}
                snapToInterval={width * 0.6 + 10}
                decelerationRate="fast"
                contentContainerStyle={styles.carousel}
                renderItem={({ item }) => (
                    <Image source={item} style={styles.jodiImage} resizeMode="cover" />
                )}
            />

            {/* Dot Indicators */}
            <View style={styles.dots}>
                {images.map((_, i) => (
                    <View key={i} style={[styles.dot, activeIndex === i && styles.activeDot]} />
                ))}
            </View>

            {/* Explore Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HappyJodi;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fde3e3',
        marginHorizontal: 20,
        marginTop: 30,
        paddingVertical: 20,
        borderRadius: 20,
        position: 'relative',
        alignItems: 'center',
    },
    heading: {
        fontSize: 18,
        fontFamily: 'Marmelad',
        color: '#701111',
        marginBottom: 12,
        borderBottomWidth: 1.5,
        borderColor: '#db5e5e',
    },
    carousel: {
        gap: 10,
    },
    jodiImage: {
        width: width * 0.6,
        height: 200,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#db5e5e',
        marginHorizontal: 5,
    },
    dots: {
        flexDirection: 'row',
        marginTop: 12,
        marginBottom: 20,
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: '#f8bcbc',
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
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
    flowerLeft: {
        width: 50,
        height: 80,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    flowerRight: {
        width: 50,
        height: 80,
        position: 'absolute',
        top: 10,
        right: 10,
    },
});
