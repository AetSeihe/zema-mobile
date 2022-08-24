import {Text} from '@react-native-material/core';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

const ellipse1 = require('./images/ellipse1.png');
const ellipse2 = require('./images/ellipse2.png');
const geoIcon = require('./images/geo.png');

const AskGeoPermission = () => {
  const onPressAccept = () => {};
  const onPressReject = () => {};

  return (
    <>
      <Image source={ellipse1} style={styles.elipse1}/>
      <Image source={ellipse2} style={styles.elipse2}/>
      <SafeAreaView>
        <Image source={geoIcon} style={styles.geoIcon}/>
        <Text style={styles.title}>Разрешить просмотр геопозиции</Text>
        <TouchableOpacity onPress={onPressAccept} style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Разрешить</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressReject} style={[styles.buttonWrapper, styles.buttonWrapperReject]}>
          <Text style={styles.buttonText}>Отклонить</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default AskGeoPermission;
