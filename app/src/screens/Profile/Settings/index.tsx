import {Text} from '@react-native-material/core';
import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity, View} from 'react-native';
import {routerNames} from '../../../constants/routerNames';
import {routerStore} from '../../../store/routerStore';
import {settingsItemStyles, styles} from './styles';


const accountIcon = require('./images/account.png');
const geoIcon = require('./images/geo.png');
const securityIcon = require('./images/security.png');
const ellipseIcon = require('../images/ellipse.png');
const blockUserIcon = require('../images/block-user.png');


type SettingsItemProps = {
  title: string;
  icon: ImageSourcePropType;
  onPress: () => void;
}

const onPressAccount = () => {
  routerStore.pushToScene({
    name: routerNames.SETTING_ACCOUNT,
  });
};
const onPressSecurity = () => {
  routerStore.pushToScene({
    name: routerNames.SETTING_SECURITY,
  });
};
const onPressGeo = () => {
  routerStore.pushToScene({
    name: routerNames.SETTING_LOCATION,
  });
};

const onPressBlockUserList = () => {
  routerStore.pushToScene({
    name: routerNames.BLOCK_USERS,
  });
};


const SettingsItem = ({title, icon, onPress}:SettingsItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={settingsItemStyles.wrapper}>
      <Text style={settingsItemStyles.text}>{title}</Text>
      <Image source={icon} resizeMode='contain' style={settingsItemStyles.image}/>
    </TouchableOpacity>);
};

const Settings = () => {
  return (
    <View style={styles.wrapper}>
      <SettingsItem title='Аккаунт' icon={accountIcon} onPress={onPressAccount}/>
      <SettingsItem title='Безопасность' icon={securityIcon} onPress={onPressSecurity}/>
      <SettingsItem title='Геопозиция' icon={geoIcon} onPress={onPressGeo}/>
      <SettingsItem title='Заблокированные пользователи' icon={blockUserIcon} onPress={onPressBlockUserList}/>
      <Image source={ellipseIcon} style={styles.ellipseIcon}/>
    </View>
  );
};

export default Settings;

