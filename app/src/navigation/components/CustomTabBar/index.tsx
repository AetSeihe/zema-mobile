import {Text} from '@react-native-material/core';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import Icon from '../../../components/Icon';
import {routerNames} from '../../../constants/routerNames';
import {routerStore} from '../../../store/routerStore';
import {theme} from '../../../styles/theme';
import {styles} from './styles';


export const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const routers = state.routes.map((route, index) => {
    const {options} = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined ?
        options.tabBarLabel :
        options.title !== undefined ?
        options.title :
        route.name;

    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={isFocused ? {selected: true} : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={{flex: 1}}
      >
        <>
          <View style={styles.icon}>
            {!!options.tabBarIcon && options.tabBarIcon({
              color: (isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor)|| theme.main,
              size: 20,
              focused: isFocused,
            })}
          </View>
          <Text style={[
            {color: (isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor)|| theme.main}, styles.label]}>
            {label.toString()}
          </Text>
        </>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.wrapper}>
      {routers[0]}
      {routers[1]}
      <TouchableOpacity style={styles.plusWrapper} onPress={() => routerStore.pushToScene({
        name: routerNames.FORM_SELECT,
      })}>
        <Icon name={'plus'} color={'gray'}/>
      </TouchableOpacity>
      {routers[2]}
      {routers[3]}

    </SafeAreaView>
  );
};
