import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'

import HeaderBar from '../components/HeaderBar'
import SearchBarWithFilter from '../components/SearchBarWithFilter'
import ProfileCarousel from '../components/ProfileCarousel'
import NavButtons from '../components/NavButtons'
import FindMatchCard from '../components/FindMatchCard'
import HappyJodiCarousel from '../components/HappyJodiCarousel'

type HomeScreenParams = {
  userId: string
  username: string
  name: string
}

const HomeScreen = () => {
  const route = useRoute<RouteProp<Record<'Home', HomeScreenParams>, 'Home'>>()
  const { userId, username, name } = route.params

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <SearchBarWithFilter />
        <ProfileCarousel />
        <NavButtons />
        <FindMatchCard />
        <HappyJodiCarousel />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fddada',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#701111',
    marginTop: 10,
    marginLeft: 16,
    fontFamily: 'Marmelad',
  },
})
