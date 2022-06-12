import {Text, TextProps} from '@react-native-material/core';
import React from 'react';
import {styles} from './styles';

export const Title = ({style, ...props}: TextProps) => {
  return (
    <Text style={[styles.title, style]} {...props}/>
  );
};
