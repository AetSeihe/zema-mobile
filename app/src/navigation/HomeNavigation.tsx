import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from '../components/Icon';
import {routerNames} from '../constants/routerNames';
import {locale} from '../locale';
import PostsScreen from '../screens/Posts/PostsListScreen';
import {theme} from '../styles/theme';

const screensNameLocale = locale.screensName;

const Tab = createBottomTabNavigator();

export const HomeTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName={routerNames.HOME} screenOptions={{
      tabBarActiveTintColor: theme.main,
    }}>
      <Tab.Screen name={routerNames.Posts} component={PostsScreen} options={{
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
      <Tab.Screen name={routerNames.PROFILE} component={PostsScreen} options={{
        title: screensNameLocale.profile,
        tabBarIcon: ({color}) => <Icon name='user' color={color} />,
      }}/>
      <Tab.Screen name={routerNames.SIGN_IN} component={PostsScreen} options={{
        title: screensNameLocale.profile,
        tabBarIcon: ({color}) => <Icon name='bubbles' color={color} />,
      }}/>
    </Tab.Navigator>
  );
};
