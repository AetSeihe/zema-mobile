import {Text} from '@react-native-material/core';
import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {styles} from './styles';


const AddPhotoButton = ({style, ...props}: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props} style={[styles.wrapper, style]}>
      <Text style={styles.text}>Добавить фото</Text>
    </TouchableOpacity>
  );
};

export default AddPhotoButton;
