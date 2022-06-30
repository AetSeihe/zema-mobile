import {Text} from '@react-native-material/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Avatar} from '../../../../components/Avatar';
import {Chat} from '../../../../models/Chat';
import {styles} from './styles';

type Props = {
  chat: Chat,
  onPress: (chat: Chat) => void
};


const UserChatItem = ({chat, onPress}: Props) => {
  const companion = chat.companion;
  const lastMessage = chat.messages[0];


  return (
    <TouchableOpacity style={styles.wrapper}onPress={() => onPress(chat)}>
      <Avatar style={styles.avatar}image={companion.mainPhoto?.image}/>
      <View style={styles.column}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{companion.id} {companion.fullName}</Text>
          {!!lastMessage && <Text style={styles.time}>{Chat.getMessageSendTime(lastMessage)}</Text>}
        </View>
        {!!lastMessage && <Text style={styles.message}>{lastMessage.message}</Text>}
      </View>
    </TouchableOpacity>
  );
};


export default UserChatItem;
