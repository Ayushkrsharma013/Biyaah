import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import HeaderBar from '../components/HeaderBar'
import SearchBarWithFilter from '../components/SearchBarWithFilter'
import ProfileCarousel from '../components/ProfileCarousel'
import NavButtons from '../components/NavButtons'
import MatchGrid from '../components/MatchGrid'
import HappyJodi from '../components/HappyJodi'

const ConnectionScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />

      {/* Top static content */}
      <SearchBarWithFilter />
      <ProfileCarousel />

      <NavButtons buttons={['Daily Matches', 'Send', 'Request', 'My Preferences']} />

      <View style={styles.titleWrap}>
        <Text style={styles.title}>
          Handpicked profiles curated just for you!
        </Text>
      </View>

      {/* These components handle their own scrolling */}
      <MatchGrid />
      <HappyJodi />
    </SafeAreaView>
  )
}

export default ConnectionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fddada',
  },
  titleWrap: {
    marginTop: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Marmelad',
    color: '#701111',
  },
})
