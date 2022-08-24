import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {FriendNames} from '../constants/routerNames';
import Friends from '../screens/Friends/Friends';
import FriendsRequest from '../screens/Friends/FriendsRequest';
import FriendsSearch from '../screens/Friends/FriendsSearch';


const Stack = createNativeStackNavigator();

export const FriendNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={FriendNames.FriendsSearch} screenOptions={{
      headerShown: false,
      animation: 'none',
    }}>
      <Stack.Screen name={FriendNames.FriendsSearch} component={FriendsSearch}/>
      <Stack.Screen name={FriendNames.Friends} component={Friends}/>
      <Stack.Screen name={FriendNames.FriendsRequest} component={FriendsRequest}/>
    </Stack.Navigator>

  );
};
