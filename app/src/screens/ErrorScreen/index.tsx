import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {ErrorScreenOptionsType} from '../../types/routerTypes';
import {styles} from './styles';
import Icon from '../../components/Icon';
import {theme} from '../../styles/theme';
import {Button} from '@react-native-material/core';

type Props = {
  route: {
    params: ErrorScreenOptionsType
  }
}

export const ErrorScreen = ({route}: Props) => {
  const params = route.params;
  return (
    <LinearGradient start={{x: 1, y: 0}} colors={['#087BFF', '#7EF0C3']} style={styles.wrapper}>
      <SafeAreaView style={styles.content}>
        <View style={styles.icon}>
          <Icon name='warning' color={theme.error} size={150}/>
        </View>
        <Text style={styles.title}>{params.title}</Text>
        <Text style={styles.text}>{params.description}</Text>
        <Button
          onPress={params.onPressButton}
          title={params.buttonText}
          color={theme.error}
          titleStyle={styles.button}
          style={styles.wrapperButton}/>
      </SafeAreaView>
    </LinearGradient>
  );
};

