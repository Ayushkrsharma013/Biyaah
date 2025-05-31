import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import SearchBarWithFilter from '../components/SearchBarWithFilter';
import ProfileCarousel from '../components/ProfileCarousel';
import MostlySearchBox from '../components/MostlySearchBox';

const DiscoverScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBarWithFilter />
        <ProfileCarousel />
        <MostlySearchBox />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fddada',
  },
});
