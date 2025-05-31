import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Dimensions,
    Image,
} from 'react-native';
import ProfileCard from './cards/ProfileCard';

const { width } = Dimensions.get('window');

const images = [
    require('../assets/image/dp1.png'),
    require('../assets/image/dp2.png'),
    require('../assets/image/dp3.png'),
    require('../assets/image/dp1.png'),
    require('../assets/image/dp2.png'),
];

const ProfileCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / 180); // 160 card + 20 margin
        setActiveIndex(index);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <ProfileCard image={item} />}
                onScroll={handleScroll}
                snapToInterval={180}
                decelerationRate="fast"
                contentContainerStyle={styles.list}
            />

            {/* Dot Indicator */}
            <View style={styles.dotsContainer}>
                {images.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            activeIndex === i && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

export default ProfileCarousel;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    list: {
        paddingHorizontal: 20,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 12,
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
});
