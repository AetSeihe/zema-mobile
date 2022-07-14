import {Button, ButtonProps, Text} from '@react-native-material/core';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../../styles/theme';
import {styles} from './styles';


type Props = {
  theme?: 'default' | 'main' | 'error'
}

const CustomButton = ({theme: buttonTheme = 'default', titleStyle, style, title, ...props}: Props & ButtonProps) => {
  if (buttonTheme === 'main') {
    return (
      <TouchableOpacity style={[styles.wrapperStyle]} onPress={props.onPress}>
        <LinearGradient
          colors={['#79EDC3', '#79EDC3', '#5cced3', '#087BFF']}
          start={{x: 0, y: 2}}
          style={styles.wrapper}
        >
          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <Button
      title={title}
      {...props}
      color={theme.main}
      titleStyle={[styles.textColor, titleStyle]}
      style={[styles.wrapperStyle, style]}
    />
  );
};

export default CustomButton;
