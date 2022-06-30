import {NavigationContainerRef, NavigationProp} from '@react-navigation/core';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {ChatEnum} from '../constants/routerNames';
import {Chat} from '../models/Chat';
import {User} from '../models/User';
import {Chat as ChatScreen} from '../screens/Chats/Chat';
import {ChatList} from '../screens/Chats/ChatList';

const Stack = createNativeStackNavigator();

type Props = {
    navigation: NavigationProp<any>,
    route: {
      params?: {
          user?: User,
          chat: Chat
      }
    }
  }

export const ChatNavigator = ({route}: Props) => {
  const navigator = useRef<NavigationContainerRef<any>>(null);
  const user = route.params?.user;
  const chat = route.params?.chat;


  useEffect(() => {
    if (navigator.current) {
      if (user) {
        navigator.current.navigate(ChatEnum.CHAT_USER, {
          user: user,
        });
      }
      if (!user) {
        navigator.current.navigate(ChatEnum.CHAT_LIST);
      }
    }
  });


  return (
    <NavigationContainer independent={true} ref={navigator}>
      <Stack.Navigator
        screenOptions={{
          headerTitle: 'Чаты',
        }}
      >
        <Stack.Screen name={ChatEnum.CHAT_LIST} component={ChatList}/>
        <Stack.Screen
          name={ChatEnum.CHAT_USER}
          component={() => <ChatScreen user={user} chat={chat}/>}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
