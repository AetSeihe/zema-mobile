import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from '../components/Icon';
import {routerNames} from '../constants/routerNames';
import {locale} from '../locale';
import {routerStore} from '../store/routerStore';
import {userStore} from '../store/userStore';
import {theme} from '../styles/theme';
import {ChatNavigator} from './ChatNavigator';
import {CustomTabBar} from './components/CustomTabBar';
import {FriendNavigator} from './FriendNavigator';
import {PostsNavigator} from './PostsNavigator';
import WorkNavigator from './WorkNavigator';

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
    <NavigationContainer independent={true} ref={(ref) => routerStore.setTabNavigatorRef(ref)}>
      <Tab.Navigator initialRouteName={routerNames.HOME} screenOptions={{
        tabBarActiveTintColor: theme.main,
        tabBarInactiveTintColor: 'gray',
        headerRight: HeaderProfileIcon,
      }} tabBar={(props) => <CustomTabBar {...props}/>}>
        <Tab.Screen name={routerNames.Posts} component={PostsNavigator} options={{
          title: screensNameLocale.posts,
          tabBarIcon: ({color}) => <Icon name='newspaper' color={color} />,
        }}/>
        <Tab.Screen name={routerNames.FRIENDS} component={FriendNavigator} options={{
          title: screensNameLocale.friends,
          tabBarIcon: ({color}) => <Icon name='users' color={color} />,
        }}/>
        <Tab.Screen name={routerNames.WORK} component={WorkNavigator} options={{
          title: screensNameLocale.work,
          tabBarIcon: ({color}) => <Icon name='laptop' color={color} />,
        }}/>
        <Tab.Screen name={routerNames.Chat} component={ChatNavigator} options={{
          title: screensNameLocale.chat,
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name='bubbles' color={color} />,
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};
