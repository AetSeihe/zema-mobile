import {Text, TextProps} from '@react-native-material/core';
import React from 'react';
import {styles} from './styles';

export const Tint = ({style, ...props}: TextProps) => {
  return (
    <Text {...props} style={[styles.tint, style]}/>
  );
};
