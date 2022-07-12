import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {CatAlert} from '../../../components/CatAlert';
import {InputField} from '../../../components/InputField';
import Loading from '../../../components/Loading';
import {Tint} from '../../../components/Tint';
import {routerNames} from '../../../constants/routerNames';
import {Chat} from '../../../models/Chat';
import {chatStore} from '../../../store/chatStore';
import {routerStore} from '../../../store/routerStore';
import UserChatItem from '../components/UserChatItem';
import {styles} from './styles';


const CHAT_LIMIT_FETCH = 15;

const ChatListScreen = () => {
  const [search, setSearch] = useState('');
  const offsetFetch = useRef(0);

  const fetchChats = () => {
    offsetFetch.current = 0;
    chatStore.clearChats();
    chatStore.fetchChats({
      data: {
        userName: search,
      },
      options: {
        limit: CHAT_LIMIT_FETCH,
        offset: offsetFetch.current,
      },
    });

    offsetFetch.current += CHAT_LIMIT_FETCH;
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const onPressUserCard = (chat: Chat) => {
    routerStore.pushToScene({
      name: routerNames.Chat_Item,
      options: {
        user: chat.companion,
      },
    });
  };

  const fetchChatsOnScroll = () => {
    chatStore.fetchChats({
      data: {
        userName: search,
      },
      options: {
        limit: CHAT_LIMIT_FETCH,
        offset: offsetFetch.current,
      },
    });
    offsetFetch.current += CHAT_LIMIT_FETCH;
  };


  return (
    <View style={styles.wrapper}>
      {chatStore.loading && chatStore.isNeverLoading? <Loading /> :
      (<FlatList
        data={chatStore.chats}
        onEndReached={fetchChatsOnScroll}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={<InputField style={styles.input} onBlur={fetchChats} value={search} onChangeText={setSearch} placeholder='Иванов Иван Иванович' label='Поиск'/>}
        ListEmptyComponent={<CatAlert title={search.length ? 'По вашему запросу ничего не найденно' :'Похоже у вас еще нет чатов :('}/>}
        ListFooterComponent={() => <Tint style={styles.footerTint}>{chatStore.loading ? 'Загрузка...': 'Вы просмотрели все чаты!'}</Tint>}
        renderItem={({item}) => <UserChatItem chat={item} onPress={onPressUserCard}
        />
        }
      />)}

    </View>
  );
};

export const ChatList = observer(ChatListScreen);
