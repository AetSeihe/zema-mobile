import {NavigationContainerRef, NavigationProp} from '@react-navigation/core';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react';
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

const ChatNavigatorScreen = ({route}: Props) => {
  const navigator = useRef<NavigationContainerRef<any>>(null);
  const user = route.params?.user;


  useEffect(() => {
    if (navigator.current) {
      if (user) {
        navigator.current.navigate(ChatEnum.CHAT_USER);
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
          component={() => <ChatScreen user={user}/>}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const ChatNavigator = observer(ChatNavigatorScreen);
