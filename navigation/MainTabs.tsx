// navigation/MainTabs.tsx
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/HomeScreen'
import ConnectionScreen from '../screens/ConnectionScreen'
import DiscoverScreen from '../screens/DiscoverScreen'
import ChatScreen from '../screens/ChatScreen'
import ProfileScreen from '../screens/ProfileScreen'
import FooterBar from '../components/FooterBar' // custom tabBar

const Tab = createBottomTabNavigator()

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <FooterBar {...props} />} // ✅ centralized custom footer
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ userId: '', username: '', name: '' }}
      />
      <Tab.Screen name="ConnectionScreen" component={ConnectionScreen} />
      <Tab.Screen name="DiscoverScreen" component={DiscoverScreen} />
      <Tab.Screen name="ChatScreen" component={ChatScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
