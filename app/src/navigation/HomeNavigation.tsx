import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from '../components/Icon';
import {routerNames} from '../constants/routerNames';
import {locale} from '../locale';
import {chatStore} from '../store/chatStore';
import {routerStore} from '../store/routerStore';
import {userStore} from '../store/userStore';
import {theme} from '../styles/theme';
import {ChatNavigator} from './ChatNavigator';
import {CustomTabBar} from './components/CustomTabBar';
import {FriendNavigator} from './FriendNavigator';
import {PostsNavigator} from './PostsNavigator';
import {styles} from './styles';
import WorkNavigator from './WorkNavigator';
import {Menu, MenuItem} from 'react-native-material-menu';
import {Text} from '@react-native-material/core';
import {clearAuthUserData} from '../utils/userAuthToken';
import RNRestart from 'react-native-restart';

const screensNameLocale = locale.screensName;

const Tab = createBottomTabNavigator();


const HeaderProfileIcon = () => {
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
      name: routerNames.PROFILE_SETTING,
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
          tabBarIcon: ({color}) => (
            <View>
              <Icon name='bubbles' color={color}/>
              {!!chatStore.notReadedMessages.length && <View style={styles.dot}/>}
            </View>
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
});
