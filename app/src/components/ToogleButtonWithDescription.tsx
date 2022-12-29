
import React from 'react';
import {Text} from '@react-native-material/core';
import {StyleSheet, View} from 'react-native';
import {ViewStyle} from 'react-native-material-ui';
import ToogleButton from './ToogleButton';

type Props = {
    value: boolean;
    onPress: () => void;
    wrapperStyle?: ViewStyle,
    title:string;
    tint?: string;
  }

const ToogleButtonWithDescription = ({title, tint, ...props}:Props) => {
  return (
    <View style={toobleBtnStyles.wrapper}>
      <View style={toobleBtnStyles.content}>
        <Text style={toobleBtnStyles.title}>{title}</Text>
        {!! tint && <Text style={toobleBtnStyles.tint}>{tint}</Text>}
      </View>
      <ToogleButton {...props}/>
    </View>
  );
};

export const toobleBtnStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  content: {},
  title: {
    fontSize: 14,
    color: '#071838',
  },

  tint: {
    color: 'rgba(7, 24, 56, 0.51)',
    fontSize: 10,
    maxWidth: 200,
  },
});

export default ToogleButtonWithDescription;
