import React from 'react';
import {Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ErrorScreenOptionsType} from '../../types/routerTypes';
import {styles} from './styles';
import Icon from '../../components/Icon';
import {theme} from '../../styles/theme';
import {Button} from '@react-native-material/core';

const El1Image = require('./images/ellipse1.png');
const El2Image = require('./images/ellipse2.png');


type Props = {
  route: {
    params: ErrorScreenOptionsType
  }
}

export const ErrorScreen = ({route}: Props) => {
  const params = route.params;
  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.content}>
        <View style={styles.icon}>
          <Icon name='cancel-circle' color={theme.error} size={150}/>
        </View>
        <Text style={styles.title}>{params.title}</Text>
        <Text style={styles.text}>{params.description}</Text>
        <Button
          onPress={params.onPressButton}
          title={params.buttonText}
          color={'#ff5252'}
          titleStyle={styles.button}
          style={styles.wrapperButton}/>
      </SafeAreaView>

      <Image source={El1Image} style={styles.circleOne}/>
      <Image source={El2Image} style={styles.circleTwo} />

    </View>
  );
};

