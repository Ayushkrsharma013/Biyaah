import React from 'react';
import { FlatList, View, Text, StyleSheet, Image } from 'react-native';

const messages = new Array(4).fill({
  name: 'Sanjana Sharma',
  time: '07:20 PM',
  avatar: require('../assets/image/dp3.png'),
});

const MessageListPreview = () => {
  return (
    <FlatList
      data={messages}
      keyExtractor={(_, i) => i.toString()}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Image source={item.avatar} style={styles.avatar} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      )}
    />
  );
};

export default MessageListPreview;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#701111',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    gap: 10,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    color: '#fff',
    fontFamily: 'Marmelad',
    flex: 1,
    fontSize: 14,
  },
  time: {
    color: '#fff',
    fontSize: 12,
  },
});
