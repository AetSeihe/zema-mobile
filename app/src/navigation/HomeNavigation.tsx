import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from '../components/Icon';
import {routerNames} from '../constants/routerNames';
import {locale} from '../locale';
import PostsScreen from '../screens/Posts/PostsListScreen';
import {routerStore} from '../store/routerStore';
import {userStore} from '../store/userStore';
import {theme} from '../styles/theme';
import {CustomTabBar} from './components/CustomTabBar';
import {PostsNavigator} from './PostsNavigator';

const screensNameLocale = locale.screensName;

const Tab = createBottomTabNavigator();

const HeaderProfileIcon = () => {
  const user = userStore.user;
  if (!user) {
    return null;
  }
  return <TouchableOpacity onPress={() => routerStore.pushToScene({
    name: routerNames.PROFILE,
    options: {
      user: user,
    },
  })}>
    <Icon name='user' />
  </TouchableOpacity>;
};

export const HomeTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName={routerNames.HOME} screenOptions={{
      tabBarActiveTintColor: theme.main,
      tabBarInactiveTintColor: 'gray',
      headerRight: HeaderProfileIcon,
    }} tabBar={(props) => <CustomTabBar {...props}/>}>
      <Tab.Screen name={routerNames.Posts} component={PostsNavigator} options={{
        title: screensNameLocale.posts,
        tabBarIcon: ({color}) => <Icon name='newspaper' color={color} />,
      }}/>
      <Tab.Screen name={routerNames.FRIENDS} component={PostsScreen} options={{
        title: screensNameLocale.friends,
        tabBarIcon: ({color}) => <Icon name='users' color={color} />,
      }}/>
      <Tab.Screen name={routerNames.WORK} component={PostsScreen} options={{
        title: screensNameLocale.work,
        tabBarIcon: ({color}) => <Icon name='laptop' color={color}/>,
      }}/>
      <Tab.Screen name={routerNames.Chat} component={PostsScreen} options={{
        title: screensNameLocale.chat,
        tabBarIcon: ({color}) => <Icon name='bubbles' color={color} />,
      }}/>
    </Tab.Navigator>
  );
};
