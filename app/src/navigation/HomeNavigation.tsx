import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Icon from '../components/Icon';
import {routerNames} from '../constants/routerNames';
import {locale} from '../locale';
import {chatStore} from '../store/chatStore';
import {routerStore} from '../store/routerStore';
import {userStore} from '../store/userStore';
import {theme} from '../styles/theme';
import {CustomTabBar} from './components/CustomTabBar';
import {styles} from './styles';
import WorkNavigator from './WorkNavigator';
import {Menu, MenuItem} from 'react-native-material-menu';
import {Text} from '@react-native-material/core';
import {clearAuthUserData} from '../utils/userAuthToken';
import RNRestart from 'react-native-restart';
import {ChatList} from '../screens/Chats/ChatList';
import PostsListScreen from '../screens/Posts/PostsListScreen';
import {FriendNavigator} from './FriendNavigator';

const screensNameLocale = locale.screensName;

const Tab = createBottomTabNavigator();
const newsIcon = require('./images/news.png');
const friendsIcon = require('./images/friends.png');
const workIcon = require('./images/work.png');
const chatIcon = require('./images/chat.png');

const ICON_BOTTOM_OFFSET = -8;

type ChatIconProps = {
  color: string
}

const ChatIcon = observer(({color}: ChatIconProps) => {
  return (
    <View style={{
      bottom: ICON_BOTTOM_OFFSET,
    }}>
      <Image source={chatIcon} style={{
        width: ICON_SIZE,
        height: ICON_SIZE,
        opacity: color === 'gray' ? INACTIVE_ICON_OPACITY : 1,
      }} resizeMode='contain'/>
      {!!chatStore.notReadedMessages.length && <View style={styles.dot}/>}
    </View>
  );
});

const ICON_SIZE = 29;
const INACTIVE_ICON_OPACITY = 0.5;

export const HeaderProfileIcon = () => {
  const [visible, setVisible] = useState(false);
  const user = userStore.user;
  if (!user) {
    return null;
  }


  const onPressProfile = () => {
    setVisible(false);
    routerStore.pushToScene({
      name: routerNames.PROFILE,
      options: {
        user: user,
      },
    });
  };

  const onPressSettings = () => {
    setVisible(false);
    routerStore.pushToScene({
      name: routerNames.SETTING,
      options: {},
    });
  };

  const onPressExit = async () => {
    setVisible(false);
    await clearAuthUserData();
    // eslint-disable-next-line new-cap
    RNRestart.Restart();
  };

  return (
    <>
      <TouchableOpacity style={styles.headerIcon} onPress={() => setVisible(true)}>
        <Icon name='user' color={'#767677'}/>
      </TouchableOpacity>
      <Menu
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <MenuItem onPress={onPressProfile}>
          <Text style={styles.menuItem}>Профиль</Text>
        </MenuItem>
        <MenuItem onPress={onPressSettings}>
          <Text style={styles.menuItem}>Настройки</Text>
        </MenuItem>
        <MenuItem onPress={onPressExit}>
          <Text style={styles.menuItemExit}>Выйти</Text>
        </MenuItem>
      </Menu>
    </>
  );
};

export const HomeTabNavigation = observer(() => {
  return (
    <Tab.Navigator initialRouteName={routerNames.HOME} screenOptions={{
      tabBarActiveTintColor: theme.main,
      tabBarInactiveTintColor: 'gray',
      headerRight: HeaderProfileIcon,
      tabBarItemStyle: {
        backgroundColor: 'red',
      },
      tabBarShowLabel: false,
    }} tabBar={(props) => <CustomTabBar {...props}/>}>
      <Tab.Screen name={routerNames.Posts} component={PostsListScreen} options={{
        headerTitle: screensNameLocale.posts,
        title: '',
        tabBarIcon: ({color}) => <Image source={newsIcon} style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          opacity: color === 'gray' ? INACTIVE_ICON_OPACITY : 1,
          bottom: ICON_BOTTOM_OFFSET,
        }} resizeMode='contain'/>,
      }}/>
      <Tab.Screen name={routerNames.FRIENDS} component={FriendNavigator} options={{
        headerTitle: screensNameLocale.friends,
        title: '',
        tabBarIcon: ({color}) => <Image source={friendsIcon} style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          bottom: ICON_BOTTOM_OFFSET,
          opacity: color === 'gray' ? INACTIVE_ICON_OPACITY : 1,

        }} resizeMode='contain'/>,
      }}/>
      <Tab.Screen name={routerNames.WORK} component={WorkNavigator} options={{
        headerTitle: screensNameLocale.work,
        title: '',
        tabBarIcon: ({color}) => <Image source={workIcon} style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          bottom: ICON_BOTTOM_OFFSET,
          opacity: color === 'gray' ? INACTIVE_ICON_OPACITY : 1,

        }} resizeMode='contain'/>,
      }}/>
      <Tab.Screen name={routerNames.Chat} component={ChatList} options={{
        headerTitle: screensNameLocale.chat,
        title: '',
        tabBarIcon: ({color}) => <ChatIcon color={color}/>,
      }}/>
    </Tab.Navigator>
  );
});
