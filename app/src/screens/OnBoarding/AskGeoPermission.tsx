import { Text } from '@react-native-material/core';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { routerNames } from '../../constants/routerNames';
import { applicationStore } from '../../store/applicationStore';
import { routerStore } from '../../store/routerStore';
import { styles } from './styles';

const ellipse1 = require('./images/ellipse1.png');
const ellipse2 = require('./images/ellipse2.png');
const geoIcon = require('./images/geo.png');

const AskGeoPermission = () => {
  const onPressAccept = async () => {
    await applicationStore.askPermissionForGeolocation();
    routerStore.reset(routerNames.HOME);
  };
  const onPressReject = () => {
    routerStore.reset(routerNames.HOME);
  };

  return (
    <>
      <Image source={ellipse1} style={styles.elipse1} />
      <Image source={ellipse2} style={styles.elipse2} />
      <SafeAreaView>
        <Image source={geoIcon} style={styles.geoIcon} />
        <Text style={styles.title}>Разрешить просмотр геопозиции</Text>
        <Text style={styles.subtitle}>Благодаря этому вы сможете увидеть земляков на онлайн-карте</Text>
        <TouchableOpacity onPress={onPressAccept} style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Разрешить</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressReject} style={[styles.buttonWrapper, styles.buttonWrapperReject]}>
          <Text style={styles.buttonText}>Продолжить</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default AskGeoPermission;
