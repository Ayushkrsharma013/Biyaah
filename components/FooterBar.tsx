import React, { useEffect, useRef } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import HomeIcon from '../assets/icons/HomeIcon'
import MatchIcon from '../assets/icons/MatchIcon'
import DiscoverIcon from '../assets/icons/DiscoverIcon'
import ChatIcon from '../assets/icons/ChatIcon'

const { width } = Dimensions.get('window')
const TAB_WIDTH = width / 5

const tabs = [
  { name: 'Home', icon: HomeIcon, route: 'Home' },
  { name: 'Match', icon: MatchIcon, route: 'ConnectionScreen' },
  { name: 'Discover', icon: DiscoverIcon, route: 'DiscoverScreen' },
  { name: 'Chat', icon: ChatIcon, route: 'ChatScreen' },
  { name: 'Profile', icon: null, route: 'ProfileScreen' },
]

const FooterBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
   const route = useRoute()

  const activeIndex = tabs.findIndex((tab) => tab.route === route.name)
  const bumpX = useRef(new Animated.Value(activeIndex * TAB_WIDTH)).current

  useEffect(() => {
    Animated.timing(bumpX, {
      toValue: activeIndex * TAB_WIDTH,
      useNativeDriver: true,
      duration: 500,
    }).start()
  }, [activeIndex])

  return (
    <View style={styles.footerBar}>
      <Animated.View
        style={[
          styles.bump,
          {
            transform: [{ translateX: bumpX }],
          },
        ]}
      />
      {tabs.map((tab, index) => {
        const isActive = route.name === tab.route
        const IconComponent = tab.icon

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => navigation.navigate(tab.route as never)}
            activeOpacity={0.8}
            style={[styles.tab, isActive && styles.activeTab]}
          >
            <View style={styles.icon}>
              {IconComponent ? (
                <IconComponent
                  width={30}
                  height={30}
                  stroke={isActive ? '#ad2831' : '#ffeaea'}
                />
              ) : (
                <Image
                  source={require('../assets/icons/User.png')}
                  style={[
                    styles.profileImg,
                    isActive && styles.activeProfileImg,
                  ]}
                />
              )}
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default FooterBar

const styles = StyleSheet.create({
  footerBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: '#a52a2a',
    width: '100%',
    maxWidth: 600,
    height: 80,
    position: 'relative',
    paddingHorizontal: 8,
  },
  bump: {
    position: 'absolute',
    top: -36,
    left: 0,
    width: 72,
    height: 90,
    backgroundColor: '#ffeaea',
    borderRadius: 40,
    zIndex: 1,
  },
  tab: {
    width: 60,
    height: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 2,
  },
  activeTab: {
    transform: [{ translateY: -6 }],
  },
  icon: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginTop: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    zIndex: 2,
  },
  activeProfileImg: {
    borderColor: '#ff5a5a',
    transform: [{ translateY: -4 }],
  },
})
