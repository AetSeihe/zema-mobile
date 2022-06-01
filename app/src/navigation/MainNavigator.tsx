import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {routerNames} from '../constants/routerNames';
import {onEnterApp} from '../global/onEnterApp';
import SignInScreen from '../screens/AuthScreens/SignInScreen';
import SignUpScreen from '../screens/AuthScreens/SignUpScreen';
import {ErrorScreen} from '../screens/ErrorScreen';
import {routerStore} from '../store/routerStore';
import {HomeTabNavigation} from './HomeNavigation';


const Stack = createNativeStackNavigator();

const Main = () => {
  const init = async () => {
    const routeName = await onEnterApp();
    routerStore.pushToScene({
      name: routeName,
    });
    SplashScreen.hide();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <NavigationContainer ref={(ref) => routerStore.setNavigatorRef(ref)}>
      <Stack.Navigator initialRouteName={routerNames.SIGN_IN} screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'fade',
      }}>
        <Stack.Screen name={routerNames.ERROR} component={ErrorScreen} />
        <Stack.Screen name={routerNames.HOME} component={HomeTabNavigation}/>
        <Stack.Screen name={routerNames.SIGN_IN} component={SignInScreen}/>
        <Stack.Screen name={routerNames.SIGN_UP} component={SignUpScreen}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
};


export const MainNavigator = observer(Main);
