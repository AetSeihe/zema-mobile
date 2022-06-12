import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {routerNames} from '../constants/routerNames';
import PostsListScreen from '../screens/Posts/PostsListScreen';

const Stack = createNativeStackNavigator();

export const PostsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={routerNames.PostsList} component={PostsListScreen}/>
    </Stack.Navigator>
  );
};
