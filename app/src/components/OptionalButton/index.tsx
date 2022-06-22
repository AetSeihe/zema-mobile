import {Text} from '@react-native-material/core';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';


type Props = {
    title: string,
    onPress: () => void,
}

const OptionalButton = ({title, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OptionalButton;
