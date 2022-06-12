import React from 'react';
import {View, ViewProps} from 'react-native';
import {styles} from './styles';

export const Card = ({style, ...props}: ViewProps) => {
  return (
    <View style={[styles.wrapper, style]}{...props}/>
  );
};
