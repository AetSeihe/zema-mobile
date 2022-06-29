import {Button, ButtonProps} from '@react-native-material/core';
import React from 'react';
import {theme} from '../../styles/theme';
import {styles} from './styles';

const CustomButton = ({titleStyle, style, ...props}: ButtonProps) => {
  return (
    <Button
      {...props}
      color={theme.main}
      titleStyle={[styles.textColor, titleStyle]}
      style={[styles.wrapperStyle, style]}
    />
  );
};

export default CustomButton;
