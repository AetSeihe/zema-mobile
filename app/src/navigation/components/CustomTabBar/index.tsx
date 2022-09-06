import {Text} from '@react-native-material/core';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Menu, MenuItem} from 'react-native-material-menu';
import Icon from '../../../components/Icon';
import {routerNames} from '../../../constants/routerNames';
import {routerStore} from '../../../store/routerStore';
import {theme} from '../../../styles/theme';
import {styles} from './styles';


const plusIcon = require('./images/plus.png');

const PlusButton = () => {
  const [visible, setVisible] = useState(false);

  const onPressToPost = () => {
    setVisible(false);
    routerStore.pushToScene({
      name: routerNames.POST_FORM,
    });
  };

  const onPressToVacancy = () => {
    setVisible(false);
    routerStore.pushToScene({
      name: routerNames.VACANCY_FORM,
    });
  };

  const onPressToResume = () => {
    setVisible(false);
    routerStore.pushToScene({
      name: routerNames.RESUME_FORM,
    });
  };

  return ( <>
    <TouchableOpacity style={styles.plusWrapper} onPress={() => setVisible(true)}>
      <Image source={plusIcon} style={styles.iconImage}/>
      {/* <Icon name={'plus'} color={'gray'}/> */}
    </TouchableOpacity>
    <Menu visible={visible} onRequestClose={() => setVisible(false)} >
      <MenuItem onPress={onPressToPost}>
        <Text style={styles.menuItem}>Добавить Пост</Text>
      </MenuItem>
      <MenuItem onPress={onPressToVacancy}>
        <Text style={styles.menuItem}>Добавить Вакансию</Text>
      </MenuItem>
      <MenuItem onPress={onPressToResume}>
        <Text style={styles.menuItem}>Добавить Резюме</Text>
      </MenuItem>
    </Menu>
  </>);
};


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
      <PlusButton />
      {routers[2]}
      {routers[3]}

    </SafeAreaView>
  );
};
