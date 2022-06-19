import {NavigationContainerRef, NavigationProp} from '@react-navigation/core';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {ChatEnum} from '../constants/routerNames';
import {User} from '../models/User';
import {Chat} from '../screens/Chats/Chat';
import {ChatList} from '../screens/Chats/ChatList';

const Stack = createNativeStackNavigator();

type Props = {
    navigation: NavigationProp<any>,
    route: {
      params?: {
          user?: User
      }
    }
  }

export const ChatNavigator = ({route}: Props) => {
  const navigator = useRef<NavigationContainerRef<any>>(null);
  const user = route.params?.user;

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
        <Stack.Screen name={ChatEnum.CHAT_USER} component={() => <Chat user={user}/>}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
