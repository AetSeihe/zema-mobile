import {Text} from '@react-native-material/core';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, TouchableOpacity, View, ViewToken} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar} from '../../../components/Avatar';
import {CatAlert} from '../../../components/CatAlert';
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
  user?: User,
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
const TIMEOUT_TO_SEND_READED_MESSAGE = 5 * 1000;
let readMessageInterval: NodeJS.Timeout;
const ChatScreen = ({user: propsUser}: Props) => {
  const [value, setValue] = useState('');
  const [user, setUser] = useState<User | undefined>(propsUser);
  const [loading, setLoading] = useState(false);
  const readedMessages = useRef<number[]>([]).current;

  const currentChat = chatStore.activeChat || chatStore.chats.find((c) => {
    return c.userOneId === user?.id || c.userTwoId === user?.id;
  });


  useEffect(() => {
    readMessageInterval = setInterval(() => {
      if (currentChat) {
        chatStore.readMessages(currentChat.id, readedMessages);
      }
    }, TIMEOUT_TO_SEND_READED_MESSAGE);

    chatStore.activeChat = currentChat;
    if (!user) {
      setUser(currentChat?.companion);
    }

    return () => {
      clearTimeout(readMessageInterval);
      if (currentChat) {
        chatStore.readMessages(currentChat.id, readedMessages);
      }
    };
  }, []);

  const appUser = userStore.user;

  if (!appUser) {
    return null;
  }

  const sendMessage = async () => {
    setLoading(true);
    setValue('');
    await chatStore.sendMessage(user, value.trim());
    setLoading(false);
  };

  const handleScrollFlatList = () => {
    if (currentChat) {
      chatStore.fetchMessages({
        chatId: currentChat.id,
        limit: LIMIT_FETCH_MESSAGES,
        offset: currentChat.messages.length,
      });
    }
  };

  const handleItemsInViewPort = ({viewableItems}: {
    viewableItems: ViewToken[];
},
  ) => {
    viewableItems.map(({item}: {item: MessageType}) => {
      if (!readedMessages.includes(item.id) && item.userId != appUser.id) {
        readedMessages.push(item.id);
      }
    });
  };

  const viewabilityConfigCallbackPairs = useRef([{
    viewabilityConfig: {
      minimumViewTime: 500,
      itemVisiblePercentThreshold: 100,
    },
    onViewableItemsChanged: handleItemsInViewPort,
  },
  {
    viewabilityConfig: {
      minimumViewTime: 150,
      itemVisiblePercentThreshold: 10,
    },
    onViewableItemsChanged: handleItemsInViewPort,
  },
  ]).current;

  if (!user) {
    return <Text>dsfdsfd</Text>;
  }

  console.log(chatStore.chats);
  return (
    <View style={styles.wrapper}>
      <ChatHeader user={user}/>
      <FlatList
        onEndReached={handleScrollFlatList}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        data={currentChat?.messages || []}
        ListEmptyComponent={<CatAlert title='Похоже у вас еще нет сообщений'/>}
        renderItem={({item}) => <Message
          message={item}
          user={item.userId === user.id ? user:appUser}
          isCompanion={item.userId === user.id}
        />}
        inverted={!!currentChat?.messages.length}
      />
      <View style={styles.form}>
        <InputField wrapperStyle={styles.input} placeholder='Напишите сообщение' value={value} onChangeText={setValue}/>
        <TouchableOpacity onPress={sendMessage} style={[styles.button, value.trim() && !loading ? null: styles.buttonDisabled]} disabled={!value.trim() || loading}>
          <Icon name='compass' size={26} color='#fff'/>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export const Chat = observer(ChatScreen);
