import {Text} from '@react-native-material/core';
import React from 'react';
import {View} from 'react-native';
import {ViewStyle} from 'react-native-material-ui';
import {styles} from './styles';

export type Props = {
  title: string;
  text: string;
  style?: ViewStyle
}

export const TextBlock = ({title, text, style}: Props) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text>{text}</Text>
    </View>
  );
};
