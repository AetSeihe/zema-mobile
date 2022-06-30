import {Text} from '@react-native-material/core';
import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar} from '../../../components/Avatar';
import Icon from '../../../components/Icon';
import {InputField} from '../../../components/InputField';
import {routerNames} from '../../../constants/routerNames';
import {Chat as ChatModel} from '../../../models/Chat';
import {User} from '../../../models/User';
import {chatStore} from '../../../store/chatStore';
import {routerStore} from '../../../store/routerStore';
import {userStore} from '../../../store/userStore';
import {MessageType} from '../../../types/chatTypes';
import {styles, stylesHeader, stylesMessage} from './styles';

type Props = {
  user: User,
  chat?: ChatModel
}


type ChatHeaderProps = {
  user: User,
}

type MessageProps = {
  message: MessageType,
  user: User,
  isCompanion: boolean
}


const onPressCompanion = (user: User) => {
  routerStore.pushToScene({
    name: routerNames.PROFILE,
    options: {
      user: user,
    },
  });
};
const ChatHeader = ({user}: ChatHeaderProps) => {
  return (
    <SafeAreaView edges={['top']} style={stylesHeader.wrapper}>
      <TouchableOpacity onPress={() => onPressCompanion(user)} style={stylesHeader.content}>
        <Avatar image={user.mainPhoto?.image} style={stylesHeader.avatar}/>
        <Text style={stylesHeader.title}>{user.fullName}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const Message = ({message, isCompanion}: MessageProps) => {
  return (
    <View style={[stylesMessage.wrapper, isCompanion? stylesMessage.wrapperCompanion: null]}>
      <Text style={[stylesMessage.text, isCompanion? stylesMessage.companionCompanion: null]}>{message.message}</Text>
      <View style={stylesMessage.row}>
        <Text style={[stylesMessage.time, isCompanion? stylesMessage.timeCompanion: null]}>{ChatModel.getMessageSendTime(message)}</Text>
        <Icon name={'checkmark'} size={10} color={isCompanion ? '#FFFFFF': '#087BFF'}/>
        {message.readed && (
          <View style={stylesMessage.checkmarkReaded}>
            <Icon name={'checkmark2'} size={10} color={isCompanion ? '#FFFFFF': '#087BFF'}/>
          </View>
        )}

      </View>
    </View>
  );
};

const LIMIT_FETCH_MESSAGES = 15;

const ChatScreen = ({user, chat}: Props) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const currentChat = chatStore.chats.find((c) => c.id === chat?.id);

  const appUser = userStore.user;

  if (!appUser || !currentChat) {
    return null;
  }

  const sendMessage = async () => {
    setLoading(true);
    await chatStore.sendMessage(user, value, currentChat.id);
    setValue('');
    setLoading(false);
  };

  const handleScrollFlatList = () => {
    console.log('scroll chat', chat);
    if (currentChat) {
      chatStore.fetchMessages({
        chatId: currentChat.id,
        limit: LIMIT_FETCH_MESSAGES,
        offset: currentChat.messages.length,
      });
    }
  };

  return (
    <View style={styles.wrapper}>
      <ChatHeader user={user}/>
      <FlatList
        onEndReached={handleScrollFlatList}
        style={styles.list}
        data={currentChat.messages}
        renderItem={({item}) => <Message
          message={item}
          user={item.userId === user.id ? user:appUser}
          isCompanion={item.userId === user.id}
        />}
        inverted
      />
      <View style={styles.form}>
        <InputField wrapperStyle={styles.input} placeholder='Напишите сообщение' value={value} onChangeText={setValue}/>
        <TouchableOpacity onPress={sendMessage} style={[styles.button, value && !loading ? null: styles.buttonDisabled]} disabled={!value || loading}>
          <Icon name='compass' size={26} color='#fff'/>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export const Chat = observer(ChatScreen);
