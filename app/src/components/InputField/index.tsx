import {Text, TextInputProps} from '@react-native-material/core';
import React from 'react';
import {TextInput, View} from 'react-native';
import {ViewStyle} from 'react-native-material-ui';
import {theme} from '../../styles/theme';
import {styles} from './styles';

export type InputFieldProps = {
    wrapperStyle?: ViewStyle,
    error?: string;
}

export const InputField = ({wrapperStyle, error, style, label, ...props}: InputFieldProps & TextInputProps) => {
  return (
    <View style={wrapperStyle}>
      <TextInput
        color={error ? theme.error : theme.main}
        style={[styles.input, style, props.editable === false ? styles.disabled: {}]}
        textAlignVertical={props.multiline ? 'top': 'center'}
        placeholder={label}
        placeholderTextColor={'#087BFF'}
        caretHidden={false}
        {...props}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

