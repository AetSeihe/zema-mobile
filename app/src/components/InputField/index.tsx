import {Text, TextInput, TextInputProps} from '@react-native-material/core';
import React from 'react';
import {View} from 'react-native';
import {ViewStyle} from 'react-native-material-ui';
import {theme} from '../../styles/theme';
import {styles} from './styles';

export type InputFieldProps = {
    wrapperStyle?: ViewStyle,
    error?: string;
}

export const InputField = ({wrapperStyle, error, ...props}: InputFieldProps & TextInputProps) => {
  return (
    <View style={wrapperStyle}>
      <TextInput color={error ? theme.error : theme.main} {...props}/>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
