import {Text} from '@react-native-material/core';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar} from '../../../components/Avatar';
import {Chat} from '../../../models/Chat';
import {Skeleton} from 'react-native-skeleton-component';
type Props = {
  chat: Chat,
  onPress: () => void;
}

const ChatItem = ({chat, onPress}: Props) => {
  const person = chat.companion;
  const message = chat.messages && chat.messages[0];

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View style={styles.avatarWrapper}>
        <Avatar style={styles.avatar} image={person.mainPhoto?.image}/>
      </View>
      <View style={styles.content}>
        <Text style={styles.fullName}>{chat.updatedAt.getTime()}</Text>
        <Text style={styles.fullName}>{person.fullName}</Text>
        {message && <Text style={styles.message}>{message.message}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export const ChatItemSceleton = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.avatarWrapper}>
        <Skeleton style={styles.avatar} />
      </View>
      <View style={styles.content}>
        <Skeleton style={styles.sceletonName} />
        <Skeleton style={styles.sceletonMessage} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  avatarWrapper: {
    marginRight: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 100,

  },
  content: {
    marginTop: 5,
  },
  sceletonName: {
    height: 20,
    width: 140,
    marginBottom: 5,
  },
  sceletonMessage: {
    height: 20,
    width: 200,
  },
  fullName: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 5,
  },
  message: {
    height: 20,

  },
});

export default ChatItem;
