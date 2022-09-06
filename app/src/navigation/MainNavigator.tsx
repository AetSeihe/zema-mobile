import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {routerNames} from '../constants/routerNames';
import {onEnterApp} from '../global/onEnterApp';
import {locale} from '../locale';
import SignInScreen from '../screens/AuthScreens/SignInScreen';
import SignUpScreen from '../screens/AuthScreens/SignUpScreen';
import {Chat} from '../screens/Chats/Chat';
import {ErrorScreen} from '../screens/ErrorScreen';
import Friends from '../screens/Friends/Friends';
import FriendsRequest from '../screens/Friends/FriendsRequest';
import AskGeoPermission from '../screens/OnBoarding/AskGeoPermission';
import {PostFormScreen} from '../screens/Posts/PostFormScreen';
import {PostScreen} from '../screens/Posts/PostScreen';
import {Profile} from '../screens/Profile/ProfileScreen';
import {ProfileSetting} from '../screens/Profile/ProfileSetting';
import Settings from '../screens/Profile/Settings';
import SettingsLocation from '../screens/Profile/SettingsLocation';
import SettingsSecurity from '../screens/Profile/SettingsSecurity';
import UsersMapScreen from '../screens/UsersMapScreen';
import ResumeForm from '../screens/Work/ResumeForm';
import VacancyForm from '../screens/Work/VacancyForm';
import {routerStore} from '../store/routerStore';
import {HeaderProfileIcon, HomeTabNavigation} from './HomeNavigation';


const Stack = createNativeStackNavigator();

const Main = () => {
  const init = async () => {
    const routeName = await onEnterApp();
    routerStore.reset(routeName);

    SplashScreen.hide();
  };

  useEffect(() => {
    init();
  }, []);


  return (
    <NavigationContainer ref={(ref) => routerStore.setNavigatorRef(ref)} independent={true}>
      <Stack.Navigator initialRouteName={routerNames.SIGN_IN} screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'fade',
        headerBackTitle: 'Назад',
      }}>
        <Stack.Screen name={routerNames.ERROR} component={ErrorScreen} />
        <Stack.Screen name={routerNames.ASK_GEO_PERMISSION} component={AskGeoPermission} />

        <Stack.Screen name={routerNames.HOME} component={HomeTabNavigation}/>
        <Stack.Screen name={routerNames.PROFILE} component={Profile} options={{
          title: locale.screensName.profile,
          animation: 'default',
          gestureEnabled: true,
          headerShown: true,

        }}/>
        <Stack.Screen name={routerNames.SETTING} component={Settings} options={{
          title: locale.screensName.settings,
          animation: 'default',
          gestureEnabled: true,
          headerShown: true,

        }}/>
        <Stack.Screen name={routerNames.SETTING_ACCOUNT} component={ProfileSetting} options={{
          title: locale.screensName.settings,
          animation: 'default',
          gestureEnabled: true,
          headerShown: true,
        }}/>
        <Stack.Screen name={routerNames.SETTING_SECURITY} component={SettingsSecurity} options={{
          title: locale.screensName.settings,
          animation: 'default',
          gestureEnabled: true,
          headerShown: true,
        }}/>
        <Stack.Screen name={routerNames.SETTING_LOCATION} component={SettingsLocation} options={{
          title: locale.screensName.settings,
          animation: 'default',
          gestureEnabled: true,
          headerShown: true,
        }}/>
        <Stack.Screen name={routerNames.Post} component={PostScreen} options={{
          animation: 'default',
          gestureEnabled: true,
          headerShown: true,
        }}/>
        <Stack.Screen name={routerNames.SIGN_IN} component={SignInScreen} />
        <Stack.Screen name={routerNames.SIGN_UP} component={SignUpScreen}/>
        <Stack.Screen name={routerNames.MY_FRIENDS} component={Friends} options={{
          title: locale.screensName.friends,
          headerShown: true,
          animation: 'default',
          headerRight: HeaderProfileIcon,
        }}/>
        <Stack.Screen name={routerNames.FRIENDS_REQUEST} component={FriendsRequest} options={{
          title: 'запросы в друзья',
          headerShown: true,
          animation: 'default',
          headerRight: HeaderProfileIcon,
        }}/>

        <Stack.Screen name={routerNames.USER_MAP} component={UsersMapScreen} options={{
          title: 'Пользователи по близости',
          headerShown: true,
          animation: 'default',
          headerRight: HeaderProfileIcon,
        }}/>


        <Stack.Screen name={routerNames.POST_FORM} component={PostFormScreen} options={{
          title: locale.screensName.postForm,
          animation: 'slide_from_bottom',
          headerShown: true,
          headerLeft: () => null,
          headerBackTitle: locale.header.backButtonTitle,
        }}/>
        <Stack.Screen name={routerNames.VACANCY_FORM} component={VacancyForm} options={{
          title: locale.screensName.vacancyForm,
          animation: 'slide_from_bottom',
          headerShown: true,
          headerLeft: () => null,
          headerBackTitle: locale.header.backButtonTitle,
        }}/>
        <Stack.Screen name={routerNames.RESUME_FORM} component={ResumeForm} options={{
          title: locale.screensName.resumeForm,
          animation: 'slide_from_bottom',
          headerShown: true,
          headerLeft: () => null,
          headerBackTitle: locale.header.backButtonTitle,
        }}/>
        <Stack.Screen name={routerNames.Chat_Item} component={Chat} options={{
          title: locale.screensName.chatItem,
          animation: 'default',
          headerShown: true,
          headerBackTitle: locale.header.backButtonTitle,
        }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};


export const MainNavigator = observer(Main);
