import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {FadeOut, Layout, SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight} from 'react-native-reanimated';
import {CatAlert} from '../../components/CatAlert';
import {routerNames} from '../../constants/routerNames';
import {BASE_LIMIT_TO_FETCH_CHATS, chatStore} from '../../store/chatStore';
import {routerStore} from '../../store/routerStore';
import {userStore} from '../../store/userStore';
import ChatItem, {ChatItemSceleton} from './components/ChatItem';
import ChatListHeader from './components/ChatListHeader';
import ListHeader from './components/ListHeader';
import UserItem from './components/UserItem';

let timeOutToFetch: NodeJS.Timeout | null;
const TIME_TO_FETCH_USER = 1000;

const SkeletonList = () => {
  return (
    <Animated.View exiting={FadeOut}>
      <ChatItemSceleton />
      <ChatItemSceleton />
      <ChatItemSceleton />
      <ChatItemSceleton />
      <ChatItemSceleton />
      <ChatItemSceleton />
      <ChatItemSceleton />
      <ChatItemSceleton />
    </Animated.View>
  );
};

const SkeletonUserList = () => {
  return (
    <Animated.View exiting={FadeOut}>
      <ChatItemSceleton />
      <ChatItemSceleton />
      <ChatItemSceleton />
    </Animated.View>
  );
};

const ChatList = () => {
  const [searchValue, setSearchValue] = useState('');
  const fetchChatOffset = useRef(0);


  useEffect(() => {
    chatStore.getAll({
      limit: BASE_LIMIT_TO_FETCH_CHATS,
      offset: fetchChatOffset.current,
    });
  }, []);

  useEffect(() => {
    if (timeOutToFetch) {
      clearTimeout(timeOutToFetch);
    }

    if (searchValue === '') {
      return;
    }

    timeOutToFetch = setTimeout(() => {
      chatStore.getChatsByMessageText({
        text: searchValue,
      });
      chatStore.getChatsByUserName({
        name: searchValue,
      });
    }, TIME_TO_FETCH_USER);
  }, [searchValue]);

  const goToChat = (userId: number) => {
    routerStore.pushToScene({
      name: routerNames.Chat_Item,
      options: {
        userId: userId,
      },
    });
  };


  return (
    <View style={styles.wrapper}>
      <ChatListHeader placeholder='🔎 поиск по чатам' placeholderTextColor={'#5c5c5c'} value={searchValue} onChangeText={setSearchValue}/>
      {!!searchValue && (
        <Animated.View style={styles.content} entering={SlideInRight} exiting={SlideOutRight}>
          <ListHeader text='Чаты и контакты' />
          {chatStore.loadingChatsByUserName ? <SkeletonUserList />: (
            <Animated.FlatList
              exiting={FadeOut}
              data={chatStore.chatsByUserName}
              renderItem={({item}) => <UserItem chat={item} onPress={() => goToChat(item.companion.id)}/>}
              keyExtractor={(chat) => chat.id.toString()}
            />
          )}
          <ListHeader text='Сообщения' />
          {chatStore.loadingChatsByMessage ? <SkeletonUserList />: (
            <Animated.FlatList
              exiting={FadeOut}
              data={chatStore.chatsByMessage}
              renderItem={({item}) => <ChatItem chat={item} onPress={() => goToChat(item.companion.id)}/>}
              keyExtractor={(chat) => chat.id.toString()}
            />
          )}
        </Animated.View>
      )}
      {!searchValue && (
        <Animated.View style={styles.content} entering={SlideInLeft} exiting={SlideOutLeft}>
          {chatStore.loadingChats ? <SkeletonList /> : (
            <ScrollView style={styles.listWrapper}>
              {chatStore.chatsArray.map((item) => (
                <Animated.View
                  key={item.id}
                  layout={Layout.springify()}
                  exiting={SlideInRight}
                  entering={SlideInLeft.delay(Math.random())}
                >
                  <ChatItem chat={item} onPress={() => goToChat(item.companion.id)}/>
                </Animated.View>
              ))}
            </ScrollView>
          )}

        </Animated.View>
      )}
    </View>
  );
};

{/* <Animated.FlatList
              refreshing
              exiting={FadeOut}
              style={styles.listWrapper}
              data={chatStore.chatsArray}
              keyExtractor={(chat) => chat.id.toString()}
              renderItem={({item}) => <Animated.View
                key={item.id}
                layout={Layout.springify()}
                entering={SlideInLeft}
              >
                <ChatItem chat={item} onPress={() => goToChat(item.companion.id)}/>
              </Animated.View>}
              ListEmptyComponent={() => <CatAlert title='Похоже у вас еще нет сообщений'/>}
            /> */}

const styles = StyleSheet.create({
  wrapper: {

    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  listWrapper: {
    paddingTop: 5,
  },

});

export default observer(ChatList);


