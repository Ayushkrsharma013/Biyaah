import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import ProfileInfoCard from '../components/ProfileInfoCard';
import ProfileActions from '../components/ProfileActions';
import ProfileAccordion from '../components/ProfileAccordion';
import DownloadBioDataButton from '../components/DownloadBioDataButton';
import LogoutCard from '../components/LogoutCard';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileInfoCard />
        <ProfileActions />
        <ProfileAccordion />
        <DownloadBioDataButton />
        <LogoutCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fddada',
  },
});
