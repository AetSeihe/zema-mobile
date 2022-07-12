import {Text} from '@react-native-material/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {theme} from '../../styles/theme';
import Icon from '../Icon';
import {styles} from './styles';

type Props = {
    onPress: () =>void;
    value: boolean,
    title: string;
}

export const CheckBoxWithLabel = ({value, title, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.userAgreementWrapper} onPress={onPress}>
      <View style={styles.userAgreementCheckbox}>
        <Icon name={value ? 'checkbox-checked': 'checkbox-unchecked'} size={20} color={theme.main}/>
      </View>
      <Text style={styles.userAgreementText}>{title}</Text>
    </TouchableOpacity>
  );
};
