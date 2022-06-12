import CheckBox from '@react-native-community/checkbox';
import {Text} from '@react-native-material/core';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';

type Props = {
    onPress: () =>void;
    value: boolean,
    title: string;
}

export const CheckBoxWithLabel = ({value, title, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.userAgreementWrapper} onPress={onPress}>
      <CheckBox
        value={value}
        style={styles.userAgreementCheckbox}
        animationDuration={0.2}
        disabled={true}
      />
      <Text style={styles.userAgreementText}>{title}</Text>
    </TouchableOpacity>
  );
};
