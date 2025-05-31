import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';

const ChatWindow = () => {
  return (
    <View style={styles.chatWrap}>
      <View style={styles.header}>
        <Image source={require('../assets/image/dp2.png')} style={styles.avatar} />
        <Text style={styles.name}>Sanjana Sharma</Text>
        <Text style={styles.time}>07:20 PM</Text>
      </View>

      <View style={styles.bubbleWrap}>
        <Text style={styles.bubble}>Hii</Text>
        <Text style={styles.sentTime}>11:27 AM ✓✓</Text>
      </View>

      <View style={styles.inputWrap}>
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor="#701111"
          style={styles.input}
        />
        <TouchableOpacity>
          <Text style={styles.send}>📎</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatWindow;

const styles = StyleSheet.create({
  chatWrap: {
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: '#fdeaea',
    borderRadius: 20,
    padding: 14,
    elevation: 4,
  },
  header: {
    backgroundColor: '#701111',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    flex: 1,
    color: '#fff',
    fontFamily: 'Marmelad',
    fontSize: 14,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  time: {
    color: '#fff',
    fontSize: 12,
  },
  bubbleWrap: {
    marginVertical: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  bubble: {
    fontSize: 14,
    color: '#701111',
    fontFamily: 'Marmelad',
  },
  sentTime: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
    textAlign: 'right',
  },
  inputWrap: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Marmelad',
    fontSize: 14,
    color: '#701111',
  },
  send: {
    fontSize: 18,
    color: '#701111',
  },
});
