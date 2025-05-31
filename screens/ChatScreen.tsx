import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import SearchBarWithFilter from '../components/SearchBarWithFilter';
import FeaturedProfilesCarousel from '../components/FeaturedProfilesCarousel';
import ChatWindow from '../components/ChatWindow';
import MessageListPreview from '../components/MessageListPreview';

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBarWithFilter />
        <FeaturedProfilesCarousel />
        <ChatWindow />
        <MessageListPreview />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fddada',
  },
});
