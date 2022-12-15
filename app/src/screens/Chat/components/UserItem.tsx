import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Skeleton} from 'react-native-skeleton-component';
import {Avatar} from '../../../components/Avatar';
import {Chat} from '../../../models/Chat';

type Props = {
    chat: Chat,
    onPress: () => void;
}

const UserItem = ({chat, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Avatar style={styles.avatar} image={chat.companion.mainPhoto?.image}/>
      <Text style={styles.name}>{chat.companion.fullName}</Text>
    </TouchableOpacity>
  );
};

export const UserItemSkeleton = () => {
  return (
    <View style={styles.wrapper}>
      <Skeleton style={styles.avatar}/>
      <Skeleton style={styles.nameSkeleton} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  nameSkeleton: {
    width: 150,
    height: 20,
  },
});

export default UserItem;
